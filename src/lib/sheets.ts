import { google } from "googleapis";

const SPREADSHEET_ID = "1GCT4wku5rfKy7n1XQsnbY4K8xEZ-Vsyyq2TAlw84Zik";
const SHEET_NAME = "Leads";

function getAuth() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2;
}

export interface LeadInfo {
  sessionId: string;
  name?: string;
  phone?: string;
  email?: string;
  mainQuestion?: string;
  interest?: string;
}

export async function appendLead(lead: LeadInfo) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // Get current row count for STT
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`,
    });
    const stt = existing.data.values?.length || 1;

    const now = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            stt,
            now,
            lead.sessionId,
            lead.name || "",
            lead.phone || "",
            lead.email || "",
            lead.mainQuestion || "",
            lead.interest || "",
            "Mới",
          ],
        ],
      },
    });

    console.log(`Lead saved: ${lead.name || "unknown"} (session: ${lead.sessionId})`);
    return true;
  } catch (error) {
    console.error("Failed to save lead:", error);
    return false;
  }
}
