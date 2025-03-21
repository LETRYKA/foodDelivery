import InfoDrawer from "@/components/mobile/infoDrawer";
import React from "react";

const Cart = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-full flex flex-col px-5">
          <div className="w-full flex flex-row justify-center items-center gap-2 mt-5">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-sm">Pending</p>
              <div className="w-8 h-auto aspect-square bg-[var(--foreground)] rounded-full flex justify-center items-center"></div>
            </div>
          </div>
          <p className="text-2xl font-semibold mt-10">Cart</p>
          <div className="w-full flex flex-col">
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <InfoDrawer key={index} food={food} />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
