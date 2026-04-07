import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDashboardData } from '@/lib/sheets-band';
import { getAuthFromCookie } from '@/lib/auth-band';

export async function GET(req: NextRequest) {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const nam = req.nextUrl.searchParams.get('nam') || undefined;
  const data = await getDashboardData(nam);
  return NextResponse.json(data);
}
