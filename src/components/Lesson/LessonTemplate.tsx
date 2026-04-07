"use client";

import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

interface LessonTemplateProps {
  lessonNumber: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  pdfVi: string;
  pdfEn: string;
  quizHref: string;
  colorClass?: string;
}

const UI = {
  vi: {
    lesson: "Bài",
    viewSlides: "Xem slides bài giảng",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "English",
    takeQuiz: "Làm Bài Kiểm Tra",
    quizNote: "Hoàn thành quiz để mở khóa bài tiếp theo",
    download: "Tải PDF",
    back: "Về trang chủ",
  },
  en: {
    lesson: "Lesson",
    viewSlides: "View lesson slides",
    language: "Language",
    vietnamese: "Tiếng Việt",
    english: "English",
    takeQuiz: "Take Quiz",
    quizNote: "Complete the quiz to unlock the next lesson",
    download: "Download PDF",
    back: "Back to Home",
  },
};

export default function LessonTemplate({
  lessonNumber,
  title,
  titleEn,
  subtitle,
  subtitleEn,
  pdfVi,
  pdfEn,
  quizHref,
  colorClass = "bg-primary",
}: LessonTemplateProps) {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const t = UI[lang];
  const currentTitle = lang === "en" ? titleEn : title;
  const currentSubtitle = lang === "en" ? subtitleEn : subtitle;
  const currentPdf = lang === "en" ? pdfEn : pdfVi;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pt-24 pb-16">
        {/* Header */}
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <a
                href="/"
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <MaterialIcon name="arrow_back" className="text-xl" />
              </a>
              <div
                className={`${colorClass} text-on-primary text-xs font-[family-name:var(--font-label)] px-3 py-1 rounded-full`}
              >
                {t.lesson} {lessonNumber}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
              {currentTitle}
            </h1>
            <p className="text-on-surface-variant font-[family-name:var(--font-body)]">
              {currentSubtitle}
            </p>
          </div>
        </FadeIn>

        {/* Controls */}
        <FadeIn delay={0.1}>
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                  {t.language}:
                </label>
                <div className="flex rounded-lg overflow-hidden border border-outline-variant">
                  <button
                    onClick={() => setLang("vi")}
                    className={`px-4 py-2 text-sm font-[family-name:var(--font-label)] transition-all ${
                      lang === "vi"
                        ? "bg-primary text-on-primary"
                        : "bg-surface text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {t.vietnamese}
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-4 py-2 text-sm font-[family-name:var(--font-label)] transition-all ${
                      lang === "en"
                        ? "bg-primary text-on-primary"
                        : "bg-surface text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {t.english}
                  </button>
                </div>
              </div>
              <a
                href={currentPdf}
                download
                className="flex items-center gap-2 text-sm text-primary font-[family-name:var(--font-label)] hover:underline"
              >
                <MaterialIcon name="download" className="text-base" />
                {t.download}
              </a>
            </div>
          </div>
        </FadeIn>

        {/* PDF Viewer */}
        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="glass border border-outline-variant/30 rounded-xl overflow-hidden">
              <iframe
                src={currentPdf}
                className="w-full border-0"
                style={{ height: "75vh", minHeight: "500px" }}
                title={currentTitle}
              />
            </div>
          </div>
        </FadeIn>

        {/* Quiz CTA */}
        <FadeIn delay={0.3}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="glass border border-outline-variant/30 rounded-xl p-8">
              <MaterialIcon
                name="quiz"
                className="text-primary text-4xl mb-4"
              />
              <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface mb-2">
                {t.takeQuiz}
              </h2>
              <p className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm mb-6">
                {t.quizNote}
              </p>
              <a
                href={quizHref}
                className="inline-block bg-primary text-on-primary px-8 py-3 font-[family-name:var(--font-headline)] font-bold rounded-lg hover:brightness-110 transition-all"
              >
                {t.takeQuiz} →
              </a>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
