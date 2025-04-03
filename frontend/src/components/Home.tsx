import {
  ArrowUpRight,
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
import CategorySkeleton from "./Skeleton/CategorySkeleton";
import { CartProvider } from "@/lib/CartContext";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import Marquee from "react-fast-marquee";
import FoodList from "./FoodList";
import { fetchFoodByCategories } from "@/lib/api";
import { toast } from "sonner";

const HomeWeb = (props: any) => {
  const { foodData, category, isLoading } = props;

  const handleCategoryFilter = async (id: string) => {
    try {
      const res = await fetchFoodByCategories({
        id,
      });
      console.log(res);
      toast.success("Filtered items updated successfully!");
    } catch (err) {
      console.error("Error updating user", err);
      toast.error("Error updating user.");
    }
  };

  return (
    <>
      <div className="w-full h-full bg-white pb-40">
        <div className="w-full px-10 md:px-36 mt-5 flex flex-row justify-center gap-4">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full lg:w-7/10 xl:9/10"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card
                      className=" aspect-10/6 bg-center bg-cover"
                      style={{
                        backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/fs/7066a0222182411.67e1a1786481e.png)`,
                      }}
                    >
                      <CardContent className="flex h-full items-center justify-center p-6 bg-cover bg-center"></CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="w-3/10 aspect-10/4 flex-col gap-4 hidden lg:flex py-1">
            <div className="w-full h-2/4 bg-slate-300 rounded-[var(--radius)] overflow-hidden box-border relative group">
              <ArrowUpRight className="z-10 absolute right-5 top-4 w-7  h-auto aspect-square stroke-white opacity-0 group-hover:opacity-100 transion-all duration-200" />
              <p className="z-10 absolute -bottom-24 tracking-wider group-hover:bottom-3 left-6 font-black sm:text-xl  md:text-xl  lg:text-3xl xl:text-5xl text-[var(--background)] font-[Monument_Extended] transition-all duration-200 ease-in-out">
                SAUCE
              </p>
              <img
                src="https://i.pinimg.com/736x/57/96/83/5796834a12b73df8a8aeaa75f3c80c5a.jpg"
                className="absolute w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 z-0 cursor-pointer"
              />
            </div>
            <div className="w-full h-2/4 bg-slate-300 rounded-[var(--radius)] overflow-hidden box-border relative group">
              <ArrowUpRight className="z-10 absolute right-5 top-4 w-7  h-auto aspect-square stroke-white opacity-0 group-hover:opacity-100 transion-all duration-200" />
              <p className="z-10 absolute tracking-wider -bottom-24 group-hover:bottom-3 left-6 font-black sm:text-xl  md:text-xl  lg:text-3xl xl:text-5xl text-[var(--background)] font-[Monument_Extended] transition-all duration-200 ease-in-out">
                SPECIAL BURGER
              </p>
              <img
                src="https://i.pinimg.com/736x/27/b9/f4/27b9f4db2bd5906112d60c752197311a.jpg"
                className="absolute w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 z-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <Marquee
          gradient={true}
          gradientColor={`var(--primary)`}
          className="w-full h-24 bg-[var(--primary)] mt-15 flex flex-row justify-center items-center gap-20"
        >
          {Array(5)
            .fill(5)
            .map((item, index) => (
              <p key={index} className="text-[var(--background)] font-black text-5xl font-[Monument_Extended] flex justify-center items-center gap-5 tracking-widest ml-5">
                {/* <AtSign className="w-10 h-auto aspect-square text-[var(--background)]/30 ml-5" /> */}
                OPENING SOON
              </p>
            ))}
        </Marquee>
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <Carousel className="w-full px-10 md:px-36 mt-15">
            <CarouselContent>
              {category.map((category: any, index: any) => (
                <CarouselItem
                  key={index}
                  className="basis-1/5 sm:basis-1/7 md:basis-1/9 xl:basis-1/20"
                >
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div
                      className="w-14 h-14 bg-[var(--foreground)]/10 rounded-full flex justify-center items-center cursor-pointer"
                      onClick={() => handleCategoryFilter(category._id)}
                    >
                      {/* <img
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/meat-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-beef-chicken-food-pack-drink-illustrations-4497597.png?f=webp"
                        width={35}
                      /> */}
                      <p className="text-2xl">{category.emoji}</p>
                    </div>
                    <p className="text-xs">{category.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <CartProvider>
          <FoodList />
        </CartProvider>
      </div>
    </>
  );
};

export default HomeWeb;
