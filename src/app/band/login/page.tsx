'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BandLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/band/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Đăng nhập thất bại');
        return;
      }

      router.push('/band');
    } catch {
      setError('Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎸</div>
          <h1 className="text-3xl font-bold text-white">Band Đại Nam</h1>
          <p className="text-blue-300 mt-2">Quản lý Thu Chi</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Tài khoản
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              placeholder="Nhập tài khoản"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-200 text-sm font-medium mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Tài khoản được cấp bởi quản trị viên
        </p>
      </div>
    </div>
  );
}
