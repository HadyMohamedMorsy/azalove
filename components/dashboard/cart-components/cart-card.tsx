import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface CartCardProps {
  children: ReactNode;
}

export default function CartCard({ children }: CartCardProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-xl  bg-cream-100 overflow-hidden">
          <div className="absolute inset-0 bg-amber-900 pointer-events-none"></div>
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold  bg-amaranth-900 bg-clip-text text-transparent">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-amaranth-900" />
                    <Heart className="w-3 h-3 text-amaranth-900 absolute -top-1 -right-1" />
                  </div>
                  {t("cart.loveCollection")}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  {t("cart.reviewAndCherish")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8  bg-amaranth-900 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
