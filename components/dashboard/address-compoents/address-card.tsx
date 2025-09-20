import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import { ReactNode } from "react";

interface AddressCardProps {
  headerContent?: ReactNode;
  children: ReactNode;
}

export default function AddressCard({
  headerContent,
  children,
}: AddressCardProps) {
  return (
    <Card className="shadow-xl bg-white/80 backdrop-blur-sm border border-rose-100">
      <CardHeader className="bg-cream-100 border-b border-rose-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-amber-900 font-bold text-xl">
              <div className="relative">
                <MapPin className="w-6 h-6 text-amaranth-900" />
                <Heart className="w-3 h-3 text-amaranth-900 absolute -top-1 -right-1 animate-pulse" />
              </div>
              دليل العناوين
            </CardTitle>
            <CardDescription className="text-amber-900 font-medium">
              إدارة عناوين الشحن والفواتير بحب ❤️
            </CardDescription>
          </div>
          {headerContent}
        </div>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-white to-cream-100/30">
        {children}
      </CardContent>
    </Card>
  );
}
