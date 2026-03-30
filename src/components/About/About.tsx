"use client";

import FadeIn from "../ui/FadeIn";
import MaterialIcon from "../ui/MaterialIcon";

export default function About() {
  return (
    <section className="py-32 px-8 bg-surface-container-low" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column */}
          <div className="space-y-12">
            <FadeIn>
              <div className="space-y-4">
                <h2 className="text-sm font-[family-name:var(--font-label)] tracking-[0.3em] text-primary uppercase">
                  Về tôi
                </h2>
                <h3 className="text-5xl font-[family-name:var(--font-headline)] font-bold">
                  Logic. Dài hạn. Luôn tiến bộ.
                </h3>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg font-[family-name:var(--font-body)]">
                <p>
                  Năm 2003, cùng 5 người bạn khởi nghiệp từ con số 0 — giờ đã hơn
                  20 năm trong ngành logistics và quản lý. Hiện là Thành viên HĐQT
                  và Phó Giám đốc phụ trách Tài chính &amp; Đầu tư của nhóm công ty.
                </p>
                <p>
                  Học Ngoại Thương (UEH), rồi lấy Thạc sĩ Tài chính tại Massey
                  University (New Zealand). Nền tảng đó giúp tôi tiếp cận mọi thứ —
                  từ quản trị đến AI — bằng tư duy hệ thống và logic, không chạy
                  theo trend.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-8 border-t border-outline-variant pt-12">
                <div>
                  <h4 className="text-primary font-[family-name:var(--font-headline)] font-bold text-3xl">
                    20+
                  </h4>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-label)] uppercase">
                    Năm trong logistics &amp; quản lý
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-[family-name:var(--font-headline)] font-bold text-3xl">
                    UEH
                  </h4>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-label)] uppercase">
                    &amp; Massey University, NZ
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <FadeIn delay={0.2} direction="right">
              <div className="glass p-8 space-y-6 border border-outline-variant/30 rounded-xl">
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface flex items-center gap-2">
                  <MaterialIcon name="psychology" className="text-secondary" />{" "}
                  Triết lý
                </h4>
                <ul className="space-y-4 font-[family-name:var(--font-body)] text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      Stoic — tập trung vào những gì kiểm soát được, không phí năng
                      lượng vào thứ ngoài tầm tay.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      Đầu tư theo Buffett &amp; Munger — giá trị thực, dài hạn,
                      không đầu cơ.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      Liên tục cải tiến — hôm nay phải tốt hơn hôm qua, dù chỉ 1%.
                    </span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="right">
              <div className="glass p-8 space-y-6 border border-outline-variant/30 rounded-xl">
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface flex items-center gap-2">
                  <MaterialIcon name="favorite" className="text-secondary" />{" "}
                  Ngoài công việc
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-[family-name:var(--font-body)]">
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Gia đình
                    </p>
                    <p className="text-on-surface-variant">
                      Vợ (Tiên), hai con trai — Cà Rem đang học ở Úc, Cà Ri lớp 11.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Chạy bộ
                    </p>
                    <p className="text-on-surface-variant">
                      Đang tập cho Full Marathon đầu tiên — mục tiêu 2026.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Đọc sách
                    </p>
                    <p className="text-on-surface-variant">
                      Getting to Yes, Good to Great, GTD — sách thay đổi cách nghĩ.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Âm nhạc
                    </p>
                    <p className="text-on-surface-variant">
                      Band Đại Nam — chơi đàn để cân bằng sau những con số.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
