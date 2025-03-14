import { Trash2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const FoodSkeleton = () => {
  return (
    <>
      <div className="w-5/6 h-auto grid grid-rows-auto grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 rounded-[var(--radius)]">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-fit bg-[var(--background)] rounded-[var(--radius)] p-4"
            >
              <div className="w-full h-[180px] bg-slate-300 rounded-[var(--radius)] overflow-hidden relative group"></div>
              <Skeleton className="w-full bg-slate-100 rounded-[var(--radius)] flex flex-col p-3 gap-[1px] mt-3"></Skeleton>
            </Skeleton>
          ))}
      </div>
    </>
  );
};

export default FoodSkeleton;
