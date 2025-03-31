"use client";

import { Button } from "@/components/ui/button";
import { fetchFood, fetchCategory } from "@/lib/api";
import { useEffect, useState } from "react";
import HomeMobile from "@/components/mobile/Home";
import HomeWeb from "@/components/Home";

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

interface CategoryType {
  name: string;
}

export default function Home() {
  const [foodData, setFoodData] = useState([]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchFood().then((data) => {
      setFoodData(data.data);
    });
    fetchCategory().then((data) => {
      setCategory(data.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <HomeMobile foodData={foodData} category={category} />
      ) : (
        <HomeWeb
          foodData={foodData}
          category={category}
          isLoading={isLoading}
        />
      )}
      ;
    </>
  );
}
