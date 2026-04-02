"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

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

export default function QuizBai2() {
  return (
    <QuizTemplate
      title="Bài Kiểm Tra — Bài 2"
      subtitle="Prompt Engineering — Từ Cơ Bản Đến Nâng Cao"
      lessonNumber={2}
      questions={questions}
      passScore={7}
      nextLesson="Bài 2B: Context, Context & Context"
      apiEndpoint="/api/quiz-ai-bai-2"
    />
  );
}
