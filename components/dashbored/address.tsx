"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddressBook = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      name: "Home Address",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "Work Address",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: "home",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const resetForm = () => {
    setFormData({
      type: "home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    });
    setEditingAddress(null);
  };

  const handleSubmit = () => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress
            ? { ...formData, id: editingAddress, isDefault: false }
            : addr
        )
      );
      toast({
        title: "Address updated",
        description: "Your address has been successfully updated.",
      });
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddress]);
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (address: any) => {
    setFormData(address);
    setEditingAddress(address.id);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    toast({
      title: "Address deleted",
      description: "The address has been removed from your address book.",
    });
  };

  const setAsDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
    toast({
      title: "Default address updated",
      description: "This address is now set as your default.",
    });
  };

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
                  <Label htmlFor="addressName">Address Name</Label>
                  <Input
                    id="addressName"
                    placeholder="e.g., Home, Work, Mom's House"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="123 Main Street"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        street: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                    />
                  </div>
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
        {addresses.length === 0 ? (
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
                    {address.type === "home" ? (
                      <Home className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Building className="w-5 h-5 text-muted-foreground" />
                    )}
                    <h3 className="font-medium">{address.name}</h3>
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
                  <div>{address.street}</div>
                  <div>
                    {address.city}, {address.state} {address.zipCode}
                  </div>
                  <div>{address.country}</div>
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
