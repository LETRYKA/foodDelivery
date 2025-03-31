import Header from "@/components/Header";
import MobileLayout from "@/components/mobile/MobileLayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileLayout>
      <div className="h-20">
        <Header />
      </div>
      {children}
    </MobileLayout>
  );
}
