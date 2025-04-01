"use client";

import Header from "@/components/Header";
import MobileLayout from "@/components/mobile/MobileLayout";
import { CartProvider } from "@/lib/CartContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileLayout>
      <div className="h-20">
        <Header />
      </div>
      <CartProvider>{children}</CartProvider>
    </MobileLayout>
  );
}
