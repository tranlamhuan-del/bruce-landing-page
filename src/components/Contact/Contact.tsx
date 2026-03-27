"use client";

import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

export default function Contact() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto relative" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <FadeIn>
            <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-secondary uppercase mb-4">
              Get in Touch
            </h2>
            <h3 className="text-5xl md:text-7xl font-[family-name:var(--font-headline)] font-bold mb-12">
              Kết nối để kiến tạo{" "}
              <span className="text-primary">giá trị</span>.
            </h3>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center">
                  <MaterialIcon name="mail" className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-[family-name:var(--font-label)] text-on-surface-variant uppercase">
                    Email
                  </p>
                  <p className="text-lg font-[family-name:var(--font-body)]">
                    tranlamhuan@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center">
                  <MaterialIcon name="location_on" className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-[family-name:var(--font-label)] text-on-surface-variant uppercase">
                    Location
                  </p>
                  <p className="text-lg font-[family-name:var(--font-body)]">
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} direction="right">
          <div className="glass p-12 border border-outline-variant/20">
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                  Full Name
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                  placeholder="Ông/Bà..."
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                  placeholder="email@domain.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                  Message
                </label>
                <textarea
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface resize-none outline-none"
                  placeholder="Chia sẻ ý tưởng hoặc lời chào của bạn..."
                  rows={4}
                />
              </div>
              <motion.button
                className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-[family-name:var(--font-headline)] font-bold text-lg uppercase tracking-tighter transition-all"
                type="submit"
                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
