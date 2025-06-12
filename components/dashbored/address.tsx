"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Building, Edit, Home, MapPin, Plus, Trash2 } from "lucide-react";
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

const AddressBook = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
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

  const {
    data: addresses,
    loading,
    error,
  } = useFetch<Address[]>(
    `${API_ENDPOINTS_FROM_NEXT.ADDRESSES}?userId=${user?.id}`
  );

  const resetForm = () => {
    setFormData({
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
    setEditingAddress(null);
  };

  const handleFormChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = async (addressId: number) => {
    try {
      await axios.put(`${API_ENDPOINTS_FROM_NEXT.ADDRESS_UPDATE}`, {
        ...formData,
        id: addressId,
      });
      toast({
        title: "Address updated",
        description: "Your address has been successfully updated.",
      });
    } catch (error) {
      throw new Error("Failed to update address");
    }
  };

  const createAddress = async () => {
    try {
      await axios.post(
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
    } catch (error) {
      throw new Error("Failed to create address");
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress);
      } else {
        await createAddress();
      }
      resetForm();
      setIsAddDialogOpen(false);
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

  const handleEdit = (address: Address) => {
    const { id, isDefault, ...addressData } = address;
    setFormData(addressData);
    setEditingAddress(id);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_ENDPOINTS_FROM_NEXT.ADDRESS_DELETE}`, {
        data: { id },
      });
      toast({
        title: "Address deleted",
        description: "The address has been removed from your address book.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
      });
    }
  };

  const setAsDefault = async (id: number) => {
    try {
      await axios.put(`${API_ENDPOINTS_FROM_NEXT.ADDRESSES}/${id}/default`);
      toast({
        title: "Default address updated",
        description: "This address is now set as your default.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update default address. Please try again.",
      });
    }
  };

  if (loading) {
    return <Skeleton length={4} />;
  }

  if (error) {
    return <div className="text-red-500">Error loading addresses: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Book
            </CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses.
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
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
                  <Label htmlFor="addressLine2">
                    Address Line 2 (Optional)
                  </Label>
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
                      onChange={(e) =>
                        handleFormChange("regionId", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleFormChange("cityId", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="areaId">Area</Label>
                    <Input
                      id="areaId"
                      type="number"
                      placeholder="Area ID"
                      value={formData.areaId}
                      onChange={(e) =>
                        handleFormChange("areaId", e.target.value)
                      }
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
                    onChange={(e) =>
                      handleFormChange("landmark", e.target.value)
                    }
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingAddress ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!addresses || addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
            <p className="text-muted-foreground">
              Add your first address to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {address.title === "Home" ? (
                      <Home className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Building className="w-5 h-5 text-muted-foreground" />
                    )}
                    <h3 className="font-medium">{address.title}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{address.addressLine1}</div>
                  <div>{address.addressLine2}</div>
                  <div>
                    {address.postalCode}, {address.landmark}
                  </div>
                  <div>{address.phoneNumber}</div>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAsDefault(address.id)}
                    className="w-full"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressBook;
