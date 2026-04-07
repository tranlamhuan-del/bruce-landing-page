'use client';

import { useEffect, useState, useCallback } from 'react';
import { useUser } from '../layout';
import BandChatbot from '@/components/BandChatbot/BandChatbot';

interface Transaction {
  id: number;
  ngay: string;
  thang: string;
  loai: 'Thu' | 'Chi';
  danhMuc: string;
  danhMucCon: string;
  thanhVien: string;
  soTien: number;
  ghiChu: string;
  nguoiNhap: string;
  ngayNhap: string;
}

interface Category {
  id: number;
  ten: string;
  loai: string;
  danhMucCon: string;
}

const formatVND = (v: number) => v.toLocaleString('vi-VN') + 'đ';

const emptyForm = {
  ngay: new Date().toISOString().split('T')[0],
  loai: 'Chi' as 'Thu' | 'Chi',
  danhMuc: '',
  danhMucCon: '',
  thanhVien: '',
  soTien: '',
  ghiChu: '',
};

export default function TransactionsPage() {
  const user = useUser();
  const canWrite = user?.vaiTro === 'admin' || user?.vaiTro === 'thuquy';

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Filters
  const [filterNam, setFilterNam] = useState(new Date().getFullYear().toString());
  const [filterThang, setFilterThang] = useState('');
  const [filterLoai, setFilterLoai] = useState('');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterNam && !filterThang) params.set('nam', filterNam);
    if (filterThang) params.set('thang', filterThang);
    if (filterLoai) params.set('loai', filterLoai);

    const res = await fetch(`/api/band/transactions?${params}`);
    const data = await res.json();
    setTransactions(data.transactions || []);
    setLoading(false);
  }, [filterNam, filterThang, filterLoai]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  useEffect(() => {
    fetch('/api/band/categories').then(r => r.json()).then(d => setCategories(d.categories || []));
  }, []);

  const uniqueCategories = (loai: string) => {
    const cats = categories.filter(c => c.loai === loai);
    return [...new Set(cats.map(c => c.ten))];
  };

  const subCategories = (danhMuc: string) => {
    return categories.filter(c => c.ten === danhMuc && c.danhMucCon).map(c => c.danhMucCon);
  };

  const members = ['Anh Trương', 'Chị Hằng', 'Anh Đại', 'Anh Nam', 'Anh Thịnh', 'Anh Lâm', 'Bích Tiên', 'Huân'];

  const handleEdit = (t: Transaction) => {
    setForm({
      ngay: t.ngay,
      loai: t.loai,
      danhMuc: t.danhMuc,
      danhMucCon: t.danhMucCon,
      thanhVien: t.thanhVien,
      soTien: t.soTien.toString(),
      ghiChu: t.ghiChu,
    });
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa giao dịch này?')) return;
    await fetch(`/api/band/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = editingId ? `/api/band/transactions/${editingId}` : '/api/band/transactions';
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, soTien: parseFloat(form.soTien) }),
    });

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setSaving(false);
    fetchTransactions();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Build month options for filter
  const months = [];
  for (let m = 1; m <= 12; m++) {
    months.push(`${filterNam}-${m.toString().padStart(2, '0')}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-slate-800">Giao dịch</h2>
        {canWrite && (
          <button
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            + Thêm giao dịch
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl border border-slate-200">
        <select value={filterNam} onChange={e => { setFilterNam(e.target.value); setFilterThang(''); }}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
        <select value={filterThang} onChange={e => setFilterThang(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
          <option value="">Tất cả tháng</option>
          {months.map(m => <option key={m} value={m}>Tháng {m.split('-')[1]}</option>)}
        </select>
        <select value={filterLoai} onChange={e => setFilterLoai(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
          <option value="">Thu & Chi</option>
          <option value="Thu">Thu</option>
          <option value="Chi">Chi</option>
        </select>
        <span className="text-sm text-slate-500">
          {transactions.length} giao dịch
        </span>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCancel}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingId ? 'Sửa giao dịch' : 'Thêm giao dịch mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ngày</label>
                  <input type="date" value={form.ngay} onChange={e => setForm({ ...form, ngay: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Loại</label>
                  <select value={form.loai} onChange={e => setForm({ ...form, loai: e.target.value as 'Thu' | 'Chi', danhMuc: '', danhMucCon: '' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="Thu">Thu</option>
                    <option value="Chi">Chi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                  <select value={form.danhMuc} onChange={e => setForm({ ...form, danhMuc: e.target.value, danhMucCon: '' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required>
                    <option value="">-- Chọn --</option>
                    {uniqueCategories(form.loai).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục con</label>
                  <select value={form.danhMucCon} onChange={e => setForm({ ...form, danhMucCon: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="">-- Không --</option>
                    {subCategories(form.danhMuc).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thành viên</label>
                  <select value={form.thanhVien} onChange={e => setForm({ ...form, thanhVien: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="">-- Không --</option>
                    {members.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Số tiền (VND)</label>
                  <input type="number" value={form.soTien} onChange={e => setForm({ ...form, soTien: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required min="0" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
                <input type="text" value={form.ghiChu} onChange={e => setForm({ ...form, ghiChu: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={handleCancel}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition cursor-pointer">
                  Hủy
                </button>
                <button type="submit" disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer">
                  {saving ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction list */}
      {loading ? (
        <div className="text-center py-10 text-slate-400">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Ngày</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Loại</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Danh mục</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Thành viên</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Số tiền</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Ghi chú</th>
                {canWrite && <th className="px-4 py-3"></th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{t.ngay}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      t.loai === 'Thu' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {t.loai}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {t.danhMuc}{t.danhMucCon ? ` > ${t.danhMucCon}` : ''}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.thanhVien || '-'}</td>
                  <td className={`px-4 py-3 text-right font-medium whitespace-nowrap ${
                    t.loai === 'Thu' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {t.loai === 'Thu' ? '+' : '-'}{formatVND(t.soTien)}
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate">{t.ghiChu}</td>
                  {canWrite && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button onClick={() => handleEdit(t)}
                        className="text-blue-600 hover:text-blue-800 text-xs mr-3 cursor-pointer">Sửa</button>
                      <button onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700 text-xs cursor-pointer">Xóa</button>
                    </td>
                  )}
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-slate-400">Không có giao dịch nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <BandChatbot />
    </div>
  );
}
