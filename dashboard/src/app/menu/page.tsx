"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { fetchFoods } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const Menu = () => {
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const foods = await fetchFoods();
        setFoodData(foods?.data || []);
      } catch (err) {
        setError(err.message);
      }
    };
    loadFoods();
  }, []);

  console.log(foodData);

  return (
    <div className="w-full h-full flex flex-col items-center px-10 gap-7">
      <div className="w-full h-80 bg-[#090D1B] rounded-[var(--radius)]"></div>
      <div className="w-full flex flex-row items-center gap-7">
        <div className="w-1/6 h-full bg-[var(--background)] rounded-[var(--radius)] py-4 px-6">
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
          {Array.isArray(foodData) && foodData.length > 0 ? (
            foodData.map((food, index) => (
              <div
                key={index}
                className="w-96 h-fit bg-[var(--background)] rounded-[var(--radius)] px-5 py-4 border-1 border-transparent hover:border-slate-200 transition-all"
              >
                <div className="w-full h-[250px] bg-slate-300 rounded-[var(--radius)] overflow-hidden cursor-pointer relative">
                  <div className="absolute right-3 top-3 z-10 bg-[var(--background)] rounded-full px-2 py-1 text-xs">
                    {food.price} ₮
                  </div>
                  <img
                    src={food?.image}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-107 transition-all duration-200 ease-in z-0"
                  />
                </div>
                <p className="text-lg font-semibold mt-3">
                  {food?.foodName || "-"}
                </p>
                <p className="text-sm text-[var(--foreground)]/40 font-regular">
                  {food?.description || "Currently there is no description"}
                </p>
                <div className="w-full bg-[var(--foreground)]/2 rounded-[var(--radius)] flex flex-col p-4 mt-3 gap-[1px]">
                  <p className="text-xs text-[var(--foreground)]/30">
                    Category
                  </p>
                  <p className="text-sm text-[var(--foreground)]">
                    Breakfast, Fast
                  </p>
                </div>
                <button className="w-full h-12 bg-[var(--foreground)] flex flex-row justify-center items-center gap-2 rounded-[var(--radius)] mt-6 group hover:bg-[var(--background)] border transition-all duration-100 ease-in cursor-pointer mb-2">
                  <p className="text-[var(--background)] text-sm flex group-hover:text-[var(--foreground)] transition-all duration-100 ease-in">
                    Edit food
                  </p>
                  <ArrowUpRight
                    width={18}
                    className="stroke-[var(--background)] group-hover:stroke-[var(--foreground)] transition-all duration-100 ease-in"
                  />
                </button>
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
