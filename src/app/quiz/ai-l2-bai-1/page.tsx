"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "AI Chatbot và Agentic AI khác nhau cơ bản ở điểm nào?",
    questionEn: "What is the fundamental difference between AI Chatbot and Agentic AI?",
    options: [
      "Agentic AI dùng model mới hơn, Chatbot dùng model cũ",
      "Chatbot hỏi-đáp từng lượt, Agentic AI nhận goal và tự chủ hành động",
      "Agentic AI chỉ dùng được bằng tiếng Anh",
      "Chatbot miễn phí, Agentic AI phải trả tiền",
    ],
    optionsEn: [
      "Agentic AI uses newer models, Chatbot uses older ones",
      "Chatbot does Q&A per turn, Agentic AI receives a goal and acts autonomously",
      "Agentic AI only works in English",
      "Chatbot is free, Agentic AI requires payment",
    ],
    correct: 1,
    explanation:
      "Chatbot chỉ hỏi-đáp 1 lượt. Agentic AI nhận mục tiêu, tự lên kế hoạch, dùng tools, tự sửa lỗi — hoạt động như nhân viên chứ không phải máy trả lời.",
    explanationEn:
      "Chatbot only does single-turn Q&A. Agentic AI receives a goal, plans autonomously, uses tools, self-heals — works like an employee, not just an answering machine.",
  },
  {
    id: 2,
    question: "Agentic AI có 3 thành phần cốt lõi. Đó là gì?",
    questionEn: "What are the 3 core components of Agentic AI?",
    options: [
      "CPU, RAM, GPU",
      "Brain (LLM), Eyes (Vision/Browser), Hands (Terminal/Tools)",
      "Input, Processing, Output",
      "Prompt, Context, Response",
    ],
    optionsEn: [
      "CPU, RAM, GPU",
      "Brain (LLM), Eyes (Vision/Browser), Hands (Terminal/Tools)",
      "Input, Processing, Output",
      "Prompt, Context, Response",
    ],
    correct: 1,
    explanation:
      "Brain = LLM suy luận. Eyes = nhìn màn hình, đọc web. Hands = thao tác file, chạy code, gọi API. Ba thành phần phối hợp tạo nên Agentic AI.",
    explanationEn:
      "Brain = LLM for reasoning. Eyes = screen vision, web reading. Hands = file operations, code execution, API calls. Three components working together form Agentic AI.",
  },
  {
    id: 3,
    question: "\"Self-Healing\" trong Agentic AI nghĩa là gì?",
    questionEn: "What does \"Self-Healing\" mean in Agentic AI?",
    options: [
      "AI tự sửa chữa phần cứng máy tính",
      "AI tự phát hiện lỗi, đề xuất cách sửa, và sửa lại mà không cần người chỉ",
      "AI tự động cập nhật phiên bản mới",
      "AI tự khởi động lại khi bị treo",
    ],
    optionsEn: [
      "AI repairs computer hardware by itself",
      "AI self-detects errors, proposes fixes, and corrects them without human input",
      "AI automatically updates to newer versions",
      "AI restarts itself when frozen",
    ],
    correct: 1,
    explanation:
      "Self-healing: gặp lỗi → tự phát hiện → tự đề xuất cách sửa → sửa và thử lại. Không dừng giữa chừng, không chờ bạn chỉ ra lỗi.",
    explanationEn:
      "Self-healing: encounters error → self-detects → proposes fix → fixes and retries. Never stops mid-way, doesn't wait for you to point out the error.",
  },
  {
    id: 4,
    question: "Tại sao Context được coi là \"linh hồn\" của Agentic AI?",
    questionEn: "Why is Context considered the \"soul\" of Agentic AI?",
    options: [
      "Vì context giúp AI chạy nhanh hơn",
      "Vì context quyết định AI hiểu bạn tốt thế nào — càng nhiều context chất lượng, kết quả càng chính xác",
      "Vì context là phần cứng quan trọng nhất",
      "Vì không có context thì AI không khởi động được",
    ],
    optionsEn: [
      "Because context makes AI run faster",
      "Because context determines how well AI understands you — more quality context means more accurate results",
      "Because context is the most important hardware",
      "Because without context, AI cannot start up",
    ],
    correct: 1,
    explanation:
      "Chatbot không có context → mỗi lần như người lạ. Agentic AI có đầy đủ context (identity, memory, tools, skills) → hiểu bạn, nhớ bạn, làm việc đúng ý.",
    explanationEn:
      "Chatbot has no context → like a stranger each time. Agentic AI has full context (identity, memory, tools, skills) → understands you, remembers you, works as intended.",
  },
  {
    id: 5,
    question: "Vibe Working được định nghĩa là gì?",
    questionEn: "How is Vibe Working defined?",
    options: [
      "Làm việc trong môi trường có nhạc nền",
      "Con người (chiến lược, phán đoán) + Agentic AI (thực thi, tốc độ) = kết quả vượt trội",
      "Để AI làm mọi thứ, con người chỉ kiểm tra cuối",
      "Dùng nhiều công cụ AI cùng lúc",
    ],
    optionsEn: [
      "Working in an environment with background music",
      "Human (strategy, judgment) + Agentic AI (execution, speed) = superior results",
      "Let AI do everything, humans only check at the end",
      "Using many AI tools simultaneously",
    ],
    correct: 1,
    explanation:
      "Vibe Working = cộng lực giữa người và AI. Bạn là manager (định hướng, phán đoán, trách nhiệm), AI là đội ngũ (thực thi, quy mô, tốc độ). Không phải thay thế.",
    explanationEn:
      "Vibe Working = synergy between human and AI. You are the manager (direction, judgment, responsibility), AI is the team (execution, scale, speed). Not replacement.",
  },
  {
    id: 6,
    question: "Agentic Vibe Working Framework có bao nhiêu bước?",
    questionEn: "How many steps does the Agentic Vibe Working Framework have?",
    options: [
      "4 bước: Plan → Execute → Check → Act",
      "5 bước: Input → Process → Output → Test → Deploy",
      "6 bước: Define → Research → Plan → Execute → Verify → Package",
      "3 bước: Ask → Answer → Done",
    ],
    optionsEn: [
      "4 steps: Plan → Execute → Check → Act",
      "5 steps: Input → Process → Output → Test → Deploy",
      "6 steps: Define → Research → Plan → Execute → Verify → Package",
      "3 steps: Ask → Answer → Done",
    ],
    correct: 2,
    explanation:
      "Framework 6 bước: Define (xác định mục tiêu) → Research (nghiên cứu) → Plan (lập kế hoạch) → Execute (thực thi) → Verify (kiểm tra) → Package (đóng gói Skill).",
    explanationEn:
      "6-step framework: Define (set objective) → Research (find methods) → Plan (create plan) → Execute (do the work) → Verify (cross-check) → Package (create reusable Skill).",
  },
  {
    id: 7,
    question: "Bước \"Package\" (bước 6) trong Framework có mục đích gì?",
    questionEn: "What is the purpose of the \"Package\" step (step 6) in the Framework?",
    options: [
      "Đóng gói sản phẩm để bán",
      "Nén file để gửi email",
      "Đóng gói quy trình thành Agent Skill để tái sử dụng — lần sau không làm lại từ đầu",
      "Xuất báo cáo PDF",
    ],
    optionsEn: [
      "Package the product for sale",
      "Compress files to send via email",
      "Package the process into an Agent Skill for reuse — no starting from scratch next time",
      "Export a PDF report",
    ],
    correct: 2,
    explanation:
      "Package = đóng gói toàn bộ quy trình thành Agent Skill (dạng Meta-Prompt). Lần sau copy Skill → giao cho bất kỳ AI Agent nào → kết quả tương đương mà không cần trao đổi lại.",
    explanationEn:
      "Package = bundle the entire process into an Agent Skill (Meta-Prompt format). Next time, copy the Skill → give to any AI Agent → equivalent results without re-discussing.",
  },
  {
    id: 8,
    question: "AI chỉ có khả năng \"Biết\" (Knowing) — điều này có nghĩa gì?",
    questionEn: "AI only has \"Knowing\" ability — what does this mean?",
    options: [
      "AI biết tất cả mọi thứ trên thế giới",
      "AI có dữ liệu khổng lồ nhưng không thực sự hiểu thế giới xung quanh, không phân biệt thật-giả tuyệt đối",
      "AI biết cách tự sửa chữa phần cứng",
      "AI biết trước tương lai",
    ],
    optionsEn: [
      "AI knows everything in the world",
      "AI has massive data but doesn't truly understand the world, cannot absolutely distinguish truth from fiction",
      "AI knows how to repair its own hardware",
      "AI can predict the future",
    ],
    correct: 1,
    explanation:
      "AI \"biết\" rất nhiều (từ data training) nhưng không \"hiểu\" ngữ cảnh thật, không có world model, không biết kết quả nào con người THỰC SỰ muốn. Đó là lý do cần con người.",
    explanationEn:
      "AI \"knows\" a lot (from training data) but doesn't \"understand\" real context, has no world model, doesn't know what humans TRULY want. That's why humans are needed.",
  },
  {
    id: 9,
    question: "Khi nào KHÔNG cần làm đủ 6 bước của Framework?",
    questionEn: "When do you NOT need all 6 steps of the Framework?",
    options: [
      "Không bao giờ — luôn phải làm đủ 6 bước",
      "Khi task đơn giản hoặc đã có Skill từ trước — có thể bỏ bước Research/Plan hoặc chỉ cần Execute",
      "Khi dùng ChatGPT thay vì Claude",
      "Khi làm việc vào cuối tuần",
    ],
    optionsEn: [
      "Never — always do all 6 steps",
      "When the task is simple or you already have a Skill — skip Research/Plan or just Execute",
      "When using ChatGPT instead of Claude",
      "When working on weekends",
    ],
    correct: 1,
    explanation:
      "Việc đơn giản: Define → Execute → Verify. Việc lặp lại: dùng Skill, chỉ Execute. Việc phức tạp: làm đủ 6 bước. Framework linh hoạt, không cứng nhắc.",
    explanationEn:
      "Simple tasks: Define → Execute → Verify. Repeated tasks: use a Skill, just Execute. Complex tasks: do all 6 steps. The framework is flexible, not rigid.",
  },
  {
    id: 10,
    question: "Trong Vibe Working, vai trò của con người là gì?",
    questionEn: "In Vibe Working, what is the human's role?",
    options: [
      "Ngồi xem AI làm, không cần can thiệp",
      "Viết code để AI chạy",
      "Manager / Director — định hướng chiến lược, phán đoán, chịu trách nhiệm, kiểm tra chất lượng",
      "Chỉ dùng AI khi không biết câu trả lời",
    ],
    optionsEn: [
      "Sit back and watch AI work, no intervention needed",
      "Write code for AI to run",
      "Manager / Director — set strategic direction, make judgments, take responsibility, quality control",
      "Only use AI when you don't know the answer",
    ],
    correct: 2,
    explanation:
      "Bạn = Manager: định hướng, phán đoán, hiểu ngữ cảnh xã hội, chịu trách nhiệm cuối cùng. AI = đội ngũ: thực thi nhanh, quy mô lớn, không mệt. Cộng lực, không thay thế.",
    explanationEn:
      "You = Manager: set direction, make judgments, understand social context, take final responsibility. AI = team: fast execution, massive scale, never tired. Synergy, not replacement.",
  },
];

export default function QuizL2Bai1() {
  return (
    <QuizTemplate
      title="Quiz — Level 2 Bài 1"
      subtitle="Agentic AI & Vibe Working Framework"
      lessonNumber={4}
      questions={questions}
      passScore={7}
      nextLesson="Level 2 Bài 2: Công cụ Agentic AI"
      apiEndpoint="/api/quiz-ai-l2-bai-1"
    />
  );
}
