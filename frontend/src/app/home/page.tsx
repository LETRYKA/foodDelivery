"use client";

import { fetchFood, fetchCategory } from "@/lib/api";
import HomeMobile from "@/components/mobile/Home";
import { useEffect, useState } from "react";
import HomeWeb from "@/components/Home";

interface CategoryType {
  name: string;
  emoji: string;
}

export default function Home() {
  const [foodData, setFoodData] = useState([]);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchFood(1, 10).then(({ foodItems }) => {
      setFoodData(foodItems);
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
