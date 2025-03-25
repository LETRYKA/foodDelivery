"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DetailDrawerProps {
  key: string;
  order: any;
}
import InfoDrawer from "@/components/mobile/infoDrawer";

const DetailDrawer: React.FC<DetailDrawerProps> = ({ key, order }) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild className="w-full">
          <div
            key={key}
            className="w-full h-28 bg-[var(--foreground)]/5 rounded-[var(--radius)] flex flex-row justify-start items-center overflow-hidden gap-4 pr-3 border border-[var(--border)]/10 cursor-pointer"
          >
            <div
              className="h-full w-auto bg-slate-200 aspect-square bg-cover bg-center rounded-[var(--radius)]"
              style={{
                backgroundImage: `url(${order?.items?.[0]?.food?.image})`,
              }}
            ></div>
            <div>
              <p className="text-base font-bold">{order.status}</p>
              <p className="text-xs h-8 overflow-hidden text-[var(--foreground)]/40">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </p>
              <div className="flex gap-2 h-7">
                <div className="bg-[#4FAF5A] h-full px-3 p-1 rounded-full flex justify-center items-center">
                  <p className="text-xs text-white">{order.totalPrice}₮</p>
                </div>
                <div className="bg-[#4FAF5A] h-full w-auto aspect-square p-1 rounded-full flex justify-center items-center">
                  <p className="text-xs text-white">{order.items.length}x</p>
                </div>
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerTitle></DrawerTitle>
        <DrawerContent>
          <div className="w-full flex flex-col px-7 gap-3 my-5">
            {order.items.map((food, index) => (
              <InfoDrawer key={index} foodData={food} isCart={true} />
            ))}
          </div>
          <div className="mx-auto w-full max-w-sm">
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DetailDrawer;
