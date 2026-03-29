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
    question: "AI (Artificial Intelligence) là gì?",
    options: [
      "Robot có hình dạng giống người",
      "Hệ thống có khả năng thực hiện nhiệm vụ thường cần trí thông minh của con người",
      "Phần mềm chat tự động",
      "Máy tính có thể tự suy nghĩ như con người",
    ],
    correct: 1,
    explanation:
      "AI là bất kỳ hệ thống nào có khả năng thực hiện nhiệm vụ thường cần \"trí thông minh\" của con người — không nhất thiết phải là robot hay biết suy nghĩ.",
  },
  {
    id: 2,
    question:
      "Bộ lọc spam email đời đầu (dùng luật IF... THEN...) thuộc loại AI nào?",
    options: [
      "Machine Learning",
      "Deep Learning",
      "Rule-Based AI",
      "Generative AI",
    ],
    correct: 2,
    explanation:
      "Bộ lọc spam đời đầu hoạt động theo luật cứng (IF có từ \"khuyến mãi\" THEN spam) — đây là Rule-Based AI, không tự học từ dữ liệu.",
  },
  {
    id: 3,
    question: "Machine Learning cần gì QUAN TRỌNG NHẤT để hoạt động?",
    options: [
      "Máy tính siêu nhanh",
      "Lập trình viên giỏi",
      "Rất nhiều dữ liệu (data)",
      "Kết nối internet",
    ],
    correct: 2,
    explanation:
      "ML tự học từ dữ liệu. Càng nhiều data = càng chính xác. GPT-4 được train trên hàng tỷ trang web, sách, code...",
  },
  {
    id: 4,
    question: "Hành động nào sau đây là ví dụ của Generative AI?",
    options: [
      "Lọc email spam",
      "Nhận diện khuôn mặt trên điện thoại",
      "Phát hiện giao dịch gian lận ở ngân hàng",
      "Viết một bài thơ hoàn toàn mới từ yêu cầu của bạn",
    ],
    correct: 3,
    explanation:
      "Generative AI TẠO RA nội dung mới (thơ, ảnh, code...). Các đáp án khác là Discriminative — phân loại/nhận diện, không tạo mới.",
  },
  {
    id: 5,
    question: 'Trong \"Deep Learning\", chữ \"Deep\" có nghĩa là gì?',
    options: [
      "AI hiểu biết sâu sắc",
      "Mạng neural có nhiều tầng (layers)",
      "AI có thể suy nghĩ sâu xa",
      "Dữ liệu được phân tích rất kỹ",
    ],
    correct: 1,
    explanation:
      '"Deep" = nhiều tầng neural network, không phải "sâu xa" hay "thông thái". Càng nhiều tầng → càng nhận được pattern phức tạp.',
  },
  {
    id: 6,
    question: "Sắp xếp nào đúng từ LỚN đến NHỎ?",
    options: [
      "ML > AI > Deep Learning > GenAI",
      "AI > Machine Learning > Deep Learning > Generative AI",
      "Deep Learning > AI > ML > GenAI",
      "GenAI > AI > ML > Deep Learning",
    ],
    correct: 1,
    explanation:
      "AI là khái niệm rộng nhất. ML là nhánh con của AI. Deep Learning là nhánh con của ML. GenAI là nhánh con của DL.",
  },
  {
    id: 7,
    question: "LLM (Large Language Model) hoạt động bằng cách nào?",
    options: [
      "Tra cứu đáp án trong cơ sở dữ liệu",
      "Dự đoán từ tiếp theo có xác suất cao nhất",
      "Hiểu và suy nghĩ như con người",
      "Copy câu trả lời từ internet",
    ],
    correct: 1,
    explanation:
      'LLM = máy dự đoán xác suất. Với "The dog is ___", nó tính: playing (50%), eating (30%)... rồi chọn xác suất cao nhất. Không "hiểu" và không "tra cứu".',
  },
  {
    id: 8,
    question: "ChatGPT và GPT-4 khác nhau thế nào?",
    options: [
      "Không khác, chỉ là hai tên gọi",
      "ChatGPT là phiên bản cũ, GPT-4 là phiên bản mới",
      "ChatGPT là sản phẩm (app), GPT-4 là model (bộ não bên trong)",
      "GPT-4 chỉ dùng cho lập trình viên",
    ],
    correct: 2,
    explanation:
      'ChatGPT là SẢN PHẨM (app) của OpenAI. GPT-4 là MODEL (bộ não) chạy bên trong. Giống iPhone (sản phẩm) chạy chip A17 (bộ xử lý).',
  },
  {
    id: 9,
    question: 'Tại sao LLM hay "ảo giác" (hallucination)?',
    options: [
      "Vì internet có nhiều thông tin sai",
      "Vì AI cố tình nói dối",
      "Vì AI dự đoán từ theo xác suất, không kiểm chứng sự thật",
      "Vì AI chưa được cập nhật thông tin mới",
    ],
    correct: 2,
    explanation:
      'LLM chọn từ "có vẻ đúng nhất" theo xác suất — không có cơ chế kiểm chứng sự thật. Giống ông Tiến Sĩ IQ 160 nhưng EQ 0: trả lời tự tin kể cả khi sai.',
  },
  {
    id: 10,
    question: "Tại sao Prompt (cách ra lệnh cho AI) quan trọng?",
    options: [
      "Vì AI chỉ hiểu tiếng Anh nên cần viết đúng",
      "Vì prompt hay sẽ giúp AI chạy nhanh hơn",
      "Vì AI cần hướng dẫn rõ ràng, cụ thể để cho kết quả tốt — giống cách giao việc cho người",
      "Vì mỗi prompt tốn tiền nên phải viết chuẩn",
    ],
    correct: 2,
    explanation:
      'AI giỏi đến mấy mà prompt dở → kết quả dở. Có ông Tiến Sĩ IQ 160 làm trợ lý, nhưng bạn chỉ nói "làm cái gì đó đi" → ổng sẽ làm bừa!',
  },
];

const PASS_SCORE = 7;

export default function QuizBai1() {
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
      await fetch("/api/quiz-result", {
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
            Bài Kiểm Tra — Bài 1
          </h1>
          <p className="mb-1" style={{ color: "#555" }}>
            Giải Mã Các Khái Niệm Về AI Cho Dân Non-Tech
          </p>
          <p className="text-sm mb-6" style={{ color: "#999" }}>
            10 câu trắc nghiệm • Đạt: {PASS_SCORE}/10 • Không giới hạn thời
            gian
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
      <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #f0e6ff 0%, #e0ecff 100%)", color: "#1a1a2e" }}>
        <div className="max-w-2xl mx-auto">
          {/* Result card */}
          <div
            className="p-8 text-center mb-8"
            style={{
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(100,60,180,0.12)",
              background: passed ? "#f0fdf4" : "#fff7ed",
              border: `2px solid ${passed ? "#86efac" : "#fdba74"}`,
            }}
          >
            <div className="text-6xl mb-4">{passed ? "🎉" : "💪"}</div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#1a1a2e" }}>
              {passed ? `Xuất sắc, ${name}!` : `Cố lên, ${name}!`}
            </h1>
            <div className="text-5xl font-bold my-4" style={{ color: passed ? "#16a34a" : "#ea580c" }}>
              {score}/10
            </div>
            <p className="mb-4" style={{ color: "#555" }}>
              {passed
                ? "Bạn đã vượt qua! Sẵn sàng cho Bài 2: Prompt Engineering! 🚀"
                : `Cần đạt ${PASS_SCORE}/10 để mở khóa Bài 2. Xem lại đáp án bên dưới rồi thử lại nhé!`}
            </p>
            {!passed && (
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="px-6 py-3 font-bold transition"
                style={{ background: "#7c3aed", color: "#fff", borderRadius: 12, cursor: "pointer" }}
              >
                Làm Lại
              </button>
            )}
          </div>

          {/* Review answers */}
          <h2 className="text-xl font-bold mb-4" style={{ color: "#374151" }}>
            Đáp án chi tiết:
          </h2>
          {questions.map((q) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correct;
            return (
              <div
                key={q.id}
                className="p-5 mb-4"
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderLeft: `4px solid ${isCorrect ? "#22c55e" : "#f87171"}`,
                }}
              >
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-lg">{isCorrect ? "✅" : "❌"}</span>
                  <p className="font-semibold" style={{ color: "#1f2937" }}>
                    Câu {q.id}: {q.question}
                  </p>
                </div>
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className="py-1.5 px-3 mb-1 text-sm"
                    style={{
                      borderRadius: 8,
                      ...(i === q.correct
                        ? { background: "#dcfce7", color: "#166534", fontWeight: 600 }
                        : i === userAnswer && !isCorrect
                          ? { background: "#fee2e2", color: "#b91c1c", textDecoration: "line-through" }
                          : { color: "#6b7280" }),
                    }}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
                <div className="mt-3 text-sm p-3" style={{ color: "#1d4ed8", background: "#eff6ff", borderRadius: 8 }}>
                  💡 {q.explanation}
                </div>
              </div>
            );
          })}
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
              {name} — Bài Kiểm Tra Bài 1
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
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-5 mb-4 transition"
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: `2px solid ${answers[q.id] !== undefined ? "#c4b5fd" : "transparent"}`,
            }}
          >
            <p className="font-semibold mb-3" style={{ color: "#1f2937" }}>
              <span
                className="inline-block text-center text-sm mr-2"
                style={{ background: "#ede9fe", color: "#6d28d9", borderRadius: 999, width: 28, height: 28, lineHeight: "28px" }}
              >
                {q.id}
              </span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 p-3 cursor-pointer transition"
                  style={{
                    borderRadius: 10,
                    ...(answers[q.id] === i
                      ? { background: "#ede9fe", border: "2px solid #a78bfa" }
                      : { background: "#f9fafb", border: "2px solid transparent" }),
                  }}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    checked={answers[q.id] === i}
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
              ))}
            </div>
          </div>
        ))}

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
