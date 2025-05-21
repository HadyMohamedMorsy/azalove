import CheckoutSteps from "@/components/checkout/checkout-step";
import OrderSummary from "@/components/order/order-summary/order-summary";
import React, { ReactNode } from "react";

type CheckoutLayoutProps = {
  children: ReactNode;
  currentStep: number;
};

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  currentStep,
}) => {
  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />

      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">{children}</div>
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
};

export default CheckoutLayout;
