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
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "English",
    takeQuiz: "Làm Bài Kiểm Tra",
    download: "Tải PDF",
    howItWorks: "Cách học",
    steps: [
      "Đọc hết slides bài chia sẻ bên trên",
      "Làm bài kiểm tra ở nút bên dưới (10 câu trắc nghiệm)",
      "Nhớ điền đầy đủ Tên và Email trước khi bắt đầu",
      "Đạt 7/10 trở lên → Hệ thống tự động gửi bài tiếp theo vào email của bạn",
    ],
  },
  en: {
    lesson: "Lesson",
    language: "Language",
    vietnamese: "Tiếng Việt",
    english: "English",
    takeQuiz: "Take Quiz",
    download: "Download PDF",
    howItWorks: "How it works",
    steps: [
      "Read through the lesson slides above",
      "Take the quiz below (10 multiple-choice questions)",
      "Make sure to fill in your Name and Email before starting",
      "Score 7/10 or higher → The system will automatically email you the next lesson",
    ],
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

        {/* How it works + Quiz CTA */}
        <FadeIn delay={0.3}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="glass border border-outline-variant/30 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon
                  name="rocket_launch"
                  className="text-primary text-3xl"
                />
                <h2 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
                  {t.howItWorks}
                </h2>
              </div>
              <div className="space-y-4 mb-8">
                {t.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                      <span className="text-primary font-[family-name:var(--font-headline)] font-bold text-sm">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-on-surface font-[family-name:var(--font-body)] text-sm leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href={quizHref}
                  className="inline-block bg-primary text-on-primary px-10 py-4 font-[family-name:var(--font-headline)] font-bold text-lg rounded-lg hover:brightness-110 transition-all"
                >
                  {t.takeQuiz} →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
