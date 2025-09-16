"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, Mail, Phone, User } from "lucide-react";

const UserInfoCard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا يمكن تحميل بيانات المستخدم
            </h3>
            <p className="text-gray-600">يرجى تسجيل الدخول مرة أخرى.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.lastName) {
      return user.lastName;
    }
    return user.name || user.email;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "غير متوفر";
    try {
      return new Date(dateString).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "غير متوفر";
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amaranth-500 to-amaranth-600 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              معلومات الحساب
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              بيانات المستخدم المحفوظة في التخزين المحلي
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-amaranth-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">الاسم</p>
              <p className="text-sm text-gray-600">{getDisplayName()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-amaranth-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          {user.phoneNumber && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-amaranth-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">رقم الهاتف</p>
                <p className="text-sm text-gray-600">{user.phoneNumber}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-amaranth-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">تاريخ الإنشاء</p>
              <p className="text-sm text-gray-600">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {user.updatedAt && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-amaranth-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">آخر تحديث</p>
                <p className="text-sm text-gray-600">
                  {formatDate(user.updatedAt)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-amaranth-50 rounded-lg">
          <h4 className="text-sm font-medium text-amaranth-700 mb-2">
            معلومات التخزين المحلي
          </h4>
          <p className="text-xs text-amaranth-600">
            تم حفظ بيانات المستخدم في التخزين المحلي للمتصفح. يمكن استخدام هذه
            البيانات في جميع أنحاء التطبيق.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
