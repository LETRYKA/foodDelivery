import FoodListSkeleton from "./Skeleton/FoodListSkeleton";
import React, { useEffect, useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { fetchFood } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FoodList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [foodData, setFoodData] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    fetchFood(currentPage, 5).then(({ foodItems, pagination }) => {
      setFoodData(foodItems);
      setTotalPages(pagination?.totalPages || 1);
      setIsLoading(false);
    });
  }, [currentPage]);

  const handleAddToCart = (food: any) => {
    addToCart({ food, quantity: 1 });
    toast.success("Successfully added to cart!");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full px-10 md:px-36 mt-15">
      <p className="text-3xl font-black">Our Menu</p>

      {isLoading ? (
        <FoodListSkeleton />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-auto mt-8 gap-6">
          {foodData.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No items available.
            </p>
          ) : (
            foodData.map((food: any) => (
              <div
                key={food._id}
                className="w-full h-auto aspect-[6/7] border border-[var(--border)] rounded-2xl flex flex-col relative overflow-hidden box-border group bg-slate-700 group shadow-lg"
              >
                <Link href={`/product/${food._id}`}>
                  <img
                    className="z-0 absolute w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_100%)] cursor-pointer"
                    src={food?.image}
                  />
                </Link>
                <div
                  onClick={() => handleAddToCart(food)}
                  className="absolute opacity-0 group-hover:opacity-100 flex right-3 top-4 w-12 h-12 bg-white rounded-sm justify-center items-center cursor-pointer transition-all duration-200"
                >
                  <ShoppingBasket width={20} />
                </div>
                <div className="absolute flex left-3 top-4 px-4 py-2 bg-white/20 backdrop-blur-xs rounded-sm justify-center items-center text-white font-bold text-sm">
                  {food.price}₮
                </div>
                <div className="z-10 absolute bottom-5 w-full flex flex-col justify-start items-start px-5">
                  <p className="text-xl text-white font-semibold">
                    {food.foodName}
                  </p>
                  <p className="text-sm text-white/60 h-10 group-hover:h-14 overflow-hidden mt-2 transition-all duration-200">
                    {food.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="w-full mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage === 1 ? (
                  <span className="pagination-disabled">Previous</span>
                ) : (
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                )}
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                {currentPage < totalPages && (
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default FoodList;
