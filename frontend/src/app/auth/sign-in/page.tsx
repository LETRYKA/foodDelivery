import { LoginForm } from "@/components/login-form";
import { ShieldCheck } from "lucide-react";

const SignIn = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2 bg-[var(--background)]">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start"></div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="https://cdn.dribbble.com/userupload/16379697/file/original-8bea9a6a38dc68e6ae67479cab7593b9.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
