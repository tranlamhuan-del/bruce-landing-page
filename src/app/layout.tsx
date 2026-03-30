import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bruce Tran — Quản trị · Đầu tư · AI · Cuộc sống",
  description:
    "Trang cá nhân của Bruce Tran — chia sẻ hành trình hơn 20 năm trong logistics và quản lý, đầu tư, AI, sách hay, và cuộc sống.",
  openGraph: {
    title: "Bruce Tran — Quản trị · Đầu tư · AI · Cuộc sống",
    description:
      "Ghi lại hành trình, chia sẻ với bạn bè — quản trị, đầu tư, AI, sách hay, chạy bộ, âm nhạc.",
    url: "https://www.tranlamhuan.vn",
    siteName: "Bruce Tran",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
