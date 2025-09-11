import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Toaster, toast } from "sonner";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className="w-full h-screen flex">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          <Toaster position="bottom-right" richColors />
          {children}
        </div>
      </body>
    </html>
  );
}
