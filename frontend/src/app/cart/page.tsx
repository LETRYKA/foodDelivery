"use client";

import InfoDrawer from "@/components/mobile/infoDrawer";
import { useEffect, useState } from "react";
import { CartProvider } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { CreateOrder } from "@/lib/api";
import { toast } from "sonner";
import CartMobile from "@/components/mobile/Cart";
import CartWeb from "@/components/Cart";

interface ItemData {
  foodId: string;
  items: any[];
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<
    { food: { _id: string }; quantity: number }[]
  >([]);
  const [items, setItems] = useState<ItemData[]>([
    {
      foodId: "",
      items: [],
      quantity: 0,
    },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  const getCartFromLocalStorage = () => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartFromLocalStorage);
  };
  console.log(cart);

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
    const formattedItems = cart.map((item) => ({
      foodId: item.food._id,
      items: [],
      quantity: item.quantity,
    }));
    setItems(formattedItems);
  }, [cart]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <CartMobile cart={cart} handleCheckOut={handleCheckOut} />
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
