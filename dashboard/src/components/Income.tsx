import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { Ellipsis } from "lucide-react";

const Income = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center mt-5">
        <p className="text-lg font-medium text-[var(--foreground)] flex item-scenter gap-1">
          <BuildingLibraryIcon className="fill-[var(--primary)]" width={17} />  Income
        </p>
        <Ellipsis width={20} className="cursor-pointer" />
      </div>
      <div
        className="income w-full h-full flex flex-col justify-start items-center mt-5 gap-4 overflow-scroll pb-14"
        style={{
          maskImage:
            "linear-gradient(to bottom, white 85%, transparent 100%)",
        }}
      >
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-20 bg-[var(--background)] rounded-[var(--radius)] flex flex-row justify-between items-center p-4 cursor-pointer"
            >
              <div className="flex flex-row gap-3">
                <div className="w-11 h-11 bg-slate-300 rounded-4xl bg-center bg-cover bg-[url(https://i.pinimg.com/736x/75/ce/1e/75ce1ec915334f8f803f96b7e375cb34.jpg)]"></div>
                <div className="flex flex-col items-start justify-center">
                  <p className="text-base text-[var(--foreground)] font-semibold">
                    Ava Scott
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)] font-regular -mt-[3px]">
                    Single Set
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-base text-[#59cc53] font-bold">
                  +49,000₮
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)] font-regular -mt-[3px]">
                  Sep 07, 2024
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Income;
