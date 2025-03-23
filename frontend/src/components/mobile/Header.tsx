import { Bell, MapPin, Search, Settings2, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { useEffect } from "react";

const Header = () => {
  // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <div className="w-full p-5">
      <div className="flex justify-between">
        <div className="flex flex-col justify-start">
          <p className="text-[var(--background)]/70 text-xs">
            Delivery Location
          </p>
          <p className="text-[var(--background)] mt-1 text-sm font-medium flex justify-center items-center gap-1">
            <MapPin className="stroke-none fill-[#4FAF5A]" width={18} /> 3517
            Washington Ave
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer">
            <Bell stroke="white" width={16} />
          </div>
          <Link href="/cart">
            <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer relative">
              <ShoppingBasket stroke="white" width={16} />
              {/* {cartFromLocalStorage.length > 0 && (
                <div className="absolute -right-2 -top-1 w-5 h-5 bg-[#4FAF5A] rounded-full flex justify-center items-center text-xs text-white">
                  {cartFromLocalStorage.length}
                </div>
              )} */}
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full px-4 py-2 mt-5 flex justify-between items-center bg-[var(--background)]/10 rounded-[var(--radius)]">
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <Search stroke="grey" width={18} />
          <Input
            placeholder="Search your favorite food"
            className="border-none focus-visible:ring-0 text-[var(--background)] text-xs w-full"
          />
        </div>
        <Settings2 stroke="grey" width={18} />
      </div>
    </div>
  );
};

export default Header;
