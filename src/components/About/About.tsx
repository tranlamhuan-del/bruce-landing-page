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
                  Identity &amp; Heritage
                </h2>
                <h3 className="text-5xl font-[family-name:var(--font-headline)] font-bold">
                  Logic. Dài hạn. Luôn tiến bộ.
                </h3>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg font-[family-name:var(--font-body)]">
                <p>
                  Bắt đầu hành trình từ năm 2003 với việc sáng lập tập đoàn
                  logistics, tôi đã dành hai thập kỷ để giải mã các bài toán phức
                  tạp về chuỗi cung ứng và quản trị tài chính. Với vai trò Thành
                  viên HĐQT và Giám đốc Tài chính, tôi luôn đặt sự bền vững và
                  logic lên hàng đầu.
                </p>
                <p>
                  Tốt nghiệp Thạc sĩ Tài chính tại Đại học Massey (New Zealand) và
                  là cựu sinh viên Đại học Kinh tế TP.HCM - khoa Ngoại Thương (UEH), nền tảng học thuật vững chắc
                  giúp tôi tiếp cận công nghệ AI không chỉ như một công cụ, mà là
                  một đòn bẩy chiến lược cho sự tăng trưởng dài hạn.
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
                    Years Excellence
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-[family-name:var(--font-headline)] font-bold text-3xl">
                    UEH
                  </h4>
                  <p className="text-on-surface-variant text-sm font-[family-name:var(--font-label)] uppercase">
                    UEH & Massey Alumni
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <FadeIn delay={0.2} direction="right">
              <div className="glass p-8 space-y-6 border border-outline-variant/20">
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface flex items-center gap-2">
                  <MaterialIcon name="psychology" className="text-secondary" />{" "}
                  Philosophy
                </h4>
                <ul className="space-y-4 font-[family-name:var(--font-body)] text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      Tư duy khắc kỷ (Stoicism) trong quản trị áp lực và biến động
                      thị trường.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      Đầu tư theo triết lý của Warren Buffett &amp; Charlie Munger:
                      Tập trung vào giá trị thực.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    <span>
                      &quot;Constant Improvement&quot; - Không ngừng tối ưu hóa mọi quy
                      trình.
                    </span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="right">
              <div className="glass p-8 space-y-6 border border-outline-variant/20">
                <h4 className="text-xl font-[family-name:var(--font-headline)] font-bold text-on-surface flex items-center gap-2">
                  <MaterialIcon name="favorite" className="text-secondary" />{" "}
                  Personal Side
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-[family-name:var(--font-body)]">
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Tình Yêu của Trẫm
                    </p>
                    <p className="text-on-surface-variant">
                      Người bạn đời, hậu phương vững chắc.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Cà Rem &amp; Cà Ri
                    </p>
                    <p className="text-on-surface-variant">
                      Nguồn cảm hứng và năng lượng mỗi ngày.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Essential Reads
                    </p>
                    <p className="text-on-surface-variant italic">
                      &quot;Getting to Yes&quot;, &quot;Good to Great&quot;
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-on-surface font-bold uppercase tracking-wider">
                      Music
                    </p>
                    <p className="text-on-surface-variant">
                      Band Đại Nam - Khi nghệ thuật gặp gỡ logic.
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
