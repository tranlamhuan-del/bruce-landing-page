"use client";

import QuizTemplate, {
  type Question,
} from "@/components/Quiz/QuizTemplate";

const questions: Question[] = [
  {
    id: 1,
    question: "Tại sao cùng một câu hỏi nhưng AI trả lời khác nhau cho 2 người?",
    options: [
      "Vì AI random kết quả mỗi lần",
      "Vì mỗi người cung cấp context khác nhau",
      "Vì AI thích người này hơn người kia",
      "Vì phiên bản AI khác nhau",
    ],
    correct: 1,
    explanation:
      "AI không ngu — AI thiếu context. Cùng câu hỏi nhưng người cung cấp đủ context sẽ nhận output tốt hơn nhiều.",
  },
  {
    id: 2,
    question: "3 lớp context của AI gồm những gì?",
    options: [
      "Input, Processing, Output",
      "Memory, Project, Session",
      "CPU, RAM, Storage",
      "Task, Context, Examples",
    ],
    correct: 1,
    explanation:
      "3 lớp context: Memory (hồ sơ cá nhân xuyên suốt), Project (tài liệu cho từng dự án), Session (cuộc chat hiện tại).",
  },
  {
    id: 3,
    question: "Lớp 1 (Memory) hoạt động như thế nào?",
    options: [
      "AI nhớ toàn bộ mọi cuộc chat chi tiết",
      "AI ghi nhớ thông tin cá nhân của bạn và áp dụng xuyên suốt mọi cuộc chat",
      "AI chỉ nhớ cuộc chat gần nhất",
      "AI không có khả năng nhớ gì cả",
    ],
    correct: 1,
    explanation:
      "Memory = hồ sơ cá nhân. AI ghi nhớ bạn là ai, làm gì, thích gì, phong cách viết ra sao — và áp dụng tự động cho mọi conversation sau.",
  },
  {
    id: 4,
    question: "Cách nào KHÔNG phải cách set up Memory (Lớp 1)?",
    options: [
      "Điền Custom Instructions / Profile trong Settings",
      "Nói chuyện để AI tự học dần qua các session",
      "Upload file tổng hợp về bản thân cho AI",
      "Copy-paste toàn bộ email cá nhân vào chat",
    ],
    correct: 3,
    explanation:
      "3 cách set up Memory: (1) khai báo trong Settings, (2) nói chuyện để AI học, (3) upload file profile. Copy email cá nhân vừa không hiệu quả vừa có rủi ro bảo mật.",
  },
  {
    id: 5,
    question: 'Lớp 2 (Project) giống ví von nào nhất?',
    options: [
      "Như cuốn nhật ký cá nhân",
      'Như đưa nhân viên 1 folder "đọc đi rồi làm"',
      "Như gọi điện thoại cho AI",
      "Như đăng nhập vào tài khoản mới",
    ],
    correct: 1,
    explanation:
      "Project = bộ brief cho từng dự án. Giống đưa nhân viên 1 folder tài liệu — upload files, viết instructions, AI tự áp dụng khi chat trong Project đó.",
  },
  {
    id: 6,
    question: "Điều gì xảy ra khi bạn đóng (close) một session chat?",
    options: [
      "AI nhớ toàn bộ chi tiết cho lần sau",
      "AI mất hết context, chỉ giữ vài điểm chính vào Memory",
      "AI lưu toàn bộ vào Project tự động",
      "Không có gì thay đổi — AI nhớ hết",
    ],
    correct: 1,
    explanation:
      "Close session = mất hết context lớp 3. AI chỉ pick up vài điểm chính lưu vào Memory (lớp 1). Giống kết thúc cuộc họp — chỉ có biên bản tóm tắt, không phải từng câu nói.",
  },
  {
    id: 7,
    question: "Câu nào đúng về bảo mật khi dùng AI?",
    options: [
      "AI không bao giờ lưu dữ liệu của bạn",
      "Bản miễn phí và bản trả phí bảo mật giống nhau",
      "Mặc định, ChatGPT có thể dùng chat của bạn để training model",
      "Chỉ cần đăng nhập là dữ liệu đã được bảo vệ hoàn toàn",
    ],
    correct: 2,
    explanation:
      "ChatGPT mặc định ON — dùng chat để cải thiện model. Cần vào Settings → Data Controls để tắt. Trả phí = bạn là khách hàng, free = bạn là sản phẩm.",
  },
  {
    id: 8,
    question: "Thông tin nào KHÔNG nên paste vào AI?",
    options: [
      "Câu hỏi tổng quát về kiến thức",
      "Ý tưởng brainstorm cho dự án",
      "Mật khẩu, số thẻ tín dụng, hợp đồng NDA",
      "Tài liệu public đã được công bố",
    ],
    correct: 2,
    explanation:
      "Quy tắc vàng: Không dám forward email đó cho người lạ → đừng paste vào AI. Mật khẩu, thẻ tín dụng, NDA, dữ liệu khách hàng cá nhân — tuyệt đối không.",
  },
  {
    id: 9,
    question: "Câu nào SAI về 3 lớp context?",
    options: [
      "Memory áp dụng cho mọi cuộc chat, Project chỉ cho 1 dự án",
      "Session là tạm thời, mất khi đóng chat",
      "Project context tự động lan sang tất cả các Project khác",
      "Cả 3 lớp bổ sung cho nhau — AI thấy cả 3 cùng lúc",
    ],
    correct: 2,
    explanation:
      "Project context chỉ áp dụng khi bạn mở đúng Project đó — không lan sang Project khác. Mỗi Project là 1 folder riêng biệt.",
  },
  {
    id: 10,
    question: "Câu nào tóm tắt đúng nhất bài học hôm nay?",
    options: [
      "Prompt càng dài càng tốt, AI sẽ hiểu hơn",
      "Chỉ cần dùng bản trả phí là AI tự hiểu mọi thứ",
      "Context > Kỹ thuật prompt — đầu tư set up Memory & Project sẽ tiết kiệm hàng giờ",
      "AI không cần context, chỉ cần hỏi đúng câu hỏi",
    ],
    correct: 2,
    explanation:
      "Prompt đơn giản + context tốt > Prompt phức tạp + không context. Đầu tư 10 phút set up Memory & Project → tiết kiệm hàng giờ sau này.",
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
