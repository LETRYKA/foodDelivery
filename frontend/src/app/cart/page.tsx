"use client";

import { CartProvider } from "@/lib/CartContext";
import CartMobile from "@/components/mobile/Cart";
import { useEffect, useState } from "react";
import CartWeb from "@/components/Cart";
import { CreateOrder } from "@/lib/api";
import { toast } from "sonner";

interface ItemData {
  foodId: string;
  items: any[];
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [items, setItems] = useState<ItemData[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== "undefined" ? window.innerWidth <= 550 : false;
  });

  const getCartFromLocalStorage = () => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartFromLocalStorage);
  };

  const handleCheckOut = async () => {
    try {
      const response = await CreateOrder({ items });
      if (response?.success) {
        localStorage.clear();
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error("Error", err);
      toast.error("Failed to place order");
    }
  };

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const formattedItems: ItemData[] = cart
      .filter((item) => item)
      .map((item: any) => ({
        foodId: item?.food?._id ?? item?.id ?? "",
        items: [],
        quantity: item?.quantity ?? 0,
      }))
      .filter((i) => i.foodId && i.quantity > 0);
    setItems(formattedItems);
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsMobile(window.innerWidth <= 550);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <CartMobile
          cart={cart.map((item: any) => ({
            id: Number(item?.food?._id ?? item?.id ?? 0),
            name: item?.food?.foodName ?? item?.name ?? "",
            price: item?.food?.price ?? item?.price ?? 0,
            quantity: item?.quantity ?? 0,
          }))}
          handleCheckOut={handleCheckOut}
        />
      ) : (
        <CartProvider>
          <CartWeb cart={cart} handleCheckOut={handleCheckOut} />
        </CartProvider>
      )}
      ;
    </>
  );
};

export default Cart;
