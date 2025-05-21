import { cartItems } from "@/data/cart";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";
import CartItems from "./cart-items";

interface CartReviewProps {
  onNext: () => void;
  showUnitPrice?: boolean;
  showQuantitySelect?: boolean;
  showRemoveButton?: boolean;
}

const CartReview: React.FC<CartReviewProps> = ({
  onNext,
  showUnitPrice = false,
  showQuantitySelect = false,
  showRemoveButton = false,
}) => {
  return (
    <Card>
      <CardBody className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Review Your Cart</h2>

        <CartItems
          cartItems={cartItems}
          showUnitPrice={showUnitPrice}
          showQuantitySelect={showQuantitySelect}
          showRemoveButton={showRemoveButton}
        />

        <div className="mt-6 flex justify-between">
          <a
            href="/"
            className="text-checkout-primary hover:text-checkout-primary-hover flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Continue Shopping
          </a>
          <Button
            onPress={onNext}
            className="bg-checkout-primary hover:bg-checkout-primary-hover"
          >
            Proceed to Shipping
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartReview;
