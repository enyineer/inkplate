import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { inkplateConfig } from '../inkplate.config.mjs';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${inkplateConfig.siteName} Blog`,
  description: `${inkplateConfig.siteName} Home`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
