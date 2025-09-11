import { Bell, MapPin, Search, Settings2, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { fetchCurrentUser } from "@/lib/api";
import Link from "next/link";

const Header = () => {
  const [cart, setCart] = useState([]);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [locationText, setLocationText] = useState<string>(
    "Detecting location..."
  );

  useEffect(() => {
    (async () => {
      try {
        const currentUser: any = await fetchCurrentUser();
        if (currentUser?.data?.address) {
          setUserAddress(currentUser.data.address);
          setLocationText(currentUser.data.address);
        }
      } catch {}
    })();

    if (typeof window !== "undefined") {
      const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setCart(cartFromLocalStorage);
      console.log(cartFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!navigator?.geolocation) {
      setLocationText("Location unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { Accept: "application/json" } }
          );
          const data = await resp.json();
          const display =
            data?.display_name ||
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setLocationText(display);
        } catch (e) {
          setLocationText(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      },
      () => setLocationText("Location permission denied"),
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
    );
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex justify-between">
        <div className="flex flex-col justify-start">
          <p className="text-[var(--background)]/70 text-xs">Хаян</p>
          <p className="text-[var(--background)] mt-1 text-sm font-medium flex justify-center items-center gap-1 truncate">
            <MapPin className="stroke-none fill-[#4FAF5A]" width={18} />
            <span className="truncate max-w-[220px]">
              {userAddress ?? locationText}
            </span>
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer">
            <Bell stroke="white" width={16} />
          </div>
          <Link href="/cart">
            <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer relative">
              <ShoppingBasket stroke="white" width={16} />
              {cart.length > 0 && (
                <div className="absolute -right-2 -top-1 w-5 h-5 bg-[#4FAF5A] rounded-full flex justify-center items-center text-xs text-white">
                  {cart.length}
                </div>
              )}
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
