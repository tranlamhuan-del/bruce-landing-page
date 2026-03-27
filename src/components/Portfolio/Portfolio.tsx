"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "../ui/FadeIn";

const portfolioItems = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aqloKBB4iX2edX5ExPaEkm_WOzHUOpuuym3yIwQWH3db-edbVBFvW28VNkuD4aSbTNckY9XFhlit-1RuZysU4j1T9nz5_YiCZfiWPhFfh6cAKNWOpjKd3MXpQGUCDFVOur0Y6hGPnlcozAmn3QHtGJU6ZLdzslmxYfMvmHnbGbu5Pq09CKTzpQnMsI1X39rzVP6PR4xS9IdyimIG1e3YYtkOUumjEHr9c812AXkncWL67ldVdQUNK8pxL57secJxXRWjaGS4Oby4",
    alt: "Marathon runner at sunrise",
    badge: "FINISHED",
    badgeColor: "bg-primary text-on-primary",
    title: "First Full Marathon",
    description:
      "Chinh phục 42.195km không chỉ là thử thách thể chất, mà là bài tập về sự kiên định và ý chí thép.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtuU7BGQv8gxzCgAmVftw8Rk3vWYTD0BQPDcAOmRe3kfXesfAlkt73Oq15B4wDVzVXBpg8iBr6hJdAwdVAOd49MRDTSk6i0XJq1t2__u1BT71B2AOdnIM_2G1pgLFdKQdRTaKpt3jzrGr6M1hi5E5GboaiWzl-9-bTGZf3GjzgWw3IJ_GpAGNu3Rgim6FWHNHAoaZiBNE9Q-az-COOtjpxiKLAV9IXrWgb11aRiESPhqIMV1UaAwO2_X1salBsl1Kd5eHvzdoWCydP",
    alt: "Neural network visualization",
    badge: "IN PROGRESS",
    badgeColor: "bg-secondary text-on-secondary",
    title: "AI Digital Twin System",
    description:
      "Xây dựng bản sao số của hệ thống vận hành logistics, cho phép dự báo và tối ưu hóa trước khi thực thi.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCne2qzieFWebADBAvyN6GPOM6vPmrejdW1n0XHq9PoRn0727Ui06jEdxG5O1YDGrO9K7Adt8o1OBC3_1Yhvv_0v8_F8JciazdjY8Wa82DGSmNtGA5xvSTw_kCNuj6WI86f2RvL5gnQIG6-P_-En1xhpWOqAOBOXHDN0b1Qnsx8MjV6h_SNAYUrObWD5kkdwmM13oBmxBLkK22m9eX5EVkg7Y1uBVTf_AFj3y-gV8EOXHArrIK961eOc7Y7VreKHKvNllnJEMH9Qotr",
    alt: "Guitar and microphone on stage",
    badge: "PASSION",
    badgeColor: "bg-surface-bright text-on-surface",
    title: "Band Dai Nam",
    description:
      "Âm nhạc là nơi tôi tìm thấy sự cân bằng, tái tạo năng lượng sau những giờ phút làm việc với số liệu.",
  },
];

export default function Portfolio() {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <FadeIn className="max-w-2xl">
            <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-primary uppercase mb-4">
              The Journey
            </h2>
            <h3 className="text-5xl md:text-6xl font-[family-name:var(--font-headline)] font-bold">
              Sự giao thoa giữa Kỷ luật &amp; Sáng tạo
            </h3>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-on-surface-variant font-[family-name:var(--font-body)] max-w-sm">
              Cuộc sống là một chuỗi các thử nghiệm và nỗ lực bền bỉ, từ đường
              chạy marathon đến những nốt nhạc trầm bổng.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {portfolioItems.map((item, i) => (
            <FadeIn key={item.title} delay={0.15 * i}>
              <motion.div className="space-y-6 group cursor-pointer">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 ${item.badgeColor} font-[family-name:var(--font-label)] text-xs px-3 py-1`}
                  >
                    {item.badge}
                  </div>
                </div>
                <h4 className="text-2xl font-[family-name:var(--font-headline)] font-bold">
                  {item.title}
                </h4>
                <p className="text-on-surface-variant font-[family-name:var(--font-body)]">
                  {item.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
