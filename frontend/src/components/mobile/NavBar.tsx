"use client";

import { House, ListCheck, ReceiptText, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <div className="w-6/7 h-16 bg-[var(--foreground)] flex justify-between items-center px-10 rounded-full">
      <Link href="/home">
        <div className="h-full w-auto flex justify-center items-center cursor-pointer">
          <House
            width={20}
            className={pathname === "/home" ? "text-white" : "text-gray-400"}
          />
        </div>
      </Link>
      <div className="h-full w-auto flex justify-center items-center cursor-pointer">
        <ListCheck
          width={20}
          className={pathname === "/tasks" ? "text-white" : "text-gray-400"}
        />
      </div>
      <Link href="/orders">
        <div className="h-full w-auto flex justify-center items-center cursor-pointer">
          <ReceiptText
            width={20}
            className={pathname === "/orders" ? "text-white" : "text-gray-400"}
          />
        </div>
      </Link>
      <Link href="/profile">
        <div className="h-full w-auto flex justify-center items-center cursor-pointer">
          <UserRound
            width={20}
            className={pathname === "/profile" ? "text-white" : "text-gray-400"}
          />
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
