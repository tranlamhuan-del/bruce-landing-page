"use client";

import { motion } from "framer-motion";
import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

const books = [
  {
    title: "Getting to Yes",
    author: "Roger Fisher & William Ury",
    takeaway:
      "Đàm phán có nguyên tắc — tách con người ra khỏi vấn đề, tập trung vào lợi ích chứ không phải lập trường. Win-win luôn tốt hơn thắng-thua.",
    tag: "Đàm phán",
    tagColor: "bg-primary/15 text-primary",
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    takeaway:
      "Tốt là kẻ thù của vĩ đại. Kỷ luật trong con người, tư duy, và hành động — ba thứ đó đủ để đi xa.",
    tag: "Quản trị",
    tagColor: "bg-secondary/15 text-secondary-dim",
  },
  {
    title: "Built to Last",
    author: "Jim Collins & Jerry Porras",
    takeaway:
      "Xây tổ chức trường tồn, không phải phụ thuộc vào một người giỏi. Hệ thống tốt sống lâu hơn cá nhân xuất sắc.",
    tag: "Chiến lược",
    tagColor: "bg-tertiary/15 text-tertiary-dim",
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    takeaway:
      "Đầu óc để suy nghĩ, không phải để nhớ. Ghi ra, hệ thống hóa, rồi thực thi — đơn giản nhưng thay đổi cách làm việc.",
    tag: "Productivity",
    tagColor: "bg-primary/15 text-primary",
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    takeaway:
      "Đầu tư là kỷ luật, không phải đánh bạc. Margin of safety — luôn để biên an toàn, không bao giờ all-in.",
    tag: "Đầu tư",
    tagColor: "bg-secondary/15 text-secondary-dim",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    takeaway:
      "Kiểm soát phản ứng của mình, không phải hoàn cảnh. Viết bởi một hoàng đế La Mã — nhưng đọc như lời tự nhắc mỗi ngày.",
    tag: "Stoic",
    tagColor: "bg-tertiary/15 text-tertiary-dim",
  },
];

export default function BookCorner() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto" id="books">
      <FadeIn>
        <div className="mb-16">
          <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-secondary uppercase mb-4">
            Sách hay
          </h2>
          <h3 className="text-5xl font-[family-name:var(--font-headline)] font-bold">
            Những cuốn sách thay đổi cách nghĩ
          </h3>
          <p className="text-on-surface-variant text-lg mt-4 max-w-2xl font-[family-name:var(--font-body)]">
            Không phải sách nào cũng hay, nhưng mấy cuốn này thật sự ảnh hưởng
            đến cách tôi làm việc, đầu tư, và sống.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, i) => (
          <FadeIn key={book.title} delay={0.08 * i}>
            <motion.div
              className="glass p-8 border border-outline-variant/30 rounded-xl h-full flex flex-col justify-between group hover:border-primary/30 transition-all"
              whileHover={{ y: -4 }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`${book.tagColor} text-xs font-[family-name:var(--font-label)] uppercase tracking-widest px-3 py-1 rounded-full`}
                  >
                    {book.tag}
                  </span>
                  <MaterialIcon
                    name="menu_book"
                    className="text-outline text-xl"
                  />
                </div>
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold mb-1">
                  {book.title}
                </h4>
                <p className="text-on-surface-variant text-sm mb-4 font-[family-name:var(--font-label)]">
                  {book.author}
                </p>
                <p className="text-on-surface-variant leading-relaxed font-[family-name:var(--font-body)]">
                  {book.takeaway}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
