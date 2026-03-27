"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Xin chào! Tôi là trợ lý ảo của **Bruce Tran** — chuyên gia Quản Trị Doanh Nghiệp & Tài Chính Đầu Tư.\n\nTôi có thể giúp bạn tìm hiểu về:\n- 💼 Dịch vụ tư vấn quản trị & tài chính\n- 🤖 Giải pháp AI cho doanh nghiệp\n- 📚 Kinh nghiệm & triết lý đầu tư\n\nBạn cần hỗ trợ gì?";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: GREETING }]);
      setInput("");
      setIsTyping(false);
      setIsRefreshing(false);
    }, 500);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const reply = data.reply || data.error || "Đã xảy ra lỗi.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, kết nối bị gián đoạn. Vui lòng thử lại.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    const html = marked.parse(text) as string;
    return { __html: html };
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-shadow"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-symbols-outlined text-2xl">chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] flex flex-col rounded-xl overflow-hidden border border-outline-variant/30 shadow-2xl"
            style={{
              background: "rgba(14, 14, 14, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-fixed text-lg">
                      smart_toy
                    </span>
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#4ade80] border-2 border-surface animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-[family-name:var(--font-headline)] font-bold text-on-surface">
                    Bruce_Personal_AI
                  </p>
                  <p className="text-[10px] font-[family-name:var(--font-label)] text-[#4ade80] uppercase tracking-widest">
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleRefresh}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
                  title="Làm mới cuộc hội thoại"
                >
                  <span
                    className={`material-symbols-outlined text-on-surface-variant text-lg transition-transform duration-500 ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  >
                    refresh
                  </span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
                  title="Đóng"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary-fixed text-on-primary-fixed rounded-2xl rounded-br-sm"
                        : "bg-surface-container-high text-on-surface rounded-2xl rounded-bl-sm border border-outline-variant/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div
                        className="chat-markdown"
                        dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                      />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-surface-container-high text-on-surface-variant rounded-2xl rounded-bl-sm px-4 py-3 border border-outline-variant/10">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-on-surface-variant font-[family-name:var(--font-label)]">
                        Đang nhập
                      </span>
                      <span className="flex gap-1">
                        <span
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-outline-variant/20 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-surface-container-high text-on-surface text-sm px-4 py-3 rounded-full border border-outline-variant/20 focus:border-primary/50 focus:outline-none transition-colors placeholder:text-on-surface-variant/50 font-[family-name:var(--font-body)]"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined text-lg">
                    send
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
