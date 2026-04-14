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
              Quản trị &middot; Đầu tư &middot; AI &middot; Cuộc sống
            </span>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-headline)] font-bold leading-tight tracking-tight text-on-surface">
              Ghi lại hành trình,{" "}
              <span className="text-primary">chia sẻ</span> với bạn bè
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed font-[family-name:var(--font-body)]">
              Hơn 20 năm trong logistics và quản lý, đang nghiện AI, thích đọc sách, chạy bộ, chơi đàn,
              và luôn tìm cách cải thiện bản thân. Trang này là nơi tôi ghi lại những
              gì đang học, đang làm — quản trị, đầu tư, công nghệ, cuộc sống — và
              chia sẻ với bạn bè, gia đình.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/learn/ai-bai-1"
                className="bg-primary text-on-primary px-8 py-4 font-[family-name:var(--font-headline)] font-bold text-lg transition-all"
                whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Bắt đầu khoá AI
              </motion.a>
              <motion.a
                href="#projects"
                className="border border-outline text-on-surface px-8 py-4 font-[family-name:var(--font-headline)] font-bold text-lg hover:bg-surface-container-high transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Xem dự án
              </motion.a>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="md:col-span-5 relative" delay={0.4} direction="right">
          <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full" />
          <div className="relative aspect-[4/5] bg-surface-container-high overflow-hidden rounded-2xl">
            <Image
              src="/bruce-portrait.jpg"
              alt="Bruce Tran"
              fill
              className="object-cover opacity-95 hover:scale-105 transition-all duration-700"
              priority
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
