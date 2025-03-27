import {
  AtSign,
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Header from "./Header";

const HomeWeb = (props: any) => {
  const { foodData, category } = props;
  return (
    <>
      <div className="w-full h-[2000px] bg-white/90">
        <Header />
        <div className="w-full px-10 md:px-36 mt-5 flex flex-row justify-center gap-4">
          <Carousel className="w-full lg:w-7/10 xl:9/10">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-10/4 items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="w-3/10 aspect-10/4 flex-col gap-4 hidden lg:flex">
            <div className="w-full h-2/4 bg-slate-300 rounded-[var(--radius)]"></div>
            <div className="w-full h-2/4 bg-slate-300 rounded-[var(--radius)]"></div>
          </div>
        </div>
        <div className="w-full h-24 bg-[#FFB91D] mt-15 flex flex-row justify-center items-center gap-20">
          <Marquee gradient={true} gradientColor={`#FFB91D`}>
            {Array(5)
              .fill()
              .map((item, index) => (
                <p className="text-[#715202] font-black text-5xl font-[Monument_Extended] flex justify-center items-center gap-5">
                  <AtSign className="w-10 h-auto aspect-square text-[#715202]/40 ml-5" />
                  COFFEE LATTE
                </p>
              ))}
          </Marquee>
        </div>
        <Carousel className="w-full px-10 md:px-36 mt-15">
          <CarouselContent>
            {category.map((category: any, index: any) => (
              <CarouselItem key={index} className="basis-1/15">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-14 h-14 bg-[var(--foreground)]/10 rounded-full flex justify-center items-center cursor-pointer">
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
        <div className="w-full px-10 md:px-36 mt-15">
          <p className="text-3xl font-black">Our Menu</p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 grid-rows-auto mt-8 gap-6">
            {/* CARD */}
            {foodData.map((food: any, index: any) => (
              <Link href={`product/${food._id}`}>
                <div
                  key={index}
                  className="w-full h-auto aspect-[6/7] border border-[var(--border)] rounded-2xl flex flex-col relative overflow-hidden box-border group bg-slate-700 group shadow-lg"
                >
                  <img
                    className="z-0 absolute w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)] cursor-pointer"
                    src={food?.image}
                  />
                  <div className="absolute opacity-0 group-hover:opacity-100 flex right-3 top-4 w-12 h-auto aspect-square bg-[var(--background)] rounded-sm justify-center items-center cursor-pointer transition-all duration-200">
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
              </Link>
            ))}
            {/* END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeWeb;
