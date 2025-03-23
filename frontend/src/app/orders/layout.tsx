import MobileLayout from "@/components/mobile/MobileLayout";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
