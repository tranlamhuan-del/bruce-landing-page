'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface HwlUser {
  username: string;
  hoTen: string;
  vaiTro: 'admin' | 'user';
}

const HwlUserContext = createContext<HwlUser | null>(null);
export const useHwlUser = () => useContext(HwlUserContext);

export default function HwlLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<HwlUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/hwl/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    fetch('/api/hwl/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => router.push('/hwl/login'))
      .finally(() => setLoading(false));
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await fetch('/api/hwl/auth/me', { method: 'DELETE' });
    router.push('/hwl/login');
  };

  const navItems = [
    { href: '/hwl', label: 'Tra giá', icon: '🔍' },
    { href: '/hwl/history', label: 'Lịch sử', icon: '📋' },
  ];

  return (
    <HwlUserContext.Provider value={user}>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚢</span>
                <div>
                  <h1 className="text-lg font-bold leading-tight">HWL Rate Lookup</h1>
                  <p className="text-xs text-teal-300 leading-tight">Tra cứu giá cước</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      pathname === item.href
                        ? 'bg-teal-600 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium">{user.hoTen}</div>
                  <div className="text-xs text-teal-300">{user.vaiTro === 'admin' ? 'Quản trị' : 'Nhân viên'}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white/60 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Thoát
                </button>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden text-white p-2 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    pathname === item.href
                      ? 'bg-teal-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10 text-xs text-teal-300 px-4">
                {user.hoTen} — {user.vaiTro === 'admin' ? 'Quản trị' : 'Nhân viên'}
              </div>
            </nav>
          )}
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </HwlUserContext.Provider>
  );
}
