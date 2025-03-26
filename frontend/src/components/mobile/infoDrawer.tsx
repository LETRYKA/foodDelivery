"use client";

import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, SaveAllIcon, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const InfoDrawer = (props: any) => {
  const { foodData, isCart, key } = props;
  interface Food {
    _id: string;
    foodName: string;
    description: string;
    price: number;
    image: string;
  }

  const [food, setFood] = useState<Food | undefined>();
  const [quantity, setQuantity] = useState(isCart ? foodData?.quantity : 1);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const handleAddToCart = () => {
    addToCart({ food, quantity });
  };

  const handleDelete = () => {
    if (food?._id) {
      removeFromCart(food._id);
    }
  };

  const handleUpdate = () => {
    if (food?._id) {
      updateQuantity(food._id, quantity);
    }
  };

  function onClick(adjustment: number) {
    setQuantity(Math.max(0, Math.min(400, quantity + adjustment)));
  }

  const formattedPrice = new Intl.NumberFormat("mn-MN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(quantity * (food?.price ?? 0));

  useEffect(() => {
    if (isCart) {
      setFood(foodData?.food);
    } else {
      setFood(foodData);
    }
  }, []);
  return (
    <div className="dark z-40 w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <div
            key={key}
            className="w-full h-32 bg-[var(--foreground)]/5 rounded-[var(--radius)] flex flex-row justify-start items-center overflow-hidden gap-4 pr-3 border border-[var(--border)]/10 cursor-pointer"
          >
            <div
              className="h-full w-auto bg-slate-200 aspect-square bg-cover bg-center rounded-[var(--radius)]"
              style={{
                backgroundImage: `url(${food?.image})`,
              }}
            ></div>
            <div>
              <p className="text-base font-bold">{food?.foodName}</p>
              <p className="text-xs h-8 overflow-hidden text-[var(--background)]/30">
                {food?.description}
              </p>
              <div className="flex gap-2 h-7">
                <div className="bg-[#4FAF5A] h-full w-20 p-1 rounded-full flex justify-center items-center mt-2">
                  <p className="text-xs text-white">
                    {isCart
                      ? `${foodData.quantity * (food?.price ?? 0)}₮`
                      : `from ${food?.price}₮`}
                  </p>
                </div>
                {isCart && (
                  <div className="bg-[#4FAF5A] h-full w-auto aspect-square p-1 rounded-full flex justify-center items-center mt-2">
                    <p className="text-xs text-white">{quantity}x</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="w-full h-[1500px] bg-black border-none shadow-none">
          <DrawerTitle></DrawerTitle>
          <div className="mx-auto w-full px-5 mt-5">
            <div className="w-full h-auto aspect-square bg-[#101010] rounded-2xl bg-cover bg-top flex justify-between relative overflow-hidden">
              <img
                src={food?.image}
                className="absolute w-full h-full object-cover rounded-2xl z-0 [mask-image:linear-gradient(to_top,#000_0%,transparent_100%)]"
              />
              <div className="flex flex-col z-10 p-5 gap-2">
                <p className="text-xs text-[var(--background)]/40">
                  RECIPE OF THE DAY
                </p>
                <p className="text-2xl text-[var(--background)]/100 leading-7">
                  {food?.foodName}
                </p>
              </div>
              <div className="bg-[#4FAF5A]/40 w-20 h-7 p-1 rounded-full flex justify-center items-center mt-5 mr-4">
                <p className="text-xs text-white">from {food?.price}₮</p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between bg-[var(--background)]/10 px-5 py-4 rounded-2xl mt-5">
              <p className="text-sm text-[var(--background)]">Servings</p>
              <div className="flex flex-row justify-center items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-5 w-5 shrink-0 rounded-full"
                  onClick={() => onClick(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3" />
                </Button>
                <p className="text-sm text-[var(--background)]">{quantity}</p>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-5 h-5 shrink-0 rounded-full"
                  onClick={() => onClick(1)}
                  disabled={quantity >= 400}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="w-full mt-4 dark">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 -mt-4">
                    <p className="text-sm text-white/40 leading-6">
                      {food?.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Carousel className="w-full">
                      <CarouselContent className="flex flex-row">
                        {Array.from({ length: 9 }).map((_, index) => (
                          <CarouselItem key={index} className="basis-1/4">
                            <div className="flex flex-col justify-center items-center gap-2">
                              <div className="w-full h-auto aspect-square bg-[#262626] rounded-xl flex justify-center items-center cursor-pointer text-3xl">
                                🍚
                              </div>
                              <p className="text-xs">Rice</p>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <DrawerFooter className="w-full p-0 mt-6">
              {!isCart && (
                <DrawerClose asChild>
                  <Button
                    className="w-full py-6 rounded-full cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart /> Cart {formattedPrice}₮
                  </Button>
                </DrawerClose>
              )}
              {isCart && (
                <>
                  <DrawerClose asChild>
                    <Button
                      className="w-full py-6 rounded-full"
                      onClick={handleUpdate}
                    >
                      <SaveAllIcon /> Save Changes
                    </Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button
                      className="w-full py-6 rounded-full bg-[var(--destructive)] hover:bg-[var(--destructive)]/80"
                      onClick={handleDelete}
                    >
                      <Trash2 /> Delete
                    </Button>
                  </DrawerClose>
                </>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default InfoDrawer;
