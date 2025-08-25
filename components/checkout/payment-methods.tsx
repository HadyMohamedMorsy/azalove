"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/hooks/use-currency";
import { Bank, PaymentMethod } from "@/types/payment";
import { Banknote, Building2, CreditCard, MapPin, Truck } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currencySymbol, defaultCurrency } = useCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch payment methods
        const paymentResponse = await fetch("/api/payment-methods/front");
        const paymentData = await paymentResponse.json();

        if (paymentData.success) {
          setPaymentMethods(paymentData.data);
        }

        // Fetch banks
        const bankResponse = await fetch("/api/bank/front");
        const bankData = await bankResponse.json();

        if (bankData.success) {
          setBanks(bankData.data);
        }
      } catch (err) {
        setError("Failed to load payment methods");
        console.error("Error fetching payment data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
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
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedPaymentMethod?.id === method.id
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "hover:border-gray-300"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={method.id.toString()}
                      id={`method-${method.id}`}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-blue-600">
                        {getPaymentIcon(method.icon)}
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor={`method-${method.id}`}
                          className="text-base font-medium cursor-pointer"
                        >
                          {method.name}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Bank Transfer Section - Only show if bank transfer is selected */}
      {selectedPaymentMethod?.slug === "bank-transfer" && (
        <>
          <Separator />
          <div>
            <h4 className="text-md font-medium mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Available Banks
            </h4>
            {banks.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No banks available for bank transfer
              </div>
            ) : (
              <div className="grid gap-4">
                {banks.map((bank) => (
                  <Card
                    key={bank.id}
                    className={`cursor-pointer transition-all ${
                      selectedBank?.id === bank.id
                        ? "ring-2 ring-green-500 border-green-500"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => onBankSelect?.(bank)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {bank.featuredImage ? (
                            <img
                              src={bank.featuredImage}
                              alt={bank.bankName}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-gray-500" />
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900">
                              {bank.bankName}
                            </h5>
                            <Badge variant="secondary" className="text-xs">
                              {bank.branchName}
                            </Badge>
                          </div>

                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Account:</span>
                              <span>{bank.accountName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Number:</span>
                              <span className="font-mono">
                                {bank.accountNumber}
                              </span>
                            </div>
                          </div>

                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              <span>
                                {bank.area.name}, {bank.city.name},{" "}
                                {bank.region.name}, {bank.country.name}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 space-y-1">
                            <div className="text-xs">
                              <span className="font-medium">IBAN:</span>
                              <span className="font-mono ml-2">
                                {bank.iban}
                              </span>
                            </div>
                            <div className="text-xs">
                              <span className="font-medium">SWIFT:</span>
                              <span className="font-mono ml-2">
                                {bank.swiftCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
