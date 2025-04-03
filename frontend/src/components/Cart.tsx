"use client";

import { ChevronLeft, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";

const CartWeb = (props: any) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { handleCheckOut } = props;

  const formattedPrice = (price: number, quantity: number) =>
    new Intl.NumberFormat("mn-MN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(quantity * price);

  const handleDelete = (id: string) => {
    if (id) {
      removeFromCart(id);
    }
  };

  const handleUpdate = (id: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 400) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="w-full h-screen bg-[var(--background)]">
      <div className="w-full h-full px-36 py-20 flex flex-row justify-center gap-10">
        <div className="w-7/10 h-60">
          <p className="text-3xl font-black mb-16">Shopping Cart.</p>
          <div className="w-full flex flex-row justify-between">
            <p className="font-semibold">Product</p>
            <div className="flex flex-row gap-36 mr-48">
              <p className="font-semibold">Quantity</p>
              <p className="font-semibold">Price</p>
            </div>
          </div>
          <hr className="my-7" />
          <div className="w-full h-auto flex flex-col gap-5">
            {cart.map((food: any) => (
              <div
                key={food?.food?._id}
                className="w-full h-32 flex flex-row justify-between items-center"
              >
                <div className="h-full flex flex-row justify-center items-center gap-6">
                  <div
                    className="h-full w-auto aspect-square rounded-lg bg-center bg-cover items-center"
                    style={{
                      backgroundImage: `url(${food?.food?.image})`,
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-black">
                      {food?.food?.foodName}
                    </p>
                    <p className="text-sm text-[var(--foreground)]/70 w-80 h-10 overflow-hidden mt-2">
                      {food?.food?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center mr-10 gap-20">
                  <div className="flex flex-row justify-start items-center gap-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-auto aspect-square shrink-0 rounded-full"
                      onClick={() =>
                        handleUpdate(food?.food?._id, food.quantity - 1)
                      }
                      disabled={food.quantity <= 1}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <p className="text-base font-bold">{food.quantity}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-7 h-auto aspect-square  shrink-0 rounded-full"
                      onClick={() =>
                        handleUpdate(food?.food?._id, food.quantity + 1)
                      }
                      disabled={food.quantity >= 400}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                  <p className="w-30 flex justify-center items-center">
                    {formattedPrice(food?.food?.price, food.quantity)}₮
                  </p>
                  <X
                    cursor={`pointer`}
                    className="stroke-[var(--foreground)]/40"
                    onClick={() => handleDelete(food?.food?._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link href={`/home`}>
            <p className="text-xl font-bold mt-20 flex items-center gap-1 hover:gap-0 cursor-pointer transition-all duration-200">
              <ChevronLeft />
              Back to Shopping
            </p>
          </Link>
        </div>
        <div className="w-3/10 h-96 bg-slate-100 rounded-2xl px-10">
          <Button onClick={handleCheckOut} className="w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartWeb;
