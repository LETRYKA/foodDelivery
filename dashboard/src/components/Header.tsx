"use client";

import { BellIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { Calendar, Inbox, LogOut, ShoppingBasket, User } from "lucide-react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";

const Header = async () => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const router = useRouter();

  console.log(user);

  const getUser = async () => {
    try {
      const data: any = await fetchCurrentUser();
      if (!data) {
        console.log(`NOT`);
        redirect("/auth/sign-in");
      } else {
        setUser(data);
        console.log(`FETCH DONE`);
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
    }
  };

  const handleLogOut = () => {
    Cookies.remove("token", { path: "/" });
    router.push("/auth/sign-in");
  };

  const dateFormat: string = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-full h-24 flex flex-row justify-between items-center gap-6 px-10">
        <div className="h-full flex flex-col justify-center items-start">
          <p className="text-xs text-[var(--muted-foreground)] flex flex-row items-center gap-1">
            <Calendar width={13} />
            {dateFormat}
          </p>
          <div className="text-2xl text-[var(--foreground)] font-regular -mt-2 flex">
            Welcome back,&nbsp;
            <strong className="text-[var(--chart-3)]">{user.data.name}</strong>
          </div>
        </div>
        <div className="flex h-full justify-end items-center flex-row gap-6">
          <div className="relative -mr-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl w-[85%] h-[85%] aspect-square cursor-pointer"
                >
                  <EnvelopeIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Mails</h4>
                    <div className="w-full h-52 border-1 border-dashed rounded-[var(--radius)] flex flex-col justify-center items-center gap-1 mt-4">
                      <Inbox className="w-8 h-8 stroke-[var(--sidebar-ring)]" />
                      <p className="text-xs text-[var(--sidebar-ring)]">
                        Currently there is no mail
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl w-[85%] h-[85%] aspect-square cursor-pointer"
                >
                  <BellIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notification</h4>
                    <div className="w-full h-52 border-1 border-dashed rounded-[var(--radius)] flex flex-col justify-center items-center gap-1 mt-4">
                      <Inbox className="w-8 h-8 stroke-[var(--sidebar-ring)]" />
                      <p className="text-xs text-[var(--sidebar-ring)]">
                        Currently there is no notification
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--destructive)] rounded-4xl flex justify-center items-center cursor-pointer">
              <p className="text-[11px] text-[var(--background)]">4</p>
            </div>
          </div>
          <hr className="border-t-0 border-r-1 border-[var(--sidebar-ring)] h-2/4" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Profile user={user.data} />
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
      </div>
    </>
  );
};

export default Header;
