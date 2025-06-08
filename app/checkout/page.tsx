"use client";
import OrderConfirmation from "@/components/checkout/order-confirm";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm from "@/components/checkout/payment-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const steps = [
    { id: 1, title: "Shipping", component: ShippingForm },
    { id: 2, title: "Payment", component: PaymentForm },
    { id: 3, title: "Confirmation", component: OrderConfirmation },
  ];

  const handleNext = (data: any) => {
    if (currentStep === 1) {
      setShippingData(data);
    } else if (currentStep === 2) {
      setPaymentData(data);
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
          <div className="flex items-center space-x-4 mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <CurrentStepComponent
                  onNext={handleNext}
                  onBack={currentStep > 1 ? handleBack : undefined}
                  shippingData={shippingData}
                  paymentData={paymentData}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
