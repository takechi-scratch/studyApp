import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "テスト対策アプリ",
  description: "現在作成中です",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
