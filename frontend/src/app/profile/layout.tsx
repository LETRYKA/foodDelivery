import MobileLayout from "@/components/mobile/MobileLayout";
import NavBar from "@/components/mobile/NavBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileLayout>
      {children}
      <div className="fixed bottom-7 w-full flex justify-center items-center z-50">
        <NavBar />
      </div>
    </MobileLayout>
  );
}
