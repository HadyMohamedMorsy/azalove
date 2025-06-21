"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddressCard from "../dashboard/address-compoents/address-card";
import AddressDialog from "../dashboard/address-compoents/address-dialog";
import AddressesList from "../dashboard/address-compoents/addresses-list";

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

const AddressBook = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Address | null>(null);

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  const handleAddressAdded = (address?: Address) => {
    if (address) {
      setNewAddress(address);
    }
    handleDialogClose();
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  return (
    <AddressCard
      headerContent={
        <>
          <Button onClick={handleAddNewAddress}>
            <Plus className="w-4 h-4 mr-2" />
            Add Address
          </Button>
          <AddressDialog
            isOpen={isDialogOpen}
            onOpenChange={handleDialogClose}
            editingAddress={editingAddress}
            onSuccess={handleAddressAdded}
          />
        </>
      }
    >
      <AddressesList
        isDialogOpen={isDialogOpen}
        onDialogOpenChange={setIsDialogOpen}
        onEditAddress={handleEdit}
        newAddress={newAddress}
      />
    </AddressCard>
  );
};

export default AddressBook;
