"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "../ui/FadeIn";

const portfolioItems = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtuU7BGQv8gxzCgAmVftw8Rk3vWYTD0BQPDcAOmRe3kfXesfAlkt73Oq15B4wDVzVXBpg8iBr6hJdAwdVAOd49MRDTSk6i0XJq1t2__u1BT71B2AOdnIM_2G1pgLFdKQdRTaKpt3jzrGr6M1hi5E5GboaiWzl-9-bTGZf3GjzgWw3IJ_GpAGNu3Rgim6FWHNHAoaZiBNE9Q-az-COOtjpxiKLAV9IXrWgb11aRiESPhqIMV1UaAwO2_X1salBsl1Kd5eHvzdoWCydP",
    alt: "AI Digital Twin visualization",
    badge: "ĐANG LÀM",
    badgeColor: "bg-primary text-on-primary",
    title: "AI Digital Twin",
    description:
      "Xây dựng bản sao số của bản thân bằng AI — từ chatbot cá nhân đến tự động hóa công việc hàng ngày. Dự án \"nghiện\" nhất hiện tại.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aqloKBB4iX2edX5ExPaEkm_WOzHUOpuuym3yIwQWH3db-edbVBFvW28VNkuD4aSbTNckY9XFhlit-1RuZysU4j1T9nz5_YiCZfiWPhFfh6cAKNWOpjKd3MXpQGUCDFVOur0Y6hGPnlcozAmn3QHtGJU6ZLdzslmxYfMvmHnbGbu5Pq09CKTzpQnMsI1X39rzVP6PR4xS9IdyimIG1e3YYtkOUumjEHr9c812AXkncWL67ldVdQUNK8pxL57secJxXRWjaGS4Oby4",
    alt: "Khóa học AI",
    badge: "CHIA SẺ",
    badgeColor: "bg-secondary text-on-secondary",
    title: "Khóa AI cho bạn bè",
    description:
      "Tự học rồi chia sẻ lại — từ AI căn bản đến prompt engineering. Có quiz, có bài tập, có hỏi đáp. Ai cũng học được.",
    links: [
      { href: "/learn/ai-bai-1", label: "Bắt đầu học Bài 1 →" },
    ],
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aqloKBB4iX2edX5ExPaEkm_WOzHUOpuuym3yIwQWH3db-edbVBFvW28VNkuD4aSbTNckY9XFhlit-1RuZysU4j1T9nz5_YiCZfiWPhFfh6cAKNWOpjKd3MXpQGUCDFVOur0Y6hGPnlcozAmn3QHtGJU6ZLdzslmxYfMvmHnbGbu5Pq09CKTzpQnMsI1X39rzVP6PR4xS9IdyimIG1e3YYtkOUumjEHr9c812AXkncWL67ldVdQUNK8pxL57secJxXRWjaGS4Oby4",
    alt: "Marathon runner at sunrise",
    badge: "MỤC TIÊU 2026",
    badgeColor: "bg-tertiary text-on-tertiary",
    title: "Full Marathon đầu tiên",
    description:
      "42.195km — không chỉ là chạy, mà là bài tập về kiên nhẫn và kỷ luật. Đang tập, đang tiến bộ từng ngày.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCne2qzieFWebADBAvyN6GPOM6vPmrejdW1n0XHq9PoRn0727Ui06jEdxG5O1YDGrO9K7Adt8o1OBC3_1Yhvv_0v8_F8JciazdjY8Wa82DGSmNtGA5xvSTw_kCNuj6WI86f2RvL5gnQIG6-P_-En1xhpWOqAOBOXHDN0b1Qnsx8MjV6h_SNAYUrObWD5kkdwmM13oBmxBLkK22m9eX5EVkg7Y1uBVTf_AFj3y-gV8EOXHArrIK961eOc7Y7VreKHKvNllnJEMH9Qotr",
    alt: "Guitar and microphone on stage",
    badge: "ĐAM MÊ",
    badgeColor: "bg-surface-container-high text-on-surface",
    title: "Band Đại Nam",
    description:
      "Chơi đàn để cân bằng — khi nghệ thuật gặp logic. Sau những con số là những nốt nhạc.",
  },
];

export default function Portfolio() {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <FadeIn className="max-w-2xl">
            <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-primary uppercase mb-4">
              Dự án & Thử nghiệm
            </h2>
            <h3 className="text-5xl md:text-6xl font-[family-name:var(--font-headline)] font-bold">
              Đang làm, đang học, đang chơi
            </h3>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-on-surface-variant font-[family-name:var(--font-body)] max-w-sm">
              Mỗi dự án là một bài học. Có cái nghiêm túc, có cái cho vui —
              nhưng cái nào cũng đáng thử.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioItems.map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i}>
              <motion.div className="space-y-5 group cursor-pointer">
                <div className="aspect-square overflow-hidden relative rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 ${item.badgeColor} font-[family-name:var(--font-label)] text-xs px-3 py-1 rounded-full`}
                  >
                    {item.badge}
                  </div>
                </div>
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold">
                  {item.title}
                </h4>
                <p className="text-on-surface-variant font-[family-name:var(--font-body)] text-sm leading-relaxed">
                  {item.description}
                </p>
                {item.links && (
                  <div className="flex flex-col gap-2">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-block text-primary font-[family-name:var(--font-label)] text-xs uppercase tracking-widest hover:tracking-[0.2em] transition-all"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
