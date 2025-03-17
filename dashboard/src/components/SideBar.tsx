"use client";

import DashboardController from "@/components/dashboardController";
import { useState } from "react";
import { Package, ArrowLeftRight, PanelsTopLeft, Layers2 } from "lucide-react";
import { Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function SideBar() {
  const [sideBarShow, setSideBarShow] = useState(true);

  const sideBarHandler = () => {
    setSideBarShow((prev) => !prev);
  };

  return (
    <div
      className={`${sideBarShow ? "w-64" : "w-20"} transition-all duration-300 ease-in-out h-full flex flex-col items-center bg-[var(--foreground)] relative`}
    >
      <div className={`w-3/4 flex ${sideBarShow ? "justify-between" : "justify-center"} mt-9`}>
        {sideBarShow && <img src="/imgs/default.png" className="h-8" />}
        <ArrowLeftRight className="stroke-white w-4 cursor-pointer" onClick={sideBarHandler} />
      </div>
      <hr className="w-full border-[var(--background)]/15 mt-6" />
      <div className={`w-3/4 h-40 flex flex-col mt-6 gap-3 ${!sideBarShow && "items-center"}`}>
        <DashboardController icon={PanelsTopLeft} title="Dashboard" path="/dashboard" sideBarShow={sideBarShow} />
        <DashboardController icon={Package} title="Order" path="/orders" sideBarShow={sideBarShow} />
        <DashboardController icon={Layers2} title="Menu" path="/menu" sideBarShow={sideBarShow} />
      </div>
      <div className={`w-3/4 h-40 flex flex-col ${sideBarShow ? "" : "items-center"} absolute bottom-10`}>
        {sideBarShow && <p className="text-sm text-[var(--muted-foreground)]">Settings</p>}
        <div className="mt-4 flex flex-col gap-2">
          <DashboardController icon={Cog6ToothIcon} title="Settings" path="/settings" sideBarShow={sideBarShow} />
          <DashboardController icon={ArrowLeftStartOnRectangleIcon} title="Logout" path="/logout" sideBarShow={sideBarShow} />
        </div>
      </div>
    </div>
  );
}
