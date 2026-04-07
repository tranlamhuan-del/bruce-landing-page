'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import BandChatbot from '@/components/BandChatbot/BandChatbot';

interface DashboardData {
  tonQuyDauKy: number;
  tongThu: number;
  tongChi: number;
  tonQuyCuoiKy: number;
  thuChiTheoThang: { thang: string; thu: number; chi: number }[];
  coCauChi: { name: string; value: number }[];
  tinhHinhDongPhi: { ten: string; daDong: number; phaiDong: number; conLai: number }[];
}

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

const formatVND = (v: number) => {
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}tr`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
  return v.toString();
};

const formatFullVND = (v: number) => v.toLocaleString('vi-VN') + 'đ';

export default function BandDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/band/dashboard?nam=${year}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading || !data) {
    return <div className="text-center py-20 text-slate-400">Đang tải dữ liệu...</div>;
  }

  const yearCards = [
    { label: `Tổng thu ${year}`, value: data.tongThu, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: `Tổng chi ${year}`, value: data.tongChi, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: `Thu - Chi ${year}`, value: data.tongThu - data.tongChi, color: data.tongThu - data.tongChi >= 0 ? 'text-emerald-600' : 'text-red-600', bg: 'bg-slate-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Balance hero card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm text-slate-300 font-medium mb-1">Số dư quỹ hiện tại</div>
            <div className={`text-3xl md:text-4xl font-bold ${data.tonQuyCuoiKy >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatFullVND(data.tonQuyCuoiKy)}
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-slate-400">Tồn đầu {year}</div>
              <div className="text-lg font-semibold text-white">{formatFullVND(data.tonQuyDauKy)}</div>
            </div>
            <div className="border-l border-slate-600 pl-6">
              <div className="text-slate-400">Biến động {year}</div>
              <div className={`text-lg font-semibold ${data.tongThu - data.tongChi >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {data.tongThu - data.tongChi >= 0 ? '+' : ''}{formatFullVND(data.tongThu - data.tongChi)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {yearCards.map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-slate-200`}>
            <div className="text-xs text-slate-500 font-medium mb-1">{card.label}</div>
            <div className={`text-lg md:text-xl font-bold ${card.color}`}>
              {formatFullVND(card.value)}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Thu chi theo tháng */}
        <div className="md:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Thu Chi theo tháng ({year})</h3>
          {data.thuChiTheoThang.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.thuChiTheoThang}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="thang" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.split('-')[1]} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={formatVND} />
                <Tooltip formatter={(v) => formatFullVND(Number(v))} />
                <Legend />
                <Bar dataKey="thu" name="Thu" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="chi" name="Chi" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-slate-400">Chưa có dữ liệu</div>
          )}
        </div>

        {/* Cơ cấu chi */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Cơ cấu Chi ({year})</h3>
          {data.coCauChi.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data.coCauChi}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={85}
                    dataKey="value"
                    label={false}
                  >
                    {data.coCauChi.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatFullVND(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-2">
                {data.coCauChi.map((item, i) => {
                  const total = data.coCauChi.reduce((s, c) => s + c.value, 0);
                  const pct = total > 0 ? ((item.value / total) * 100).toFixed(0) : '0';
                  return (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-slate-600 truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-slate-400">{pct}%</span>
                        <span className="text-slate-800 font-medium">{formatFullVND(item.value)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-slate-400">Chưa có dữ liệu</div>
          )}
        </div>
      </div>

      {/* Tình hình đóng phí */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Tình hình đóng phí thành viên {parseInt(year) <= 2025 ? '(2024-2025 gộp)' : `(${year})`}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-2.5 font-medium text-slate-600">Thành viên</th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-600">Phải đóng</th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-600">Đã đóng</th>
                <th className="text-right px-4 py-2.5 font-medium text-slate-600">Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {data.tinhHinhDongPhi.map((m) => {
                const du = m.daDong - m.phaiDong;
                const isDu = du > 0;
                const isDu0 = du === 0;
                const isThieu = du < 0;
                return (
                  <tr key={m.ten} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-medium text-slate-800">{m.ten}</td>
                    <td className="px-4 py-2.5 text-right text-slate-600">{formatFullVND(m.phaiDong)}</td>
                    <td className={`px-4 py-2.5 text-right font-medium ${isDu ? 'text-emerald-600' : isThieu ? 'text-orange-600' : 'text-slate-800'}`}>
                      {formatFullVND(m.daDong)}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {isDu && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          Dư {formatFullVND(du)}
                        </span>
                      )}
                      {isDu0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          Đã đóng đủ
                        </span>
                      )}
                      {isThieu && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          Thiếu {formatFullVND(-du)}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank info */}
      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Thông tin tài khoản Band</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>Ngân hàng: <strong>TP Bank (Tiên Phong)</strong></div>
          <div>Số TK: <strong>90903808202</strong></div>
          <div>Chủ TK: <strong>Phạm Ngọc Bích Tiên</strong></div>
        </div>
      </div>

      <BandChatbot />
    </div>
  );
}
