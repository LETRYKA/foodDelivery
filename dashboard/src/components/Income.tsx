"use client";

import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

const Income = (props: any) => {
  const { orders } = props;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderData(orders.data);
  });

  return (
    <>
      <div className="w-full flex justify-between items-center mt-5">
        <p className="text-lg font-medium text-[var(--foreground)] flex item-scenter gap-1">
          <BuildingLibraryIcon className="fill-[var(--primary)]" width={17} />{" "}
          Income
        </p>
        <Ellipsis width={20} className="cursor-pointer" />
      </div>
      <div
        className="income w-full h-full flex flex-col justify-start items-center mt-5 gap-4 overflow-scroll pb-14"
        style={{
          maskImage: "linear-gradient(to bottom, white 85%, transparent 100%)",
        }}
      >
        {orderData
          .filter((order) => order?.status === "Delivered")
          .map((order, index) => (
            <div
              key={index}
              className="w-full h-20 bg-[var(--background)] rounded-[var(--radius)] flex flex-row justify-between items-center p-4 cursor-pointer border-1 border-transparent hover:border-[var(--foreground)]/15 transition-all duration-150 ease-in-out"
            >
              <div className="flex flex-row gap-3">
                <div
                  className="w-11 h-11 bg-slate-300 rounded-4xl bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${order?.user?.profile})`,
                  }}
                ></div>
                <div className="flex flex-col items-start justify-center">
                  <p className="text-base text-[var(--foreground)] font-semibold">
                    {order?.user?.name || "-"}
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)] font-regular -mt-[3px]">
                    {order.items.length} Orders
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-base text-[#59cc53] font-bold">
                  {order.totalPrice}₮
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)] font-regular -mt-[3px]">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Income;
