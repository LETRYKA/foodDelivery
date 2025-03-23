// src/app/layout.tsx
import MobileLayout from "@/components/mobile/MobileLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MobileLayout>{children}</MobileLayout>
      </body>
    </html>
  );
}
