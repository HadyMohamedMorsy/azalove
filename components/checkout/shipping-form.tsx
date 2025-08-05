"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import {
  Building,
  Check,
  Clock,
  Home,
  MapPin,
  Plus,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Address {
  id: number;
  title: string;
  addressLine1: string;
  addressLine2?: string;
  countryId: number;
  regionId: number;
  cityId: number;
  areaId: number;
  postalCode: string;
  landmark?: string;
  phoneNumber: string;
  isDefault: boolean;
}

interface ShippingFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
}

const ShippingForm = ({ onNext, onBack }: ShippingFormProps) => {
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);

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

  const {
    data: addresses,
    loading,
    error,
  } = useFetch<Address[]>(
    user ? `${API_ENDPOINTS_FROM_NEXT.ADDRESSES}?userId=${user?.id}` : ""
  );

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      duration: "5-7 business days",
      icon: Truck,
      color: "bg-azalove-100 text-azalove-700",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      duration: "2-3 business days",
      icon: Clock,
      color: "bg-royal-100 text-royal-700",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 24.99,
      duration: "1 business day",
      icon: Zap,
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

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    // Convert address to form data format
    const addressData = {
      email: user?.email || "",
      firstName: address.title === "Home" ? "Home" : "Work",
      lastName: "",
      address: address.addressLine1,
      city: address.postalCode, // Using postal code as city for now
      postalCode: address.postalCode,
      country: "United States",
      shippingMethod: "standard",
      phoneNumber: address.phoneNumber,
    };
    onNext(addressData);
  };

  const handleUseNewAddress = () => {
    setShowForm(true);
    setSelectedAddress(null);
  };

  // If user is not authenticated, show the form directly
  if (!user) {
    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-royal-900 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-royal-900 font-medium"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-royal-900 font-medium"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-royal-900 font-medium">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-royal-900 font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="postalCode"
                  className="text-royal-900 font-medium"
                >
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-royal-900">
              Shipping Method
            </h3>
            <div className="space-y-3">
              {shippingOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                    formData.shippingMethod === option.id
                      ? "border-azalove-500 bg-azalove-50"
                      : "border-cream-200 hover:border-azalove-300"
                  }`}
                  onClick={() => handleInputChange("shippingMethod", option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}
                        >
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-royal-900">
                            {option.name}
                          </h4>
                          <p className="text-sm text-royal-600">
                            {option.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-royal-900">
                          ${option.price}
                        </div>
                        {formData.shippingMethod === option.id && (
                          <Check className="w-5 h-5 text-azalove-600 mt-1" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-cream-300 text-royal-700 hover:bg-cream-50"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="bg-royal-500 hover:bg-azalove-600 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // If user is authenticated, show saved addresses or form
  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-royal-900">
            Shipping Information
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(false)}
            className="border-cream-300 text-royal-700 hover:bg-cream-50"
          >
            Use Saved Address
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-royal-900 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-royal-900 font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-royal-900 font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-royal-900 font-medium">
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-royal-900 font-medium">
                City
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="postalCode"
                className="text-royal-900 font-medium"
              >
                Postal Code
              </Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className="border-cream-200 focus:border-azalove-500 focus:ring-azalove-500/20"
                required
              />
            </div>
          </div>

          {/* Shipping Method Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-royal-900">
              Shipping Method
            </h3>
            <div className="space-y-3">
              {shippingOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                    formData.shippingMethod === option.id
                      ? "border-azalove-500 bg-azalove-50"
                      : "border-cream-200 hover:border-azalove-300"
                  }`}
                  onClick={() => handleInputChange("shippingMethod", option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}
                        >
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-royal-900">
                            {option.name}
                          </h4>
                          <p className="text-sm text-royal-600">
                            {option.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-royal-900">
                          ${option.price}
                        </div>
                        {formData.shippingMethod === option.id && (
                          <Check className="w-5 h-5 text-azalove-600 mt-1" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-cream-300 text-royal-700 hover:bg-cream-50"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="bg-royal-500 hover:bg-azalove-600 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Show saved addresses for authenticated users
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-royal-900">
          Select Shipping Address
        </h2>
        <Button
          type="button"
          variant="outline"
          onClick={handleUseNewAddress}
          className="border-cream-300 text-royal-700 hover:bg-cream-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Use New Address
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azalove-500 mx-auto"></div>
          <p className="text-royal-600 mt-2">Loading your addresses...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          Error loading addresses. Please use a new address.
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 mx-auto text-royal-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-royal-900">
            No saved addresses
          </h3>
          <p className="text-royal-600 mb-4">
            You don't have any saved addresses yet.
          </p>
          <Button
            onClick={handleUseNewAddress}
            className="bg-royal-500 hover:bg-azalove-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                selectedAddress?.id === address.id
                  ? "border-azalove-500 bg-azalove-50"
                  : "border-cream-200 hover:border-azalove-300"
              }`}
              onClick={() => handleAddressSelect(address)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {address.title === "Home" ? (
                      <Home className="w-5 h-5 text-royal-400" />
                    ) : (
                      <Building className="w-5 h-5 text-royal-400" />
                    )}
                    <div>
                      <h3 className="font-medium text-royal-900">
                        {address.title}
                      </h3>
                      <div className="text-sm text-royal-600 space-y-1 mt-1">
                        <div>{address.addressLine1}</div>
                        {address.addressLine2 && (
                          <div>{address.addressLine2}</div>
                        )}
                        <div>
                          {address.postalCode}
                          {address.landmark && `, ${address.landmark}`}
                        </div>
                        <div>{address.phoneNumber}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {address.isDefault && (
                      <Badge className="bg-azalove-100 text-azalove-700 border-azalove-200">
                        Default
                      </Badge>
                    )}
                    {selectedAddress?.id === address.id && (
                      <Check className="w-5 h-5 text-azalove-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Shipping Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-royal-900">
          Shipping Method
        </h3>
        <div className="space-y-3">
          {shippingOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                formData.shippingMethod === option.id
                  ? "border-azalove-500 bg-azalove-50"
                  : "border-cream-200 hover:border-azalove-300"
              }`}
              onClick={() => handleInputChange("shippingMethod", option.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}
                    >
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-royal-900">
                        {option.name}
                      </h4>
                      <p className="text-sm text-royal-600">
                        {option.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-royal-900">
                      ${option.price}
                    </div>
                    {formData.shippingMethod === option.id && (
                      <Check className="w-5 h-5 text-azalove-600 mt-1" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-cream-300 text-royal-700 hover:bg-cream-50"
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          className="ml-auto bg-royal-500 hover:bg-azalove-600 text-white"
          disabled={!selectedAddress}
          onClick={() =>
            selectedAddress && handleAddressSelect(selectedAddress)
          }
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default ShippingForm;
