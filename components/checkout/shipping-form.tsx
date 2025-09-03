"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useFetch } from "@/hooks/use-fetch";
import { useTranslation } from "@/hooks/use-translation";
import axios from "axios";
import { Building, Check, Home, MapPin, Plus } from "lucide-react";
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
  const { t } = useTranslation();
  const { user } = useAuth();
  const { updateShippingData } = useCart();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const {
    data: addresses,
    loading: addressesLoading,
    error: addressesError,
  } = useFetch<Address[]>(
    user ? `${API_ENDPOINTS_FROM_NEXT.ADDRESSES}?userId=${user?.id}` : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = async (address: Address) => {
    setLoading(true);
    try {
      // First, set the address as default
      await axios.patch(
        `${API_ENDPOINTS_FROM_NEXT.ADDRESS_SET_DEFAULT}`,
        {
          addressId: address.id,
        },
        {
          headers: {
            "user-id": user?.id,
          },
        }
      );

      // Then fetch shipment information
      const shipmentResponse = await axios.get(
        `${API_ENDPOINTS_FROM_NEXT.ADDRESS_SHIPMENT}/${address.id}/shipment`
      );

      const shipmentData = shipmentResponse.data.data;
      // Update cart context with shipping data
      updateShippingData({
        address: address,
        shipment: shipmentData.shipment,
        locationType: shipmentData.locationType,
        locationName: shipmentData.locationName,
      });

      // Convert address to form data format and proceed
      const addressData = {
        email: user?.email || "",
        firstName: address.title === "Home" ? "Home" : "Work",
        lastName: "",
        address: address.addressLine1,
        city: address.postalCode, // Using postal code as city for now
        postalCode: address.postalCode,
        country: "United States",
        phoneNumber: address.phoneNumber,
        shipment: shipmentData.shipment,
        locationType: shipmentData.locationType,
        locationName: shipmentData.locationName,
      };

      onNext(addressData);
    } catch (error) {
      console.error(
        "Error setting default address or fetching shipment:",
        error
      );
      // Still proceed with address selection even if shipment fetch fails
      const addressData = {
        email: user?.email || "",
        firstName: address.title === "Home" ? "Home" : "Work",
        lastName: "",
        address: address.addressLine1,
        city: address.postalCode,
        postalCode: address.postalCode,
        country: "United States",
        phoneNumber: address.phoneNumber,
      };
      onNext(addressData);
    } finally {
      setLoading(false);
    }
  };

  const handleUseNewAddress = () => {
    setShowForm(true);
    setSelectedAddress(null);
  };

  // If user is not authenticated, show the form directly
  if (!user) {
    return (
      <div
        className="space-y-6"
        dir="rtl"
        style={{
          fontFamily:
            "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-royal-900 font-medium">
                {t("checkout.shipping.email")}
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
                  {t("checkout.shipping.firstName")}
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
                  {t("checkout.shipping.lastName")}
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
                {t("checkout.shipping.address")}
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
                  {t("checkout.shipping.city")}
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
                  {t("checkout.shipping.postalCode")}
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

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-cream-300 text-royal-700 hover:bg-cream-50"
              >
                {t("checkout.shipping.back")}
              </Button>
            )}
            <Button
              type="submit"
              className="bg-royal-500 hover:bg-azalove-600 text-white"
            >
              {t("checkout.shipping.continueToPayment")}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // If user is authenticated, show saved addresses or form
  if (showForm) {
    return (
      <div
        className="space-y-6"
        dir="rtl"
        style={{
          fontFamily:
            "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-royal-900">
            {t("checkout.shipping.shippingInfo")}
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(false)}
            className="border-cream-300 text-royal-700 hover:bg-cream-50"
          >
            {t("checkout.shipping.useSavedAddress")}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-royal-900 font-medium">
              {t("checkout.shipping.email")}
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
                {t("checkout.shipping.firstName")}
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
                {t("checkout.shipping.lastName")}
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
              {t("checkout.shipping.address")}
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
                {t("checkout.shipping.city")}
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
                {t("checkout.shipping.postalCode")}
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

          <div className="flex justify-between pt-6">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-cream-300 text-royal-700 hover:bg-cream-50"
              >
                {t("checkout.shipping.back")}
              </Button>
            )}
            <Button
              type="submit"
              className="bg-royal-500 hover:bg-azalove-600 text-white"
            >
              {t("checkout.shipping.continueToPayment")}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Show saved addresses for authenticated users
  return (
    <div
      className="space-y-6"
      dir="rtl"
      style={{
        fontFamily:
          "'Noto Sans Arabic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-royal-900">
          {t("checkout.shipping.chooseShippingAddress")}
        </h2>
        <Button
          type="button"
          variant="outline"
          onClick={handleUseNewAddress}
          className="border-cream-300 text-royal-700 hover:bg-cream-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("checkout.shipping.useNewAddress")}
        </Button>
      </div>

      {addressesLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-azalove-500 mx-auto"></div>
          <p className="text-royal-600 mt-2">
            {t("checkout.shipping.loadingAddresses")}
          </p>
        </div>
      ) : addressesError ? (
        <div className="text-center py-8 text-red-500">
          {t("checkout.shipping.errorLoadingAddresses")}.{" "}
          {t("checkout.shipping.useNewAddress")}.
        </div>
      ) : !addresses || addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 mx-auto text-royal-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-royal-900">
            {t("checkout.shipping.noSavedAddresses")}
          </h3>
          <p className="text-royal-600 mb-4">
            {t("checkout.shipping.noSavedAddressesDescription")}
          </p>
          <Button
            onClick={handleUseNewAddress}
            className="bg-royal-500 hover:bg-azalove-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("checkout.shipping.addNewAddress")}
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
                        {t("checkout.shipping.default")}
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

      <div className="flex justify-between pt-6">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-cream-300 text-royal-700 hover:bg-cream-50"
          >
            {t("checkout.shipping.back")}
          </Button>
        )}
        <Button
          type="button"
          className="ml-auto bg-royal-500 hover:bg-azalove-600 text-white"
          disabled={!selectedAddress || loading}
          onClick={() =>
            selectedAddress && handleAddressSelect(selectedAddress)
          }
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
          ) : (
            t("checkout.shipping.continueToPaymentButton")
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShippingForm;
