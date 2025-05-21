import {
  calculateShipping,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/data/cart";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";

interface OrderConfirmationProps {
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  onContinueShopping,
}) => {
  const subtotal = calculateSubtotal([]);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, tax, shipping);
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Card>
      <CardBody className="pt-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-checkout-success/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-checkout-text mb-2">
            Order Confirmed!
          </h2>
          <p className="text-checkout-muted">
            Thank you for your purchase. We've received your order.
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <h3 className="font-medium text-checkout-text mb-2">Order Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-checkout-muted">Order Number:</div>
            <div className="text-checkout-text font-medium">{orderNumber}</div>

            <div className="text-checkout-muted">Order Date:</div>
            <div className="text-checkout-text">
              {new Date().toLocaleDateString()}
            </div>

            <div className="text-checkout-muted">Payment Method:</div>
            <div className="text-checkout-text">Credit Card (****4242)</div>

            <div className="text-checkout-muted">Shipping Method:</div>
            <div className="text-checkout-text">Standard Shipping</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-checkout-text mb-2">
            Shipping Address
          </h3>
          <div className="text-checkout-text">
            <p>John Doe</p>
            <p>123 Main Street, Apt 4B</p>
            <p>San Francisco, CA 94103</p>
            <p>United States</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <p className="text-checkout-muted mb-2">
            A confirmation email has been sent to:{" "}
            <span className="text-checkout-text">john.doe@example.com</span>
          </p>
          <p className="text-checkout-muted">
            You will receive updates about your order status via email.
          </p>
        </div>

        <div className="text-center">
          <Button
            onPress={onContinueShopping}
            className="bg-checkout-primary hover:bg-checkout-primary-hover"
          >
            Continue Shopping
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderConfirmation;
