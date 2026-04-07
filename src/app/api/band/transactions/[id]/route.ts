import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateTransaction, deleteTransaction } from '@/lib/sheets-band';
import { getAuthFromCookie, canWrite } from '@/lib/auth-band';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!canWrite(user.vaiTro)) {
    return NextResponse.json({ error: 'Không có quyền sửa giao dịch' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const { ngay, loai, danhMuc, danhMucCon, thanhVien, soTien, ghiChu } = body;

  const thang = ngay.substring(0, 7);
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const result = await updateTransaction(parseInt(id), {
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

  if (!result) return NextResponse.json({ error: 'Không tìm thấy giao dịch' }, { status: 404 });
  return NextResponse.json({ transaction: result });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!canWrite(user.vaiTro)) {
    return NextResponse.json({ error: 'Không có quyền xóa giao dịch' }, { status: 403 });
  }

  const { id } = await params;
  const ok = await deleteTransaction(parseInt(id));
  if (!ok) return NextResponse.json({ error: 'Không tìm thấy giao dịch' }, { status: 404 });
  return NextResponse.json({ success: true });
}
