"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizTemplateProps {
  title: string;
  subtitle: string;
  lessonNumber: number;
  questions: Question[];
  passScore: number;
  nextLesson?: string;
  apiEndpoint: string;
}

export default function QuizTemplate({
  title,
  subtitle,
  lessonNumber,
  questions,
  passScore,
  nextLesson,
  apiEndpoint,
}: QuizTemplateProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [started, setStarted] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = questions.length;
  const calcScore = () =>
    questions.filter((q) => answers[q.id] === q.correct).length;
  const score = submitted ? calcScore() : 0;
  const passed = score >= passScore;
  const answeredCount = Object.keys(answers).length;

  const handleSubmit = async () => {
    const s = calcScore();
    const p = s >= passScore;
    setSubmitted(true);
    setSaving(true);

    try {
      await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, score: s, passed: p, lang, answers }),
      });
    } catch {
      // silent fail
    }
    setSaving(false);
  };

  // ── Intro Screen ──
  if (!started) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-8 pt-24 pb-16 bg-surface">
          <FadeIn>
            <div className="glass max-w-lg w-full p-12 text-center border border-outline-variant/30 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                <MaterialIcon
                  name="school"
                  className="text-primary text-3xl"
                />
              </div>
              <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-2 text-on-surface">
                Bài {lessonNumber}
              </h1>
              <p className="text-on-surface-variant font-[family-name:var(--font-body)] mb-1">
                {subtitle}
              </p>
              <p className="text-sm text-on-surface-variant/70 font-[family-name:var(--font-label)] mb-8">
                {total} câu trắc nghiệm &middot; Đạt: {passScore}/{total}{" "}
                &middot; Không giới hạn thời gian
              </p>

              <div className="space-y-4 mb-8">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Ngôn ngữ slides
                  </label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as "vi" | "en")}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none cursor-pointer"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <motion.button
                onClick={() => name.trim() && email.trim() && setStarted(true)}
                disabled={!name.trim() || !email.trim()}
                className="w-full py-4 bg-primary text-on-primary font-[family-name:var(--font-headline)] font-bold text-lg rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98]"
                whileHover={
                  name.trim() && email.trim() ? { scale: 1.02 } : {}
                }
                whileTap={
                  name.trim() && email.trim() ? { scale: 0.98 } : {}
                }
              >
                Bắt Đầu Làm Bài
              </motion.button>
            </div>
          </FadeIn>
        </main>
        <Footer />
      </>
    );
  }

  // ── Result Screen ──
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-8 pt-24 pb-16 bg-surface">
          <FadeIn>
            <div className="glass max-w-lg w-full p-12 text-center border border-outline-variant/30 rounded-xl">
              {passed ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-tertiary/15 flex items-center justify-center mx-auto mb-6">
                    <MaterialIcon
                      name="celebration"
                      className="text-tertiary text-4xl"
                    />
                  </div>
                  <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-2 text-on-surface">
                    Xuất sắc, {name}!
                  </h1>
                  <div className="text-6xl font-[family-name:var(--font-headline)] font-bold my-6 text-tertiary">
                    {score}/{total}
                  </div>
                  <p className="text-on-surface-variant font-[family-name:var(--font-body)] mb-8">
                    Bạn đã vượt qua!{" "}
                    {nextLesson && `Sẵn sàng cho ${nextLesson}!`}
                  </p>
                  <a
                    href="/"
                    className="inline-block bg-primary text-on-primary px-8 py-3 font-[family-name:var(--font-headline)] font-bold rounded-lg hover:brightness-110 transition-all"
                  >
                    Về trang chủ
                  </a>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-6">
                    <MaterialIcon
                      name="menu_book"
                      className="text-secondary text-4xl"
                    />
                  </div>
                  <h1 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-2 text-on-surface">
                    Chưa đạt, {name}
                  </h1>
                  <div className="text-6xl font-[family-name:var(--font-headline)] font-bold my-6 text-error">
                    {score}/{total}
                  </div>
                  <p className="text-on-surface-variant font-[family-name:var(--font-body)] mb-2">
                    Cần đạt {passScore}/{total} để mở khóa bài tiếp theo.
                  </p>
                  <p className="text-on-surface-variant font-[family-name:var(--font-body)] mb-8">
                    Xem lại nội dung bài học rồi quay lại làm bài kiểm tra sau
                    nhé!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setAnswers({});
                      }}
                      className="border border-outline text-on-surface px-8 py-3 font-[family-name:var(--font-headline)] font-bold rounded-lg hover:bg-surface-container-high transition-all"
                    >
                      Làm lại
                    </button>
                    <a
                      href="/"
                      className="bg-primary text-on-primary px-8 py-3 font-[family-name:var(--font-headline)] font-bold rounded-lg hover:brightness-110 transition-all"
                    >
                      Về trang chủ
                    </a>
                  </div>
                </>
              )}
            </div>
          </FadeIn>
        </main>
        <Footer />
      </>
    );
  }

  // ── Quiz Form ──
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pt-24 pb-16 bg-surface">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="glass p-4 mb-8 sticky top-20 z-10 border border-outline-variant/30 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface">
                {name} — Bài {lessonNumber}
              </span>
              <span className="text-sm font-[family-name:var(--font-label)] text-on-surface-variant">
                {answeredCount}/{total} câu
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(answeredCount / total) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, qi) => {
            const answered = answers[q.id] !== undefined;
            const isCorrect = answered && answers[q.id] === q.correct;

            return (
              <FadeIn key={q.id} delay={0.05 * qi}>
                <div
                  className={`glass p-6 mb-4 border rounded-xl transition-all ${
                    answered
                      ? isCorrect
                        ? "border-tertiary/50"
                        : "border-error/50"
                      : "border-outline-variant/30"
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-[family-name:var(--font-headline)] font-bold text-on-surface">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 text-primary text-sm font-bold mr-2 shrink-0">
                        {q.id}
                      </span>
                      {q.question}
                    </p>
                    {answered && (
                      <span className="ml-2 shrink-0">
                        <MaterialIcon
                          name={isCorrect ? "check_circle" : "cancel"}
                          className={`text-xl ${
                            isCorrect ? "text-tertiary" : "text-error"
                          }`}
                        />
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, i) => {
                      const isSelected = answers[q.id] === i;
                      const isCorrectOption = i === q.correct;

                      let optClasses =
                        "bg-surface-container-low border-transparent";
                      if (answered) {
                        if (isSelected && isCorrect) {
                          optClasses =
                            "bg-tertiary/10 border-tertiary/40";
                        } else if (isSelected && !isCorrect) {
                          optClasses = "bg-error/10 border-error/40";
                        } else if (isCorrectOption) {
                          optClasses =
                            "bg-tertiary/5 border-tertiary/20";
                        } else {
                          optClasses =
                            "bg-surface-container-low border-transparent opacity-50";
                        }
                      } else if (isSelected) {
                        optClasses =
                          "bg-primary/10 border-primary/40";
                      }

                      return (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${optClasses} ${
                            answered
                              ? "cursor-default"
                              : "cursor-pointer hover:bg-surface-container-high"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            checked={isSelected}
                            disabled={answered}
                            onChange={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [q.id]: i,
                              }))
                            }
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm font-[family-name:var(--font-body)] text-on-surface">
                            <strong className="text-primary mr-1">
                              {String.fromCharCode(65 + i)}.
                            </strong>
                            {opt}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-outline-variant/30"
                      >
                        <p className="text-sm text-on-surface-variant font-[family-name:var(--font-body)] leading-relaxed">
                          <MaterialIcon
                            name="lightbulb"
                            className="text-secondary text-base mr-1 align-middle"
                          />
                          {q.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}

          {/* Submit button */}
          <FadeIn>
            <div className="text-center py-8">
              <motion.button
                onClick={() => answeredCount === total && handleSubmit()}
                disabled={answeredCount < total || saving}
                className="px-12 py-4 bg-primary text-on-primary font-[family-name:var(--font-headline)] font-bold text-lg rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
                whileHover={
                  answeredCount === total ? { scale: 1.03 } : {}
                }
                whileTap={
                  answeredCount === total ? { scale: 0.97 } : {}
                }
              >
                {saving
                  ? "Đang nộp..."
                  : answeredCount < total
                    ? `Còn ${total - answeredCount} câu chưa trả lời`
                    : "Nộp Bài"}
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
