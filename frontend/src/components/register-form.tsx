"use client";

import { ShieldUser, Mail, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const API_URL = process.env.API_URL;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/sign-up`, data, {
        withCredentials: true,
      });
      setIsLoading(false);
      console.log(res.data.data.token);

      const token = res.data.data.token;

      Cookies.set("token", token, { expires: 7, path: "/" });

      router.push("/home");
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={fetchSignUp}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="text-balance text-sm text-muted-foreground -mt-2">
          Join us today! Enter your details below.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="bg-[var(--background)] rounded-[var(--radius)] border-2 w-full flex flex-row justify-center items-center gap-4">
            <ShieldUser width={17} className="ml-5" />
            <hr className="border-0 border-r-1 border-[var(--foreground)]/20 h-3/5" />
            <div className="flex flex-col w-[90%] py-2">
              <p className="text-[10px] text-[var(--foreground)]/70 -mb-[4px]">
                Full Name
              </p>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={data.name}
                onChange={handleChange}
                required
                className="bg-[var(--background)] shadow-none w-full h-6 border-none pl-0 rounded-none font-semibold focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="bg-[var(--background)] rounded-[var(--radius)] border-2 w-full flex flex-row justify-center items-center gap-4">
            <Mail width={17} className="ml-5" />
            <hr className="border-0 border-r-1 border-[var(--foreground)]/20 h-3/5" />
            <div className="flex flex-col w-[90%] py-2">
              <p className="text-[10px] text-[var(--foreground)]/70 -mb-[4px]">
                Email Address
              </p>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={data.email}
                onChange={handleChange}
                required
                className="bg-[var(--background)] shadow-none w-full h-6 border-none pl-0 rounded-none font-semibold focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="bg-[var(--background)] rounded-[var(--radius)] border-2 w-full flex flex-row justify-center items-center gap-4">
            <Phone width={17} className="ml-5" />
            <hr className="border-0 border-r-1 border-[var(--foreground)]/20 h-3/5" />
            <div className="flex flex-col w-[90%] py-2">
              <p className="text-[10px] text-[var(--foreground)]/70 -mb-[4px]">
                Phone Number
              </p>
              <Input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
                required
                className="bg-[var(--background)] shadow-none w-full h-6 border-none pl-0 rounded-none font-semibold focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="bg-[var(--background)] rounded-[var(--radius)] border-2 w-full flex flex-row justify-center items-center gap-4">
            <Lock width={17} className="ml-5" />
            <hr className="border-0 border-r-1 border-[var(--foreground)]/20 h-3/5" />
            <div className="flex flex-col w-[90%] py-2">
              <p className="text-[10px] text-[var(--foreground)]/70 -mb-[4px]">
                Password
              </p>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="****"
                value={data.password}
                onChange={handleChange}
                required
                className="bg-[var(--background)] shadow-none w-full h-6 border-none pl-0 rounded-none font-semibold focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full py-5" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/auth/sign-in" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </form>
  );
}
