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
import { Heart, MapPin } from "lucide-react";
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
        title: "تم تحديث العنوان",
        description: "تم تحديث عنوانك بنجاح.",
      });
      onSuccess(
        response.data.data || { ...formData, id: addressId, isDefault: false }
      );
    } catch (error) {
      throw new Error("فشل في تحديث العنوان");
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
        title: "تم إضافة العنوان",
        description: "تم إضافة عنوانك الجديد بنجاح.",
      });
      onSuccess(response.data.data);
    } catch (error) {
      throw new Error("فشل في إنشاء العنوان");
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
        title: "خطأ",
        description:
          error instanceof Error
            ? error.message
            : "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <DialogHeader className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100 rounded-t-lg -mt-6 -mx-6 px-6 py-4">
            <DialogTitle className="flex items-center gap-2 text-rose-800">
              <div className="relative">
                <MapPin className="w-5 h-5 text-rose-500" />
                <Heart className="w-3 h-3 text-rose-400 absolute -top-1 -right-1" />
              </div>
              {editingAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
            </DialogTitle>
            <DialogDescription className="text-rose-600">
              {editingAddress
                ? "تحديث معلومات عنوانك بحب ❤️"
                : "أضف عنوان جديد إلى دليل العناوين الخاص بك 💕"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-rose-700 font-medium">
                عنوان العنوان
              </Label>
              <Input
                id="title"
                placeholder="مثال: المنزل، العمل، المكتب"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="addressLine1"
                className="text-rose-700 font-medium"
              >
                سطر العنوان 1
              </Label>
              <Input
                id="addressLine1"
                placeholder="عنوان الشارع، صندوق البريد"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleFormChange("addressLine1", e.target.value)
                }
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="addressLine2"
                className="text-rose-700 font-medium"
              >
                سطر العنوان 2 (اختياري)
              </Label>
              <Input
                id="addressLine2"
                placeholder="شقة، جناح، وحدة، مبنى، طابق، إلخ"
                value={formData.addressLine2}
                onChange={(e) =>
                  handleFormChange("addressLine2", e.target.value)
                }
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="countryId"
                  className="text-rose-700 font-medium"
                >
                  البلد
                </Label>
                <Input
                  id="countryId"
                  type="number"
                  placeholder="رمز البلد"
                  value={formData.countryId}
                  onChange={(e) =>
                    handleFormChange("countryId", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regionId" className="text-rose-700 font-medium">
                  المنطقة
                </Label>
                <Input
                  id="regionId"
                  type="number"
                  placeholder="رمز المنطقة"
                  value={formData.regionId}
                  onChange={(e) => handleFormChange("regionId", e.target.value)}
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cityId" className="text-rose-700 font-medium">
                  المدينة
                </Label>
                <Input
                  id="cityId"
                  type="number"
                  placeholder="رمز المدينة"
                  value={formData.cityId}
                  onChange={(e) => handleFormChange("cityId", e.target.value)}
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="areaId" className="text-rose-700 font-medium">
                  المنطقة
                </Label>
                <Input
                  id="areaId"
                  type="number"
                  placeholder="رمز المنطقة"
                  value={formData.areaId}
                  onChange={(e) => handleFormChange("areaId", e.target.value)}
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="postalCode"
                  className="text-rose-700 font-medium"
                >
                  الرمز البريدي
                </Label>
                <Input
                  id="postalCode"
                  placeholder="الرمز البريدي"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleFormChange("postalCode", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-rose-700 font-medium"
                >
                  رقم الهاتف
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="رقم الهاتف"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleFormChange("phoneNumber", e.target.value)
                  }
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark" className="text-rose-700 font-medium">
                معلم (اختياري)
              </Label>
              <Input
                id="landmark"
                placeholder="معلم قريب"
                value={formData.landmark}
                onChange={(e) => handleFormChange("landmark", e.target.value)}
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400/20"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {editingAddress ? "تحديث العنوان" : "إضافة العنوان"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
