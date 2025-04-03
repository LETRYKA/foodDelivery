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
  const [cart, setCart] = useState<
    { id: string; name: string; price: number; quantity: number }[]
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
      foodId: item.id,
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
        <CartMobile
          cart={cart.map((item) => ({
            id: Number(item.id),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
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
