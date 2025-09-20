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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { API_ENDPOINTS_FROM_SERVER_DASHBOARD } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Address, AddressFormData, Location } from "@/types";
import api from "@/utils/api-interceptor";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Location data states
  const [countries, setCountries] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);
  const [areas, setAreas] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Reset form when dialog opens/closes or editing address changes
  useEffect(() => {
    if (isOpen) {
      if (editingAddress) {
        // Extract IDs from nested objects if they exist, otherwise use direct IDs
        const countryId =
          (editingAddress.country as any)?.id || editingAddress.countryId;
        const cityId =
          (editingAddress.city as any)?.id || editingAddress.cityId;
        const areaId =
          (editingAddress.area as any)?.id || editingAddress.areaId;

        setFormData({
          title: editingAddress.title,
          addressLine1: editingAddress.addressLine1,
          addressLine2: editingAddress.addressLine2 || "",
          countryId: countryId,
          regionId: editingAddress.regionId,
          cityId: cityId,
          areaId: areaId,
          postalCode: editingAddress.postalCode,
          landmark: editingAddress.landmark || "",
          phoneNumber: editingAddress.phoneNumber,
        });
        setIsDefault(editingAddress.isDefault || false);

        // Load countries first, then load cities and areas for the existing address
        loadCountries().then(() => {
          if (countryId) {
            loadLocationOptions(countryId).then(() => {
              if (cityId) {
                loadLocationOptions(cityId);
              }
            });
          }
        });
      } else {
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
        setIsDefault(false);
        // Load countries when dialog opens
        loadCountries();
      }
    }
  }, [isOpen, editingAddress]);

  // Unified function to load location options
  const loadLocationOptions = async (parentId?: number) => {
    setLoadingLocations(true);
    try {
      const url = parentId
        ? `/location/select-options?parentId=${parentId}`
        : "/location/select-options";

      const response = await api.get(url);
      const options = response.data.data || [];

      if (!parentId) {
        // Loading countries
        setCountries(options);
        setCities([]);
        setAreas([]);
      } else if (parentId && parentId <= 6) {
        // Loading cities (parentId is countryId)
        setCities(options);
        setAreas([]);
      } else {
        // Loading areas (parentId is cityId)
        setAreas(options);
      }
    } catch (error) {
      console.error("Error loading location options:", error);
      // Set empty arrays on error
      if (!parentId) {
        setCountries([]);
      } else if (parentId <= 6) {
        setCities([]);
      } else {
        setAreas([]);
      }
    } finally {
      setLoadingLocations(false);
    }
  };

  // Load countries
  const loadCountries = async () => await loadLocationOptions();

  // Handle country change
  const handleCountryChange = (countryId: number) => {
    setFormData((prev) => ({
      ...prev,
      countryId,
      cityId: 0,
      areaId: 0,
    }));
    loadLocationOptions(countryId);
  };

  // Handle city change
  const handleCityChange = (cityId: number) => {
    setFormData((prev) => ({
      ...prev,
      cityId,
      areaId: 0,
    }));
    loadLocationOptions(cityId);
  };

  const handleFormChange = (
    field: keyof AddressFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = async (addressId: number) => {
    try {
      const response = await api.put(
        API_ENDPOINTS_FROM_SERVER_DASHBOARD.ADDRESS_UPDATE,
        {
          ...formData,
          id: addressId,
          isDefault,
        }
      );
      toast({
        title: "تم تحديث العنوان",
        description: "تم تحديث عنوانك بنجاح.",
      });
      onSuccess(
        response.data.data || { ...formData, id: addressId, isDefault }
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "تم تحديث الجلسة تلقائياً. يرجى المحاولة مرة أخرى.",
        });
      }
      throw new Error("فشل في تحديث العنوان");
    }
  };

  const createAddress = async () => {
    try {
      const response = await api.post(
        API_ENDPOINTS_FROM_SERVER_DASHBOARD.ADDRESS_CREATE,
        {
          ...formData,
          isDefault,
        }
      );
      toast({
        title: "تم إضافة العنوان",
        description: "تم إضافة عنوانك الجديد بنجاح.",
      });
      onSuccess(response.data.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "تم تحديث الجلسة تلقائياً. يرجى المحاولة مرة أخرى.",
        });
      }
      throw new Error("فشل في إنشاء العنوان");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.addressLine1 || !formData.phoneNumber) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة.",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id!);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader className="bg-cream-100 border-b border-rose-100 rounded-t-lg -mt-6 -mx-6 px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-amber-900">
            <div className="relative">
              <Heart className="w-3 h-3 text-amaranth-900 absolute -top-1 -right-1" />
            </div>
            {editingAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
          </DialogTitle>
          <DialogDescription className="text-amber-900">
            {editingAddress
              ? "تحديث معلومات عنوانك بحب ❤️"
              : "أضف عنوان جديد إلى دليل العناوين الخاص بك 💕"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-amber-900 font-medium">
              عنوان العنوان *
            </Label>
            <Input
              id="title"
              placeholder="مثال: المنزل، العمل، المكتب"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="addressLine1"
              className="text-amber-900 font-medium"
            >
              سطر العنوان 1 *
            </Label>
            <Input
              id="addressLine1"
              placeholder="عنوان الشارع، صندوق البريد"
              value={formData.addressLine1}
              onChange={(e) => handleFormChange("addressLine1", e.target.value)}
              className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="addressLine2"
              className="text-amber-900 font-medium"
            >
              سطر العنوان 2 (اختياري)
            </Label>
            <Input
              id="addressLine2"
              placeholder="شقة، جناح، وحدة، مبنى، طابق، إلخ"
              value={formData.addressLine2}
              onChange={(e) => handleFormChange("addressLine2", e.target.value)}
              className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20"
            />
          </div>

          {/* Country Dropdown */}
          <div className="space-y-2">
            <Label className="text-amber-900 font-medium">البلد *</Label>
            <Select
              value={formData.countryId.toString()}
              onValueChange={(value) => handleCountryChange(parseInt(value))}
              disabled={loadingLocations}
            >
              <SelectTrigger className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20">
                <SelectValue placeholder="اختر البلد" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country.value}
                    value={country.value.toString()}
                  >
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Dropdown */}
          <div className="space-y-2">
            <Label className="text-amber-900 font-medium">المدينة *</Label>
            <Select
              value={formData.cityId.toString()}
              onValueChange={(value) => handleCityChange(parseInt(value))}
              disabled={!formData.countryId || loadingLocations}
            >
              <SelectTrigger className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20">
                <SelectValue placeholder="اختر المدينة" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value.toString()}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Dropdown */}
          <div className="space-y-2">
            <Label className="text-amber-900 font-medium">المنطقة *</Label>
            <Select
              value={formData.areaId.toString()}
              onValueChange={(value) =>
                handleFormChange("areaId", parseInt(value))
              }
              disabled={!formData.cityId || loadingLocations}
            >
              <SelectTrigger className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20">
                <SelectValue placeholder="اختر المنطقة" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.value} value={area.value.toString()}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="postalCode"
                className="text-amber-900 font-medium"
              >
                الرمز البريدي *
              </Label>
              <Input
                id="postalCode"
                placeholder="الرمز البريدي"
                value={formData.postalCode}
                onChange={(e) => handleFormChange("postalCode", e.target.value)}
                className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-amber-900 font-medium"
              >
                رقم الهاتف *
              </Label>
              <Input
                id="phoneNumber"
                placeholder="رقم الهاتف"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleFormChange("phoneNumber", e.target.value)
                }
                className="border-cream-200 focus:border-amaranth-900 focus:ring-amaranth-900/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark" className="text-amber-900 font-medium">
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

          {/* Default Address Switch */}
          <div className="flex items-center justify-between space-x-2 space-x-reverse">
            <Label htmlFor="isDefault" className="text-amber-900 font-medium">
              تعيين كعنوان افتراضي
            </Label>
            <Switch
              id="isDefault"
              checked={isDefault}
              onCheckedChange={setIsDefault}
              className="data-[state=checked]:bg-amaranth-900"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 border-cream-200 text-amber-900 hover:bg-cream-50 hover:border-cream-300 hover:text-amber-800 transition-all duration-200 font-medium"
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1  bg-amaranth-900   hover:bg-royal-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "جاري الحفظ..."
                : editingAddress
                  ? "تحديث العنوان"
                  : "إضافة العنوان"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
