"use client";

import {
  Package,
  ArrowLeftRight,
  PanelsTopLeft,
  Layers2,
  Settings,
  LogOut,
} from "lucide-react";
import DashboardController from "@/components/dashboardController";
import { useState } from "react";
import { Button } from "./ui/button";
//https://next-shadcn-dashboard-starter.vercel.app/dashboard/product

export default function SideBar() {
  const [sideBarShow, setSideBarShow] = useState(true);

  const sideBarHandler = () => {
    setSideBarShow((prev) => !prev);
  };

  return (
    <>
      <div className={`${sideBarShow ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out h-full flex flex-col items-center bg-[var(--foreground)] relative`}>
        <div className={`w-3/4 flex ${sideBarShow ? 'justify-between' : 'justify-center'} mt-9`}>
          {sideBarShow && <img src="/imgs/default.png" className="h-8" />}
          <ArrowLeftRight className="stroke-white w-4 cursor-pointer" onClick={sideBarHandler} />
        </div>
        <hr className="w-full border-[var(--muted)] mt-6" />
        <div className={`w-3/4 h-40 flex flex-col mt-6 gap-4 ${!sideBarShow && 'items-center'}`}>
          <DashboardController
            icon={PanelsTopLeft}
            title={"Dashboard"}
            active={true}
            sideBarShow={sideBarShow}
          />
          <div className={`${sideBarShow ? 'ml-3' : ''} flex flex-col gap-5`}>
            <DashboardController
              icon={Package}
              title={"Order"}
              active={false}
              sideBarShow={sideBarShow}
            />
            <DashboardController
              icon={Layers2}
              title={"Menu"}
              active={false}
              sideBarShow={sideBarShow}
            />
          </div>
        </div>
        <div className={`w-3/4 h-40 flex flex-col ${sideBarShow ? '' : 'items-center'} mt-6 gap-5 absolute bottom-10`}>
          {sideBarShow && <p className="text-sm text-[var(--muted-foreground)]">Settings</p>}
          <DashboardController
            icon={Settings}
            title={"Settings"}
            active={false}
            sideBarShow={sideBarShow}
          />
          <DashboardController
            icon={LogOut}
            title={"Logout"}
            active={false}
            sideBarShow={sideBarShow}
          />
        </div>
      </div>
    </>
  );
}
