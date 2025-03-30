import { fetchFood } from "@/lib/api";
import { useCart } from "@/lib/CartContext";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import FoodListSkeleton from "./Skeleton/FoodListSkeleton";

const FoodList = (props: any) => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    fetchFood().then((data) => {
      setFoodData(data.data);
      setIsLoading(false);
    });
  }, []);

  const handleAddToCart = (food: any[]) => {
    let quantity = 1;
    addToCart({ food, quantity });
    toast.success("Successfully added to cart!");
  };

  return (
    <div className="w-full px-10 md:px-36 mt-15">
      <p className="text-3xl font-black">Our Menu</p>
      {isLoading ? (
        <FoodListSkeleton />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 grid-rows-auto mt-8 gap-6">
          {/* CARD */}
          {foodData.map((food: any, index: any) => (
            <div
              key={index}
              className="w-full h-auto aspect-[6/7] border border-[var(--border)] rounded-2xl flex flex-col relative overflow-hidden box-border group bg-slate-700 group shadow-lg"
            >
              <Link href={`/product/${food._id}`}>
                <img
                  className="z-0 absolute w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)] cursor-pointer"
                  src={food?.image}
                />
              </Link>
              <div
                onClick={() => handleAddToCart(food)}
                className="absolute opacity-0 group-hover:opacity-100 flex right-3 top-4 w-12 h-auto aspect-square bg-[var(--background)] rounded-sm justify-center items-center cursor-pointer transition-all duration-200"
              >
                <ShoppingBasket width={20} />
              </div>
              <div className="absolute flex left-3 top-4 px-4 py-2 bg-white/20 backdrop-blur-xs rounded-sm justify-center items-center text-[var(--background)] font-bold text-sm">
                {food?.price}₮
              </div>
              <div className="z-10 absolute bottom-5 w-full flex flex-col justify-start items-start px-5">
                <p className="text-xl text-[var(--background)] font-semibold">
                  {food?.foodName}
                </p>
                <p className="text-sm text-[var(--background)]/60 h-10 group-hover:h-14 overflow-hidden mt-2 transition-all duration-200">
                  {food?.description}
                </p>
              </div>
            </div>
          ))}
          {/* END */}
        </div>
      )}
    </div>
  );
};

export default FoodList;
