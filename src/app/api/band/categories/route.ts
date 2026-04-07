import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/sheets-band';
import { getAuthFromCookie } from '@/lib/auth-band';

export async function GET() {
  const user = await getAuthFromCookie();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const categories = await getCategories();
  return NextResponse.json({ categories });
}
