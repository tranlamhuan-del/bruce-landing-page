import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const { sessionId, name, phone, email, mainQuestion, interest } = await req.json();

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

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
            sessionId || "",
            name || "",
            phone || "",
            email || "",
            mainQuestion || "",
            interest || "",
            "Mới",
          ],
        ],
      },
    });

    console.log(`Lead saved: ${name || "unknown"} (session: ${sessionId})`);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Lead save error:", errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
