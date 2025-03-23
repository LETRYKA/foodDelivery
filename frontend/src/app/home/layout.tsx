import MobileLayout from "@/components/mobile/MobileLayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
