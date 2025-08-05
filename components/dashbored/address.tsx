"use client";

import { Button } from "@/components/ui/button";
import { Address } from "@/types";
import { Heart, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import AddressCard from "../dashboard/address-compoents/address-card";
import AddressDialog from "../dashboard/address-compoents/address-dialog";
import AddressesList from "../dashboard/address-compoents/addresses-list";

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
    <div className="relative">
      {/* Romantic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 rounded-2xl -z-10" />

      {/* Floating hearts decoration */}
      <div className="absolute top-4 right-4 opacity-20">
        <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-20">
        <Sparkles className="w-4 h-4 text-pink-400 animate-bounce" />
      </div>

      <AddressCard
        headerContent={
          <>
            <Button
              onClick={handleAddNewAddress}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة عنوان
            </Button>
            <AddressDialog
              isOpen={isDialogOpen}
              onOpenChange={handleDialogClose}
              editingAddress={editingAddress}
              onSuccess={(address?: Address) => handleAddressAdded(address)}
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
    </div>
  );
};

export default AddressBook;
