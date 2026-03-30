"use client";

import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Prompt là gì?",
    options: [
      "Phần mềm AI",
      "Câu lệnh / yêu cầu bạn đưa cho AI",
      "Kết quả AI trả về",
      "Tên một loại AI",
    ],
    correct: 1,
    explanation:
      "Prompt là câu lệnh hoặc yêu cầu bạn gửi cho AI. Prompt tốt = kết quả tốt.",
  },
  {
    id: 2,
    question: "4 thành phần cốt lõi của một prompt tốt là gì?",
    options: [
      "Input, Output, Model, API",
      "Task, Context, Examples, Format",
      "Câu hỏi, Trả lời, Kiểm tra, Sửa",
      "Tiếng Anh, Tiếng Việt, Ngắn, Dài",
    ],
    correct: 1,
    explanation:
      "Task (nhiệm vụ) + Context (bối cảnh) + Examples (ví dụ mẫu) + Format (định dạng output).",
  },
  {
    id: 3,
    question:
      'Prompt "Viết email mời họp" thiếu điều gì QUAN TRỌNG NHẤT?',
    options: [
      "Thiếu tiếng Anh",
      "Thiếu context — AI không biết bạn là ai, viết cho ai, họp gì",
      "Thiếu emoji",
      "Quá ngắn — AI không đọc được",
    ],
    correct: 1,
    explanation:
      'Prompt thiếu context khiến AI phải đoán mọi thứ → kết quả chung chung, không dùng được.',
  },
  {
    id: 4,
    question: "Thành phần \"Examples\" trong prompt có tác dụng gì?",
    options: [
      "Giúp AI chạy nhanh hơn",
      "Cho AI xem mẫu để bắt chước tone/style của bạn",
      "Bắt buộc phải có, không có thì AI không trả lời",
      "Giúp AI hiểu tiếng Việt tốt hơn",
    ],
    correct: 1,
    explanation:
      'Cho AI 1-2 mẫu thực tế → AI hiểu bạn muốn output kiểu gì. Giống chỉ nhân viên mới: "email anh thường viết kiểu này nè..."',
  },
  {
    id: 5,
    question: "\"Format\" trong prompt giúp gì?",
    options: [
      "Làm cho prompt đẹp hơn",
      "Chỉ định AI trả lời dạng nào: độ dài, ngôn ngữ, cấu trúc",
      "Tự động sửa lỗi chính tả",
      "Giúp AI nhớ câu hỏi trước",
    ],
    correct: 1,
    explanation:
      "Format = nói cho AI biết bạn muốn nhận output dạng nào: bao nhiêu từ, bullet hay đoạn văn, tiếng gì...",
  },
  {
    id: 6,
    question: "Zero-shot và Few-shot khác nhau thế nào?",
    options: [
      "Zero-shot dùng cho tiếng Anh, Few-shot cho tiếng Việt",
      "Zero-shot hỏi thẳng không cho ví dụ, Few-shot cho 1-3 ví dụ mẫu trước",
      "Zero-shot miễn phí, Few-shot trả phí",
      "Không khác, chỉ là hai tên gọi",
    ],
    correct: 1,
    explanation:
      "Zero-shot = hỏi thẳng, AI tự hiểu. Few-shot = cho AI vài ví dụ mẫu trước → AI hiểu chính xác format/style bạn muốn.",
  },
  {
    id: 7,
    question: "Chain-of-Thought (CoT) là kỹ thuật gì?",
    options: [
      "Nối nhiều AI với nhau",
      "Yêu cầu AI suy nghĩ và trình bày từng bước trước khi đưa kết luận",
      "Gửi nhiều prompt cùng lúc",
      "Dùng AI để kiểm tra AI khác",
    ],
    correct: 1,
    explanation:
      'CoT = "Hãy suy nghĩ từng bước." Khi AI phải giải thích từng bước, nó ít mắc lỗi hơn — giống bắt học sinh trình bày cách làm.',
  },
  {
    id: 8,
    question:
      "Trong ví dụ bài toán kho hàng, thêm \"Hãy tính từng bước\" giúp gì?",
    options: [
      "AI chạy nhanh hơn",
      "AI từ trả lời SAI thành trả lời ĐÚNG nhờ suy luận từng bước",
      "Không có tác dụng gì",
      "AI tự động kiểm tra đáp án trên internet",
    ],
    correct: 1,
    explanation:
      'Chỉ thêm 5 từ "Hãy tính từng bước" → AI tính đúng vì phải suy luận tuần tự, không đoán bừa.',
  },
  {
    id: 9,
    question: "Khi nào nên dùng Multi-step Prompting?",
    options: [
      "Khi muốn AI trả lời nhanh",
      "Khi nhiệm vụ quá lớn/phức tạp để làm trong 1 prompt",
      "Khi AI không hiểu tiếng Việt",
      "Khi muốn tiết kiệm chi phí",
    ],
    correct: 1,
    explanation:
      "Task lớn → chia thành nhiều bước nhỏ, mỗi bước 1 prompt. Kiểm tra từng bước → kết quả cuối chất lượng gấp bội.",
  },
  {
    id: 10,
    question: "Câu nào SAI về Prompt Engineering?",
    options: [
      "Prompt dài + rõ ràng luôn tốt hơn prompt ngắn + mơ hồ",
      "Không cần perfect lần đầu — có thể chỉnh prompt rồi hỏi lại",
      "Prompt phải viết bằng tiếng Anh mới hiệu quả",
      "Nên dùng 2-3 AI cross-check cho việc quan trọng",
    ],
    correct: 2,
    explanation:
      "Tiếng Việt hoàn toàn OK! ChatGPT, Claude, Gemini đều hiểu tiếng Việt rất khá. Prompt tiếng Việt vẫn hiệu quả.",
  },
];

const PASS_SCORE = 7;
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwb1NsQIORoV6ITeBBt2nIXdd58h6N7mtvIXW4DILjXDddr78KQI43NLQ0OJJQlPMOG/exec";

export default function QuizBai2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [saving, setSaving] = useState(false);

  const calcScore = () => questions.filter((q) => answers[q.id] === q.correct).length;
  const score = submitted ? calcScore() : 0;
  const passed = score >= PASS_SCORE;

  const handleSubmit = async () => {
    const s = calcScore();
    const p = s >= PASS_SCORE;
    setSubmitted(true);
    setSaving(true);

    try {
      await fetch("/api/quiz-ai-bai-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, score: s, passed: p, answers }),
      });
    } catch {
      // silent fail
    }
    setSaving(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #e0ecff 100%)", color: "#1a1a2e" }}>
        <div className="max-w-lg w-full p-8 text-center" style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(100,60,180,0.12)" }}>
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#5b21b6" }}>
            Bài Kiểm Tra — Bài 2
          </h1>
          <p className="mb-1" style={{ color: "#555" }}>
            Prompt Engineering — Từ Cơ Bản Đến Nâng Cao
          </p>
          <p className="text-sm mb-6" style={{ color: "#999" }}>
            10 câu trắc nghiệm • Đạt: {PASS_SCORE}/10 • Không giới hạn thời gian
          </p>
          <input
            type="text"
            placeholder="Nhập tên của bạn..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 mb-3 text-center text-lg transition"
            style={{ border: "2px solid #d8b4fe", borderRadius: 12, outline: "none", color: "#1a1a2e", background: "#fff" }}
          />
          <input
            type="email"
            placeholder="Email của bạn..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 text-center text-lg transition"
            style={{ border: "2px solid #d8b4fe", borderRadius: 12, outline: "none", color: "#1a1a2e", background: "#fff" }}
          />
          <button
            onClick={() => name.trim() && email.trim() && setStarted(true)}
            disabled={!name.trim() || !email.trim()}
            className="w-full py-3 font-bold transition text-lg"
            style={{ background: name.trim() && email.trim() ? "#7c3aed" : "#ccc", color: "#fff", borderRadius: 12, cursor: name.trim() && email.trim() ? "pointer" : "not-allowed" }}
          >
            Bắt Đầu Làm Bài
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #e0ecff 100%)", color: "#1a1a2e" }}>
        <div className="max-w-lg w-full p-8 text-center" style={{ background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(100,60,180,0.12)" }}>
          {passed ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#16a34a" }}>
                Xuất sắc, {name}!
              </h1>
              <div className="text-5xl font-bold my-4" style={{ color: "#16a34a" }}>
                {score}/10
              </div>
              <p className="mb-4" style={{ color: "#555" }}>
                Bạn đã vượt qua! Sẵn sàng cho Bài 3: Super Prompt + Agentic AI! 🚀
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#ea580c" }}>
                Chưa đạt, {name}!
              </h1>
              <div className="text-5xl font-bold my-4" style={{ color: "#ea580c" }}>
                {score}/10
              </div>
              <p className="mb-2" style={{ color: "#555" }}>
                Cần đạt {PASS_SCORE}/10 để mở khóa Bài 3.
              </p>
              <p className="mb-6" style={{ color: "#555" }}>
                Vui lòng xem lại nội dung bài học rồi quay lại làm bài kiểm tra sau nhé!
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Quiz form
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #e0ecff 100%)", color: "#1a1a2e" }}>
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="p-4 mb-6 sticky top-4 z-10" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold" style={{ color: "#5b21b6" }}>
              {name} — Bài Kiểm Tra Bài 2
            </span>
            <span className="text-sm" style={{ color: "#888" }}>
              {answeredCount}/10 câu
            </span>
          </div>
          <div className="w-full h-2" style={{ background: "#e5e7eb", borderRadius: 999 }}>
            <div
              className="h-2 transition-all duration-300"
              style={{ width: `${(answeredCount / 10) * 100}%`, background: "#7c3aed", borderRadius: 999 }}
            />
          </div>
        </div>

        {/* Questions */}
        {questions.map((q) => {
          const answered = answers[q.id] !== undefined;
          const isCorrect = answered && answers[q.id] === q.correct;

          return (
            <div
              key={q.id}
              className="p-5 mb-4 transition"
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: `2px solid ${answered ? (isCorrect ? "#86efac" : "#fca5a5") : "transparent"}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold" style={{ color: "#1f2937" }}>
                  <span
                    className="inline-block text-center text-sm mr-2"
                    style={{ background: "#ede9fe", color: "#6d28d9", borderRadius: 999, width: 28, height: 28, lineHeight: "28px" }}
                  >
                    {q.id}
                  </span>
                  {q.question}
                </p>
                {answered && (
                  <span className="text-lg ml-2 flex-shrink-0">{isCorrect ? "✅" : "❌"}</span>
                )}
              </div>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === i;
                  let optStyle: React.CSSProperties = { background: "#f9fafb", border: "2px solid transparent" };

                  if (answered) {
                    if (isSelected && isCorrect) {
                      optStyle = { background: "#dcfce7", border: "2px solid #86efac" };
                    } else if (isSelected && !isCorrect) {
                      optStyle = { background: "#fee2e2", border: "2px solid #fca5a5" };
                    } else {
                      optStyle = { background: "#f9fafb", border: "2px solid transparent", opacity: 0.5 };
                    }
                  } else if (isSelected) {
                    optStyle = { background: "#ede9fe", border: "2px solid #a78bfa" };
                  }

                  return (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 transition"
                      style={{ borderRadius: 10, cursor: answered ? "default" : "pointer", ...optStyle }}
                    >
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        checked={isSelected}
                        disabled={answered}
                        onChange={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: i }))
                        }
                        className="w-4 h-4"
                        style={{ accentColor: "#7c3aed" }}
                      />
                      <span className="text-sm" style={{ color: "#374151" }}>
                        <strong className="mr-1" style={{ color: "#7c3aed" }}>
                          {String.fromCharCode(65 + i)}.
                        </strong>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Submit */}
        <div className="text-center pb-8">
          <button
            onClick={() => answeredCount === 10 && handleSubmit()}
            disabled={answeredCount < 10}
            className="px-8 py-4 font-bold transition text-lg"
            style={{
              background: answeredCount < 10 ? "#ccc" : "#7c3aed",
              color: "#fff",
              borderRadius: 12,
              cursor: answeredCount < 10 ? "not-allowed" : "pointer",
              boxShadow: answeredCount < 10 ? "none" : "0 4px 16px rgba(124,58,237,0.3)",
            }}
          >
            {answeredCount < 10
              ? `Còn ${10 - answeredCount} câu chưa trả lời`
              : "Nộp Bài"}
          </button>
        </div>
      </div>
    </div>
  );
}
