import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface ShippingFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onNext, onPrevious }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input id="firstName" placeholder="John" required />
            </div>

            <div className="space-y-2">
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>

          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              required
            />
          </div>

          <div className="space-y-2">
            <Input id="address" placeholder="123 Main St" required />
          </div>

          <div className="space-y-2">
            <Input id="apt" placeholder="Apt 4B" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Input id="city" placeholder="San Francisco" required />
            </div>

            <div className="space-y-2">
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Input id="zip" placeholder="94103" required />
            </div>
          </div>

          <div className="space-y-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              onClick={onPrevious}
              variant="outline"
              className="text-checkout-primary border-checkout-primary hover:bg-checkout-secondary"
            >
              الي الخلف
            </Button>
            <Button
              type="submit"
              className="bg-checkout-primary hover:bg-checkout-primary-hover"
            >
              الي الأمام
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShippingForm;
