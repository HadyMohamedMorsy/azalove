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
import { useCurrency } from "@/hooks/use-currency";
import { ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";

const OrderSummary = () => {
  const { cartItems, getTotalPrice } = useCart();
  const { formatCurrency } = useCurrency();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const discount = subtotal * 0.1;

  return (
    <Card className="sticky top-8 border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-cream-200">
        <CardTitle className="flex items-center gap-2 text-royal-900">
          <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-azalove-600" />
          </div>
          ملخص الطلب
        </CardTitle>
        <CardDescription className="text-royal-600">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)} منتجات في
          طلبك
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Order Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 bg-cream-50/50 rounded-lg"
            >
              <div className="w-12 h-12 bg-amaranth-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={`${API_BASE_URL}${item.image}`}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate text-royal-900">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-royal-600">
                    الكمية: {item.quantity}
                  </span>
                  <span className="text-sm font-medium text-royal-900">
                    {formatCurrency(
                      (item.finalPrice || item.price) * item.quantity
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="border-t border-cream-200 pt-4">
          <div className="flex items-center gap-2 text-sm text-royal-600">
            <div className="w-6 h-6 rounded-full bg-azalove-100 flex items-center justify-center">
              <Tag className="w-3 h-3 text-azalove-600" />
            </div>
            <span>كود الخصم</span>
            <Badge
              variant="secondary"
              className="ml-auto bg-azalove-100 text-azalove-700 border-azalove-200"
            >
              SAVE10
            </Badge>
          </div>
        </div>

        {/* Order Totals */}
        <div className="border-t border-cream-200 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-royal-700">المجموع الفرعي</span>
            <span className="text-royal-900 font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-royal-700">الضريبة</span>
            <span className="text-royal-900 font-medium">
              {formatCurrency(tax)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>الخصم (SAVE10)</span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
          <div className="border-t border-cream-200 pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-royal-900">المجموع الكلي</span>
              <span className="text-royal-900">
                {formatCurrency(total - discount)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
