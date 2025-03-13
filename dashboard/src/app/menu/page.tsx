"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { fetchFoods } from "@/lib/api";
import { useEffect, useState } from "react";
import { EditDrawer } from "@/components/EditDrawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateDialog } from "@/components/CreateDialog";

const Menu = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [error, setError] = useState("");

  const getFoods = async () => {
    try {
      const foods = await fetchFoods();
      setFoodsData(foods?.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center px-10 gap-7">
      <div className="w-full h-80 bg-[#090D1B] rounded-[var(--radius)]"></div>
      <div className="w-full flex flex-row items-center gap-7">
        <div className="w-1/6 h-full bg-[var(--background)] rounded-[var(--radius)] py-4 px-6">
          <div className="w-full h-14 my-3 bg-[#090D1B] rounded-[var(--radius)] flex flex-row justify-center items-center gap-3 cursor-pointer">
            <p className="text-sm text-[var(--background)] font-bold">
              Create New Dish
            </p>
            <div className="h-[50%] aspect-square bg-[var(--background)] rounded-sm flex justify-center items-center">
              <Plus className="stroke-[var(--foreground)]" width={15} />
            </div>
          </div>
          <CreateDialog />
          <p className="text-lg font-semibold">Filters</p>
          <div className="flex flex-col mt-4 gap-4">
            <p className="text-sm text-[var(--foreground)]/30 font-regular -mb-1">
              Categories
            </p>
            {Array(4)
              .fill()
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`terms-${index}`} />
                  <label
                    htmlFor={`terms-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="w-5/6 h-full flex flex-row gap-4 rounded-[var(--radius)]">
          {Array.isArray(foodsData) && foodsData.length > 0 ? (
            foodsData.map((food, index) => (
              <div
                key={index}
                className="w-80 h-fit bg-[var(--background)] rounded-[var(--radius)] p-4 border-1 border-transparent hover:border-slate-200 transition-all"
              >
                <div className="w-full h-[180px] bg-slate-300 rounded-[var(--radius)] overflow-hidden cursor-pointer relative">
                  <div className="absolute right-3 top-3 z-10 bg-[var(--background)] rounded-full px-2 py-1 text-xs">
                    {food.price} ₮
                  </div>
                  <img
                    src={food?.image}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-107 transition-all duration-200 ease-in z-0"
                  />
                </div>
                <p className="text-lg font-bold mt-3">
                  {food?.foodName || "-"}
                </p>
                <p className="text-xs text-[var(--foreground)]/40 font-regular h-8 overflow-hidden">
                  {food?.description || "Currently there is no description"}
                </p>
                <div className="w-full bg-[var(--foreground)]/2 rounded-[var(--radius)] flex flex-col p-3 mt-3 gap-[1px]">
                  <p className="text-xs text-[var(--foreground)]/30">
                    Category
                  </p>
                  <p className="text-sm text-[var(--foreground)]">
                    Breakfast, Fast
                  </p>
                </div>
                <EditDrawer foodId={food?._id} dataRefresh={getFoods} />
              </div>
            ))
          ) : (
            <p>Currently there is no food</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
