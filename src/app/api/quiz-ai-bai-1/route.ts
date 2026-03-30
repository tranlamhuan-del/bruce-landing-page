import { NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxrUBPFhhhCboMKS6JAjrCSFAI2c6Tbry1VeTmEBxoXAcUkfv-YJSZVXnpqj7AcfYy6/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, score, passed } = body;

    if (!name || !email || score === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const now = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    // Save to Google Sheet via Apps Script
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        score,
        passed: passed ? "Dat" : "Chua dat",
        time: now,
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
