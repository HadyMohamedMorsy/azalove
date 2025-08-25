"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Bank, PaymentMethod } from "@/types/payment";
import { useState } from "react";
import { PaymentMethods } from "./payment-methods";

interface PaymentFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const { t } = useTranslation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setSelectedBank(null); // Reset bank selection when payment method changes
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
  };

  const handleSubmit = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // If bank transfer is selected, require bank selection
    if (selectedPaymentMethod.slug === "bank-transfer" && !selectedBank) {
      alert("Please select a bank for bank transfer");
      return;
    }

    const paymentData = {
      paymentMethod: selectedPaymentMethod,
      bank: selectedBank,
      // Add other payment form data here
    };

    onNext(paymentData);
  };

  const canProceed =
    selectedPaymentMethod &&
    (selectedPaymentMethod.slug !== "bank-transfer" || selectedBank);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-royal-900">
            {t("checkout.payment.title")}
          </CardTitle>
          <p className="text-royal-600 text-sm">
            {t("checkout.payment.description")}
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
        <Card className="bg-azalove-50 border-azalove-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-royal-900">
                  Selected Payment Method
                </h4>
                <p className="text-sm text-royal-600">
                  {selectedPaymentMethod.name}
                  {selectedBank && ` - ${selectedBank.bankName}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-royal-600">Payment Method</p>
                <p className="font-medium text-royal-900">
                  {selectedPaymentMethod.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="px-8 py-2 border-royal-300 text-royal-700 hover:bg-royal-50"
        >
          {t("checkout.back")}
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="px-8 py-2 bg-royal-600 hover:bg-royal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("checkout.continue")}
        </Button>
      </div>
    </div>
  );
}
