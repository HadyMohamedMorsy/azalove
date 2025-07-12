"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";
import Link from "next/link";
import { useState } from "react";

export function CookiePreferencesCard() {
  const {
    preferences,
    updatePreferences,
    hasConsent,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
  } = useCookiePreferences();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePreference = (
    type: keyof typeof preferences,
    value: boolean
  ) => {
    if (type === "necessary") return; // Cannot disable necessary cookies

    setIsUpdating(true);
    updatePreferences({ [type]: value });

    // Simulate update delay
    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  if (!hasConsent) {
    return (
      <Card className="text-right">
        <CardHeader>
          <CardTitle className="font-web">إعدادات الكوكيز</CardTitle>
          <CardDescription className="font-web">
            لم يتم تسجيل موافقتك على استخدام الكوكيز بعد.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 font-web mb-4">
            يرجى زيارة أي صفحة من صفحات الموقع للموافقة على استخدام الكوكيز أو
            تخصيص تفضيلاتك.
          </p>
          <Link href="/cookie-policy">
            <Button variant="outline" className="font-web">
              عرض سياسة الكوكيز
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="text-right">
      <CardHeader>
        <CardTitle className="font-web">إعدادات الكوكيز</CardTitle>
        <CardDescription className="font-web">
          إدارة تفضيلات ملفات تعريف الارتباط الخاصة بك
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Necessary Cookies */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <label className="text-sm font-medium font-web">
              الكوكيز الضرورية
            </label>
            <p className="text-xs text-gray-600 font-web">
              ضرورية لتشغيل الموقع الأساسي
            </p>
          </div>
          <Switch
            checked={preferences.necessary}
            disabled={true}
            className="data-[state=checked]:bg-yellow-600"
          />
        </div>

        {/* Analytical Cookies */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <label className="text-sm font-medium font-web">
              الكوكيز التحليلية
            </label>
            <p className="text-xs text-gray-600 font-web">
              تساعدنا في فهم كيفية استخدام الموقع
            </p>
            <p className="text-xs text-green-600 font-web">
              الحالة: {canUseAnalytics() ? "نشط" : "معطل"}
            </p>
          </div>
          <Switch
            checked={preferences.analytical}
            onCheckedChange={(checked) =>
              handleUpdatePreference("analytical", checked)
            }
            disabled={isUpdating}
            className="data-[state=checked]:bg-yellow-600"
          />
        </div>

        {/* Marketing Cookies */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <label className="text-sm font-medium font-web">
              الكوكيز التسويقية
            </label>
            <p className="text-xs text-gray-600 font-web">
              لعرض إعلانات مخصصة للكتب الرومانسية
            </p>
            <p className="text-xs text-green-600 font-web">
              الحالة: {canUseMarketing() ? "نشط" : "معطل"}
            </p>
          </div>
          <Switch
            checked={preferences.marketing}
            onCheckedChange={(checked) =>
              handleUpdatePreference("marketing", checked)
            }
            disabled={isUpdating}
            className="data-[state=checked]:bg-yellow-600"
          />
        </div>

        {/* Functional Cookies */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1">
            <label className="text-sm font-medium font-web">
              الكوكيز الوظيفية
            </label>
            <p className="text-xs text-gray-600 font-web">
              لتحسين تجربة القراءة والتصفح
            </p>
            <p className="text-xs text-green-600 font-web">
              الحالة: {canUseFunctional() ? "نشط" : "معطل"}
            </p>
          </div>
          <Switch
            checked={preferences.functional}
            onCheckedChange={(checked) =>
              handleUpdatePreference("functional", checked)
            }
            disabled={isUpdating}
            className="data-[state=checked]:bg-yellow-600"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <Link href="/cookie-policy">
              <Button variant="outline" size="sm" className="font-web">
                عرض سياسة الكوكيز
              </Button>
            </Link>
            <p className="text-xs text-gray-500 font-web">
              {isUpdating ? "جاري التحديث..." : "تم حفظ التغييرات تلقائياً"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
