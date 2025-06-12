"use client";

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

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  return (
    <AddressCard
      headerContent={
        <AddressDialog
          isOpen={isDialogOpen}
          onOpenChange={handleDialogClose}
          editingAddress={editingAddress}
          onSuccess={() => {
            window.location.reload();
          }}
        />
      }
    >
      <AddressesList
        isDialogOpen={isDialogOpen}
        onDialogOpenChange={setIsDialogOpen}
        onEditAddress={handleEdit}
      />
    </AddressCard>
  );
};

export default AddressBook;
