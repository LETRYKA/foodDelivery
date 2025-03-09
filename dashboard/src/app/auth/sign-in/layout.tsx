import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import { Toaster, toast } from "sonner";
import "@/app/globals.css";

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
      <body className="w-full h-screen flex">
        <div className="w-full h-full">
          <Toaster position="bottom-right" richColors />
          {children}
        </div>
      </body>
    </html>
  );
}
