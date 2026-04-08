'use client';

import { useState } from 'react';

const CONTAINER_TYPES = [
  { value: '20GP', label: "20' General Purpose" },
  { value: '40GP', label: "40' General Purpose" },
  { value: '40HC', label: "40' High Cube" },
  { value: '20RE', label: "20' Reefer" },
  { value: '40RE', label: "40' Reefer" },
  { value: '40RH', label: "40' Reefer High Cube" },
];

// Gợi ý cảng phổ biến — user vẫn có thể gõ tự do bất kỳ cảng nào
const POPULAR_PORTS = [
  // Vietnam
  'Ho Chi Minh City', 'Hai Phong', 'Da Nang', 'Quy Nhon', 'Vung Tau',
  // Europe
  'Hamburg', 'Rotterdam', 'Antwerp', 'Felixstowe', 'Le Havre', 'Genoa',
  'Barcelona', 'Piraeus', 'Bremerhaven', 'Gdansk', 'Gothenburg',
  // North America
  'Los Angeles', 'Long Beach', 'New York', 'Savannah', 'Houston',
  'Oakland', 'Seattle', 'Vancouver', 'Montreal',
  // Asia
  'Shanghai', 'Singapore', 'Busan', 'Tokyo', 'Yokohama', 'Osaka',
  'Hong Kong', 'Shenzhen', 'Ningbo', 'Qingdao', 'Kaohsiung',
  'Port Klang', 'Laem Chabang', 'Jakarta', 'Manila',
  // South Asia & Middle East
  'Mumbai', 'Chennai', 'Colombo', 'Jeddah', 'Dubai', 'Karachi',
  // Oceania
  'Sydney', 'Melbourne', 'Brisbane', 'Auckland',
  // Africa
  'Durban', 'Cape Town', 'Mombasa', 'Lagos',
  // South America
  'Santos', 'Buenos Aires', 'Callao', 'Cartagena',
];

interface RateResult {
  carrier: string;
  containerType: string;
  pol: string;
  pod: string;
  oceanFreight: number;
  currency: string;
  validFrom: string;
  validTo: string;
  transitTime: string;
  surcharges: { name: string; amount: number; currency: string }[];
  totalAmount: number;
}

export default function HwlRateLookupPage() {
  const [containerType, setContainerType] = useState('40RE');
  const [pol, setPol] = useState('Ho Chi Minh City');
  const [pod, setPod] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RateResult | null>(null);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/hwl/rates/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ containerType, pol, pod }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Lỗi tra giá');
        return;
      }

      const data = await res.json();
      setResult(data.rate);
    } catch {
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      const res = await fetch('/api/hwl/rates/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate: result }),
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HLAG_${result.pol}_${result.pod}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Lỗi tải file Excel');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Tra giá cước Hapag-Lloyd</h2>
        <p className="text-slate-500 mt-1">Nhập thông tin tuyến vận chuyển để tra giá</p>
      </div>

      <form onSubmit={handleLookup} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Container Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Loại container
            </label>
            <select
              value={containerType}
              onChange={e => setContainerType(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              {CONTAINER_TYPES.map(ct => (
                <option key={ct.value} value={ct.value}>{ct.label}</option>
              ))}
            </select>
          </div>

          {/* POL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cảng xếp hàng (POL)
            </label>
            <input
              type="text"
              list="ports-pol"
              value={pol}
              onChange={e => setPol(e.target.value)}
              placeholder="Gõ tên cảng (VD: Ho Chi Minh City)"
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <datalist id="ports-pol">
              {POPULAR_PORTS.map(p => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          {/* POD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cảng dỡ hàng (POD)
            </label>
            <input
              type="text"
              list="ports-pod"
              value={pod}
              onChange={e => setPod(e.target.value)}
              placeholder="Gõ tên cảng (VD: Hamburg)"
              className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <datalist id="ports-pod">
              {POPULAR_PORTS.map(p => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !pol || !pod}
          className="w-full md:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang tra giá... (30-60 giây)
            </span>
          ) : 'Tra giá'}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Kết quả tra giá</h3>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Excel
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-teal-50 rounded-lg p-3">
              <div className="text-xs text-teal-600 font-medium">Ocean Freight</div>
              <div className="text-xl font-bold text-teal-800">
                {result.currency} {result.oceanFreight.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 font-medium">Tổng cộng</div>
              <div className="text-xl font-bold text-slate-800">
                {result.currency} {result.totalAmount.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 font-medium">Transit Time</div>
              <div className="text-xl font-bold text-slate-800">{result.transitTime}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 font-medium">Hiệu lực</div>
              <div className="text-sm font-bold text-slate-800">{result.validFrom} → {result.validTo}</div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="text-sm font-medium text-slate-600 mb-2">Chi tiết phụ phí</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2">Phụ phí</th>
                  <th className="pb-2 text-right">Số tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-50">
                  <td className="py-1.5 text-slate-700">Ocean Freight (O/F)</td>
                  <td className="py-1.5 text-right text-slate-800 font-medium">{result.currency} {result.oceanFreight.toLocaleString()}</td>
                </tr>
                {result.surcharges.map((s, i) => (
                  <tr key={i} className="border-t border-slate-50">
                    <td className="py-1.5 text-slate-700">{s.name}</td>
                    <td className="py-1.5 text-right text-slate-800 font-medium">{s.currency} {s.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 font-bold">
                  <td className="py-2 text-slate-800">TỔNG</td>
                  <td className="py-2 text-right text-teal-700">{result.currency} {result.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            Hãng tàu: {result.carrier} | Container: {containerType} | {result.pol} → {result.pod}
          </div>
        </div>
      )}
    </div>
  );
}
