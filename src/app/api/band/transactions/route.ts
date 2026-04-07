import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTransactions, addTransaction } from '@/lib/sheets-band';
import { getAuthFromCookie, canWrite } from '@/lib/auth-band';

export async function GET(req: NextRequest) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const params = req.nextUrl.searchParams;
  const filters = {
    thang: params.get('thang') || undefined,
    nam: params.get('nam') || undefined,
    loai: params.get('loai') || undefined,
    thanhVien: params.get('thanhVien') || undefined,
  };

  const transactions = await getTransactions(filters);
  return NextResponse.json({ transactions });
}

export async function POST(req: NextRequest) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!canWrite(user.vaiTro)) {
    return NextResponse.json({ error: 'Không có quyền thêm giao dịch' }, { status: 403 });
  }

  const body = await req.json();
  const { ngay, loai, danhMuc, danhMucCon, thanhVien, soTien, ghiChu } = body;

  if (!ngay || !loai || !danhMuc || !soTien) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
  }

  const thang = ngay.substring(0, 7);
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const transaction = await addTransaction({
    ngay,
    thang,
    loai,
    danhMuc,
    danhMucCon: danhMucCon || '',
    thanhVien: thanhVien || '',
    soTien: parseFloat(soTien),
    ghiChu: ghiChu || '',
    nguoiNhap: user.hoTen,
    ngayNhap: now,
  });

  return NextResponse.json({ transaction }, { status: 201 });
}
