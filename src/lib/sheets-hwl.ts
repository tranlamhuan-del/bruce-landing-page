import { google, type sheets_v4 } from 'googleapis';
import { GOOGLE_CONFIG } from './google-config';

const SHEET_ID = process.env.HWL_SHEET_ID || '';

let sheetsClient: sheets_v4.Sheets | null = null;

function getSheets(): sheets_v4.Sheets {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.OAuth2(
    GOOGLE_CONFIG.clientId,
    GOOGLE_CONFIG.clientSecret
  );
  auth.setCredentials({ refresh_token: GOOGLE_CONFIG.refreshToken });

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
    range: `${tab}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });
}

// ============ AUTH (tab: Users) ============
// Columns: username | password | hoTen | vaiTro

export interface HwlUserRecord {
  username: string;
  password: string;
  hoTen: string;
  vaiTro: 'admin' | 'user';
}

export async function getUserByUsername(username: string): Promise<HwlUserRecord | null> {
  const rows = await readTab('Users');
  if (rows.length <= 1) return null;
  const row = rows.slice(1).find(r => r[0] === username);
  if (!row) return null;
  return {
    username: row[0],
    password: row[1],
    hoTen: row[2],
    vaiTro: (row[3] as HwlUserRecord['vaiTro']) || 'user',
  };
}

// ============ JOBS (tab: Jobs) ============
// Columns: id | username | timestamp | containerType | pol | pod | carrier | status | resultSummary

export interface HwlJob {
  id: number;
  username: string;
  timestamp: string;
  containerType: string;
  pol: string;
  pod: string;
  carrier: string;
  status: 'pending' | 'success' | 'error';
  resultSummary: string;
}

export async function logJob(job: Omit<HwlJob, 'id'>): Promise<number> {
  const rows = await readTab('Jobs');
  const id = rows.length <= 1 ? 1 : Math.max(...rows.slice(1).map(r => parseInt(r[0]) || 0)) + 1;
  await appendRows('Jobs', [[
    id,
    job.username,
    job.timestamp,
    job.containerType,
    job.pol,
    job.pod,
    job.carrier,
    job.status,
    job.resultSummary,
  ]]);
  return id;
}

export async function getJobs(username?: string): Promise<HwlJob[]> {
  const rows = await readTab('Jobs');
  if (rows.length <= 1) return [];

  let jobs = rows.slice(1).filter(r => r[0]).map(r => ({
    id: parseInt(r[0]) || 0,
    username: r[1] || '',
    timestamp: r[2] || '',
    containerType: r[3] || '',
    pol: r[4] || '',
    pod: r[5] || '',
    carrier: r[6] || '',
    status: (r[7] as HwlJob['status']) || 'pending',
    resultSummary: r[8] || '',
  }));

  if (username) {
    jobs = jobs.filter(j => j.username === username);
  }

  return jobs.sort((a, b) => b.id - a.id);
}
