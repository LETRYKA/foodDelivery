import {
  ArrowUpRight,
  ImageDown,
  LoaderCircle,
  Mail,
  MapPin,
} from "lucide-react";
import Header from "./Header";
import { Button } from "./ui/button";
import EditSheet from "@/app/profile/_components/EditSheet";
import { formatNumber, formatDate } from "@/utils/Formatter";
import { handleFileUpload } from "@/utils/Cloudinary";
import { useEffect, useState } from "react";
import { PatchUser } from "@/lib/api";
import { toast } from "sonner";

const ProfileWeb = (props: any) => {
  const { user } = props;

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  console.log(profileImage);

  useEffect(() => {
    if (!profileImage || !user?.data?._id) return;

    const updateUser = async () => {
      try {
        await PatchUser({
          userId: user?.data?._id,
          profile: profileImage,
        });

        toast.success("Updated successfully!");
      } catch (err) {
        console.error("Error updating user", err);
        toast.error("Error updating user.");
      }
    };

    updateUser();
  }, [profileImage]);

  return (
    <>
      <div className="w-full h-full bg-white relative py-20">
        <div className="w-full h-full px-10 lg:px-20 xl:px-60">
          <div className=" top-0 w-full h-64 rounded-2xl overflow-hidden border-box relative group">
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              <div className="absolute px-5 py-2 bottom-4 right-4 flex-row text-[var(--background)] text-sm gap-2 rounded-lg bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                <ImageDown width={17} stroke="white" /> Upload image
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleFileUpload(e, setProfileImage, setIsLoading)
                  }
                />
              </div>
            )}
            <img
              className="w-full h-full object-cover"
              src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/09/macos-sequoia-official-wallpaper.jpg"
            />
          </div>
          <div className="w-full px-10 lg:px-20 xl:px-16 flex flex-row justify-between ">
            <div>
              <div className="w-40 h-auto aspect-square border-5 border-[#E8E8E8] bg-slate-400 rounded-full -mt-24 overflow-hidden border-box group relative">
                {isLoading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : (
                  <div className="absolute w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                    <ImageDown width={20} stroke="white" />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleFileUpload(e, setProfileImage, setIsLoading)
                      }
                    />
                  </div>
                )}
                <img
                  className="w-full h-full object-cover"
                  src={user?.data?.profile}
                  alt="Profile"
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
          <div className="w-full h-full mt-5 rounded-3xl grid grid-cols-4 grid-rows-auto gap-6">
            {/* CARD */}
            {user.data?.orderedFood?.length > 0 ? (
              <p>No Orders ATM</p>
            ) : (
              user.data.orderedFoods
                .slice()
                .reverse()
                .map((order, index) => (
                  <div
                    key={index}
                    className="w-full h-auto bg-[var(--foreground)]/5 rounded-2xl flex flex-col p-6"
                  >
                    <div className="flex justify-between">
                      <div></div>
                      <div className="text-sm bg-amber-200 rounded-full py-1 px-4">
                        {order?.status}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="w-2/4 bg-[var(--foreground)]/5 flex flex-col p-3 rounded-sm">
                        <p className="text-xs text-[var(--foreground)]/40">
                          Ordered time
                        </p>
                        <p className="text-base text-[var(--foreground)] font-semibold">
                          {formatDate(order?.updatedAt)}
                        </p>
                      </div>
                      <div className="w-2/4 bg-[var(--foreground)]/5 flex flex-col p-3 rounded-sm">
                        <p className="text-xs text-[var(--foreground)]/40">
                          Total Payment
                        </p>
                        <p className="text-base text-[var(--foreground)] font-semibold">
                          {formatNumber(order?.totalPrice)}₮
                        </p>
                      </div>
                    </div>
                    {order.items.map((food: any, index: any) => (
                      <div
                        key={index}
                        className="w-full h-12 flex flex-col mt-4"
                      >
                        <div className="w-full h-full flex justify-between items-center">
                          <div className="h-full flex flex-row gap-2 items-center">
                            <div
                              className="w-auto h-full aspect-square bg-cover bg-center bg-slate-300 rounded-lg"
                              style={{
                                backgroundImage: `url(${food?.food?.image})`,
                              }}
                            ></div>
                            <div className="flex flex-col">
                              <p className="text-sm font-semibold">
                                {food?.food?.foodName}
                              </p>
                              <p className="text-xs text-[var(--foreground)]/40">
                                {formatNumber(food?.food?.price)}₮
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold">{food?.quantity}x</p>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full mt-10 py-6 bg-[var(--foreground)] hover:bg-[var(--foreground)]/80">
                      Odoogoor ajilahgui <ArrowUpRight />
                    </Button>
                  </div>
                ))
            )}
            {/* END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileWeb;
