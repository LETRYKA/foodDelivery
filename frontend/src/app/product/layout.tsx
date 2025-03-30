"use client";

import MobileLayout from "@/components/mobile/MobileLayout";
import NavBar from "@/components/mobile/NavBar";
import { CartProvider } from "@/lib/CartContext";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileLayout>
      {<CartProvider>{children}</CartProvider>}
      <div className="fixed bottom-7 w-full flex justify-center items-center z-50">
        <NavBar />
      </div>
    </MobileLayout>
  );
}
