"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Truck, Clock, Zap } from "lucide-react";

interface ShippingFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
}

const ShippingForm = ({ onNext, onBack }: ShippingFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    shippingMethod: "standard",
  });

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      duration: "5-7 business days",
      icon: Truck,
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      duration: "2-3 business days",
      icon: Clock,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 24.99,
      duration: "1 business day",
      icon: Zap,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
        <RadioGroup
          value={formData.shippingMethod}
          onValueChange={(value) => handleInputChange("shippingMethod", value)}
        >
          <div className="space-y-3">
            {shippingOptions.map((option) => (
              <Card
                key={option.id}
                className="cursor-pointer hover:bg-accent transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <option.icon className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor={option.id}
                          className="font-medium cursor-pointer"
                        >
                          {option.name}
                        </Label>
                        <span className="font-semibold">${option.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit" className="ml-auto">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;
