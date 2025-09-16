"use client";
import { BankAccounts } from "@/components/checkout/bank-accounts";
import OrderConfirmation from "@/components/checkout/order-confirm";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm from "@/components/checkout/payment-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useGlobalAnalytics } from "@/hooks/use-global-analytics";
import { useTranslation } from "@/hooks/use-translation";
import { Bank } from "@/types/payment";
import {
  Building2,
  Check,
  CheckCircle,
  CreditCard,
  Shield,
  Truck,
} from "lucide-react";
import React, { useState } from "react";

const Checkout = () => {
  const { t } = useTranslation();
  const { cartItems, getTotalPrice } = useCart();
  const { settings } = useGeneralSettings();
  const { trackPurchase } = useGlobalAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  // Get currency from settings, fallback to USD if not set
  const currency = settings?.default_currency || "USD";

  const steps = [
    {
      id: 1,
      title: "طريقة الدفع",
      description: "اختر طريقة الدفع المناسبة لك",
      icon: CreditCard,
      component: null, // Will be handled with tabs
    },
    {
      id: 2,
      title: t("checkout.steps.shipping"),
      description: t("checkout.steps.shippingDescription"),
      icon: Truck,
      component: ShippingForm,
    },
    {
      id: 3,
      title: t("checkout.steps.payment"),
      description: t("checkout.steps.paymentDescription"),
      icon: CreditCard,
      component: PaymentForm,
    },
    {
      id: 4,
      title: t("checkout.steps.confirmation"),
      description: t("checkout.steps.confirmationDescription"),
      icon: CheckCircle,
      component: OrderConfirmation,
    },
  ];

  const handleNext = (data: any) => {
    if (currentStep === 1) {
      // Payment method selection - store the choice
      setPaymentData({
        paymentType: activeTab,
        selectedBank: selectedBank,
      });
    } else if (currentStep === 2) {
      setShippingData(data);
    } else if (currentStep === 3) {
      setPaymentData({
        ...paymentData,
        ...data,
      });
    }

    // If moving to confirmation step, track purchase event
    if (currentStep === 3) {
      const transactionId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      trackPurchase({
        transaction_id: transactionId,
        value: getTotalPrice(),
        currency: currency,
        items: cartItems.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: "General",
        })),
      });
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmOrder = (orderResult: any) => {
    setOrderData(orderResult);
    setOrderConfirmed(true);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  // Show order confirmation if order is confirmed
  if (orderConfirmed) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-azalove-50/30 font-arabic"
        dir="rtl"
        style={{
          fontFamily:
            "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OrderConfirmation
            shippingData={shippingData}
            paymentData={paymentData}
            orderData={orderData}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-azalove-50/30 font-arabic"
      dir="rtl"
      style={{
        fontFamily:
          "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-royal-900">
                {t("checkout.title")}
              </h1>
              <p className="text-royal-600 mt-1 text-lg">
                {t("checkout.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-azalove-100 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-azalove-600" />
              <span className="text-base font-medium text-azalove-700">
                {t("checkout.secureCheckout")}
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
                      className={`text-base font-medium ${
                        currentStep >= step.id
                          ? "text-royal-900"
                          : "text-royal-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    <p
                      className={`text-sm ${
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
                      <h2 className="text-2xl font-semibold text-royal-900">
                        {steps[currentStep - 1].title}
                      </h2>
                      <p className="text-royal-600 text-base">
                        {steps[currentStep - 1].description}
                      </p>
                    </div>
                  </div>
                </div>

                {currentStep === 1 ? (
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-cream-100 p-1 rounded-xl">
                      <TabsTrigger
                        value="account"
                        className="flex items-center gap-2 data-[state=active]:bg-azalove-500 data-[state=active]:text-white data-[state=inactive]:text-royal-600 data-[state=inactive]:hover:text-azalove-600 transition-all duration-200 rounded-lg text-base font-medium py-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        الدفع الإلكتروني
                      </TabsTrigger>
                      <TabsTrigger
                        value="bank"
                        className="flex items-center gap-2 data-[state=active]:bg-azalove-500 data-[state=active]:text-white data-[state=inactive]:text-royal-600 data-[state=inactive]:hover:text-azalove-600 transition-all duration-200 rounded-lg text-base font-medium py-2"
                      >
                        <Building2 className="w-5 h-5" />
                        التحويل البنكي
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                      <div className="space-y-6">
                        <div className="text-center py-4">
                          <h3 className="text-2xl font-semibold text-royal-900 mb-3">
                            الدفع الإلكتروني
                          </h3>
                          <p className="text-lg text-royal-600">
                            أكمل عملية الشراء عبر الموقع باستخدام طرق الدفع
                            المتاحة
                          </p>
                        </div>

                        <div className="bg-azalove-50 border border-azalove-200 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-azalove-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-azalove-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-royal-800 mb-4">
                                طرق الدفع المتاحة
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 text-royal-700">
                                  <div className="w-2 h-2 bg-azalove-500 rounded-full"></div>
                                  <span className="text-base">
                                    بطاقات الائتمان والخصم
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3 text-royal-700">
                                  <div className="w-2 h-2 bg-azalove-500 rounded-full"></div>
                                  <span className="text-base">PayPal</span>
                                </div>
                                <div className="flex items-center space-x-3 text-royal-700">
                                  <div className="w-2 h-2 bg-azalove-500 rounded-full"></div>
                                  <span className="text-base">
                                    محافظ إلكترونية
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3 text-royal-700">
                                  <div className="w-2 h-2 bg-azalove-500 rounded-full"></div>
                                  <span className="text-base">
                                    طرق دفع آمنة ومضمونة
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <button
                            onClick={() => handleNext({})}
                            className="px-10 py-4 bg-gradient-to-r from-azalove-600 to-azalove-700 hover:from-azalove-700 hover:to-azalove-800 text-white transition-all duration-200 font-semibold shadow-lg hover:shadow-xl rounded-lg flex items-center justify-center text-lg"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            متابعة
                          </button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="bank">
                      <div className="space-y-6">
                        <div className="text-center py-4">
                          <h3 className="text-2xl font-semibold text-royal-900 mb-3">
                            التحويل البنكي
                          </h3>
                          <p className="text-lg text-royal-600">
                            اختر أحد الحسابات البنكية التالية وقم بتحويل المبلغ
                            المطلوب
                          </p>
                        </div>

                        <div className="space-y-6">
                          <BankAccounts
                            onBankSelect={setSelectedBank}
                            selectedBank={selectedBank || undefined}
                          />

                          <div className="bg-azalove-50 border border-azalove-200 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-azalove-100 rounded-lg flex items-center justify-center">
                                  <svg
                                    className="w-5 h-5 text-azalove-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-royal-800 mb-2">
                                  تعليمات مهمة
                                </h4>
                                <p className="text-base text-royal-700 leading-relaxed">
                                  بعد إتمام التحويل، يرجى التواصل معنا عبر
                                  الواتساب أو الهاتف لتأكيد الطلب. سيتم إرسال
                                  رقم الطلب لك بعد إتمام العملية.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : CurrentStepComponent ? (
                  <CurrentStepComponent
                    onNext={handleNext}
                    onBack={currentStep > 1 ? handleBack : () => {}}
                    onOrderConfirmed={
                      currentStep === 3 ? handleConfirmOrder : undefined
                    }
                    shippingData={shippingData}
                    paymentData={paymentData}
                  />
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
