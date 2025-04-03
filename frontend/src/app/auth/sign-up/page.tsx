import { SignUpForm } from "@/components/register-form";

const SignUp = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2 bg-[var(--background)]">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start"></div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignUpForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="https://cdn.dribbble.com/userupload/17112596/file/original-d7d5606e4d4a2c06a2f8531082f6061a.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
