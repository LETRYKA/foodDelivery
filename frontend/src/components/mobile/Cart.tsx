import { CreditCard } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CartProvider } from "@/lib/CartContext";
import InfoDrawer from "./infoDrawer";

const CartMobile = (props: any) => {
  const { cart, handleCheckOut } = props;
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

export default CartMobile;
