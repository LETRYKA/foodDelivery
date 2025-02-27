import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";

// Load the font with desired weights
const funnelDisplay = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-funnel-display",
});

export const metadata: Metadata = {
  title: "GoEat - Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={funnelDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
