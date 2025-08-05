"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api-interceptor";
import {
  Building,
  Edit,
  Heart,
  Home,
  MapPin,
  Sparkles,
  Trash2,
} from "lucide-react";
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
      await api.delete(`${API_ENDPOINTS_FROM_NEXT.ADDRESS_DELETE}`, {
        data: { id },
      });

      // Remove from local state
      setLocalAddresses((prev) => prev.filter((addr) => addr.id !== id));

      toast({
        title: "تم حذف العنوان",
        description: "تم إزالة العنوان من دليل العناوين الخاص بك.",
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "تم تحديث الجلسة تلقائياً. يرجى المحاولة مرة أخرى.",
        });
      } else {
        toast({
          title: "خطأ",
          description: "فشل في حذف العنوان. يرجى المحاولة مرة أخرى.",
        });
      }
    }
  };

  const setAsDefault = async (id: number) => {
    try {
      await api.put(`${API_ENDPOINTS_FROM_NEXT.ADDRESSES}/${id}/default`);

      // Update local state to reflect default change
      setLocalAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );

      toast({
        title: "تم تحديث العنوان الافتراضي",
        description: "هذا العنوان هو الآن العنوان الافتراضي الخاص بك.",
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "تم تحديث الجلسة تلقائياً. يرجى المحاولة مرة أخرى.",
        });
      } else {
        toast({
          title: "خطأ",
          description:
            "فشل في تحديث العنوان الافتراضي. يرجى المحاولة مرة أخرى.",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto text-rose-400 animate-pulse mb-4" />
          <p className="text-rose-600 font-medium">جاري تحميل عناوينك...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-rose-500 mb-4">
          <Sparkles className="w-12 h-12 mx-auto mb-2" />
          <p className="font-medium">خطأ في تحميل العناوين: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
        <CardTitle className="flex items-center gap-2 text-rose-800">
          <MapPin className="w-5 h-5 text-rose-500" />
          عناوينك
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-white to-rose-50/20">
        {!localAddresses || localAddresses.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative mb-6">
              <MapPin className="w-16 h-16 mx-auto text-rose-300 mb-2" />
              <Heart className="w-6 h-6 text-rose-400 absolute top-2 right-1/2 transform translate-x-8 animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-rose-800">
              لا توجد عناوين بعد
            </h3>
            <p className="text-rose-600">أضف عنوانك الأول للبدء! 💕</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {localAddresses.map((address) => (
              <div
                key={address.id}
                className="border border-rose-200 rounded-xl p-6 space-y-4 bg-white/80 hover:bg-white/95 transition-all duration-300 hover:shadow-lg hover:border-rose-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {address.title === "Home" ? (
                        <Home className="w-6 h-6 text-rose-500" />
                      ) : (
                        <Building className="w-6 h-6 text-rose-500" />
                      )}
                      <Heart className="w-3 h-3 text-rose-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-semibold text-rose-800">
                      {address.title}
                    </h3>
                    {address.isDefault && (
                      <span className="text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                        افتراضي
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(address)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="text-rose-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-rose-700 space-y-2">
                  <div className="font-medium">{address.addressLine1}</div>
                  {address.addressLine2 && (
                    <div className="text-rose-600">{address.addressLine2}</div>
                  )}
                  <div className="text-rose-600">
                    {address.postalCode}
                    {address.landmark && `, ${address.landmark}`}
                  </div>
                  <div className="text-rose-600">{address.phoneNumber}</div>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAsDefault(address.id)}
                    className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors"
                  >
                    تعيين كافتراضي
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
