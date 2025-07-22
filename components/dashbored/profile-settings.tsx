"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Save,
  User,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const ProfileSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();

  // Initialize form data with user data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = () => {
    if (!user) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً.",
      });
      return;
    }

    // Update user data in context and localStorage
    updateUserData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    });

    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم تحديث معلومات ملفك الشخصي بنجاح.",
    });
  };

  const handlePasswordUpdate = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقين.",
      });
      return;
    }

    if (!formData.currentPassword) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كلمة المرور الحالية.",
      });
      return;
    }

    if (!formData.newPassword) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كلمة المرور الجديدة.",
      });
      return;
    }

    // Here you would typically make an API call to update the password
    // For now, we'll just show a success message
    toast({
      title: "تم تحديث كلمة المرور",
      description: "تم تغيير كلمة المرور الخاصة بك بنجاح.",
    });

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا يمكن تحميل بيانات المستخدم
          </h3>
          <p className="text-gray-600">يرجى تسجيل الدخول مرة أخرى.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Profile Information */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amaranth-500 to-amaranth-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                معلومات الملف الشخصي
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                تحديث معلوماتك الشخصية وتفاصيل الاتصال
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                الاسم الأول
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                  placeholder="أدخل اسمك الأول"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                اسم العائلة
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                  placeholder="أدخل اسم العائلة"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              عنوان البريد الإلكتروني
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                placeholder="أدخل عنوان بريدك الإلكتروني"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              رقم الهاتف
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                placeholder="أدخل رقم هاتفك"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleProfileUpdate}
              className="w-full h-12 bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amaranth-500 to-amaranth-600 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                تغيير كلمة المرور
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                تحديث كلمة المرور للحفاظ على أمان حسابك
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700"
            >
              كلمة المرور الحالية
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className="pl-10 pr-12 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                placeholder="أدخل كلمة المرور الحالية"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              كلمة المرور الجديدة
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="pl-10 pr-12 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                placeholder="أدخل كلمة المرور الجديدة"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              تأكيد كلمة المرور الجديدة
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="pl-10 pr-12 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                placeholder="أكد كلمة المرور الجديدة"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handlePasswordUpdate}
              className="w-full h-12 bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Lock className="w-4 h-4 mr-2" />
              تحديث كلمة المرور
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
