"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "Prompt là gì?",
    questionEn: "What is a prompt?",
    options: [
      "Phần mềm AI",
      "Câu lệnh / yêu cầu bạn đưa cho AI",
      "Kết quả AI trả về",
      "Tên một loại AI",
    ],
    optionsEn: [
      "AI software",
      "An instruction / request you give to AI",
      "The result AI returns",
      "A type of AI",
    ],
    correct: 1,
    explanation:
      "Prompt là câu lệnh hoặc yêu cầu bạn gửi cho AI. Prompt tốt = kết quả tốt.",
    explanationEn:
      "A prompt is the instruction or request you send to AI. Good prompt = good results.",
  },
  {
    id: 2,
    question: "4 thành phần cốt lõi của một prompt tốt là gì?",
    questionEn: "What are the 4 core components of a good prompt?",
    options: [
      "Input, Output, Model, API",
      "Task, Context, Examples, Format",
      "Câu hỏi, Trả lời, Kiểm tra, Sửa",
      "Tiếng Anh, Tiếng Việt, Ngắn, Dài",
    ],
    optionsEn: [
      "Input, Output, Model, API",
      "Task, Context, Examples, Format",
      "Question, Answer, Check, Fix",
      "English, Vietnamese, Short, Long",
    ],
    correct: 1,
    explanation:
      "Task (nhiệm vụ) + Context (bối cảnh) + Examples (ví dụ mẫu) + Format (định dạng output).",
    explanationEn:
      "Task + Context + Examples + Format (output format).",
  },
  {
    id: 3,
    question:
      'Prompt "Viết email mời họp" thiếu điều gì QUAN TRỌNG NHẤT?',
    questionEn:
      'The prompt "Write a meeting invitation email" is missing what MOST IMPORTANT element?',
    options: [
      "Thiếu tiếng Anh",
      "Thiếu context — AI không biết bạn là ai, viết cho ai, họp gì",
      "Thiếu emoji",
      "Quá ngắn — AI không đọc được",
    ],
    optionsEn: [
      "Missing English",
      "Missing context — AI doesn't know who you are, who it's for, or what the meeting is about",
      "Missing emojis",
      "Too short — AI can't read it",
    ],
    correct: 1,
    explanation:
      'Prompt thiếu context khiến AI phải đoán mọi thứ → kết quả chung chung, không dùng được.',
    explanationEn:
      "A prompt without context forces AI to guess everything, resulting in generic, unusable output.",
  },
  {
    id: 4,
    question: "Thành phần \"Examples\" trong prompt có tác dụng gì?",
    questionEn: "What is the purpose of \"Examples\" in a prompt?",
    options: [
      "Giúp AI chạy nhanh hơn",
      "Cho AI xem mẫu để bắt chước tone/style của bạn",
      "Bắt buộc phải có, không có thì AI không trả lời",
      "Giúp AI hiểu tiếng Việt tốt hơn",
    ],
    optionsEn: [
      "Helps AI run faster",
      "Shows AI samples to mimic your tone/style",
      "Mandatory — AI won't respond without them",
      "Helps AI understand Vietnamese better",
    ],
    correct: 1,
    explanation:
      'Cho AI 1-2 mẫu thực tế → AI hiểu bạn muốn output kiểu gì. Giống chỉ nhân viên mới: "email anh thường viết kiểu này nè..."',
    explanationEn:
      "Give AI 1-2 real examples and it understands what kind of output you want. Like showing a new employee: \"this is how I usually write emails...\"",
  },
  {
    id: 5,
    question: "\"Format\" trong prompt giúp gì?",
    questionEn: "What does \"Format\" in a prompt help with?",
    options: [
      "Làm cho prompt đẹp hơn",
      "Chỉ định AI trả lời dạng nào: độ dài, ngôn ngữ, cấu trúc",
      "Tự động sửa lỗi chính tả",
      "Giúp AI nhớ câu hỏi trước",
    ],
    optionsEn: [
      "Makes the prompt look nicer",
      "Specifies how AI should respond: length, language, structure",
      "Automatically fixes spelling errors",
      "Helps AI remember previous questions",
    ],
    correct: 1,
    explanation:
      "Format = nói cho AI biết bạn muốn nhận output dạng nào: bao nhiêu từ, bullet hay đoạn văn, tiếng gì...",
    explanationEn:
      "Format = telling AI what kind of output you want: word count, bullets or paragraphs, which language...",
  },
  {
    id: 6,
    question: "Zero-shot và Few-shot khác nhau thế nào?",
    questionEn: "What is the difference between zero-shot and few-shot?",
    options: [
      "Zero-shot dùng cho tiếng Anh, Few-shot cho tiếng Việt",
      "Zero-shot hỏi thẳng không cho ví dụ, Few-shot cho 1-3 ví dụ mẫu trước",
      "Zero-shot miễn phí, Few-shot trả phí",
      "Không khác, chỉ là hai tên gọi",
    ],
    optionsEn: [
      "Zero-shot is for English, few-shot is for Vietnamese",
      "Zero-shot asks directly without examples, few-shot provides 1-3 examples first",
      "Zero-shot is free, few-shot costs money",
      "No difference, just two names for the same thing",
    ],
    correct: 1,
    explanation:
      "Zero-shot = hỏi thẳng, AI tự hiểu. Few-shot = cho AI vài ví dụ mẫu trước → AI hiểu chính xác format/style bạn muốn.",
    explanationEn:
      "Zero-shot = ask directly, AI figures it out. Few-shot = give AI a few examples first so it understands exactly the format/style you want.",
  },
  {
    id: 7,
    question: "Chain-of-Thought (CoT) là kỹ thuật gì?",
    questionEn: "What is the Chain-of-Thought (CoT) technique?",
    options: [
      "Nối nhiều AI với nhau",
      "Yêu cầu AI suy nghĩ và trình bày từng bước trước khi đưa kết luận",
      "Gửi nhiều prompt cùng lúc",
      "Dùng AI để kiểm tra AI khác",
    ],
    optionsEn: [
      "Connecting multiple AIs together",
      "Asking AI to think and present step-by-step before giving a conclusion",
      "Sending multiple prompts at the same time",
      "Using one AI to check another AI",
    ],
    correct: 1,
    explanation:
      'CoT = "Hãy suy nghĩ từng bước." Khi AI phải giải thích từng bước, nó ít mắc lỗi hơn — giống bắt học sinh trình bày cách làm.',
    explanationEn:
      "CoT = \"Think step by step.\" When AI has to explain each step, it makes fewer mistakes — like requiring a student to show their work.",
  },
  {
    id: 8,
    question:
      "Trong ví dụ bài toán kho hàng, thêm \"Hãy tính từng bước\" giúp gì?",
    questionEn:
      "In the warehouse math problem example, what does adding \"Calculate step by step\" help with?",
    options: [
      "AI chạy nhanh hơn",
      "AI từ trả lời SAI thành trả lời ĐÚNG nhờ suy luận từng bước",
      "Không có tác dụng gì",
      "AI tự động kiểm tra đáp án trên internet",
    ],
    optionsEn: [
      "AI runs faster",
      "AI goes from WRONG to CORRECT answers by reasoning step by step",
      "No effect at all",
      "AI automatically checks answers on the internet",
    ],
    correct: 1,
    explanation:
      'Chỉ thêm 5 từ "Hãy tính từng bước" → AI tính đúng vì phải suy luận tuần tự, không đoán bừa.',
    explanationEn:
      "Just adding 5 words \"Calculate step by step\" makes AI get the right answer because it reasons sequentially instead of guessing.",
  },
  {
    id: 9,
    question: "Khi nào nên dùng Multi-step Prompting?",
    questionEn: "When should you use Multi-step Prompting?",
    options: [
      "Khi muốn AI trả lời nhanh",
      "Khi nhiệm vụ quá lớn/phức tạp để làm trong 1 prompt",
      "Khi AI không hiểu tiếng Việt",
      "Khi muốn tiết kiệm chi phí",
    ],
    optionsEn: [
      "When you want AI to respond faster",
      "When the task is too large/complex for a single prompt",
      "When AI doesn't understand Vietnamese",
      "When you want to save costs",
    ],
    correct: 1,
    explanation:
      "Task lớn → chia thành nhiều bước nhỏ, mỗi bước 1 prompt. Kiểm tra từng bước → kết quả cuối chất lượng gấp bội.",
    explanationEn:
      "Large task -> break into smaller steps, one prompt per step. Check each step -> final result is exponentially better.",
  },
  {
    id: 10,
    question: "Câu nào SAI về Prompt Engineering?",
    questionEn: "Which statement is WRONG about Prompt Engineering?",
    options: [
      "Prompt dài + rõ ràng luôn tốt hơn prompt ngắn + mơ hồ",
      "Không cần perfect lần đầu — có thể chỉnh prompt rồi hỏi lại",
      "Prompt phải viết bằng tiếng Anh mới hiệu quả",
      "Nên dùng 2-3 AI cross-check cho việc quan trọng",
    ],
    optionsEn: [
      "A long + clear prompt is always better than a short + vague one",
      "It doesn't need to be perfect the first time — you can refine the prompt and ask again",
      "Prompts must be written in English to be effective",
      "You should use 2-3 AIs to cross-check for important tasks",
    ],
    correct: 2,
    explanation:
      "Tiếng Việt hoàn toàn OK! ChatGPT, Claude, Gemini đều hiểu tiếng Việt rất khá. Prompt tiếng Việt vẫn hiệu quả.",
    explanationEn:
      "Vietnamese works perfectly fine! ChatGPT, Claude, and Gemini all understand Vietnamese very well. Vietnamese prompts are still effective.",
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
