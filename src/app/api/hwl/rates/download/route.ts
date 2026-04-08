import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthFromCookie } from '@/lib/auth-hwl';
import { generateExcel } from '@/lib/excel-hwl';

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const user = await getAuthFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const { rate } = await req.json();

    if (!rate) {
      return NextResponse.json({ error: 'Thiếu dữ liệu rate' }, { status: 400 });
    }

    const buffer = await generateExcel(rate);
    const filename = `HLAG_${rate.polCode || rate.pol}_${rate.podCode || rate.pod}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('HWL Excel download error:', msg);
    return NextResponse.json({ error: `Lỗi tạo Excel: ${msg}` }, { status: 500 });
  }
}
