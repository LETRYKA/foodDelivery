import { Skeleton } from "../ui/skeleton";

const FoodListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-auto mt-8 gap-6">
      {Array(10)
        .fill(10)
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-auto aspect-[6/7] border border-[var(--border)] rounded-2xl flex flex-col relative overflow-hidden box-border bg-slate-300 group group"
          >
            <Skeleton className="z-0 absolute w-full h-full" />
            <div className="z-10 absolute bottom-5 w-full flex flex-col justify-start items-start px-5">
              <Skeleton className="w-2/4 h-6" />
              <Skeleton className="w-full h-10 mt-2" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FoodListSkeleton;
