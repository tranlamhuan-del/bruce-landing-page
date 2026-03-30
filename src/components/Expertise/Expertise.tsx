"use client";

import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

const interests = [
  {
    icon: "smart_toy",
    iconColor: "text-primary",
    title: "AI & Automation",
    description:
      "Đang học, đang thử nghiệm, đang chia sẻ với bạn bè. Từ ChatGPT đến tự build AI agent — hành trình của một tay ngang nghiện AI.",
    tags: ["Đang học", "Chia sẻ", "Thử nghiệm"],
    link: { href: "#projects", label: "Xem dự án AI" },
  },
  {
    icon: "account_balance",
    iconColor: "text-secondary",
    title: "Quản trị doanh nghiệp",
    description:
      "Hơn 20 năm khởi nghiệp và quản lý — những bài học thực tế về xây dựng hệ thống, con người, và ra quyết định.",
    tags: ["Kinh nghiệm thực tế", "Hệ thống hóa"],
  },
  {
    icon: "trending_up",
    iconColor: "text-tertiary",
    title: "Đầu tư tài chính",
    description:
      "Theo triết lý Buffett & Munger — tập trung vào giá trị thực, tư duy dài hạn. Không đầu cơ, không chạy theo đám đông.",
    tags: ["Value Investing", "Dài hạn"],
  },
];

export default function Expertise() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto" id="journey">
      <FadeIn>
        <div className="mb-16">
          <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-secondary uppercase mb-4">
            Đang quan tâm
          </h2>
          <h3 className="text-5xl font-[family-name:var(--font-headline)] font-bold">
            Những thứ tôi đang nghiên cứu
          </h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interests.map((card, i) => (
          <FadeIn key={card.title} delay={0.1 * i}>
            <motion.div
              className="glass p-10 flex flex-col justify-between border border-outline-variant/30 hover:border-primary/40 transition-all group h-full min-h-[300px] rounded-xl"
              whileHover={{ y: -4 }}
            >
              <div>
                <MaterialIcon
                  name={card.icon}
                  className={`text-4xl ${card.iconColor} mb-6`}
                />
                <h4 className="text-2xl font-[family-name:var(--font-headline)] font-bold mb-4">
                  {card.title}
                </h4>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6">
                {card.tags && (
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-[family-name:var(--font-label)] text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {card.link && (
                  <a
                    href={card.link.href}
                    className="mt-4 inline-block text-primary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest group-hover:tracking-[0.2em] transition-all"
                  >
                    {card.link.label} →
                  </a>
                )}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
