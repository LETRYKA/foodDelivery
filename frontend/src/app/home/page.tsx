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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  useEffect(() => {
    fetchFood().then((data) => {
      setFoodData(data.data);
    });
    fetchCategory().then((data) => {
      setCategory(data.data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <HomeMobile foodData={foodData} category={category} />
      ) : (
        <HomeWeb foodData={foodData} category={category} />
      )}
      ;
    </>
  );
}
