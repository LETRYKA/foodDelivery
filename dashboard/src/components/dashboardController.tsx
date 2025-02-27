import { ArrowUpRight } from "lucide-react";

const DashboardController = (props: {
  icon: React.ElementType;
  title: string;
  active: boolean;
  sideBarShow: boolean;
}) => {
  const { icon: Icon, title, active, sideBarShow } = props;
  return (
    <div className={`flex ${active ? 'py-2 px-3' : ''} ${active ? (sideBarShow ? 'bg-[var(--muted-over)]' : 'bg-[var(--primary)]') : ''} flex-row items-center  gap-3 cursor-pointer group rounded-[var(--radius)]`}>
      <Icon
        className={`w-6 ${active ? "fill-[var(--background)]" : "fill-[var(--muted-foreground)]"}`} />
      {sideBarShow && (
        <>
          <p className={`text-base font-regular ${active ? 'text-[var(--background)]' : 'text-[var(--muted-foreground)]'}`}>
            {title}
          </p>
          <ArrowUpRight className="-ml-2 h-0 stroke-[var(--background)]  transition-all duration-200 ease-in-out group-hover:h-4" />
        </>
      )}
    </div>
  );
};

export default DashboardController;
