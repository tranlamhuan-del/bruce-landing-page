import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYSTEM_PROMPT_PATH = path.join(process.cwd(), "public", "chatbot_data.txt");

let cachedSystemPrompt: string | null = null;

function getSystemPrompt(): string {
  if (!cachedSystemPrompt) {
    cachedSystemPrompt = fs.readFileSync(SYSTEM_PROMPT_PATH, "utf-8");
  }
  return cachedSystemPrompt;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = getSystemPrompt();

    const contents = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents,
    });

    const text = response.text || "Xin lỗi, tôi không thể trả lời lúc này.";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
