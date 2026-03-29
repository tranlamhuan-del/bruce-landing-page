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

    const answerDetail = Array.from({ length: 10 }, (_, i) => {
      const a = answers[i + 1];
      return `C${i + 1}: ${a !== undefined ? String.fromCharCode(65 + a) : "-"}`;
    }).join(" | ");

    // FormSubmit.co - free, no signup, sends email directly
    await fetch("https://formsubmit.co/ajax/tranlamhuan@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Quiz Bai 1: ${name} - ${score}/10 ${passed ? "DAT" : "CHUA DAT"}`,
        "Ho ten": name,
        Email: email,
        "Diem so": `${score}/10`,
        "Ket qua": passed ? "Dat" : "Chua dat",
        "Thoi gian": now,
        "Chi tiet": answerDetail,
        _template: "table",
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Don't block user
  }
}
