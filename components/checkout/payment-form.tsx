"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building,
  Check,
  CreditCard,
  Lock,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

interface PaymentFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
}

const PaymentForm = ({ onNext, onBack }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    billingCity: "",
    billingPostalCode: "",
  });

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      color: "bg-azalove-100 text-azalove-700",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Smartphone,
      description: "Pay with your PayPal account",
      color: "bg-royal-100 text-royal-700",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      description: "Direct bank transfer",
      color: "bg-amaranth-100 text-amaranth-700",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-royal-900 mb-4">
              Payment Method
            </h3>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) =>
                handleInputChange("paymentMethod", value)
              }
            >
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                      formData.paymentMethod === method.id
                        ? "border-azalove-500 bg-azalove-50"
                        : "border-cream-200 hover:border-azalove-300"
                    }`}
                    onClick={() =>
                      handleInputChange("paymentMethod", method.id)
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="text-azalove-500"
                        />
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${method.color}`}
                        >
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={method.id}
                            className="font-medium cursor-pointer text-royal-900"
                          >
                            {method.name}
                          </Label>
                          <p className="text-sm text-royal-600">
                            {method.description}
                          </p>
                        </div>
                        {formData.paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-azalove-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {formData.paymentMethod === "card" && (
            <div className="space-y-4 p-6 border-2 border-cream-200 rounded-lg bg-cream-50/30">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-royal-900">
                  Secure Card Information
                </span>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                  SSL Encrypted
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="cardholderName"
                    className="text-royal-900 font-medium"
                  >
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) =>
                      handleInputChange("cardholderName", e.target.value)
                    }
                    className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="cardNumber"
                    className="text-royal-900 font-medium"
                  >
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20 pr-10"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="w-4 h-4 text-royal-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="expiryDate"
                      className="text-royal-900 font-medium"
                    >
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-royal-900 font-medium">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "paypal" && (
            <div className="p-6 border-2 border-cream-200 rounded-lg bg-cream-50/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-royal-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-royal-700" />
                </div>
                <div>
                  <h4 className="font-medium text-royal-900">
                    PayPal Checkout
                  </h4>
                  <p className="text-sm text-royal-600">
                    You'll be redirected to PayPal to complete your payment
                  </p>
                </div>
              </div>
              <p className="text-sm text-royal-600">
                Click "Complete Order" to proceed to PayPal's secure payment
                page.
              </p>
            </div>
          )}

          {formData.paymentMethod === "bank" && (
            <div className="p-6 border-2 border-cream-200 rounded-lg bg-cream-50/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amaranth-100 flex items-center justify-center">
                  <Building className="w-5 h-5 text-amaranth-700" />
                </div>
                <div>
                  <h4 className="font-medium text-royal-900">Bank Transfer</h4>
                  <p className="text-sm text-royal-600">
                    Direct bank transfer details will be provided after order
                    confirmation
                  </p>
                </div>
              </div>
              <p className="text-sm text-royal-600">
                You'll receive bank transfer instructions via email after
                placing your order.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-cream-300 text-royal-700 hover:bg-cream-50"
            >
              Back to Shipping
            </Button>
          )}
          <Button
            type="submit"
            className="bg-royal-500 hover:bg-azalove-600 text-white"
          >
            Complete Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
