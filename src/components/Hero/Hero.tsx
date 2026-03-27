"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8">
          <FadeIn delay={0.2}>
            <span className="inline-block text-secondary font-[family-name:var(--font-label)] tracking-[0.2em] text-sm uppercase">
              Logistics x AI Executive
            </span>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-[family-name:var(--font-headline)] font-bold leading-none tracking-tight text-on-surface">
              Từ logistics đến AI —{" "}
              <span className="text-primary italic">hành trình</span> không ngừng
              học hỏi
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed font-[family-name:var(--font-body)]">
              Với 20 năm kinh nghiệm trong lĩnh vực logistics, tôi kết hợp tư duy
              đầu tư giá trị của Buffett &amp; Munger cùng công nghệ AI tiên tiến
              để kiến tạo những hệ thống vận hành tự động và thông minh hơn.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-primary-fixed text-on-primary-fixed px-8 py-4 font-[family-name:var(--font-headline)] font-bold text-lg transition-all"
                whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Khám phá dự án AI
              </motion.button>
              <motion.button
                className="border border-outline-variant text-on-surface px-8 py-4 font-[family-name:var(--font-headline)] font-bold text-lg hover:bg-surface-container-high transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Tư duy đầu tư
              </motion.button>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="md:col-span-5 relative" delay={0.4} direction="right">
          <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full" />
          <div className="relative aspect-[4/5] bg-surface-container-high overflow-hidden border border-outline-variant/30">
            <Image
              src="/bruce-portrait.jpg"
              alt="Bruce Tran - Logistics x AI Executive"
              fill
              className="object-cover grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
