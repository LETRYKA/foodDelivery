"use client";

import { Bell, MapPin, Search, Settings2, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchFood, fetchCategory } from "@/lib/api";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import InfoDrawer from "@/components/mobile/infoDrawer";

export default function Home() {
  const [foodData, setFoodData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchFood().then((data) => {
      setFoodData(data.data);
    });
    fetchCategory().then((data) => {
      setCategory(data.data);
    });
  }, []);

  console.log(category);

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
      <div className="bg-white w-full h-full flex-col justify-center items-center p-5 mt-2 rounded-t-4xl">
        <div className="w-full flex flex-row justify-start items-center gap-5">
          {/* START */}
          <Carousel className="w-full">
            <CarouselContent>
              {category.map((category, index) => (
                <CarouselItem key={index} className="basis-1/5">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-14 h-14 bg-[#262626] rounded-full flex justify-center items-center cursor-pointer">
                      <img
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/meat-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-beef-chicken-food-pack-drink-illustrations-4497597.png?f=webp"
                        width={35}
                      />
                    </div>
                    <p className="text-xs">{category.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* END */}
        </div>
        <p className="w-full text-xl font-bold mt-7 mb-3">Popular items</p>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="w-full h-auto aspect-7/5 p-0 border-none shadow-none">
                  <div
                    className="w-full h-full bg-[#4FAF5A] rounded-4xl shadow-lg bg-center bg-cover relative"
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
                      <div className="bg-[var(--background)]/20 absolute h-4 p-4 rounded-full flex justify-center items-center top-4 right-4">
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
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="w-full flex flex-col justify-center items-center mt-7 gap-4">
          {foodData.map((food, index) => (
            <InfoDrawer key={index} food={food} />
          ))}
        </div>
      </div>
    </>
  );
}
