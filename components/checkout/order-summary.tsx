"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE_URL } from "@/config/api";
import { useCart } from "@/contexts/cart-context";
import { ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";

const OrderSummary = () => {
  const { cartItems, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Order Summary
        </CardTitle>
        <CardDescription>
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in
          your order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={`${API_BASE_URL}${item.image}`}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{item.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-medium">
                    ${(item.finalPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="w-4 h-4" />
            <span>Promo code</span>
            <Badge variant="secondary" className="ml-auto">
              SAVE10
            </Badge>
          </div>
        </div>

        {/* Order Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount (SAVE10)</span>
            <span>-${(subtotal * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(total - subtotal * 0.1).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
