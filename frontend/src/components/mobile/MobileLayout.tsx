// src/components/mobile/MobileLayout.tsx
import { Manrope } from "next/font/google";
import NavBar from "@/components/mobile/NavBar";
import "@/app/globals.css";
import { Toaster } from "sonner";

const manRope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-wrk-sans",
});

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={manRope.variable}>
      <Toaster position="bottom-right" richColors />
      {children}
      <div className="fixed bottom-7 w-full flex justify-center items-center z-50">
        <NavBar />
      </div>
    </div>
  );
}
