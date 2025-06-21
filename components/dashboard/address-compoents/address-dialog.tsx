"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
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

type AddressFormData = Omit<Address, "id" | "isDefault">;

interface AddressDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingAddress: Address | null;
  onSuccess: (address?: Address) => void;
}

export default function AddressDialog({
  isOpen,
  onOpenChange,
  editingAddress,
  onSuccess,
}: AddressDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState<AddressFormData>({
    title: "",
    addressLine1: "",
    addressLine2: "",
    countryId: 0,
    regionId: 0,
    cityId: 0,
    areaId: 0,
    postalCode: "",
    landmark: "",
    phoneNumber: "",
  });

  const handleFormChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = async (addressId: number) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS_FROM_NEXT.ADDRESS_UPDATE}`,
        {
          ...formData,
          id: addressId,
        }
      );
      toast({
        title: "Address updated",
        description: "Your address has been successfully updated.",
      });
      onSuccess(
        response.data.data || { ...formData, id: addressId, isDefault: false }
      );
    } catch (error) {
      throw new Error("Failed to update address");
    }
  };

  const createAddress = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINTS_FROM_NEXT.ADDRESS_CREATE,
        { ...formData },
        {
          headers: {
            "user-id": user?.id,
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      });
      onSuccess(response.data.data);
    } catch (error) {
      throw new Error("Failed to create address");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id);
      } else {
        await createAddress();
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription>
              {editingAddress
                ? "Update your address information."
                : "Add a new address to your address book."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Address Title</Label>
              <Input
                id="title"
                placeholder="e.g., Home, Work, Office"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                placeholder="Street address, P.O. box"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleFormChange("addressLine1", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input
                id="addressLine2"
                placeholder="Apartment, suite, unit, building, floor, etc."
                value={formData.addressLine2}
                onChange={(e) =>
                  handleFormChange("addressLine2", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryId">Country</Label>
                <Input
                  id="countryId"
                  type="number"
                  placeholder="Country ID"
                  value={formData.countryId}
                  onChange={(e) =>
                    handleFormChange("countryId", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regionId">Region</Label>
                <Input
                  id="regionId"
                  type="number"
                  placeholder="Region ID"
                  value={formData.regionId}
                  onChange={(e) => handleFormChange("regionId", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cityId">City</Label>
                <Input
                  id="cityId"
                  type="number"
                  placeholder="City ID"
                  value={formData.cityId}
                  onChange={(e) => handleFormChange("cityId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="areaId">Area</Label>
                <Input
                  id="areaId"
                  type="number"
                  placeholder="Area ID"
                  value={formData.areaId}
                  onChange={(e) => handleFormChange("areaId", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Postal code"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleFormChange("postalCode", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleFormChange("phoneNumber", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={(e) => handleFormChange("landmark", e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingAddress ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
