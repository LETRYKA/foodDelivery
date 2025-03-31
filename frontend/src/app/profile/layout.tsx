"use client";

import Header from "@/components/Header";
import MobileLayout from "@/components/mobile/MobileLayout";
import NavBar from "@/components/mobile/NavBar";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <MobileLayout>
      {!isMobile && (
        <div className="h-20">
          <Header />
        </div>
      )}
      {children}
      {isMobile && (
        <div className="fixed bottom-7 w-full flex justify-center items-center z-50">
          <NavBar />
        </div>
      )}
    </MobileLayout>
  );
}
