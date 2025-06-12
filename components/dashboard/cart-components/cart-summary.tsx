import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  disabled?: boolean;
}

export default function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  disabled = false,
}: CartSummaryProps) {
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment page...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {shipping > 0 && (
          <div className="text-sm text-muted-foreground text-center">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </div>
        )}

        <Button
          onClick={handleCheckout}
          className="w-full"
          size="lg"
          disabled={disabled}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
