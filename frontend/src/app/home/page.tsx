import { Bell, MapPin, Search, Settings2, ShoppingBasket } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-full p-5">
        <div className="flex justify-between">
          <div className="flex flex-col justify-start">
            <p className="text-[var(--background)] text-sm">
              Delivery Location
            </p>
            <p className="text-[var(--background)] mt-1 text-base font-medium flex gap-1">
              <MapPin className="stroke-none fill-amber-300" width={18} /> 3517
              Washington Ave
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer">
              <Bell stroke="white" width={16} />
            </div>
            <div className="w-10 h-10 bg-[var(--background)]/10 rounded-full flex justify-center items-center cursor-pointer">
              <ShoppingBasket stroke="white" width={16} />
            </div>
          </div>
        </div>
        <div className="w-full p-4 mt-5 flex justify-between items-center bg-[var(--background)]/10 rounded-[var(--radius)]">
          <div className="flex flex-row justify-center items-center gap-2">
            <Search stroke="grey" width={18} />
            <p className="text-sm text-[var(--background)]/30">
              Search your favourite food
            </p>
          </div>
          <Settings2 stroke="grey" width={18} />
        </div>
      </div>
      <div className="bg-white w-full h-full flex flex-col justify-center items-center p-5 mt-2 rounded-t-[var(--radius)]">
        <div className="w-full h-44 bg-amber-300 rounded-[var(--radius)] shadow-lg"></div>
        <p className="w-full text-base font-bold mt-4">Food Categories</p>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-30 h-40 flex flex-col justify-center items-center">
            <div className="w-full h-full bg-[var(--foreground)]/10 rounded-[var(--radius)]"></div>
            <p className="text-sm">Drinks</p>
          </div>
        </div>
      </div>
    </>
  );
}
