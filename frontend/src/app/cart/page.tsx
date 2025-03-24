"use client";

import InfoDrawer from "@/components/mobile/infoDrawer";
import { useEffect, useState } from "react";
import { CartProvider } from "@/lib/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getCartFromLocalStorage = () => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartFromLocalStorage);
  };

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-white">
        <div className="w-full h-full flex flex-col px-5">
          <div className="w-full flex flex-row justify-center items-center gap-2 mt-5">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-sm">Pending</p>
              <div className="w-8 h-auto aspect-square bg-[var(--foreground)] rounded-full flex justify-center items-center"></div>
            </div>
          </div>
          <p className="text-2xl font-semibold mt-10">Cart</p>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col justify-center items-center mt-7 gap-4">
              <CartProvider>
                {cart.map((food, index) => (
                  <InfoDrawer key={index} foodData={food} isCart={true} />
                ))}
              </CartProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
