import { ImageDown, Mail, MapPin } from "lucide-react";
import Header from "./Header";
import { Button } from "./ui/button";
import EditSheet from "@/app/profile/_components/EditSheet";

const ProfileWeb = (props: any) => {
  const { user } = props;
  return (
    <>
      <div className="w-full h-full bg-white relative py-20">
        <div className="w-full px-10 lg:px-20 xl:px-60">
          <div className=" top-0 w-full h-64 rounded-2xl overflow-hidden border-box relative group">
            <div className="absolute px-5 py-2 bottom-4 right-4 flex-row text-[var(--background)] text-sm gap-2 rounded-lg bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
              <ImageDown width={17} stroke="white" /> Upload image
            </div>
            <img
              className="w-full h-full object-cover"
              src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/09/macos-sequoia-official-wallpaper.jpg"
            />
          </div>
          <div className="w-full px-10 lg:px-20 xl:px-16 flex flex-row justify-between ">
            <div>
              <div className="w-40 h-auto aspect-square border-5 border-[#E8E8E8] bg-slate-400 rounded-full -mt-24 overflow-hidden border-box group relative">
                <div className="absolute w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                  <ImageDown width={20} stroke="white" />
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={user?.data?.profile}
                />
              </div>
              <h1 className="text-3xl font-black mt-2">{user?.data?.name}</h1>
              <h1 className="text-base text-[var(--foreground)]/70">
                @{user?.data?.name}
              </h1>
              <h1 className="text-base text-[var(--foreground)]/70 flex items-center gap-1">
                <Mail width={14} className="stroke-[var(--foreground)]/50" />
                {user?.data?.email}
              </h1>
              <div className="flex mt-5 gap-2">
                <EditSheet user={user.data} />
                <Button
                  variant="outline"
                  className="rounded-full py-6 px-8 font-semibold"
                >
                  Browse
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <div className="px-4 py-2 rounded-full bg-[var(--foreground)]/5 text-sm font-bold">
                {user?.data?.isVerified ? `verified` : `not verified`}
              </div>
            </div>
          </div>
          <p className="mt-10 text-xl font-bold">Recent Orders</p>
          <div className="w-full h-96 bg-[var(--foreground)]/5 mt-5 rounded-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileWeb;
