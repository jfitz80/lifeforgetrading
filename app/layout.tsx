import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life For Trading | The Trader's Operating System",
  description:
    "A practical guide to risk, discipline, and long-term market skill.",
  metadataBase: new URL("https://lifeforgetrading.com"),
  openGraph: {
    title: "The Trader's Operating System",
    description:
      "A practical guide to risk, discipline, and long-term market skill.",
    url: "https://lifeforgetrading.com",
    siteName: "Life For Trading",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
