import {
  Bell,
  MapPin,
  Search,
  Settings2,
  ShoppingBasket,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
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
      <div className="bg-white w-full h-screen flex-col justify-center items-center p-5 mt-2 rounded-t-4xl">
        <div className="w-full flex flex-row justify-start items-center gap-5">
          {/* START */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-14 h-14 bg-[#262626] rounded-full flex justify-center items-center cursor-pointer">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/meat-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-beef-chicken-food-pack-drink-illustrations-4497597.png?f=webp"
                width={35}
              />
            </div>
            <p className="text-xs">Meat</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-14 h-14 bg-[var(--foreground)]/10 rounded-full flex justify-center items-center">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/burger-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-hamburger-cheeseburger-food-drink-illustrations-4216874.png?f=webp"
                width={35}
              />
            </div>
            <p className="text-xs">Burger</p>
          </div>
          {/* END */}
        </div>
        <p className="w-full text-xl font-bold mt-7 mb-3">Popular items</p>
        <div
          className="w-full h-auto aspect-7/5 bg-[#4FAF5A] rounded-4xl shadow-lg bg-center bg-cover relative"
          style={{
            backgroundImage: `url(https://www.shutterstock.com/image-photo/black-burger-on-wooden-cutting-600nw-639998476.jpg)`,
          }}
        >
          <div className="w-full flex justify-between">
            <p className="text-3xl font-bold text-white p-7 leading-8">
              Cheese hot
              <br />
              Hamburger
            </p>
            <div className="bg-[var(--background)]/20 h-4 p-4 rounded-full flex justify-center items-center m-5">
              <p className="text-xs text-white">from 430$</p>
            </div>
            <div className="absolute bottom-0 w-full justify-center items-center p-4">
              <Button
                variant="outline"
                className="w-full py-6 rounded-full cursor-pointer"
              >
                <ShoppingBasket />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-7 gap-2">
          <div className="w-full h-32 bg-[var(--foreground)]/5 rounded-[var(--radius)] flex flex-row justify-start items-center overflow-hidden gap-4 pr-3 border border-[var(--border)]/40 cursor-pointer">
            <div
              className="h-full w-auto bg-slate-200 aspect-square bg-cover bg-center rounded-[var(--radius)]"
              style={{
                backgroundImage: `url(https://www.dominos.com.my/ManagedAssets/MY/product/PXBP/MY_PXBP_en_menu_12818.jpg)`,
              }}
            ></div>
            <div>
              <p className="text-base font-bold">Pepperoni pizza</p>
              <p className="text-xs h-8 overflow-hidden text-[var(--foreground)]/30">
                Pepperoni is an American variety of spicy salami made from cured
                pork and beef... seasoned with paprika and chili peppers.
              </p>
              <div className="bg-[#4FAF5A] w-20 p-1 rounded-full flex justify-center items-center mt-2">
                <p className="text-xs text-white">from 430$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
