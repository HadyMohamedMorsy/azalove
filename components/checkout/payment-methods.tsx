"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCurrency } from "@/hooks/use-currency";
import { useFetch } from "@/hooks/use-fetch";
import { Bank, PaymentMethod } from "@/types/payment";
import { Banknote, CreditCard, Truck } from "lucide-react";

interface PaymentMethodsProps {
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onBankSelect?: (bank: Bank) => void;
  selectedPaymentMethod?: PaymentMethod;
  selectedBank?: Bank;
}

export function PaymentMethods({
  onPaymentMethodSelect,
  onBankSelect,
  selectedPaymentMethod,
  selectedBank,
}: PaymentMethodsProps) {
  const { currencySymbol, defaultCurrency } = useCurrency();

  // Use useFetch for payment methods only
  const {
    data: paymentMethodsData,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
  } = useFetch<PaymentMethod[]>("/api/payment-methods/front");

  // Extract data from response
  const paymentMethods = paymentMethodsData || [];
  const loading = paymentMethodsLoading;
  const error = paymentMethodsError;

  const getPaymentIcon = (icon: string) => {
    switch (icon) {
      case "credit-card":
        return <CreditCard className="w-5 h-5" />;
      case "bank":
        return <Banknote className="w-5 h-5" />;
      case "cash":
        return <Truck className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethods.length === 0 && !loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">No payment methods available</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <RadioGroup
          value={selectedPaymentMethod?.id?.toString()}
          onValueChange={(value) => {
            const method = paymentMethods.find(
              (m) => m.id.toString() === value
            );
            if (method) {
              onPaymentMethodSelect(method);
            }
          }}
        >
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPaymentMethod?.id === method.id
                    ? "ring-2 ring-azalove-500 border-azalove-500 bg-azalove-50"
                    : "hover:border-azalove-300 hover:shadow-md"
                }`}
                onClick={() => {
                  onPaymentMethodSelect(method);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-6 h-6">
                      <RadioGroupItem
                        value={method.id.toString()}
                        id={`method-${method.id}`}
                        className="w-5 h-5"
                      />
                    </div>

                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-azalove-50 to-azalove-100 rounded-lg flex items-center justify-center">
                        <div className="text-azalove-600">
                          {getPaymentIcon(method.icon)}
                        </div>
                      </div>

                      <div className="flex-1">
                        <Label
                          htmlFor={`method-${method.id}`}
                          className="text-base font-semibold cursor-pointer text-gray-900"
                        >
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Secure payment method
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">
                          {method.is_active ? "Available" : "Unavailable"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
