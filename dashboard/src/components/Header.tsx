import Profile from "./Profile";
import { Archive, Calendar } from "lucide-react";
import { BellIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <>
      <div className="w-full h-24 flex flex-row justify-between items-center gap-6 px-10">
        <div className="h-full flex flex-col justify-center items-start">
          <p className="text-xs text-[var(--muted-foreground)] flex flex-row items-center gap-1">
            <Calendar width={13} /> Mon, July 7
          </p>
          <p className="text-2xl text-[var(--foreground)] font-medium -mt-1 flex">
            Welcome back,&nbsp;<p className="text-[var(--chart-3)]">Ryanolds</p>
          </p>
        </div>
        <div className="flex h-full justify-end items-center flex-row gap-6">
          <div className="w-9 h-9 border border-[var(--sidebar-ring)] flex justify-center items-center rounded-4xl cursor-pointer -mr-2">
            <EnvelopeIcon
              className="stroke-none fill-[var(--foreground)]"
              width={14}
            />
          </div>
          <div className="w-9 h-9 border border-[var(--sidebar-ring)] flex justify-center items-center rounded-4xl cursor-pointer relative">
            <BellIcon className="" width={14} />
            <div className="absolute -top-1 -right-2 w-5 h-5 bg-[var(--destructive)] rounded-4xl flex justify-center items-center cursor-pointer">
              <p className="text-[11px] text-[var(--background)]">4</p>
            </div>
          </div>
          <hr className="border-t-0 border-r-1 border-[var(--sidebar-ring)] h-2/4" />
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Header;
