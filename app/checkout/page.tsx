import CartReview from "@/components/card-items/card-review";
import PaymentForm from "@/components/form/payment-form/payment-form";
import ShippingForm from "@/components/form/shipping-form/shipping-form";
import OrderConfirmation from "@/components/order/order-confirmation/order-confirmation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckoutLayout from "./layout";

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <CheckoutLayout currentStep={currentStep}>
      <div className="animate-fade-in">
        {currentStep === 1 && <CartReview onNext={handleNext} />}

        {currentStep === 2 && (
          <ShippingForm onNext={handleNext} onPrevious={handlePrevious} />
        )}

        {currentStep === 3 && (
          <PaymentForm onNext={handleNext} onPrevious={handlePrevious} />
        )}

        {currentStep === 4 && (
          <OrderConfirmation onContinueShopping={handleContinueShopping} />
        )}
      </div>
    </CheckoutLayout>
  );
};

export default Checkout;
