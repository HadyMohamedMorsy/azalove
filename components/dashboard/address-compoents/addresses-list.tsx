"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Building, Edit, Home, MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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

interface AddressesListProps {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  onEditAddress: (address: Address) => void;
  newAddress?: Address | null;
}

export default function AddressesList({
  isDialogOpen,
  onDialogOpenChange,
  onEditAddress,
  newAddress,
}: AddressesListProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [localAddresses, setLocalAddresses] = useState<Address[]>([]);

  const {
    data: addresses,
    loading,
    error,
  } = useFetch<Address[]>(
    `${API_ENDPOINTS_FROM_NEXT.ADDRESSES}?userId=${user?.id}`
  );

  // Update local addresses when API data changes
  useEffect(() => {
    if (addresses) {
      setLocalAddresses(addresses);
    }
  }, [addresses]);

  // Append new address when it's added
  useEffect(() => {
    if (newAddress) {
      setLocalAddresses((prev) => [...prev, newAddress]);
    }
  }, [newAddress]);

  const addNewAddress = (newAddress: Address) => {
    setLocalAddresses((prev) => [...prev, newAddress]);
  };

  const handleEdit = (address: Address) => {
    onEditAddress(address);
    onDialogOpenChange(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_ENDPOINTS_FROM_NEXT.ADDRESS_DELETE}`, {
        data: { id },
      });

      // Remove from local state
      setLocalAddresses((prev) => prev.filter((addr) => addr.id !== id));

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

      // Update local state to reflect default change
      setLocalAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );

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
    return <div>Loading addresses...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading addresses: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Your Addresses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!localAddresses || localAddresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
            <p className="text-muted-foreground">
              Add your first address to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {localAddresses.map((address) => (
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
                  {address.addressLine2 && <div>{address.addressLine2}</div>}
                  <div>
                    {address.postalCode}
                    {address.landmark && `, ${address.landmark}`}
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
}
