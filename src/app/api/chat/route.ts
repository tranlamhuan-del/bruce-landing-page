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

const EXTRACT_PROMPT = `Analyze the conversation below and extract any contact/lead information the visitor shared. Return ONLY a JSON object (no markdown, no code block) with these fields:
- name: visitor's name (null if not shared)
- phone: phone number (null if not shared)
- email: email address (null if not shared)
- mainQuestion: the main question or need they expressed (1 sentence, null if unclear)
- interest: their area of interest like "tư vấn tài chính", "quản trị", "đầu tư", etc. (null if unclear)
- hasLeadInfo: true if name OR phone OR email was shared, false otherwise

Conversation:
`;

async function extractAndSaveLead(
  messages: { role: string; content: string }[],
  sessionId: string,
  apiKey: string
) {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const conversationText = messages
      .map((m) => `${m.role === "user" ? "Khách" : "Bot"}: ${m.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: EXTRACT_PROMPT + conversationText }] }],
    });

    const text = response.text?.trim() || "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    const lead = JSON.parse(cleaned);
    console.log("Lead extracted:", JSON.stringify(lead));

    if (lead.hasLeadInfo) {
      // Call the separate lead-save API
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      await fetch(`${baseUrl}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, sessionId }),
      });
    }
  } catch (err) {
    console.error("Lead extraction failed:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();
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

    // Extract lead info in background (don't block response)
    if (sessionId && messages.length >= 3) {
      extractAndSaveLead(messages, sessionId, apiKey);
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Chat API error:", errMsg);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi. Vui lòng thử lại.", debug: errMsg },
      { status: 500 }
    );
  }
}
