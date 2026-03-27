"use client";

import { motion } from "framer-motion";
import Logo from "../ui/Logo";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto gap-6">
        <Logo />
        <div className="font-[family-name:var(--font-label)] text-sm tracking-widest uppercase text-on-surface-variant text-center md:text-left">
          © 2024 BRUCE TRAN. LOGIC. DÀI HẠN. LUÔN TIẾN BỘ.
        </div>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-on-surface-variant hover:text-primary-fixed transition-colors font-[family-name:var(--font-label)] text-sm tracking-widest uppercase opacity-80 hover:opacity-100"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
