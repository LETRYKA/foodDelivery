import {
  Heart,
  MapPin,
  Phone,
  ReceiptText,
  UserRound,
  Wallet,
  Lock,
  ImageDown,
  Info,
  LogOut,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { InfoCard } from "@/app/profile/_components/InfoCard";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProfileMobile = (props: any) => {
  const { user } = props;
  const router = useRouter();

  const handleLogOut = () => {
    console.log(`LOGOUT`);
    Cookies.remove("token", { path: "/" });
    router.push("/auth/sign-in");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center pb-30">
      <div
        className="w-full h-50 bg-blue-500 bg-cover bg-center relative overflow-hidden group"
        style={{
          backgroundImage: `url(https://www.pixelstalk.net/wp-content/uploads/images5/Aesthetic-Cloud-Desktop-Background.jpg)`,
        }}
      >
        <div className="absolute w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
          <ImageDown width={20} stroke="white" />
        </div>
      </div>
      <div
        className="w-28 h-auto aspect-square bg-slate-300 rounded-full -mt-14 border-5 border-[#101010] bg-cover bg-center relative overflow-hidden group"
        style={{
          backgroundImage: `url(${user.data.profile})`,
        }}
      >
        <div className="absolute w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
          <ImageDown width={20} stroke="white" />
        </div>
      </div>
      <p className="text-lg text-[var(--background)] font-bold mt-4">
        @{user.data.name}
      </p>
      <div className="text-xs text-[var(--background)] bg-slate-600 rounded-full px-2 py-1 mt-2">
        {user.data.isVerified ? "verified" : "not verified"}
      </div>
      <div className="w-full flex flex-row justify-between items-center mt-10 px-5 gap-2">
        <Link href="/orders" className="flex-grow">
          <Button className="w-full flex-grow py-6 rounded-full">
            <ReceiptText />
            Orders
          </Button>
        </Link>
        <Button className="w-auto aspect-square py-6 rounded-full">
          <Heart />
        </Button>
        <Button className="w-auto aspect-square py-6 rounded-full">
          <Wallet />
        </Button>
      </div>
      <div className="w-full mt-10 px-5 dark flex flex-col gap-5">
        <Card className="w-full bg-[#141414] gap-6">
          <InfoCard
            icon={UserRound}
            text={`@${user.data.name}`}
            type={`Username`}
            user={user}
          />
          <InfoCard
            icon={Phone}
            text={user.data.phoneNumber}
            type={`Phone`}
            user={user}
          />
          <InfoCard
            icon={Mail}
            text={user.data.email}
            type={`Email`}
            user={user}
          />
          <InfoCard icon={Lock} text="Password" type={`Password`} user={user} />
        </Card>
        <Card className="w-full bg-[#141414]">
          <CardHeader>
            <CardTitle className="text-sm">ADDRESS</CardTitle>
            <CardDescription className="text-xs">
              {user.data.address}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <div
              className="w-full h-44 bg-slate-300 rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url(https://bufferwall.com/download/B20190923T000000374_1200x600.jpg)`,
              }}
            ></div>
          </CardContent>
          <CardFooter className="px-5">
            <Button className="w-full">
              <MapPin />
              Edit location
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full bg-[#141414] gap-6 py-4 cursor-pointer">
          <CardContent className="flex flex-row justify-between">
            <div className="flex justify-center items-center gap-3">
              <Info width={18} />
              <p className="text-sm">About</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="w-full bg-[#141414] gap-6 py-4 -mt-2 cursor-pointer"
          onClick={handleLogOut}
        >
          <CardContent className="flex flex-row justify-between">
            <div className="flex justify-center items-center gap-3">
              <LogOut width={18} stroke="var(--destructive)" />
              <p className="text-sm text-[var(--destructive)]">Logout</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileMobile;
