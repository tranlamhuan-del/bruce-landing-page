"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "Tại sao cùng một câu hỏi nhưng AI trả lời khác nhau cho 2 người?",
    questionEn: "Why does AI give different answers to the same question from 2 different people?",
    options: [
      "Vì AI random kết quả mỗi lần",
      "Vì mỗi người cung cấp context khác nhau",
      "Vì AI thích người này hơn người kia",
      "Vì phiên bản AI khác nhau",
    ],
    optionsEn: [
      "Because AI randomizes results each time",
      "Because each person provides different context",
      "Because AI prefers one person over another",
      "Because they use different AI versions",
    ],
    correct: 1,
    explanation:
      "AI không ngu — AI thiếu context. Cùng câu hỏi nhưng người cung cấp đủ context sẽ nhận output tốt hơn nhiều.",
    explanationEn:
      "AI isn't dumb — AI lacks context. Same question, but the person who provides enough context gets much better output.",
  },
  {
    id: 2,
    question: "3 lớp context của AI gồm những gì?",
    questionEn: "What are the 3 layers of AI context?",
    options: [
      "Input, Processing, Output",
      "Memory, Project, Session",
      "CPU, RAM, Storage",
      "Task, Context, Examples",
    ],
    optionsEn: [
      "Input, Processing, Output",
      "Memory, Project, Session",
      "CPU, RAM, Storage",
      "Task, Context, Examples",
    ],
    correct: 1,
    explanation:
      "3 lớp context: Memory (hồ sơ cá nhân xuyên suốt), Project (tài liệu cho từng dự án), Session (cuộc chat hiện tại).",
    explanationEn:
      "3 context layers: Memory (persistent personal profile), Project (documents for each project), Session (current chat).",
  },
  {
    id: 3,
    question: "Lớp 1 (Memory) hoạt động như thế nào?",
    questionEn: "How does Layer 1 (Memory) work?",
    options: [
      "AI nhớ toàn bộ mọi cuộc chat chi tiết",
      "AI ghi nhớ thông tin cá nhân của bạn và áp dụng xuyên suốt mọi cuộc chat",
      "AI chỉ nhớ cuộc chat gần nhất",
      "AI không có khả năng nhớ gì cả",
    ],
    optionsEn: [
      "AI remembers every chat in full detail",
      "AI remembers your personal info and applies it across all chats",
      "AI only remembers the most recent chat",
      "AI has no memory capability at all",
    ],
    correct: 1,
    explanation:
      "Memory = hồ sơ cá nhân. AI ghi nhớ bạn là ai, làm gì, thích gì, phong cách viết ra sao — và áp dụng tự động cho mọi conversation sau.",
    explanationEn:
      "Memory = personal profile. AI remembers who you are, what you do, your preferences, writing style — and automatically applies it to all future conversations.",
  },
  {
    id: 4,
    question: "Cách nào KHÔNG phải cách set up Memory (Lớp 1)?",
    questionEn: "Which is NOT a way to set up Memory (Layer 1)?",
    options: [
      "Điền Custom Instructions / Profile trong Settings",
      "Nói chuyện để AI tự học dần qua các session",
      "Upload file tổng hợp về bản thân cho AI",
      "Copy-paste toàn bộ email cá nhân vào chat",
    ],
    optionsEn: [
      "Fill in Custom Instructions / Profile in Settings",
      "Chat with AI so it learns over sessions",
      "Upload a profile file about yourself to AI",
      "Copy-paste all your personal emails into chat",
    ],
    correct: 3,
    explanation:
      "3 cách set up Memory: (1) khai báo trong Settings, (2) nói chuyện để AI học, (3) upload file profile. Copy email cá nhân vừa không hiệu quả vừa có rủi ro bảo mật.",
    explanationEn:
      "3 ways to set up Memory: (1) declare in Settings, (2) chat so AI learns, (3) upload profile file. Copying personal emails is both ineffective and a security risk.",
  },
  {
    id: 5,
    question: 'Lớp 2 (Project) giống ví von nào nhất?',
    questionEn: "Which analogy best describes Layer 2 (Project)?",
    options: [
      "Như cuốn nhật ký cá nhân",
      'Như đưa nhân viên 1 folder "đọc đi rồi làm"',
      "Như gọi điện thoại cho AI",
      "Như đăng nhập vào tài khoản mới",
    ],
    optionsEn: [
      "Like a personal diary",
      'Like giving an employee a folder: "read this, then work"',
      "Like making a phone call to AI",
      "Like logging into a new account",
    ],
    correct: 1,
    explanation:
      "Project = bộ brief cho từng dự án. Giống đưa nhân viên 1 folder tài liệu — upload files, viết instructions, AI tự áp dụng khi chat trong Project đó.",
    explanationEn:
      "Project = a brief for each project. Like giving an employee a document folder — upload files, write instructions, AI automatically applies them when chatting in that Project.",
  },
  {
    id: 6,
    question: "Điều gì xảy ra khi bạn đóng (close) một session chat?",
    questionEn: "What happens when you close a chat session?",
    options: [
      "AI nhớ toàn bộ chi tiết cho lần sau",
      "AI mất hết context, chỉ giữ vài điểm chính vào Memory",
      "AI lưu toàn bộ vào Project tự động",
      "Không có gì thay đổi — AI nhớ hết",
    ],
    optionsEn: [
      "AI remembers all details for next time",
      "AI loses all context, only keeps key points in Memory",
      "AI automatically saves everything to Project",
      "Nothing changes — AI remembers everything",
    ],
    correct: 1,
    explanation:
      "Close session = mất hết context lớp 3. AI chỉ pick up vài điểm chính lưu vào Memory (lớp 1). Giống kết thúc cuộc họp — chỉ có biên bản tóm tắt, không phải từng câu nói.",
    explanationEn:
      "Close session = lose all Layer 3 context. AI only picks up a few key points into Memory (Layer 1). Like ending a meeting — only the summary minutes remain, not every word spoken.",
  },
  {
    id: 7,
    question: "Câu nào đúng về bảo mật khi dùng AI?",
    questionEn: "Which statement about AI security is correct?",
    options: [
      "AI không bao giờ lưu dữ liệu của bạn",
      "Bản miễn phí và bản trả phí bảo mật giống nhau",
      "Mặc định, ChatGPT có thể dùng chat của bạn để training model",
      "Chỉ cần đăng nhập là dữ liệu đã được bảo vệ hoàn toàn",
    ],
    optionsEn: [
      "AI never stores your data",
      "Free and paid plans have the same security",
      "By default, ChatGPT can use your chats to train the model",
      "Just logging in means your data is fully protected",
    ],
    correct: 2,
    explanation:
      "ChatGPT mặc định ON — dùng chat để cải thiện model. Cần vào Settings → Data Controls để tắt. Trả phí = bạn là khách hàng, free = bạn là sản phẩm.",
    explanationEn:
      "ChatGPT defaults to ON — uses chats to improve the model. Go to Settings → Data Controls to turn it off. Paid = you're the customer, free = you're the product.",
  },
  {
    id: 8,
    question: "Thông tin nào KHÔNG nên paste vào AI?",
    questionEn: "What information should you NOT paste into AI?",
    options: [
      "Câu hỏi tổng quát về kiến thức",
      "Ý tưởng brainstorm cho dự án",
      "Mật khẩu, số thẻ tín dụng, hợp đồng NDA",
      "Tài liệu public đã được công bố",
    ],
    optionsEn: [
      "General knowledge questions",
      "Brainstorming ideas for a project",
      "Passwords, credit card numbers, NDA contracts",
      "Public documents that have been published",
    ],
    correct: 2,
    explanation:
      "Quy tắc vàng: Không dám forward email đó cho người lạ → đừng paste vào AI. Mật khẩu, thẻ tín dụng, NDA, dữ liệu khách hàng cá nhân — tuyệt đối không.",
    explanationEn:
      "Golden rule: If you wouldn't forward that email to a stranger → don't paste it into AI. Passwords, credit cards, NDAs, personal customer data — absolutely not.",
  },
  {
    id: 9,
    question: "Câu nào SAI về 3 lớp context?",
    questionEn: "Which statement about the 3 context layers is WRONG?",
    options: [
      "Memory áp dụng cho mọi cuộc chat, Project chỉ cho 1 dự án",
      "Session là tạm thời, mất khi đóng chat",
      "Project context tự động lan sang tất cả các Project khác",
      "Cả 3 lớp bổ sung cho nhau — AI thấy cả 3 cùng lúc",
    ],
    optionsEn: [
      "Memory applies to all chats, Project only to one project",
      "Session is temporary, lost when closing chat",
      "Project context automatically spreads to all other Projects",
      "All 3 layers complement each other — AI sees all 3 at once",
    ],
    correct: 2,
    explanation:
      "Project context chỉ áp dụng khi bạn mở đúng Project đó — không lan sang Project khác. Mỗi Project là 1 folder riêng biệt.",
    explanationEn:
      "Project context only applies when you open that specific Project — it doesn't spread to other Projects. Each Project is a separate folder.",
  },
  {
    id: 10,
    question: "Câu nào tóm tắt đúng nhất bài học hôm nay?",
    questionEn: "Which statement best summarizes today's lesson?",
    options: [
      "Prompt càng dài càng tốt, AI sẽ hiểu hơn",
      "Chỉ cần dùng bản trả phí là AI tự hiểu mọi thứ",
      "Context > Kỹ thuật prompt — đầu tư set up Memory & Project sẽ tiết kiệm hàng giờ",
      "AI không cần context, chỉ cần hỏi đúng câu hỏi",
    ],
    optionsEn: [
      "The longer the prompt, the better AI understands",
      "Just use the paid version and AI understands everything",
      "Context > Prompt technique — investing in Memory & Project setup saves hours",
      "AI doesn't need context, just ask the right question",
    ],
    correct: 2,
    explanation:
      "Prompt đơn giản + context tốt > Prompt phức tạp + không context. Đầu tư 10 phút set up Memory & Project → tiết kiệm hàng giờ sau này.",
    explanationEn:
      "Simple prompt + good context > Complex prompt + no context. Invest 10 minutes setting up Memory & Project → save hours later.",
  },
];

export default function QuizBai2B() {
  return (
    <QuizTemplate
      title="Bài Kiểm Tra — Bài 2B"
      subtitle="Context, Context & Context"
      lessonNumber={2.5}
      questions={questions}
      passScore={7}
      nextLesson="Bài 3: Super Prompt, Meta Prompt & AI Agent"
      apiEndpoint="/api/quiz-ai-bai-2b"
    />
  );
}
