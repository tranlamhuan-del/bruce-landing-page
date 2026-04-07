'use client';

import { useEffect, useState } from 'react';
import BandChatbot from '@/components/BandChatbot/BandChatbot';

interface MemberStat {
  id: number;
  ten: string;
  phiHangThang: number;
  trangThai: string;
  totalPaid: number;
  byYear: Record<string, number>;
  lastPayment: string | null;
}

const formatVND = (v: number) => v.toLocaleString('vi-VN') + 'đ';

export default function MembersPage() {
  const [members, setMembers] = useState<MemberStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/band/members')
      .then(r => r.json())
      .then(d => setMembers(d.members || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400">Đang tải...</div>;

  const years = ['2024', '2025', '2026'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Thành viên Band</h2>

      {/* Member cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800">{m.ten}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                m.trangThai === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {m.trangThai === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="text-sm text-slate-500 mb-2">
              Phí: {formatVND(m.phiHangThang)}/tháng
            </div>

            <div className="text-lg font-bold text-emerald-600 mb-3">
              Tổng đã đóng: {formatVND(m.totalPaid)}
            </div>

            <div className="space-y-1.5">
              {years.map(y => {
                const paid = m.byYear[y] || 0;
                return (
                  <div key={y} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{y}:</span>
                    <span className={`font-medium ${paid > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {paid > 0 ? formatVND(paid) : 'Chưa đóng'}
                    </span>
                  </div>
                );
              })}
            </div>

            {m.lastPayment && (
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                Lần đóng gần nhất: {m.lastPayment}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-medium text-slate-600">Thành viên</th>
              {years.map(y => (
                <th key={y} className="text-right px-4 py-3 font-medium text-slate-600">{y}</th>
              ))}
              <th className="text-right px-4 py-3 font-medium text-slate-600">Tổng cộng</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{m.ten}</td>
                {years.map(y => (
                  <td key={y} className={`px-4 py-3 text-right ${
                    (m.byYear[y] || 0) > 0 ? 'text-emerald-600' : 'text-slate-300'
                  }`}>
                    {(m.byYear[y] || 0) > 0 ? formatVND(m.byYear[y]) : '-'}
                  </td>
                ))}
                <td className="px-4 py-3 text-right font-bold text-slate-800">
                  {formatVND(m.totalPaid)}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold">
              <td className="px-4 py-3 text-slate-800">Tổng</td>
              {years.map(y => (
                <td key={y} className="px-4 py-3 text-right text-blue-600">
                  {formatVND(members.reduce((s, m) => s + (m.byYear[y] || 0), 0))}
                </td>
              ))}
              <td className="px-4 py-3 text-right text-blue-600">
                {formatVND(members.reduce((s, m) => s + m.totalPaid, 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BandChatbot />
    </div>
  );
}
