"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

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
    question: 'Trong "Deep Learning", chữ "Deep" có nghĩa là gì?',
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

export default function QuizBai1() {
  return (
    <QuizTemplate
      title="Bài Kiểm Tra — Bài 1"
      subtitle="Giải Mã Các Khái Niệm Về AI Cho Dân Non-Tech"
      lessonNumber={1}
      questions={questions}
      passScore={7}
      nextLesson="Bài 2: Prompt Engineering"
      apiEndpoint="/api/quiz-ai-bai-1"
    />
  );
}
