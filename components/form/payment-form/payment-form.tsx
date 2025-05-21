import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
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
      <CardBody className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="space-y-6"
        >
          <RadioGroup defaultValue="card" className="space-y-4">
            <Radio
              className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50"
              value="Credit / Debit Card"
              id="card"
            />
            <Radio
              className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50"
              value="PayPal (Coming Soon)"
              id="paypal"
            />
          </RadioGroup>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                label="Name on Card"
                id="cardName"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                label="Card Number"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <Select required items={months} placeholder="MM">
                    {(month) => <SelectItem>{month.label}</SelectItem>}
                  </Select>

                  <Select required items={years} placeholder="YY">
                    {(year) => <SelectItem>{year.label}</SelectItem>}
                  </Select>
                </div>
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <Input label="CVV" id="cvv" placeholder="123" required />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <Input label="ZIP" id="zip" placeholder="94103" required />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              variant="shadow"
              onPress={onPrevious}
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
      </CardBody>
    </Card>
  );
};

export default PaymentForm;
