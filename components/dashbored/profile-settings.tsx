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
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api-interceptor";
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthOfDate: string;
  phoneNumber: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  password_confirmation?: string;
}

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthOfDate: "",
    phoneNumber: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { user, updateUserData } = useAuth();
  const { toast } = useToast();

  // Initialize form data with user data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        birthOfDate: user.birthOfDate || "",
        phoneNumber: user.phoneNumber || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Mark field as touched
    setTouchedFields((prev) => [...prev, field]);

    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    // Mark field as touched
    setTouchedFields((prev) => [...prev, field]);

    // Validate single field
    const fieldErrors = validateSingleField(field);
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const validateSingleField = (field: string): FormErrors => {
    const newErrors: FormErrors = {};

    switch (field) {
      case "firstName":
        if (!formData.firstName.trim()) {
          newErrors.firstName = "الاسم الأول مطلوب";
        }
        break;
      case "lastName":
        if (!formData.lastName.trim()) {
          newErrors.lastName = "اسم العائلة مطلوب";
        }
        break;
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "البريد الإلكتروني غير صحيح";
        }
        break;
      case "username":
        if (!formData.username.trim()) {
          newErrors.username = "اسم المستخدم مطلوب";
        }
        break;
      case "phoneNumber":
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = "رقم الهاتف مطلوب";
        } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "رقم الهاتف غير صحيح";
        }
        break;
      case "password":
        if (formData.password && formData.password.length < 6) {
          newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        }
        break;
      case "password_confirmation":
        if (formData.password && !formData.password_confirmation) {
          newErrors.password_confirmation = "تأكيد كلمة المرور مطلوب";
        } else if (
          formData.password &&
          formData.password_confirmation &&
          formData.password !== formData.password_confirmation
        ) {
          newErrors.password_confirmation = "كلمة المرور وتأكيدها غير متطابقين";
        }
        break;
    }

    return newErrors;
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "الاسم الأول مطلوب";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "اسم العائلة مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.username.trim()) {
      newErrors.username = "اسم المستخدم مطلوب";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "رقم الهاتف مطلوب";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "رقم الهاتف غير صحيح";
    }

    // Password validation (only if password fields are filled)
    if (formData.password || formData.password_confirmation) {
      if (!formData.password) {
        newErrors.password = "كلمة المرور مطلوبة";
      } else if (formData.password.length < 6) {
        newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      }

      if (!formData.password_confirmation) {
        newErrors.password_confirmation = "تأكيد كلمة المرور مطلوب";
      } else if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "كلمة المرور وتأكيدها غير متطابقين";
      }
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً.",
      });
      return;
    }

    // Mark all fields as touched for validation display
    setTouchedFields(Object.keys(formData));

    // Validate form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى تصحيح الأخطاء في النموذج.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the update data
      const updateData: any = {
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        birthOfDate: formData.birthOfDate,
        phoneNumber: formData.phoneNumber,
      };

      // If password fields are filled, add them to the update data
      if (formData.password && formData.password_confirmation) {
        updateData.password = formData.password;
        updateData.password_confirmation = formData.password_confirmation;
      }

      // Make API call to update user profile using the interceptor
      const response = await api.put(
        API_ENDPOINTS_FROM_NEXT.USER_UPDATE,
        updateData
      );

      if (response.data.data) {
        // Update user data in context and localStorage
        updateUserData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          birthOfDate: formData.birthOfDate,
          phoneNumber: formData.phoneNumber,
        });

        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          password: "",
          password_confirmation: "",
        }));

        // Clear errors
        setErrors({});

        toast({
          title: "تم تحديث الملف الشخصي",
          description: "تم تحديث معلومات ملفك الشخصي بنجاح.",
        });
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);

      if (error.response?.status === 401) {
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "تم تحديث الجلسة تلقائياً. يرجى المحاولة مرة أخرى.",
        });
      } else {
        toast({
          title: "خطأ",
          description:
            error.response?.data?.error || "حدث خطأ أثناء تحديث الملف الشخصي.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldShowError = (field: string) => {
    return touchedFields.includes(field) && errors[field as keyof FormErrors];
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
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amaranth-500 to-amaranth-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  إعدادات الملف الشخصي
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  تحديث معلوماتك الشخصية وكلمة المرور
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                المعلومات الشخصية
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    الاسم الأول *
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      onBlur={() => handleBlur("firstName")}
                      className={`pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                        shouldShowError("firstName")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  {shouldShowError("firstName") && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    اسم العائلة *
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      onBlur={() => handleBlur("lastName")}
                      className={`pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                        shouldShowError("lastName")
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="أدخل اسم العائلة"
                    />
                  </div>
                  {shouldShowError("lastName") && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  عنوان البريد الإلكتروني *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                      shouldShowError("email")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="أدخل عنوان بريدك الإلكتروني"
                  />
                </div>
                {shouldShowError("email") && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  رقم الهاتف *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    onBlur={() => handleBlur("phoneNumber")}
                    className={`pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                      shouldShowError("phoneNumber")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
                {shouldShowError("phoneNumber") && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  اسم المستخدم *
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    onBlur={() => handleBlur("username")}
                    className={`pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                      shouldShowError("username")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>
                {shouldShowError("username") && (
                  <p className="text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="birthOfDate"
                  className="text-sm font-medium text-gray-700"
                >
                  تاريخ الميلاد
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="birthOfDate"
                    type="date"
                    value={formData.birthOfDate}
                    onChange={(e) =>
                      handleInputChange("birthOfDate", e.target.value)
                    }
                    onBlur={() => handleBlur("birthOfDate")}
                    className="pl-10 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500"
                  />
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                تغيير كلمة المرور
              </h3>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                    className={`pl-10 pr-12 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                      shouldShowError("password")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="أدخل كلمة المرور الجديدة (اختياري)"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {shouldShowError("password") && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password_confirmation"
                  className="text-sm font-medium text-gray-700"
                >
                  تأكيد كلمة المرور الجديدة
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password_confirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    value={formData.password_confirmation}
                    onChange={(e) =>
                      handleInputChange("password_confirmation", e.target.value)
                    }
                    onBlur={() => handleBlur("password_confirmation")}
                    className={`pl-10 pr-12 h-12 border-gray-200 focus:border-amaranth-500 focus:ring-amaranth-500 ${
                      shouldShowError("password_confirmation")
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    placeholder="أكد كلمة المرور الجديدة (اختياري)"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {shouldShowError("password_confirmation") && (
                  <p className="text-sm text-red-600">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
