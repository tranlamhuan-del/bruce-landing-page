"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";

const navLinks = [
  { href: "/#about", label: "Về tôi" },
  { href: "/#journey", label: "Hành trình" },
  { href: "/#projects", label: "Dự án" },
  { href: "/#books", label: "Sách hay" },
  { href: "/#contact", label: "Liên hệ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/20 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-sm"
          : "bg-surface/60 backdrop-blur-xl"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.a>

        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary-fixed transition-colors font-[family-name:var(--font-headline)] font-bold tracking-tighter"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="/#contact"
          className="hidden md:block text-on-surface-variant hover:text-primary transition-colors font-[family-name:var(--font-headline)] font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Nhắn Bruce
        </motion.a>

        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-surface-container border-t border-outline-variant/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-8 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-on-surface-variant hover:text-primary-fixed transition-colors font-[family-name:var(--font-headline)] font-bold tracking-tighter text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
