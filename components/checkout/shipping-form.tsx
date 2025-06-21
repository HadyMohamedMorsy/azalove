"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { Building, Check, Clock, Home, MapPin, Truck, Zap } from "lucide-react";
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
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
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
  }

  // If user is authenticated, show saved addresses or form
  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(false)}
          >
            Use Saved Address
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
    );
  }

  // Show saved addresses for authenticated users
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Select Shipping Address</h2>
        <Button type="button" variant="outline" onClick={handleUseNewAddress}>
          Use New Address
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading your addresses...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          Error loading addresses. Please use a new address.
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No saved addresses</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any saved addresses yet.
          </p>
          <Button onClick={handleUseNewAddress}>Add New Address</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedAddress?.id === address.id
                  ? "ring-2 ring-primary border-primary"
                  : ""
              }`}
              onClick={() => handleAddressSelect(address)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {address.title === "Home" ? (
                      <Home className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Building className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <h3 className="font-medium">{address.title}</h3>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
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
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    {selectedAddress?.id === address.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button
          type="button"
          className="ml-auto"
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
