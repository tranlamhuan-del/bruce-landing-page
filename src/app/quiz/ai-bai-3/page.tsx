"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "Super Prompt là gì?",
    options: [
      "Prompt viết bằng tiếng Anh cho chính xác hơn",
      "Gom nhiều bước (multi-step) vào 1 prompt duy nhất có cấu trúc",
      "Prompt dài hơn 1000 từ",
      "Prompt được AI tự động tạo ra",
    ],
    correct: 1,
    explanation:
      "Super Prompt = gom nhiều bước vào 1 prompt có cấu trúc (Role + Steps + Rules + Format). Thuật ngữ của Bruce — không phải thuật ngữ chuẩn ngành.",
  },
  {
    id: 2,
    question: "Cấu trúc Super Prompt gồm những thành phần nào?",
    options: [
      "Input, Output, Model, API",
      "Role, Context, Steps, Rules, Format",
      "Câu hỏi, Trả lời, Kiểm tra",
      "Task, Context, Examples, Format",
    ],
    correct: 1,
    explanation:
      "Super Prompt có 5 phần: Role (vai trò) + Context (bối cảnh) + Steps (các bước) + Rules (ràng buộc) + Format (định dạng output).",
  },
  {
    id: 3,
    question: "Super Prompt khác Multi-step Prompting ở điểm nào?",
    options: [
      "Super Prompt dùng tiếng Anh, Multi-step dùng tiếng Việt",
      "Multi-step hỏi từng bước riêng lẻ, Super Prompt gom tất cả vào 1 prompt",
      "Super Prompt chỉ dùng cho ChatGPT, Multi-step dùng cho Claude",
      "Không khác, chỉ là hai tên gọi",
    ],
    correct: 1,
    explanation:
      "Multi-step: hỏi 3 lần, chờ 3 lần, copy-paste 3 lần. Super Prompt: paste 1 lần, AI tự chạy tuần tự từ đầu đến cuối. Cùng kết quả nhưng tiết kiệm thời gian + tái sử dụng được.",
  },
  {
    id: 4,
    question: "Khi nào KHÔNG nên dùng Super Prompt?",
    options: [
      "Khi task lặp đi lặp lại nhiều lần",
      "Khi cần chia sẻ prompt cho team dùng chung",
      "Khi cần kiểm tra kết quả giữa chừng trước khi làm bước tiếp",
      "Khi task có nhiều bước rõ ràng",
    ],
    correct: 2,
    explanation:
      "Nếu output bước 1 nhạy cảm và cần bạn kiểm tra trước khi AI làm tiếp, thì Multi-step an toàn hơn. Super Prompt chạy 1 mạch — bạn không can thiệp giữa chừng được.",
  },
  {
    id: 5,
    question: "Meta Prompt là gì?",
    options: [
      "Prompt viết bằng ngôn ngữ lập trình",
      "Prompt dùng để tạo ra prompt — AI hỏi lại bạn rồi tạo prompt hoàn chỉnh",
      "Prompt được mã hóa để bảo mật",
      "Prompt dài nhất có thể viết",
    ],
    correct: 1,
    explanation:
      "Meta Prompt = bạn mô tả yêu cầu thô → AI hỏi 3-5 câu để hiểu rõ → AI tạo prompt hoàn chỉnh cho bạn copy & dùng. Giống đến bác sĩ: nói triệu chứng → bác sĩ hỏi thêm → kê đơn chuẩn.",
  },
  {
    id: 6,
    question: "Câu nào đúng về Meta Prompt?",
    options: [
      "Bắt buộc phải dùng Meta Prompt mới có prompt tốt",
      "Meta Prompt giống \"bánh xe phụ\" — tốt để học, nhưng đích là tự viết được",
      "Meta Prompt chỉ hoạt động trên ChatGPT",
      "Meta Prompt thay thế hoàn toàn việc học Prompt Engineering",
    ],
    correct: 1,
    explanation:
      "Meta Prompt hữu ích cho người mới — giúp học cách viết prompt tốt. Sau 1-2 tuần, bạn sẽ tự viết được mà không cần AI hỏi lại nữa. Bánh xe phụ — học xong thì tháo ra!",
  },
  {
    id: 7,
    question: "Chatbot và AI Agent khác nhau cốt lõi ở điểm nào?",
    options: [
      "Chatbot miễn phí, Agent trả phí",
      "Chatbot xử lý 1 turn rồi dừng, Agent loop cho đến khi đạt mục tiêu",
      "Chatbot dùng tiếng Việt, Agent dùng tiếng Anh",
      "Chatbot là phần mềm cũ, Agent là phần mềm mới",
    ],
    correct: 1,
    explanation:
      "Chatbot: User hỏi → AI trả lời → Kết thúc. AI Agent: Nhận goal → Observe → Plan → Act → lặp lại cho đến khi xong. Chatbot trả lời, Agent hành động.",
  },
  {
    id: 8,
    question:
      "Ví dụ: Claude Code nhận yêu cầu \"tạo website\" rồi tự viết code, tạo file, chạy thử, sửa bug, deploy. Đây là gì?",
    options: [
      "Chatbot — vì nó chỉ trả lời câu hỏi",
      "AI Agent — vì nó tự dùng tools và loop cho đến khi xong",
      "Super Prompt — vì nó chạy nhiều bước",
      "Meta Prompt — vì nó tự tạo prompt",
    ],
    correct: 1,
    explanation:
      "Claude Code là AI Agent: nhận goal → tự observe (đọc code) → plan (chọn framework) → act (viết code, deploy) → loop cho đến khi hoàn thành. Ví dụ thực tế: website tranlamhuan.vn được tạo bằng cách này.",
  },
  {
    id: 9,
    question:
      "AI Agent có thể dùng những tools nào?",
    options: [
      "Chỉ trả lời text, không dùng tool nào",
      "Chỉ dùng được web search",
      "Search, API, code execution, file system, email...",
      "Chỉ dùng tools khi user bật từng tool một",
    ],
    correct: 2,
    explanation:
      "AI Agent chủ động gọi tools: web search, API, chạy code, đọc/ghi file, gửi email... Đây là điểm khác biệt lớn nhất với chatbot — chatbot gần như không dùng tools.",
  },
  {
    id: 10,
    question: "Câu nào SAI về Chatbot và AI Agent?",
    options: [
      "Chatbot: user dẫn dắt flow hoàn toàn",
      "AI Agent: AI tự chọn bước tiếp theo trong phạm vi task",
      "AI Agent hoàn toàn tự quyết, không cần người giám sát",
      "Chatbot không có bộ nhớ dài hạn giữa các phiên",
    ],
    correct: 2,
    explanation:
      "AI Agent tự chọn bước tiếp theo nhưng VẪN hoạt động trong phạm vi task được giao, và vẫn cần người giám sát kết quả. Agent không phải AI tự trị hoàn toàn — nó giống nhân viên có năng lực, vẫn cần sếp review.",
  },
];

export default function QuizBai3() {
  return (
    <QuizTemplate
      title="Bài Kiểm Tra — Bài 3"
      subtitle="Super Prompt, Meta Prompt & AI Agent"
      lessonNumber={3}
      questions={questions}
      passScore={7}
      nextLesson="Bài 4: Agentic AI & Thực Hành"
      apiEndpoint="/api/quiz-ai-bai-3"
    />
  );
}
