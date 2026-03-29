import { NextResponse } from "next/server";

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

    // FormSubmit.co - sends email to tranlamhuan@gmail.com
    await fetch("https://formsubmit.co/ajax/tranlamhuan@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://tranlamhuan.vn",
        Origin: "https://tranlamhuan.vn",
      },
      body: JSON.stringify({
        _subject: `Quiz Bai 1: ${name} - ${score}/10 ${passed ? "DAT" : "CHUA DAT"}`,
        "Ho ten": name,
        Email: email,
        "Diem so": `${score}/10`,
        "Ket qua": passed ? "Dat" : "Chua dat",
        "Thoi gian": now,
        _template: "table",
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
