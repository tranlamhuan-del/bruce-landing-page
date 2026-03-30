"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name || !email || !message) return;

    setSending(true);
    try {
      const now = new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });
      await fetch(
        "https://script.google.com/macros/s/AKfycbxrUBPFhhhCboMKS6JAjrCSFAI2c6Tbry1VeTmEBxoXAcUkfv-YJSZVXnpqj7AcfYy6/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            name,
            email,
            message,
            time: now,
          }),
        }
      );
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto relative" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <FadeIn>
            <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-secondary uppercase mb-4">
              Liên hệ
            </h2>
            <h3 className="text-5xl md:text-6xl font-[family-name:var(--font-headline)] font-bold mb-12">
              Kết nối{" "}
              <span className="text-primary">cùng nhau</span>.
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
                  <MaterialIcon name="chat" className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-[family-name:var(--font-label)] text-on-surface-variant uppercase">
                    Zalo
                  </p>
                  <p className="text-lg font-[family-name:var(--font-body)]">
                    0903 876 566
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center">
                  <MaterialIcon name="location_on" className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-[family-name:var(--font-label)] text-on-surface-variant uppercase">
                    Ở đâu
                  </p>
                  <p className="text-lg font-[family-name:var(--font-body)]">
                    TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} direction="right">
          <div className="glass p-12 border border-outline-variant/30 rounded-xl">
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <MaterialIcon name="check_circle" className="text-primary text-5xl" />
                <p className="text-xl font-[family-name:var(--font-headline)] font-bold">
                  Đã gửi!
                </p>
                <p className="text-on-surface-variant font-[family-name:var(--font-body)]">
                  Cảm ơn bạn, tôi sẽ phản hồi sớm.
                </p>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Tên
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                    placeholder="Tên bạn"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Email
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface outline-none"
                    placeholder="email@domain.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant">
                    Nhắn gì đi
                  </label>
                  <textarea
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-2 transition-all font-[family-name:var(--font-body)] text-on-surface resize-none outline-none"
                    placeholder="Góp ý, hỏi thăm, hay chỉ chào một tiếng..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="w-full py-4 bg-primary text-on-primary font-[family-name:var(--font-headline)] font-bold text-lg rounded-lg transition-all disabled:opacity-50 hover:brightness-110 active:scale-[0.98]"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Đang gửi..." : "Gửi tin nhắn"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
