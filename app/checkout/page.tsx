"use client";
import OrderConfirmation from "@/components/checkout/order-confirm";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm from "@/components/checkout/payment-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CheckCircle, CreditCard, Shield, Truck } from "lucide-react";
import React, { useState } from "react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const steps = [
    {
      id: 1,
      title: "Shipping",
      description: "Delivery details",
      icon: Truck,
      component: ShippingForm,
    },
    {
      id: 2,
      title: "Payment",
      description: "Payment method",
      icon: CreditCard,
      component: PaymentForm,
    },
    {
      id: 3,
      title: "Confirmation",
      description: "Order review",
      icon: CheckCircle,
      component: OrderConfirmation,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-azalove-50/30">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-royal-900">Checkout</h1>
              <p className="text-royal-600 mt-1">
                Complete your purchase securely
              </p>
            </div>
            <div className="flex items-center gap-2 bg-azalove-100 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-azalove-600" />
              <span className="text-sm font-medium text-azalove-700">
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Enhanced Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-royal-500 text-white shadow-lg shadow-azalove-500/30"
                        : "bg-amaranth-100 text-royal-400 border-2 border-cream-200"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-royal-900"
                          : "text-royal-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    <p
                      className={`text-xs ${
                        currentStep >= step.id
                          ? "text-royal-600"
                          : "text-royal-300"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        currentStep > step.id ? "bg-royal-500" : "bg-cream-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
                      {React.createElement(steps[currentStep - 1].icon, {
                        className: "w-4 h-4 text-azalove-600",
                      })}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-royal-900">
                        {steps[currentStep - 1].title}
                      </h2>
                      <p className="text-royal-600 text-sm">
                        {steps[currentStep - 1].description}
                      </p>
                    </div>
                  </div>
                </div>

                <CurrentStepComponent
                  onNext={handleNext}
                  onBack={currentStep > 1 ? handleBack : undefined}
                  shippingData={shippingData}
                  paymentData={paymentData}
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary />

              {/* Trust Indicators */}
              <div className="mt-6 space-y-4">
                <Card className="border-cream-200 bg-cream-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-royal-900">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-royal-600">
                          SSL encrypted checkout
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-cream-200 bg-cream-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-azalove-100 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-azalove-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-royal-900">
                          Fast Delivery
                        </h4>
                        <p className="text-xs text-royal-600">
                          Free shipping on orders over $50
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
