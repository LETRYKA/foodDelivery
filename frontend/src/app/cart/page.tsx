"use client";

import InfoDrawer from "@/components/mobile/infoDrawer";
import { useEffect, useState } from "react";
import { CartProvider } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { CreateOrder } from "@/lib/api";
import { toast } from "sonner";

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

  const getCartFromLocalStorage = () => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartFromLocalStorage);
  };
  console.log(cart);

  const handleCheckOut = async () => {
    try {
      await CreateOrder({
        items: items,
      });
      localStorage.clear();
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error("Error while placing order", err);
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

  return (
    <>
      <div className="w-full h-screen bg-white">
        <div className="w-full h-full flex flex-col px-5">
          <div className="w-full flex flex-row justify-center items-center gap-2 mt-5"></div>
          <p className="text-2xl font-semibold mt-10">Cart</p>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col justify-center items-center mt-7 gap-4">
              <CartProvider>
                {cart.map((food, index) => (
                  <InfoDrawer key={index} foodData={food} isCart={true} />
                ))}
              </CartProvider>
              {cart.length >= 0 && (
                <Button className="w-full py-6 mt-8" onClick={handleCheckOut}>
                  <CreditCard />
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
