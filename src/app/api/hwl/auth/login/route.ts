import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserByUsername } from '@/lib/sheets-hwl';
import { signToken, setAuthCookie } from '@/lib/auth-hwl';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Thiếu username hoặc password' }, { status: 400 });
    }

    const user = await getUserByUsername(username);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Sai tài khoản hoặc mật khẩu' }, { status: 401 });
    }

    const token = await signToken({
      username: user.username,
      hoTen: user.hoTen,
      vaiTro: user.vaiTro,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      user: { username: user.username, hoTen: user.hoTen, vaiTro: user.vaiTro },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('HWL Login error:', msg, error);
    return NextResponse.json({ error: `Lỗi đăng nhập: ${msg}` }, { status: 500 });
  }
}
