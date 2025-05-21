import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

interface ShippingFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onNext, onPrevious }) => {
  return (
    <Card>
      <CardBody className="pt-6">
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
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="(123) 456-7890"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="address"
              label="Street Address"
              placeholder="123 Main St"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="apt"
              label="Apartment, suite, etc. (optional)"
              placeholder="Apt 4B"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Input
                id="city"
                label="City"
                placeholder="San Francisco"
                required
              />
            </div>

            <div className="space-y-2">
              <Select required>
                <SelectItem>United States</SelectItem>
                <SelectItem>Canada</SelectItem>
                <SelectItem>United Kingdom</SelectItem>
                <SelectItem>Australia</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <Input
                id="zip"
                label="ZIP / Postal Code"
                placeholder="94103"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Select>
              <SelectItem>United States</SelectItem>
              <SelectItem>Canada</SelectItem>
              <SelectItem>United Kingdom</SelectItem>
              <SelectItem>Australia</SelectItem>
            </Select>
          </div>

          <div className="pt-4 flex justify-between">
            <Button
              type="button"
              onPress={onPrevious}
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
      </CardBody>
    </Card>
  );
};

export default ShippingForm;
