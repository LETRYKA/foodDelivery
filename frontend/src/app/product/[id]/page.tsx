"use client";

import { Minus, Plus, ShoppingBasket } from "lucide-react";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
import { CartProvider, useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import FoodList from "@/components/FoodList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFoodById } from "@/lib/api";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Product = () => {
  const param = useParams();
  const [quantity, setQuantity] = useState(1);
  const [foodData, setFoodData] = useState<{
    id: string;
    foodName: string;
    price: number;
    image: string;
    description: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    if (param.id && typeof param.id === "string") {
      fetchFoodById({ foodId: param.id }).then((data) => {
        setFoodData(data.data);
        setIsLoading(false);
      });
    }
  }, [param.id]);

  function onClick(adjustment: number) {
    setQuantity(Math.max(0, Math.min(400, quantity + adjustment)));
  }

  const handleAddToCart = (food: {
    id: string;
    foodName: string;
    price: number;
    image: string;
    description: string;
  }) => {
    addToCart({ food, quantity });
    toast.success("Successfully added to cart!");
  };

  const formattedPrice = new Intl.NumberFormat("mn-MN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(quantity * (foodData?.price ?? 0));

  return (
    <CartProvider>
      <div className="w-full h-full bg-white py-20">
        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <div className="w-full px-60 flex flex-row justify-center gap-16">
            <div className="w-auto h-[600px] aspect-square bg-slate-100 rounded-4xl overflow-hidden border-box group border shadow-lg relative">
              <div className="absolute z-10 flex left-5 top-7 px-4 py-2 bg-white/20 backdrop-blur-xs rounded-sm justify-center items-center text-[var(--background)] font-bold text-sm">
                {foodData?.price}₮
              </div>
              <img
                src={foodData?.image}
                className="w-full h-full object-cover z-0 group-hover:scale-110 scale-105 transition-all duration-200"
              />
            </div>
            <div className="w-auto h-[600px] aspect-square rounded-3xl flex flex-col">
              <p className="text-6xl font-semibold w-40">
                {foodData?.foodName}
              </p>
              <p className="text-base w-full text-[var(--foreground)]/60 mt-4">
                {foodData?.description}
              </p>
              <div className="flex flex-row justify-start items-center gap-6 mt-7">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-auto aspect-square shrink-0 rounded-full"
                  onClick={() => onClick(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3" />
                </Button>
                <p className="text-base font-bold">{quantity}</p>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-7 h-auto aspect-square  shrink-0 rounded-full"
                  onClick={() => onClick(1)}
                  disabled={quantity >= 400}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
              <p className="text-lg font-bold w-full mt-7">Ingredients</p>
              <Carousel className="w-full mt-4">
                <CarouselContent className="flex flex-row">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/9">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div className="w-full h-auto aspect-square border bg-[var(--foreground)]/2 rounded-sm flex justify-center items-center cursor-pointer text-base">
                          🍋
                        </div>
                        <p className="text-xs">Lemon</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <p className="text-lg font-bold w-full mt-7">Categories</p>
              <div className="w-full flex flex-row gap-2 mt-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="text-sm bg-[var(--foreground)]/2 border rounded-full py-2 px-4"
                  >
                    Delicious
                  </div>
                ))}
              </div>

              <Button
                onClick={() => foodData && handleAddToCart(foodData)}
                className="w-3/4 mt-10 py-7 rounded-full"
              >
                <ShoppingBasket />
                {formattedPrice}₮
              </Button>
            </div>
          </div>
        )}
        <CartProvider>
          <FoodList />
        </CartProvider>
      </div>
    </CartProvider>
  );
};

export default Product;
