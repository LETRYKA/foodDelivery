import MobileLayout from "@/components/mobile/MobileLayout";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
