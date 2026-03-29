import { google } from "googleapis";
import { NextResponse } from "next/server";

const SPREADSHEET_ID = "1Nlh_bNRqCbdgNA4xNdZEObiQUHjJ1SGRwS66xWCTUPI";
const SHEET_NAME = "Sheet1";

function getAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score, passed, answers } = body;

    if (!name || !email || score === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const row = [
      name,
      email,
      score,
      passed ? "Dat" : "Chua dat",
      now,
      ...Array.from({ length: 10 }, (_, i) => {
        const a = answers[i + 1];
        return a !== undefined ? String.fromCharCode(65 + a) : "";
      }),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:O`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz result save error:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
