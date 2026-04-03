"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "AI (Artificial Intelligence) là gì?",
    questionEn: "What is AI (Artificial Intelligence)?",
    options: [
      "Robot có hình dạng giống người",
      "Hệ thống có khả năng thực hiện nhiệm vụ thường cần trí thông minh của con người",
      "Phần mềm chat tự động",
      "Máy tính có thể tự suy nghĩ như con người",
    ],
    optionsEn: [
      "A robot that looks like a human",
      "A system capable of performing tasks that typically require human intelligence",
      "An automated chat software",
      "A computer that can think like a human",
    ],
    correct: 1,
    explanation:
      "AI là bất kỳ hệ thống nào có khả năng thực hiện nhiệm vụ thường cần \"trí thông minh\" của con người — không nhất thiết phải là robot hay biết suy nghĩ.",
    explanationEn:
      "AI is any system capable of performing tasks that typically require human \"intelligence\" — it doesn't have to be a robot or be able to think.",
  },
  {
    id: 2,
    question:
      "Bộ lọc spam email đời đầu (dùng luật IF... THEN...) thuộc loại AI nào?",
    questionEn:
      "Early email spam filters (using IF... THEN... rules) belong to which type of AI?",
    options: [
      "Machine Learning",
      "Deep Learning",
      "Rule-Based AI",
      "Generative AI",
    ],
    optionsEn: [
      "Machine Learning",
      "Deep Learning",
      "Rule-Based AI",
      "Generative AI",
    ],
    correct: 2,
    explanation:
      "Bộ lọc spam đời đầu hoạt động theo luật cứng (IF có từ \"khuyến mãi\" THEN spam) — đây là Rule-Based AI, không tự học từ dữ liệu.",
    explanationEn:
      "Early spam filters worked on hard-coded rules (IF contains \"promotion\" THEN spam) — this is Rule-Based AI, it doesn't learn from data.",
  },
  {
    id: 3,
    question: "Machine Learning cần gì QUAN TRỌNG NHẤT để hoạt động?",
    questionEn: "What does Machine Learning need MOST to work?",
    options: [
      "Máy tính siêu nhanh",
      "Lập trình viên giỏi",
      "Rất nhiều dữ liệu (data)",
      "Kết nối internet",
    ],
    optionsEn: [
      "A super-fast computer",
      "Talented programmers",
      "A lot of data",
      "Internet connection",
    ],
    correct: 2,
    explanation:
      "ML tự học từ dữ liệu. Càng nhiều data = càng chính xác. GPT-4 được train trên hàng tỷ trang web, sách, code...",
    explanationEn:
      "ML learns from data. More data = more accuracy. GPT-4 was trained on billions of web pages, books, code...",
  },
  {
    id: 4,
    question: "Hành động nào sau đây là ví dụ của Generative AI?",
    questionEn: "Which of the following is an example of Generative AI?",
    options: [
      "Lọc email spam",
      "Nhận diện khuôn mặt trên điện thoại",
      "Phát hiện giao dịch gian lận ở ngân hàng",
      "Viết một bài thơ hoàn toàn mới từ yêu cầu của bạn",
    ],
    optionsEn: [
      "Filtering spam emails",
      "Face recognition on your phone",
      "Detecting fraudulent bank transactions",
      "Writing a completely new poem from your request",
    ],
    correct: 3,
    explanation:
      "Generative AI TẠO RA nội dung mới (thơ, ảnh, code...). Các đáp án khác là Discriminative — phân loại/nhận diện, không tạo mới.",
    explanationEn:
      "Generative AI CREATES new content (poems, images, code...). The other answers are Discriminative — they classify/recognize, not create.",
  },
  {
    id: 5,
    question: 'Trong "Deep Learning", chữ "Deep" có nghĩa là gì?',
    questionEn: 'In "Deep Learning", what does "Deep" mean?',
    options: [
      "AI hiểu biết sâu sắc",
      "Mạng neural có nhiều tầng (layers)",
      "AI có thể suy nghĩ sâu xa",
      "Dữ liệu được phân tích rất kỹ",
    ],
    optionsEn: [
      "AI has deep knowledge",
      "A neural network with many layers",
      "AI can think deeply",
      "Data is analyzed very thoroughly",
    ],
    correct: 1,
    explanation:
      '"Deep" = nhiều tầng neural network, không phải "sâu xa" hay "thông thái". Càng nhiều tầng → càng nhận được pattern phức tạp.',
    explanationEn:
      '"Deep" = many neural network layers, not "profound" or "wise". More layers → more complex patterns can be recognized.',
  },
  {
    id: 6,
    question: "Sắp xếp nào đúng từ LỚN đến NHỎ?",
    questionEn: "Which ordering is correct from LARGEST to SMALLEST?",
    options: [
      "ML > AI > Deep Learning > GenAI",
      "AI > Machine Learning > Deep Learning > Generative AI",
      "Deep Learning > AI > ML > GenAI",
      "GenAI > AI > ML > Deep Learning",
    ],
    optionsEn: [
      "ML > AI > Deep Learning > GenAI",
      "AI > Machine Learning > Deep Learning > Generative AI",
      "Deep Learning > AI > ML > GenAI",
      "GenAI > AI > ML > Deep Learning",
    ],
    correct: 1,
    explanation:
      "AI là khái niệm rộng nhất. ML là nhánh con của AI. Deep Learning là nhánh con của ML. GenAI là nhánh con của DL.",
    explanationEn:
      "AI is the broadest concept. ML is a subset of AI. Deep Learning is a subset of ML. GenAI is a subset of DL.",
  },
  {
    id: 7,
    question: "LLM (Large Language Model) hoạt động bằng cách nào?",
    questionEn: "How does an LLM (Large Language Model) work?",
    options: [
      "Tra cứu đáp án trong cơ sở dữ liệu",
      "Dự đoán từ tiếp theo có xác suất cao nhất",
      "Hiểu và suy nghĩ như con người",
      "Copy câu trả lời từ internet",
    ],
    optionsEn: [
      "Looking up answers in a database",
      "Predicting the next word with the highest probability",
      "Understanding and thinking like a human",
      "Copying answers from the internet",
    ],
    correct: 1,
    explanation:
      'LLM = máy dự đoán xác suất. Với "The dog is ___", nó tính: playing (50%), eating (30%)... rồi chọn xác suất cao nhất. Không "hiểu" và không "tra cứu".',
    explanationEn:
      'LLM = a probability prediction machine. For "The dog is ___", it calculates: playing (50%), eating (30%)... then picks the highest probability. It doesn\'t "understand" or "look up" anything.',
  },
  {
    id: 8,
    question: "ChatGPT và GPT-4 khác nhau thế nào?",
    questionEn: "How are ChatGPT and GPT-4 different?",
    options: [
      "Không khác, chỉ là hai tên gọi",
      "ChatGPT là phiên bản cũ, GPT-4 là phiên bản mới",
      "ChatGPT là sản phẩm (app), GPT-4 là model (bộ não bên trong)",
      "GPT-4 chỉ dùng cho lập trình viên",
    ],
    optionsEn: [
      "No difference, just two names for the same thing",
      "ChatGPT is the old version, GPT-4 is the new version",
      "ChatGPT is the product (app), GPT-4 is the model (the brain inside)",
      "GPT-4 is only for programmers",
    ],
    correct: 2,
    explanation:
      'ChatGPT là SẢN PHẨM (app) của OpenAI. GPT-4 là MODEL (bộ não) chạy bên trong. Giống iPhone (sản phẩm) chạy chip A17 (bộ xử lý).',
    explanationEn:
      "ChatGPT is OpenAI's PRODUCT (app). GPT-4 is the MODEL (brain) running inside. Like iPhone (product) running the A17 chip (processor).",
  },
  {
    id: 9,
    question: 'Tại sao LLM hay "ảo giác" (hallucination)?',
    questionEn: "Why do LLMs often \"hallucinate\"?",
    options: [
      "Vì internet có nhiều thông tin sai",
      "Vì AI cố tình nói dối",
      "Vì AI dự đoán từ theo xác suất, không kiểm chứng sự thật",
      "Vì AI chưa được cập nhật thông tin mới",
    ],
    optionsEn: [
      "Because the internet has a lot of wrong information",
      "Because AI intentionally lies",
      "Because AI predicts words by probability without fact-checking",
      "Because AI hasn't been updated with new information",
    ],
    correct: 2,
    explanation:
      'LLM chọn từ "có vẻ đúng nhất" theo xác suất — không có cơ chế kiểm chứng sự thật. Giống ông Tiến Sĩ IQ 160 nhưng EQ 0: trả lời tự tin kể cả khi sai.',
    explanationEn:
      "LLMs pick the \"most likely sounding\" word by probability — there's no fact-checking mechanism. Like a PhD with IQ 160 but EQ 0: answers confidently even when wrong.",
  },
  {
    id: 10,
    question: "Tại sao Prompt (cách ra lệnh cho AI) quan trọng?",
    questionEn: "Why is the Prompt (how you instruct AI) important?",
    options: [
      "Vì AI chỉ hiểu tiếng Anh nên cần viết đúng",
      "Vì prompt hay sẽ giúp AI chạy nhanh hơn",
      "Vì AI cần hướng dẫn rõ ràng, cụ thể để cho kết quả tốt — giống cách giao việc cho người",
      "Vì mỗi prompt tốn tiền nên phải viết chuẩn",
    ],
    optionsEn: [
      "Because AI only understands English so you need to write correctly",
      "Because a good prompt makes AI run faster",
      "Because AI needs clear, specific instructions for good results — like delegating work to a person",
      "Because each prompt costs money so you must write it properly",
    ],
    correct: 2,
    explanation:
      'AI giỏi đến mấy mà prompt dở → kết quả dở. Có ông Tiến Sĩ IQ 160 làm trợ lý, nhưng bạn chỉ nói "làm cái gì đó đi" → ổng sẽ làm bừa!',
    explanationEn:
      "No matter how smart the AI is, a bad prompt leads to bad results. Imagine having a PhD with IQ 160 as your assistant, but you just say \"do something\" — they'll do it randomly!",
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
