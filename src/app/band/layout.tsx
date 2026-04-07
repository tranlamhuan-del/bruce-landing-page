'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface User {
  username: string;
  hoTen: string;
  vaiTro: 'admin' | 'thuquy' | 'thanhvien';
}

const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext);

export default function BandLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/band/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    fetch('/api/band/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => router.push('/band/login'))
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
    await fetch('/api/band/auth/me', { method: 'DELETE' });
    router.push('/band/login');
  };

  const navItems = [
    { href: '/band', label: 'Dashboard', icon: '📊' },
    { href: '/band/transactions', label: 'Giao dịch', icon: '💰' },
    { href: '/band/members', label: 'Thành viên', icon: '👥' },
  ];

  const roleLabel = { admin: 'Quản trị', thuquy: 'Thủ quỹ', thanhvien: 'Thành viên' };

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎸</span>
                <div>
                  <h1 className="text-lg font-bold leading-tight">Band Đại Nam</h1>
                  <p className="text-xs text-blue-300 leading-tight">Quản lý Thu Chi</p>
                </div>
              </div>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      pathname === item.href
                        ? 'bg-blue-600 text-white'
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
                  <div className="text-xs text-blue-300">{roleLabel[user.vaiTro]}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white/60 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Thoát
                </button>

                {/* Mobile menu button */}
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

          {/* Mobile nav */}
          {menuOpen && (
            <nav className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10 text-xs text-blue-300 px-4">
                {user.hoTen} — {roleLabel[user.vaiTro]}
              </div>
            </nav>
          )}
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </UserContext.Provider>
  );
}
