import { LayoutDashboard, Sidebar } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

const DashboardController = (props: {
  icon: React.ElementType;
  title: string;
  active: boolean;
  sideBarShow: boolean;
}) => {
  const { icon: Icon, title, active, sideBarShow } = props;
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer group">
      <Icon
        className={`w-5 ${
          active ? "stroke-[var(--primary)]" : "stroke-[var(--foreground)]"
        }`}
      />
      {sideBarShow && (
        <>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            {title}
          </p>
          <ArrowUpRight className="-ml-1 h-0 transition-all duration-200 ease-in-out group-hover:h-5" />
        </>
      )}
    </div>
  );
};

export default DashboardController;
