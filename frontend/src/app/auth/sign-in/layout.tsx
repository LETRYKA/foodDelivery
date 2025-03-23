import MobileLayout from "@/components/mobile/MobileLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
