"use client";

import { ShieldUser, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/sign-in`,
        data,
        { withCredentials: true }
      );
      setIsLoading(false);
      router.push("/dashboard");
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={fetchSignIn}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-balance text-sm text-muted-foreground -mt-2">
          Welcome Back, Please enter Your Details.
        </p>
      </div>
      <div className="grid gap-6">
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
          {isLoading ? "Signing in..." : "Continue"}
        </Button>
        <Button
          variant="outline"
          className="w-full flex justify-center items-center"
        >
          <ShieldUser />
          Contact with Admin
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
