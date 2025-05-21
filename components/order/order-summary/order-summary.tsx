import {
  calculateShipping,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  cartItems,
} from "@/data/cart";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import React from "react";
import CartItems from "../../card-items/cart-items";

const OrderSummary: React.FC = () => {
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, tax, shipping);

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">Order Summary</CardHeader>
      <CardBody>
        <CartItems cartItems={cartItems} />
        <Divider />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-checkout-muted">الحساب الفرعي</span>
            <span className="text-checkout-text">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-checkout-muted">الشحن</span>
            <span className="text-checkout-text">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-checkout-muted">الضريبة</span>
            <span className="text-checkout-text">${tax.toFixed(2)}</span>
          </div>

          <Divider />

          <div className="flex justify-between text-base font-medium">
            <span className="text-checkout-text">الاجمالي</span>
            <span className="text-checkout-text">${total.toFixed(2)}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderSummary;
