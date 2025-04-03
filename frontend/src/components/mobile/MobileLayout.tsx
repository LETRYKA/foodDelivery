import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "@/app/globals.css";

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
    </div>
  );
}
