"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const DashboardController = (props: {
  icon: React.ElementType;
  title: string;
  sideBarShow: boolean;
  path: string;
}) => {
  const { icon: Icon, title, sideBarShow, path } = props;
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  const [gradientOpacity, setGradientOpacity] = useState(0);

  useEffect(() => {
    setGradientOpacity(1);
  }, []);

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <div className="relative p-[1px] rounded-[var(--radius)]">
      {isActive && (
        <div className="absolute inset-0 rounded-[var(--radius)] transition-opacity duration-[500ms] ease-in-out"
          style={{ opacity: gradientOpacity, background: "linear-gradient(to bottom right, transparent, #05060F, var(--primary))", }} />
      )}
      <div
        className={`relative flex py-2 px-3 ${isActive ? (sideBarShow ? "bg-[var(--muted-over)]" : "bg-[var(--primary)]") : ""
          } hover:bg-[var(--muted-over)] flex-row items-center gap-3 cursor-pointer group rounded-[var(--radius)] transition-all duration-200 ease-in-out`}
        onClick={handleNavigation}
      >
        <Icon className={`w-6 ${isActive ? "fill-[var(--background)]" : "fill-[var(--muted-foreground)]"}`} />
        {sideBarShow && (
          <>
            <p className={`text-base font-regular ${isActive ? "text-[var(--background)]" : "text-[var(--muted-foreground)]"}`}>
              {title}
            </p>
            <ArrowUpRight className="-ml-2 h-0 stroke-[var(--background)] transition-all duration-200 ease-in-out group-hover:h-4" />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardController;
