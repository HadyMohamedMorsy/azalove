import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface PaymentFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onNext, onPrevious }) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    key: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString().padStart(2, "0"),
  }));

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    const shortYear = year.toString().slice(-2);
    return {
      key: shortYear,
      label: shortYear,
    };
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="space-y-6"
        >
          <RadioGroup defaultValue="card" className="space-y-4">
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit / Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal (Coming Soon)</Label>
            </div>
          </RadioGroup>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="John Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.key} value={month.key}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year.key} value={year.key}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" placeholder="94103" required />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="text-checkout-primary border-checkout-primary hover:bg-checkout-secondary"
            >
              Back to Shipping
            </Button>
            <Button
              type="submit"
              className="bg-checkout-primary hover:bg-checkout-primary-hover"
            >
              Complete Purchase
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
