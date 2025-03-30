"use client";

import {
  Bell,
  CreditCard,
  LogOut,
  MapPin,
  ShoppingBasket,
  User,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

const Header = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const handleLogOut = () => {
    console.log(`LOGOUT`);
    Cookies.remove("token", { path: "/" });
    router.push("/auth/sign-in");
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));

    const fetchUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        if (currentUser !== null) {
          setUser(currentUser.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="w-full px-10 md:px-36 py-8 flex flex-row justify-between z-50">
      <div className="flex justify-center items-center z-50">
        <Link href={`/home`}>
          <p className="text-2xl font-medium">
            Eat<strong className="text-[var(--primary)]">Me</strong>
          </p>
          {/* <img src="/logo.png" className="w-20 h-auto aspect-square" /> */}
        </Link>
      </div>
      <p className="hidden md:flex text-sm font-medium bg-white text-[var(--foreground)] h-10 px-5 rounded-full cursor-pointer justify-center items-center gap-2">
        <MapPin width={16} className="stroke-[var(--primary)]" />
        {user?.address || "-"}
      </p>
      <div className="flex justify-center items-center gap-2">
        <p className="h-10 w-auto aspect-square bg-[var(--foreground)] text-[var(--background)] rounded-full cursor-pointer flex justify-center items-center group">
          <Bell className="w-4 h-auto aspect-square group-hover:w-4.5 transition-all duration-200" />
        </p>
        <Link href={`/cart`}>
          <div className="h-10 w-auto aspect-square bg-[var(--foreground)] text-[var(--background)] rounded-full cursor-pointer flex justify-center items-center relative group">
            {cart.length > 0 && (
              <div className="absolute -right-2 -top-2 w-5 h-5 bg-[#4FAF5A] rounded-full flex justify-center items-center text-xs text-white">
                {cart.length}
              </div>
            )}
            <ShoppingBasket className="w-4 h-auto aspect-square group-hover:w-4.5 transition-all duration-200" />
          </div>
        </Link>
        {user === null && (
          <Link href="/auth/sign-in">
            <p className="text-sm font-medium bg-[var(--foreground)] text-[var(--background)] py-2 px-5 rounded-full cursor-pointer flex justify-center items-center gap-2">
              <UserRound width={15} /> Login
            </p>
          </Link>
        )}
        {user !== null && (
          <div className="flex flex-row justify-center items-center gap-4 ml-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-auto h-10 aspect-square">
                  <AvatarImage src={user?.profile} alt="@shadcn" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 dark mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={`/profile`}>
                    <DropdownMenuItem>
                      <User />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/cart`}>
                    <DropdownMenuItem>
                      <ShoppingBasket />
                      <span>Cart</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="group" onClick={handleLogOut}>
                    <LogOut className="group-hover:stroke-red-300" />
                    <span className="group-hover:text-red-300">Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
