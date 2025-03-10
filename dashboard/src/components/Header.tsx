import { BellIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { Calendar, Inbox } from "lucide-react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Header = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const today = new Date();

  const dateFormat: string = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

  let user = null;
  try {
    const res = await axios.get("http://localhost:8080/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    user = res?.data?.data?.[1];
  } catch (err) {
    console.error("Error fetching user:", err);
    redirect("/auth/sign-in");
  }

  return (
    <>
      <div className="w-full h-24 flex flex-row justify-between items-center gap-6 px-10">
        <div className="h-full flex flex-col justify-center items-start">
          <p className="text-xs text-[var(--muted-foreground)] flex flex-row items-center gap-1">
            <Calendar width={13} />
            {dateFormat}
          </p>
          <div className="text-2xl text-[var(--foreground)] font-regular -mt-2 flex">
            Welcome back,&nbsp;
            <strong className="text-[var(--chart-3)]">{user.name}</strong>
          </div>
        </div>
        <div className="flex h-full justify-end items-center flex-row gap-6">
          <div className="relative -mr-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl w-[85%] h-[85%] aspect-square cursor-pointer"
                >
                  <EnvelopeIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Mails</h4>
                    <div className="w-full h-52 border-1 border-dashed rounded-[var(--radius)] flex flex-col justify-center items-center gap-1 mt-4">
                      <Inbox className="w-8 h-8 stroke-[var(--sidebar-ring)]" />
                      <p className="text-xs text-[var(--sidebar-ring)]">
                        Currently there is no mail
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl w-[85%] h-[85%] aspect-square cursor-pointer"
                >
                  <BellIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notification</h4>
                    <div className="w-full h-52 border-1 border-dashed rounded-[var(--radius)] flex flex-col justify-center items-center gap-1 mt-4">
                      <Inbox className="w-8 h-8 stroke-[var(--sidebar-ring)]" />
                      <p className="text-xs text-[var(--sidebar-ring)]">
                        Currently there is no notification
                      </p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--destructive)] rounded-4xl flex justify-center items-center cursor-pointer">
              <p className="text-[11px] text-[var(--background)]">4</p>
            </div>
          </div>
          <hr className="border-t-0 border-r-1 border-[var(--sidebar-ring)] h-2/4" />
          <Profile user={user} />
        </div>
      </div>
    </>
  );
};

export default Header;
