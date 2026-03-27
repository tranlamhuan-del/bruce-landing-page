"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

const expertiseCards = [
  {
    icon: "deployed_code",
    iconColor: "text-primary",
    title: "Tư vấn chuyển đổi quản trị bằng hệ thống AI",
    description:
      "Xây dựng lộ trình và triển khai các hệ thống quản trị thông minh, tối ưu hóa quy trình vận hành và ra quyết định dựa trên dữ liệu và AI.",
    tags: ["AI Strategy", "Digital Transformation", "Data-Driven Decisions"],
    colSpan: "md:col-span-2",
  },
  {
    icon: "payments",
    iconColor: "text-secondary",
    title: "Phân tích rủi ro tài chính & AI",
    description:
      "Tích hợp AI vào quản trị ròng tiền và phân tích rủi ro, đảm bảo sự ổn định và tăng trưởng dựa trên dự báo dữ liệu chính xác.",
    cta: "Deep Dive",
  },
  {
    icon: "precision_manufacturing",
    iconColor: "text-primary",
    title: "Chiến lược Logistics Thông minh",
    description:
      "Ứng dụng AI để tối ưu hóa mạng lưới vận hành và chuỗi cung ứng linh hoạt trong kỷ nguyên biến động.",
    progressBar: true,
  },
];

export default function Expertise() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto" id="experience">
      <FadeIn>
        <div className="mb-16">
          <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-secondary uppercase mb-4">
            Areas of Impact
          </h2>
          <h3 className="text-5xl font-[family-name:var(--font-headline)] font-bold">
            Expertise &amp; Strategy
          </h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {expertiseCards.map((card, i) => (
          <FadeIn
            key={card.title}
            delay={0.1 * i}
            className={card.colSpan || ""}
          >
            <motion.div
              className="glass p-10 flex flex-col justify-between border border-outline-variant/20 hover:border-primary/40 transition-all group h-full min-h-[300px]"
              whileHover={{ y: -4 }}
            >
              <div>
                <MaterialIcon
                  name={card.icon}
                  className={`text-4xl ${card.iconColor} mb-6`}
                />
                <h4 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-4">
                  {card.title}
                </h4>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                  {card.description}
                </p>
              </div>

              {card.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-[family-name:var(--font-label)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {card.cta && (
                <button className="mt-6 text-secondary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  {card.cta}{" "}
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </button>
              )}

              {card.progressBar && (
                <div className="mt-6 w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-500" />
              )}
            </motion.div>
          </FadeIn>
        ))}

        {/* AI Digital Twin Spotlight */}
        <FadeIn delay={0.4} className="md:col-span-2">
          <div className="relative overflow-hidden glass border border-outline-variant/20 flex items-center px-10 min-h-[250px]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent z-10" />
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtGE64kqfsqLsuThOMH67elBmFpioPTUXbf2CSjB_4ydl6KuaNhTAh3mMhtiyRZ59U__r0ZALPLAVdCUm_Gm6WENzzkjOTUBD5KNPoWF6tPhynTC6uDIp9Aot9vUDTez7qzWajCJ42wLefGToF0WjBGrpF1pNxLUSAdia9f5LWJX5-wXUrw4bVrK2Nca2CBIGzdtVoeqJ5StXPfPXg4bMdhv6YBTwTfihjSy3eIDRoCJEPz0YPP2eXGHIA_SyBj9Or76JIabtVOzct"
                alt="Circuit board"
                fill
                className="object-cover opacity-30"
              />
            </div>
            <div className="relative z-20 max-w-md py-10">
              <h4 className="text-3xl font-[family-name:var(--font-headline)] font-bold mb-2">
                AI Digital Twin
              </h4>
              <p className="text-on-surface-variant mb-6 italic">
                Project Spotlight: Mô phỏng hóa doanh nghiệp kỹ thuật số.
              </p>
              <motion.a
                href="#"
                className="inline-block py-2 px-6 bg-surface-bright border border-primary/30 font-[family-name:var(--font-headline)] font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Chi tiết dự án
              </motion.a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
