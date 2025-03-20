import { House, ListCheck, ReceiptText, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="w-6/7 h-16 bg-[var(--foreground)] flex justify-between items-center px-10 rounded-full">
      <Link href="/home">
        <div className="h-full w-auto flex justify-center items-center cursor-pointer">
          <House width={20} stroke="white" />
        </div>
        </Link>
        <div className="h-full w-auto flex justify-center items-center cursor-pointer">
          <ListCheck width={20} stroke="grey" />
        </div>
        <Link href="/orders">
          <div className="h-full w-auto flex justify-center items-center cursor-pointer">
            <ReceiptText width={20} stroke="grey" />
          </div>
        </Link>
        <Link href="/profile">
          <div className="h-full w-auto flex justify-center items-center cursor-pointer">
            <UserRound width={20} stroke="grey" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
