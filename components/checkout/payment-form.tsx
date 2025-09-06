"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useCreateOrder } from "@/hooks/use-create-order";
import { useTranslation } from "@/hooks/use-translation";
import { CreateOrderRequest } from "@/types/order";
import { Bank, PaymentMethod } from "@/types/payment";
import { useState } from "react";
import { PaymentMethods } from "./payment-methods";

// Payment icon component
const getPaymentIcon = (icon: string) => {
  switch (icon.toLowerCase()) {
    case "paypal":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.543-.676c-.608-.685-1.408-1.115-2.364-1.115H9.95c-.524 0-.968.382-1.05.9L7.76 19.337h4.716c.524 0 .968-.382 1.05-.9l1.12-7.106h2.19c2.57 0 4.578-.543 5.69-1.81 1.01-1.15 1.304-2.42 1.012-4.287-.023-.143-.047-.288-.077-.437z" />
        </svg>
      );
    case "visa":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5 6.5h5v11h-5zM7.5 6.5h-5v11h5zM2 6.5h1.5v11H2zM20.5 6.5H22v11h-1.5z" />
        </svg>
      );
    case "mastercard":
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );
  }
};

interface PaymentFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onOrderConfirmed?: (orderData: any) => void;
  shippingData?: any;
}

export default function PaymentForm({
  onNext,
  onBack,
  onOrderConfirmed,
  shippingData,
}: PaymentFormProps) {
  const { t } = useTranslation();
  const { cartItems, appliedCoupon, clearCart, removeCoupon } = useCart();
  const { createOrder, loading, error } = useCreateOrder();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setSelectedBank(null); // Reset bank selection when payment method changes
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
  };

  const handleSubmit = () => {
    if (!selectedPaymentMethod) {
      alert(t("checkout.payment.selectPaymentMethod"));
      return;
    }

    const paymentData = {
      paymentMethod: selectedPaymentMethod,
    };

    onNext(paymentData);
  };

  const handleConfirmOrder = async () => {
    if (!selectedPaymentMethod || isCreatingOrder) return;

    setIsCreatingOrder(true);
    setOrderError(null); // Clear previous errors

    try {
      const orderRequest: CreateOrderRequest = {
        products: cartItems.map((item) => ({
          productId: parseInt(item.id.toString()),
          quantity: item.quantity,
          price: item.price,
          amount: item.price * item.quantity,
        })),
        paymentStatus: "pending",
        status: "pending",
        payment_id: selectedPaymentMethod.id,
        coupon_id: appliedCoupon?.id,
        address_id: shippingData?.address_id,
      };

      const result = await createOrder(orderRequest);

      if (result?.statusCode === 201) {
        clearCart();
        removeCoupon();
        onOrderConfirmed?.(result.data);
      } else {
        console.error("Order creation failed:", result);
        setOrderError(
          result?.message || t("checkout.payment.orderCreationFailed")
        );
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      setOrderError(t("checkout.payment.orderCreationFailed"));
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const canProceed = selectedPaymentMethod;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-royal-900">
            {t("checkout.payment.title")}
          </CardTitle>
          <p className="text-royal-600 text-sm">
            {t("checkout.payment.subtitle")}
          </p>
        </CardHeader>
        <CardContent>
          <PaymentMethods
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onBankSelect={handleBankSelect}
            selectedPaymentMethod={selectedPaymentMethod || undefined}
            selectedBank={selectedBank || undefined}
          />
        </CardContent>
      </Card>

      {/* Payment Summary */}
      {selectedPaymentMethod && (
        <Card className="bg-gradient-to-r from-azalove-50 to-azalove-100 border-azalove-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-azalove-500 to-azalove-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">
                    {getPaymentIcon(selectedPaymentMethod.icon)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-royal-900 text-lg">
                    {selectedPaymentMethod.name}
                  </h4>
                  <p className="text-sm text-royal-600">
                    {selectedBank
                      ? `${selectedBank.bankName}`
                      : t("checkout.payment.securePaymentMethod")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  ✓ {t("checkout.payment.selected")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {orderError && (
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800">
                  {t("checkout.payment.orderCreationFailed")}
                </h4>
                <p className="text-sm text-red-600 mt-1">{orderError}</p>
              </div>
              <button
                onClick={() => setOrderError(null)}
                className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 px-6 py-3 border-2 border-azalove-300 text-azalove-700 hover:bg-azalove-50 hover:border-azalove-400 transition-all duration-200 font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("checkout.payment.back")}
        </Button>

        {onOrderConfirmed ? (
          <Button
            onClick={handleConfirmOrder}
            disabled={!canProceed || isCreatingOrder}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {isCreatingOrder
              ? t("checkout.payment.creatingOrder")
              : t("checkout.payment.confirmOrder")}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-azalove-600 to-azalove-700 hover:from-azalove-700 hover:to-azalove-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
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
            {t("checkout.payment.continue")}
          </Button>
        )}
      </div>
    </div>
  );
}
