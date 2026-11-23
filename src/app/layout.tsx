import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alisa (Xiao) — UI/UX Designer",
  description:
    "UI/UX designer for product teams: mobile apps and web products for business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
