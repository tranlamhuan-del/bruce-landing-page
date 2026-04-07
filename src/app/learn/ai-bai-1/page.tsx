import LessonTemplate from "@/components/Lesson/LessonTemplate";

export default function LearnBai1() {
  return (
    <LessonTemplate
      lessonNumber="1"
      title="Giải Mã Các Khái Niệm Về AI Cho Dân Non-Tech"
      titleEn="Demystifying AI Concepts for Non-Tech People"
      subtitle="Từ Rule-Based AI đến Generative AI — hiểu đúng, không hoang mang"
      subtitleEn="From Rule-Based AI to Generative AI — understand correctly, no panic"
      pdfVi="/slides/AI_Bai1_Slides.pdf"
      pdfEn="/slides/AI_Bai1_Slides_EN.pdf"
      quizHref="/quiz/ai-bai-1"
      colorClass="bg-[#2E7D32]"
    />
  );
}
