import LessonTemplate from "@/components/Lesson/LessonTemplate";

export default function LearnBai2() {
  return (
    <LessonTemplate
      lessonNumber="2"
      title="Prompt Engineering — Từ Cơ Bản Đến Nâng Cao"
      titleEn="Prompt Engineering — From Basics to Advanced"
      subtitle="Học cách giao việc cho AI đúng cách — giống giao việc cho người"
      subtitleEn="Learn how to instruct AI properly — like delegating work to a person"
      pdfVi="/slides/AI_Bai2_Slides.pdf"
      pdfEn="/slides/AI_Bai2_Slides_EN.pdf"
      quizHref="/quiz/ai-bai-2"
      colorClass="bg-[#6A1B9A]"
    />
  );
}
