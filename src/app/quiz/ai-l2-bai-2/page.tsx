"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question:
      "Bài 1 đã nói Agentic AI có Brain + Eyes + Hands. Vậy BEH đã đủ để AI làm việc thực tế chưa?",
    questionEn:
      "Lesson 1 explained Agentic AI has Brain + Eyes + Hands. Is BEH enough for AI to truly work with you?",
    options: [
      "Đủ rồi — chỉ cần BEH là AI làm được mọi việc",
      "Chưa đủ — cần thêm \"nhà\" là Agentic Workspace: không gian làm việc, tools tích hợp, lịch làm việc, kênh liên lạc",
      "Chưa đủ — cần thêm RAM và CPU mạnh hơn",
      "Đủ — nhưng phải trả thêm tiền subscription",
    ],
    optionsEn: [
      "Enough — BEH alone lets AI do everything",
      "Not enough — AI also needs a \"home\": Agentic Workspace with tools, schedule, and communication channels",
      "Not enough — needs more RAM and CPU",
      "Enough — just pay for a higher subscription",
    ],
    correct: 1,
    explanation:
      "Có não, mắt, tay rồi vẫn cần \"cơ thể\" để sống và làm việc. Agentic Workspace là không gian nơi AI có tools, memory, schedule và kênh liên lạc — giống văn phòng của nhân viên.",
    explanationEn:
      "Having brain, eyes, hands still needs a \"body\" to live and work. Agentic Workspace is where AI has tools, memory, schedule and communication — like an employee's office.",
  },
  {
    id: 2,
    question: "Agentic Workspace được định nghĩa là gì?",
    questionEn: "How is Agentic Workspace defined?",
    options: [
      "Một ứng dụng chat AI có giao diện đẹp",
      "Môi trường máy tính cá nhân nơi con người và Agentic AI cùng làm việc (co-work), có đầy đủ công cụ, bộ nhớ, lịch và kênh liên lạc",
      "Một folder trên Google Drive để lưu file AI tạo ra",
      "Tài khoản premium của Claude hoặc ChatGPT",
    ],
    optionsEn: [
      "An AI chat app with a pretty UI",
      "A personal computing environment where humans and Agentic AI co-work — equipped with tools, memory, schedule, and communication channels",
      "A Google Drive folder to store AI output",
      "A premium Claude or ChatGPT account",
    ],
    correct: 1,
    explanation:
      "Agentic Workspace không phải 1 app — nó là cả môi trường: UI, terminal, browser, file, memory, schedule. Không có workspace = AI chỉ là chatbot. Có workspace = AI là đồng nghiệp.",
    explanationEn:
      "Agentic Workspace is not just an app — it's the whole environment: UI, terminal, browser, files, memory, schedule. Without it, AI is just a chatbot. With it, AI is a real colleague.",
  },
  {
    id: 3,
    question:
      "Trong 6 tiêu chuẩn vàng Agentic Workspace, tiêu chuẩn nào KHÔNG thuộc danh sách?",
    questionEn:
      "Which of the following is NOT one of the 6 golden standards of Agentic Workspace?",
    options: [
      "3-Panel UI (Chat + File + Editor)",
      "Browser Automation",
      "Voice Recognition (nhận diện giọng nói)",
      "Chat Integration (tích hợp Telegram/Discord)",
    ],
    optionsEn: [
      "3-Panel UI (Chat + File + Editor)",
      "Browser Automation",
      "Voice Recognition",
      "Chat Integration (Telegram/Discord)",
    ],
    correct: 2,
    explanation:
      "6 tiêu chuẩn vàng: 3-Panel UI, Browser Automation, Terminal Automation, Files Automation, Task Schedule, Chat Integration. Voice Recognition không thuộc — tiêu chuẩn tập trung vào khả năng AI thao tác máy và giao tiếp, không phải input method.",
    explanationEn:
      "6 standards: 3-Panel UI, Browser Automation, Terminal Automation, Files Automation, Task Schedule, Chat Integration. Voice Recognition is not included — the standards focus on machine operation and communication, not input methods.",
  },
  {
    id: 4,
    question: "Terminal là gì và vì sao nó quan trọng với Agentic AI?",
    questionEn: "What is Terminal and why is it important for Agentic AI?",
    options: [
      "Một ứng dụng để gõ văn bản như Microsoft Word",
      "Cửa sổ gõ lệnh text để ra lệnh trực tiếp cho máy — AI tự gõ lệnh vào Terminal = \"Hands\" mạnh nhất",
      "Tên gọi khác của trình duyệt Chrome",
      "Một loại phần cứng đặc biệt cho máy tính AI",
    ],
    optionsEn: [
      "A word processor like Microsoft Word",
      "A text command window for directly ordering the machine — AI typing into Terminal is the strongest \"Hands\"",
      "Another name for the Chrome browser",
      "A special hardware device for AI computers",
    ],
    correct: 1,
    explanation:
      "Terminal là cửa sổ gõ shell command (ví dụ: `git push`, `npm install`). Nhờ LLM, người non-tech nói tiếng Việt → AI dịch thành command → chạy Terminal. Platform thiếu Terminal = AI không ra lệnh trực tiếp cho máy được.",
    explanationEn:
      "Terminal is a command window for shell commands (e.g., `git push`, `npm install`). Thanks to LLMs, non-tech users speak naturally → AI translates to commands → runs them. Without Terminal, AI cannot command the machine directly.",
  },
  {
    id: 5,
    question: "Trong bài giảng, code được phân biệt thành 2 dạng. Đó là gì?",
    questionEn: "The lesson distinguishes code into 2 types. What are they?",
    options: [
      "Code miễn phí và code trả phí",
      "Code xây phần mềm (Python, JS, HTML...) để XÂY app/website + Code ra lệnh cho máy (Shell) để RA LỆNH cho máy trong Terminal",
      "Code Tây và code Ta",
      "Code cũ và code mới",
    ],
    optionsEn: [
      "Free code and paid code",
      "Application code (Python, JS, HTML...) to BUILD apps/websites + Shell code to COMMAND the machine via Terminal",
      "Western code and local code",
      "Old code and new code",
    ],
    correct: 1,
    explanation:
      "Code xây phần mềm = viết app, website (ví dụ: Python, JS, HTML). Code ra lệnh cho máy = shell commands gõ trong Terminal (git, npm, ls...). Terminal chính là nơi ra lệnh trực tiếp cho máy.",
    explanationEn:
      "Application code = building apps/websites (Python, JS, HTML). Shell code = commands typed in Terminal (git, npm, ls...). Terminal is where you directly command the machine.",
  },
  {
    id: 6,
    question: "Antigravity là platform của ai, định vị là gì?",
    questionEn: "Who makes Antigravity, and what is its positioning?",
    options: [
      "Của Microsoft — Agentic Office Suite",
      "Của Google — Agentic Coding IDE, mạnh cho developer workflow và deep work",
      "Của Anthropic — Personal CoWorker",
      "Open-source — Personal Assistant",
    ],
    optionsEn: [
      "By Microsoft — Agentic Office Suite",
      "By Google — Agentic Coding IDE, strong for developer workflow and deep work",
      "By Anthropic — Personal CoWorker",
      "Open-source — Personal Assistant",
    ],
    correct: 1,
    explanation:
      "Antigravity do Google làm, là Agentic Coding IDE thế hệ mới — Brain: Claude Opus 4.6 / Gemini 3.1 Pro, có đủ Terminal + Browser + File. Chấm 5/6 vì Task Schedule và Chat Integration còn yếu (không native).",
    explanationEn:
      "Antigravity is by Google, a next-gen Agentic Coding IDE — Brain: Claude Opus 4.6 / Gemini 3.1 Pro, with full Terminal + Browser + Files. Scores 5/6 because Task Schedule and Chat Integration are weak (non-native).",
  },
  {
    id: 7,
    question: "Claude Cowork chấm 5/6 vì thiếu tiêu chuẩn nào quan trọng?",
    questionEn: "Claude Cowork scores 5/6 because it lacks which important standard?",
    options: [
      "Thiếu Browser Automation",
      "Thiếu Terminal Automation — không ra lệnh trực tiếp cho máy được, không chạy shell script / install package / deploy",
      "Thiếu Chat Integration",
      "Thiếu 3-Panel UI",
    ],
    optionsEn: [
      "Missing Browser Automation",
      "Missing Terminal Automation — cannot directly command the machine, cannot run shell scripts / install packages / deploy",
      "Missing Chat Integration",
      "Missing 3-Panel UI",
    ],
    correct: 1,
    explanation:
      "Cowork đạt 5/6: có 3-Panel UI, Browser (Dispatch), Files, Task Schedule, Chat Integration (Channels: Telegram/Discord). Thiếu duy nhất Terminal Automation → không chạy shell command, không deploy được. Bù lại, mạnh cho knowledge work.",
    explanationEn:
      "Cowork scores 5/6: has 3-Panel UI, Browser (Dispatch), Files, Task Schedule, Chat Integration (Channels). Only missing Terminal Automation → cannot run shell commands or deploy. In exchange, it's strong for knowledge work.",
  },
  {
    id: 8,
    question: "Crawbot là gì và đạt điểm bao nhiêu trên 6 tiêu chuẩn vàng?",
    questionEn: "What is Crawbot and how does it score against the 6 golden standards?",
    options: [
      "Một chatbot đơn giản — 3/6",
      "Fork của OpenClaw, Personal Agentic Assistant, đạt 6/6 tiêu chuẩn — có Multi-Agent + Skills UI native, đa LLM, chạy 24/7",
      "Một plugin của Chrome — 4/6",
      "Extension của Claude Desktop — 5/6",
    ],
    optionsEn: [
      "A simple chatbot — 3/6",
      "A fork of OpenClaw, Personal Agentic Assistant, scores 6/6 — native Multi-Agent + Skills UI, multi-LLM, runs 24/7",
      "A Chrome plugin — 4/6",
      "A Claude Desktop extension — 5/6",
    ],
    correct: 1,
    explanation:
      "Crawbot = fork open-source của OpenClaw, đạt 6/6 tiêu chuẩn vàng. Điểm mạnh: UI quản lý Multi-Agent + Skills native, tận dụng subscription từ nhiều LLM provider, chạy như server cá nhân 24/7. Phù hợp power user.",
    explanationEn:
      "Crawbot = open-source fork of OpenClaw, scores 6/6. Strengths: native Multi-Agent + Skills UI, leverages multiple LLM subscriptions, runs 24/7 like a personal server. Best for power users.",
  },
  {
    id: 9,
    question:
      "Task: \"Mỗi sáng 7h crawl 5 báo, tóm tắt headline, gửi Telegram\" — platform nào phù hợp nhất?",
    questionEn:
      "Task: \"Every morning at 7am crawl 5 news sites, summarize headlines, send via Telegram\" — which platform fits best?",
    options: [
      "Antigravity — vì nó là IDE mạnh nhất",
      "Crawbot — có đủ Schedule + Terminal + Chat Integration native, chạy 24/7 không cần bạn online",
      "Claude Cowork — vì là Claude mới nhất",
      "Không platform nào làm được",
    ],
    optionsEn: [
      "Antigravity — because it's the strongest IDE",
      "Crawbot — native Schedule + Terminal + Chat Integration, runs 24/7 without requiring you online",
      "Claude Cowork — because it's the newest Claude",
      "No platform can do this",
    ],
    correct: 1,
    explanation:
      "Task này cần: (1) Schedule 7h mỗi sáng — Crawbot có Cron native, (2) Crawl web — Browser Automation, (3) Gửi Telegram — Chat Integration native. Crawbot đạt 6/6 nên làm được full flow. Antigravity thiếu Schedule + Chat native, Cowork thiếu Terminal.",
    explanationEn:
      "This task needs: (1) 7am schedule — Crawbot has native Cron, (2) Web crawl — Browser Automation, (3) Telegram send — native Chat Integration. Crawbot scores 6/6 so it handles the full flow. Antigravity lacks native Schedule+Chat, Cowork lacks Terminal.",
  },
  {
    id: 10,
    question:
      "Bạn là non-tech, chưa bao giờ code. Nên bắt đầu với platform nào để làm quen Agentic AI?",
    questionEn:
      "You are non-tech, never coded. Which platform should you start with to get familiar with Agentic AI?",
    options: [
      "Antigravity — để học code luôn cho nhanh",
      "Claude Cowork — dễ nhất, ít setup, có thể nhắn qua Telegram, phù hợp knowledge work (viết doc, research, slide)",
      "Crawbot — vì đạt 6/6 tiêu chuẩn vàng",
      "Không nên dùng gì — học code trước đã",
    ],
    optionsEn: [
      "Antigravity — to learn coding quickly",
      "Claude Cowork — easiest, minimal setup, message via Telegram, great for knowledge work (docs, research, slides)",
      "Crawbot — because it scores 6/6",
      "Don't use anything — learn to code first",
    ],
    correct: 1,
    explanation:
      "Cho người mới non-tech: Cowork là lựa chọn tốt nhất. Dễ setup, không cần Terminal, nhắn Telegram là chạy, Skills native cho pdf/docx/pptx. Khi quen và cần automation 24/7 → nâng cấp lên Crawbot. Antigravity thiên coding, hơi khó cho người mới.",
    explanationEn:
      "For non-tech beginners: Cowork is best. Easy setup, no Terminal needed, Telegram-ready, native Skills for pdf/docx/pptx. Once comfortable and needing 24/7 automation → upgrade to Crawbot. Antigravity is coding-biased, tough for beginners.",
  },
];

export default function QuizL2Bai2() {
  return (
    <QuizTemplate
      title="Quiz — Level 2 Bài 2"
      subtitle="Agentic Workspace & 3 Platform: Antigravity, Claude Cowork, Crawbot"
      lessonNumber={5}
      questions={questions}
      passScore={7}
      nextLesson="Level 2 Bài 3: Hướng dẫn chi tiết sử dụng Antigravity"
      apiEndpoint="/api/quiz-ai-l2-bai-2"
    />
  );
}
