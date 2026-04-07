import { NextResponse } from 'next/server';
import { getMembers, getTransactions } from '@/lib/sheets-band';
import { getAuthFromCookie } from '@/lib/auth-band';

export async function GET() {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [members, transactions] = await Promise.all([getMembers(), getTransactions()]);

  const memberStats = members.map(m => {
    const thuPhi = transactions.filter(
      t => t.thanhVien === m.ten && t.loai === 'Thu' && t.danhMuc === 'Thu phí hàng tháng'
    );
    const totalPaid = thuPhi.reduce((s, t) => s + t.soTien, 0);
    const byYear = new Map<string, number>();
    for (const t of thuPhi) {
      const year = t.thang.substring(0, 4);
      byYear.set(year, (byYear.get(year) || 0) + t.soTien);
    }

    return {
      ...m,
      totalPaid,
      byYear: Object.fromEntries(byYear),
      lastPayment: thuPhi.length > 0 ? thuPhi[0].ngay : null,
    };
  });

  return NextResponse.json({ members: memberStats });
}
