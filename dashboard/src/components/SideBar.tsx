"use client";

import {
  ScrollText,
  ArrowLeftToLine,
  LayoutDashboard,
  ShoppingBasket,
  Sidebar,
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
      <div className="w-full h-screen overflow-hidden bg-[var(--sidebar)]">
        <div
          className={`
            transition-all
            duration-300
            ease-in-out
            relative
            ${
              sideBarShow ? "w-64" : "w-20"
            } h-full bg-[var(--background)] flex flex-col items-center shadow-lg`}
        >
          <div className="flex flex-row w-full h-auto justify-center items-center my-6 gap-2">
            <img src="./imgs/gem.webp" width={30} alt="Picture of the author" />
            {sideBarShow && (
              <>
                <p className="text-xl text-[var(--foreground)] font-semibold">
                  Food Eats.
                </p>
              </>
            )}
          </div>
          <ArrowLeftToLine
            onClick={sideBarHandler}
            className="w-5 mt-2 stroke-[var(--primary)] cursor-pointer"
          />
          <div className="w-3/4 flex justify-start flex-col mt-20">
            {sideBarShow && (
              <p className="text-xs text-[var(--muted-foreground)]">OVERVIEW</p>
            )}
            <div
              className={`mt-4 flex flex-col gap-7 justify-center ${
                sideBarShow ? "" : "items-center"
              }`}
            >
              <DashboardController
                icon={LayoutDashboard}
                title={"Dashboard"}
                active={true}
                sideBarShow={sideBarShow}
              />
              <DashboardController
                icon={ScrollText}
                title={"Order"}
                active={false}
                sideBarShow={sideBarShow}
              />
              <DashboardController
                icon={ShoppingBasket}
                title={"Menu"}
                active={false}
                sideBarShow={sideBarShow}
              />
            </div>
          </div>
          <div className="absolute bottom-10 w-3/4">
            {sideBarShow && (
              <p className="text-xs text-[var(--muted-foreground)]">SETTINGS</p>
            )}
            <div
              className={`mt-4 flex flex-col gap-7 justify-center ${
                sideBarShow ? "" : "items-center"
              }`}
            >
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
        </div>
      </div>
    </>
  );
}
