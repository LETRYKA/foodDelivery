import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

const CategorySkeleton = () => {
  return (
    <Carousel className="w-full px-10 md:px-36 mt-15">
      <CarouselContent className="w-full">
        {Array(10)
          .fill(40)
          .map((_, index) => (
            <CarouselItem key={index} className="basis-1/15">
              <div className="flex flex-col justify-center items-center gap-2">
                <Skeleton className="w-14 h-14 bg-slate-300  rounded-full flex justify-center items-center cursor-pointer"></Skeleton>
                <Skeleton className="w-8 h-3 mt-1 bg-slate-300" />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategorySkeleton;
