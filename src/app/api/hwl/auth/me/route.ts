import { NextResponse } from 'next/server';
import { getAuthFromCookie, clearAuthCookie } from '@/lib/auth-hwl';

export async function GET() {
  try {
    const user = await getAuthFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });
  }
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ success: true });
}
