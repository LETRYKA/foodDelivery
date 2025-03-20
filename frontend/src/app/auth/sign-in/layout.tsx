import type { Metadata } from "next";
import NavBar from "@/components/mobile/NavBar";
import "@/app/globals.css";

import { Manrope } from "next/font/google";

const manRope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
