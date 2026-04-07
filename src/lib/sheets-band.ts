import { google, type sheets_v4 } from 'googleapis';

// Sheet ID is safe to hardcode (not a secret - it's a public identifier)
const SHEET_ID = process.env.BAND_SHEET_ID || '1kVWRYTLBFhzi53ybZRpu5SHDYzXN43s3RzF2DrAw9uk';

let sheetsClient: sheets_v4.Sheets | null = null;

function getSheets(): sheets_v4.Sheets {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

// ============ GENERIC HELPERS ============

async function readTab(tab: string): Promise<string[][]> {
  const res = await getSheets().spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:Z`,
  });
  return (res.data.values || []) as string[][];
}

async function appendRows(tab: string, rows: (string | number)[][]) {
  await getSheets().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A:K`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });
}

async function updateRow(tab: string, rowIndex: number, values: (string | number)[]) {
  await getSheets().spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A${rowIndex}:K${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

async function clearRow(tab: string, rowIndex: number) {
  await getSheets().spreadsheets.values.clear({
    spreadsheetId: SHEET_ID,
    range: `${tab}!A${rowIndex}:K${rowIndex}`,
  });
}

// ============ TRANSACTIONS ============

export interface Transaction {
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

function rowToTransaction(row: string[]): Transaction {
  return {
    id: parseInt(row[0]) || 0,
    ngay: row[1] || '',
    thang: row[2] || '',
    loai: (row[3] as 'Thu' | 'Chi') || 'Chi',
    danhMuc: row[4] || '',
    danhMucCon: row[5] || '',
    thanhVien: row[6] || '',
    soTien: parseFloat(row[7]) || 0,
    ghiChu: row[8] || '',
    nguoiNhap: row[9] || '',
    ngayNhap: row[10] || '',
  };
}

function transactionToRow(t: Omit<Transaction, 'id'> & { id: number }): (string | number)[] {
  return [t.id, t.ngay, t.thang, t.loai, t.danhMuc, t.danhMucCon, t.thanhVien, t.soTien, t.ghiChu, t.nguoiNhap, t.ngayNhap];
}

export async function getTransactions(filters?: {
  thang?: string;
  nam?: string;
  loai?: string;
  thanhVien?: string;
}): Promise<Transaction[]> {
  const rows = await readTab('GiaoDich');
  if (rows.length <= 1) return [];

  let transactions = rows.slice(1).filter(r => r[0]).map(rowToTransaction);

  if (filters?.thang) {
    transactions = transactions.filter(t => t.thang === filters.thang);
  }
  if (filters?.nam) {
    transactions = transactions.filter(t => t.thang.startsWith(filters.nam!));
  }
  if (filters?.loai) {
    transactions = transactions.filter(t => t.loai === filters.loai);
  }
  if (filters?.thanhVien) {
    transactions = transactions.filter(t => t.thanhVien === filters.thanhVien);
  }

  return transactions.sort((a, b) => b.ngay.localeCompare(a.ngay));
}

export async function getNextId(): Promise<number> {
  const rows = await readTab('GiaoDich');
  if (rows.length <= 1) return 1;
  const ids = rows.slice(1).map(r => parseInt(r[0]) || 0);
  return Math.max(...ids) + 1;
}

export async function addTransaction(t: Omit<Transaction, 'id'>): Promise<Transaction> {
  const id = await getNextId();
  const full = { ...t, id };
  await appendRows('GiaoDich', [transactionToRow(full)]);
  return full;
}

export async function updateTransaction(id: number, t: Omit<Transaction, 'id'>): Promise<Transaction | null> {
  const rows = await readTab('GiaoDich');
  const rowIndex = rows.findIndex((r, i) => i > 0 && parseInt(r[0]) === id);
  if (rowIndex === -1) return null;

  const full = { ...t, id };
  await updateRow('GiaoDich', rowIndex + 1, transactionToRow(full));
  return full;
}

export async function deleteTransaction(id: number): Promise<boolean> {
  const rows = await readTab('GiaoDich');
  const rowIndex = rows.findIndex((r, i) => i > 0 && parseInt(r[0]) === id);
  if (rowIndex === -1) return false;

  await clearRow('GiaoDich', rowIndex + 1);
  return true;
}

// ============ MEMBERS ============

export interface Member {
  id: number;
  ten: string;
  phiHangThang: number;
  trangThai: string;
}

export async function getMembers(): Promise<Member[]> {
  const rows = await readTab('ThanhVien');
  if (rows.length <= 1) return [];
  return rows.slice(1).filter(r => r[0]).map(r => ({
    id: parseInt(r[0]) || 0,
    ten: r[1] || '',
    phiHangThang: parseFloat(r[2]) || 0,
    trangThai: r[3] || 'active',
  }));
}

// ============ CATEGORIES ============

export interface Category {
  id: number;
  ten: string;
  loai: string;
  danhMucCon: string;
}

export async function getCategories(): Promise<Category[]> {
  const rows = await readTab('DanhMuc');
  if (rows.length <= 1) return [];
  return rows.slice(1).filter(r => r[0]).map(r => ({
    id: parseInt(r[0]) || 0,
    ten: r[1] || '',
    loai: r[2] || '',
    danhMucCon: r[3] || '',
  }));
}

// ============ AUTH ============

export interface UserRecord {
  username: string;
  password: string;
  hoTen: string;
  vaiTro: 'admin' | 'thuquy' | 'thanhvien';
  thanhVienId: number;
}

export async function getUserByUsername(username: string): Promise<UserRecord | null> {
  const rows = await readTab('CaiDat');
  if (rows.length <= 1) return null;
  const row = rows.slice(1).find(r => r[0] === username);
  if (!row) return null;
  return {
    username: row[0],
    password: row[1],
    hoTen: row[2],
    vaiTro: row[3] as UserRecord['vaiTro'],
    thanhVienId: parseInt(row[4]) || 0,
  };
}

// ============ DASHBOARD ============

export interface DashboardData {
  tonQuyDauKy: number;
  tongThu: number;
  tongChi: number;
  tonQuyCuoiKy: number;
  thuChiTheoThang: { thang: string; thu: number; chi: number }[];
  coCauChi: { name: string; value: number }[];
  tinhHinhDongPhi: { ten: string; daDong: number; phaiDong: number; conLai: number }[];
}

export async function getDashboardData(nam?: string): Promise<DashboardData> {
  const allTx = await getTransactions();
  const members = await getMembers();

  const year = nam || new Date().getFullYear().toString();
  const txYear = allTx.filter(t => t.thang.startsWith(year));

  // Thu chi theo tháng
  const monthMap = new Map<string, { thu: number; chi: number }>();
  for (const t of txYear) {
    const m = monthMap.get(t.thang) || { thu: 0, chi: 0 };
    if (t.loai === 'Thu') m.thu += t.soTien;
    else m.chi += t.soTien;
    monthMap.set(t.thang, m);
  }
  const thuChiTheoThang = Array.from(monthMap.entries())
    .map(([thang, v]) => ({ thang, ...v }))
    .sort((a, b) => a.thang.localeCompare(b.thang));

  // Cơ cấu chi
  const chiMap = new Map<string, number>();
  for (const t of txYear.filter(t => t.loai === 'Chi')) {
    const cat = t.danhMuc || 'Khác';
    chiMap.set(cat, (chiMap.get(cat) || 0) + t.soTien);
  }
  const coCauChi = Array.from(chiMap.entries()).map(([name, value]) => ({ name, value }));

  // Tình hình đóng phí
  const currentMonth = new Date().getMonth() + 1;
  const monthsInYear = year === new Date().getFullYear().toString() ? currentMonth : 12;

  const tinhHinhDongPhi = members.filter(m => m.trangThai === 'active').map(m => {
    const memberThu = allTx.filter(
      t => t.thanhVien === m.ten && t.loai === 'Thu' && t.danhMuc === 'Thu phí hàng tháng' && t.thang.startsWith(year)
    );
    const daDong = memberThu.reduce((sum, t) => sum + t.soTien, 0);
    const phaiDong = m.phiHangThang * monthsInYear;
    return { ten: m.ten, daDong, phaiDong, conLai: phaiDong - daDong };
  });

  // Tổng
  const tongThu = txYear.filter(t => t.loai === 'Thu').reduce((s, t) => s + t.soTien, 0);
  const tongChi = txYear.filter(t => t.loai === 'Chi').reduce((s, t) => s + t.soTien, 0);

  // Tồn quỹ: tính từ tất cả giao dịch (không chỉ năm hiện tại)
  const totalThu = allTx.filter(t => t.loai === 'Thu').reduce((s, t) => s + t.soTien, 0);
  const totalChi = allTx.filter(t => t.loai === 'Chi').reduce((s, t) => s + t.soTien, 0);

  return {
    tonQuyDauKy: totalThu - totalChi - tongThu + tongChi,
    tongThu,
    tongChi,
    tonQuyCuoiKy: totalThu - totalChi,
    thuChiTheoThang,
    coCauChi,
    tinhHinhDongPhi,
  };
}

// ============ FOR CHATBOT CONTEXT ============

export async function getAllDataForChat(): Promise<string> {
  const [transactions, members, categories] = await Promise.all([
    getTransactions(),
    getMembers(),
    getCategories(),
  ]);

  const totalThu = transactions.filter(t => t.loai === 'Thu').reduce((s, t) => s + t.soTien, 0);
  const totalChi = transactions.filter(t => t.loai === 'Chi').reduce((s, t) => s + t.soTien, 0);
  const tonQuy = totalThu - totalChi;

  const memberSummary = members.map(m => {
    const paid = transactions
      .filter(t => t.thanhVien === m.ten && t.loai === 'Thu' && t.danhMuc === 'Thu phí hàng tháng')
      .reduce((s, t) => s + t.soTien, 0);
    return `- ${m.ten}: đã đóng ${paid.toLocaleString('vi-VN')}đ`;
  }).join('\n');

  const recentTx = transactions.slice(0, 20).map(t =>
    `- ${t.ngay} | ${t.loai} | ${t.danhMuc}${t.danhMucCon ? '/' + t.danhMucCon : ''} | ${t.thanhVien || 'Band'} | ${t.soTien.toLocaleString('vi-VN')}đ | ${t.ghiChu}`
  ).join('\n');

  const catList = [...new Set(categories.map(c => `${c.loai}: ${c.ten}${c.danhMucCon ? ' > ' + c.danhMucCon : ''}`))].join('\n');

  return `
## Tồn quỹ hiện tại: ${tonQuy.toLocaleString('vi-VN')}đ
## Tổng thu all-time: ${totalThu.toLocaleString('vi-VN')}đ
## Tổng chi all-time: ${totalChi.toLocaleString('vi-VN')}đ
## Số giao dịch: ${transactions.length}

## Thành viên & tình hình đóng phí:
${memberSummary}

## 20 giao dịch gần nhất:
${recentTx}

## Danh mục:
${catList}

## Thành viên: ${members.map(m => m.ten).join(', ')}
`;
}
