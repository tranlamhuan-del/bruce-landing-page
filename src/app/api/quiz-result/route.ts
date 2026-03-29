import { NextResponse } from "next/server";

const SPREADSHEET_ID = "1Nlh_bNRqCbdgNA4xNdZEObiQUHjJ1SGRwS66xWCTUPI";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

async function getAccessToken() {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error("Token refresh failed: " + JSON.stringify(data));
  }
  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score, passed, answers } = body;

    if (!name || !email || score === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

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

    const accessToken = await getAccessToken();

    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:O:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      }
    );

    if (!sheetsRes.ok) {
      const err = await sheetsRes.text();
      throw new Error("Sheets API error: " + err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz result save error:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
