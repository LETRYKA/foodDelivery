import { CardContent } from "@/components/ui/card";
import EditDrawer from "./EditDrawer";

interface InfoCardProps {
  icon: React.ComponentType<{ width: number }>;
  text: string;
  type: string;
  user: any;
}

export const InfoCard = ({ icon: Icon, text, type, user }: InfoCardProps) => (
  <CardContent className="flex flex-row justify-between">
    <div className="flex justify-center items-center gap-3">
      <Icon width={18} />
      <p className="text-sm text-white/60">{text}</p>
    </div>
    <EditDrawer user={user} type={type} />
  </CardContent>
);
