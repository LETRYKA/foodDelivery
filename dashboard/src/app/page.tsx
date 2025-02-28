import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Ellipsis } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-row bg-[#F5F7FB]">
        <SideBar />
        <div className="w-full h-full flex flex-col">
          <Header />
          <div className="w-full h-full px-9 pb-8 pt-2 flex flex-row gap-5 overflow-hidden">
            <div className="w-4/5 h-full bg-[var(--background)] rounded-[var(--radius)]"></div>
            {/* TRANSACTION */}
            <div className="w-1/5 h-full bg-[var(--background)] rounded-[var(--radius)] flex flex-col justify-start items-center">
              <div className="w-5/6 flex justify-between items-center mt-5">
                <p className="text-xl font-medium text-[var(--foreground)]">
                  Income 💸
                </p>
                <Ellipsis width={20} className="cursor-pointer" />
              </div>
              <div
                className="w-full h-full flex flex-col justify-start items-center mt-5 gap-4 overflow-scroll pb-14"
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
                      className="w-5/6 h-20 bg-[#F5F7FB] rounded-[var(--radius)] flex flex-row justify-between items-center p-4 cursor-pointer"
                    >
                      <div className="flex flex-row gap-3">
                        <div className="w-11 h-11 bg-slate-300 rounded-4xl bg-center bg-cover bg-[url(https://i.pinimg.com/736x/75/ce/1e/75ce1ec915334f8f803f96b7e375cb34.jpg)]"></div>
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-base text-[var(--foreground)] font-semibold">
                            Ava Scott
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)] font-regular -mt-[3px]">
                            Single Set, Coke...
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <p className="text-base text-[#59cc53] font-bold">
                          +49,000₮
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] font-regular -mt-[3px]">
                          Sep 07, 2024
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
