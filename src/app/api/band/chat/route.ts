import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getAuthFromCookie, canWrite } from '@/lib/auth-band';
import { getAllDataForChat, addTransaction } from '@/lib/sheets-band';

const SYSTEM_PROMPT = `Bạn là trợ lý AI quản lý thu chi cho Ban nhạc Đại Nam.

## Vai trò:
- Trả lời câu hỏi về tài chính band (tồn quỹ, thu chi, đóng phí...)
- Giúp nhập giao dịch thu chi bằng ngôn ngữ tự nhiên
- Phân tích hóa đơn/invoice từ hình ảnh

## Quy tắc nhập giao dịch:
Khi người dùng muốn nhập giao dịch (kể cả từ invoice), trả về JSON trong block \`\`\`json:
\`\`\`json
{
  "action": "create_transaction",
  "data": {
    "ngay": "YYYY-MM-DD",
    "loai": "Thu" hoặc "Chi",
    "danhMuc": "tên danh mục chính",
    "danhMucCon": "danh mục con (nếu có)",
    "thanhVien": "tên thành viên (nếu liên quan)",
    "soTien": số tiền (number),
    "ghiChu": "ghi chú"
  }
}
\`\`\`

## Danh mục hợp lệ:
THU: Thu phí hàng tháng, Thu tiền thù lao biểu diễn, Thu khác
CHI: Chi tập luyện band (con: Ăn uống hàng tuần, Phòng tập, Học phí thầy hướng dẫn, Tổng phổ), Chi trang thiết bị band (con: Sửa chữa mua sắm nhỏ, Nâng cấp dàn âm thanh), Chi cho các sự kiện trình diễn (con: Ăn uống, Di chuyển, Chỗ ở, Dàn âm thanh, Thuê thầy), Phí SMS banking, Chi khác

## Thành viên: Anh Trương, Chị Hằng, Anh Đại, Anh Nam, Anh Thịnh, Anh Lâm, Bích Tiên, Huân

## Lưu ý:
- Trả lời ngắn gọn, thân thiện, bằng tiếng Việt
- Số tiền format dạng VND (ví dụ: 1,000,000đ)
- Nếu người dùng gửi hình invoice, đọc và extract thông tin rồi suggest giao dịch
- Nếu không chắc danh mục, hỏi lại
- Ngày mặc định là hôm nay nếu không nói rõ
`;

export async function POST(req: NextRequest) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const message = formData.get('message') as string;
    const image = formData.get('image') as File | null;
    const historyRaw = formData.get('history') as string;
    const history = historyRaw ? JSON.parse(historyRaw) : [];

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Get financial context
    const financialContext = await getAllDataForChat();

    const ai = new GoogleGenAI({ apiKey });

    const today = new Date().toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const todayISO = new Date().toISOString().split('T')[0];

    const systemInstruction = `${SYSTEM_PROMPT}

## Dữ liệu tài chính hiện tại:
${financialContext}

## Người dùng hiện tại: ${user.hoTen} (${user.vaiTro})
## Ngày hôm nay: ${today} (${todayISO})
${!canWrite(user.vaiTro) ? '\n## LƯU Ý: Người dùng này KHÔNG có quyền nhập giao dịch. Chỉ trả lời câu hỏi, KHÔNG tạo JSON giao dịch.' : ''}
`;

    // Build parts for the current message
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (image) {
      const bytes = await image.arrayBuffer();
      const base64 = Buffer.from(bytes).toString('base64');
      parts.push({
        inlineData: { mimeType: image.type, data: base64 },
      });
      parts.push({ text: message || 'Phân tích hóa đơn này và suggest giao dịch thu chi.' });
    } else {
      parts.push({ text: message });
    }

    // Build conversation history
    const contents = [
      ...history.map((h: { role: string; text: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const reply = response.text || 'Xin lỗi, tôi không thể trả lời lúc này.';

    // Check if reply contains a transaction to create
    let createdTransaction = null;
    const jsonMatch = reply.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch && canWrite(user.vaiTro)) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.action === 'create_transaction' && parsed.data) {
          createdTransaction = await addTransaction({
            ...parsed.data,
            thang: parsed.data.ngay.substring(0, 7),
            nguoiNhap: user.hoTen,
            ngayNhap: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
          });
        }
      } catch {
        // JSON parse failed, just return the reply
      }
    }

    return NextResponse.json({ reply, createdTransaction });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Lỗi xử lý tin nhắn' }, { status: 500 });
  }
}
