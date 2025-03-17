"use client";

import FoodSkeleton from "@/components/Skeleton/FoodSkeleton";
import { deleteFoodById, fetchCategory } from "@/lib/api";
import { CreateDialog } from "@/components/CreateDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { EditDrawer } from "@/components/EditDrawer";
import { useEffect, useState } from "react";
import { fetchFoods } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Category {
  name: string;
}

interface DataType {
  _id: string;
  price: number;
  image: string;
  foodName: string;
  description: string;
}

const Menu = () => {
  const [foodsData, setFoodsData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const category = await fetchCategory();
      setCategories(category.data || []);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getFoods = async () => {
    setIsLoading(true);
    try {
      const foods = await fetchFoods();
      setFoodsData(foods?.data || []);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await deleteFoodById({
        foodId: id,
      });
      getFoods();
      toast.success("Successfully Deleted food!");
    } catch (err) {
      console.error("Error occurred deleting food:", err);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <div className="w-full h-[90%] flex flex-col items-center px-10 gap-7">
      <div className="w-full h-full flex flex-row items-start gap-7">
        <div className="w-1/6 h-auto bg-[var(--background)] rounded-[var(--radius)] py-4 px-6 pb-10">
          <CreateDialog dataRefresh={getFoods} />
          <p className="text-lg font-semibold">Filters</p>
          <div className="flex flex-col mt-4 gap-4">
            <p className="text-sm text-[var(--foreground)]/30 font-regular -mb-1">
              Categories
            </p>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`terms-${index}`} />
                <label
                  htmlFor={`terms-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category?.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {isLoading ? (
          <FoodSkeleton />
        ) : (
          <div className="w-5/6 grid grid-rows-auto grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 rounded-[var(--radius)] overflow-y-scroll">
            {Array.isArray(foodsData) && foodsData.length > 0 ? (
              foodsData.map((food, index) => (
                <div
                  key={index}
                  className="w-full h-fit bg-[var(--background)] rounded-[var(--radius)] p-4 border-1 border-transparent hover:border-slate-200 transition-all aspect-square"
                >
                  <div className="w-full h-[180px] bg-slate-300 rounded-[var(--radius)] overflow-hidden relative group">
                    <div
                      onClick={() => deleteFood(food?._id)}
                      className="absolute right-3 top-3 z-10 w-7 h-7 bg-[var(--destructive)] flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in cursor-pointer"
                    >
                      <Trash2 className="stroke-white" width={15} />
                    </div>
                    <div className="absolute left-3 top-3 z-10 bg-[var(--background)] rounded-full px-2 py-1 text-xs">
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
                  <EditDrawer
                    foodId={food?._id}
                    Category={categories}
                    dataRefresh={getFoods}
                  />
                </div>
              ))
            ) : (
              <p>Currently there is no food</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
