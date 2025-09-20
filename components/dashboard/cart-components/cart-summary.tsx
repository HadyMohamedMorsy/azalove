import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/hooks/use-currency";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { CreditCard, Gift } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  subtotal: number;
  total: number;
  disabled?: boolean;
}

export default function CartSummary({
  subtotal,
  total,
  disabled = false,
}: CartSummaryProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const router = useRouter();

  const handleCheckout = () => {
    toast({
      title: t("cart.checkoutTitle"),
      description: t("cart.checkoutDescription"),
    });
    router.push("/checkout");
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-purple-50 to-pink-50 overflow-hidden">
      <div className="absolute inset-0 bg-cream-100 pointer-events-none"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
          <Gift className="w-5 h-5 text-purple-500" />
          {t("cart.summaryTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">
              {t("cart.subtotal")}
            </span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="border-t border-rose-200 pt-4">
            <div className="flex justify-between items-center font-bold text-xl">
              <span className="bg-amaranth-900 bg-clip-text text-transparent">
                {t("cart.total")}
              </span>
              <span className="bg-amaranth-900 bg-clip-text text-transparent font-bold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full bg-amaranth-900 hover:bg-amaranth-900 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
          disabled={disabled}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {t("cart.continueLoveStory")}
        </Button>
      </CardContent>
    </Card>
  );
}
