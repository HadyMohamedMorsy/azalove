import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";

const OrderSummary = () => {
  const orderItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Premium Phone Case",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
          {orderItems.reduce((sum, item) => sum + item.quantity, 0)} items in
          your order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={item.image}
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
                    ${(item.price * item.quantity).toFixed(2)}
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
