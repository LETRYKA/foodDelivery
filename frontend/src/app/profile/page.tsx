"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MapPin,
  Pencil,
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

const Profile = () => {
  return (
    <>
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
            backgroundImage: `url(https://static01.nyt.com/images/2023/05/19/multimedia/19nba-morant-folo-11-thkc/19nba-morant-folo-11-thkc-mediumSquareAt3X.jpg)`,
          }}
        >
          <div className="absolute w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
            <ImageDown width={20} stroke="white" />
          </div>
        </div>
        <p className="text-lg text-[var(--background)] font-bold mt-4">
          @Ja Morant
        </p>
        <div className="text-xs text-[var(--background)] bg-slate-600 rounded-full px-2 py-1 mt-2">
          not verified
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
            <CardContent className="flex flex-row justify-between">
              <div className="flex justify-center items-center gap-3">
                <UserRound width={18} />
                <p className="text-sm text-white/60">JaMorant</p>
              </div>
              <Pencil width={14} stroke="grey" cursor="pointer" />
            </CardContent>
            <CardContent className="flex flex-row justify-between">
              <div className="flex justify-center items-center gap-3">
                <Phone width={18} />
                <p className="text-sm text-white/60">9999-3333</p>
              </div>
              <Pencil width={14} stroke="grey" cursor="pointer" />
            </CardContent>
            <CardContent className="flex flex-row justify-between">
              <div className="flex justify-center items-center gap-3">
                <Mail width={18} />
                <p className="text-sm text-white/60">ja@mail.com</p>
              </div>
              <Pencil width={14} stroke="grey" cursor="pointer" />
            </CardContent>
            <CardContent className="flex flex-row justify-between">
              <div className="flex justify-center items-center gap-3">
                <Lock width={18} />
                <p className="text-sm text-white/60">Password</p>
              </div>
              <Pencil width={14} stroke="grey" cursor="pointer" />
            </CardContent>
          </Card>
          <Card className="w-full bg-[#141414]">
            <CardHeader>
              <CardTitle className="text-sm">ADDRESS</CardTitle>
              <CardDescription className="text-xs">
                3517 Washington Ave
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
          <Card className="w-full bg-[#141414] gap-6 py-4 -mt-2 cursor-pointer">
            <CardContent className="flex flex-row justify-between">
              <div className="flex justify-center items-center gap-3">
                <LogOut width={18} stroke="var(--destructive)" />
                <p className="text-sm text-[var(--destructive)]">Logout</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
