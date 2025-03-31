import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="w-full px-60 flex flex-row justify-center gap-16">
      <Skeleton className="w-auto h-[600px] aspect-square  rounded-4xl overflow-hidden border-box group border shadow-lg relative"></Skeleton>
      <div className="w-auto h-[600px] aspect-square rounded-3xl flex flex-col">
        <Skeleton className="w-96 h-16 text-6xl font-semibold" />
        <Skeleton className="w-full h-4 text-base mt-4" />
        <Skeleton className="w-3/6 h-4 text-base mt-4" />
        <Skeleton className="w-3/4 h-80 text-base mt-4" />
        <Skeleton className="w-3/4 mt-10 py-7 rounded-full"></Skeleton>
      </div>
    </div>
  );
};

export default ProductSkeleton;
