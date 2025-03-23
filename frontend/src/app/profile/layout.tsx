import MobileLayout from "@/components/mobile/MobileLayout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileLayout>{children}</MobileLayout>;
}
