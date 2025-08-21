"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import "@/styles/maintenance.css";
import {
  Clock,
  Home,
  Mail,
  MessageCircle,
  RefreshCw,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MaintenancePage() {
  const { settings } = useGeneralSettings();
  const router = useRouter();

  // If maintenance mode is disabled, redirect to home
  useEffect(() => {
    if (settings && !settings.maintenance_mode) {
      router.push("/");
    }
  }, [settings, router]);

  // Show loading while settings are being fetched
  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amaranth-50 via-royal-50 to-amaranth-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amaranth-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amaranth-600 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // If maintenance mode is disabled, don't render anything (will redirect)
  if (!settings.maintenance_mode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amaranth-50 via-royal-50 to-amaranth-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Icon */}
        <div className="mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-amaranth-500 to-royal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Wrench className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-amaranth-800 mb-4">
            الموقع قيد الصيانة
          </h1>
          <p className="text-xl text-amaranth-600 max-w-2xl mx-auto leading-relaxed">
            نعتذر عن الإزعاج، نقوم حالياً بتحديث وتحسين الموقع لخدمتك بشكل أفضل
          </p>
        </div>

        {/* Maintenance Message Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-xl border border-amaranth-200/50">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-amaranth-600 mr-2" />
            <h2 className="text-xl font-semibold text-amaranth-800">
              رسالة الصيانة
            </h2>
          </div>
          <p className="text-lg text-amaranth-700 leading-relaxed max-w-3xl mx-auto">
            {settings.maintenance_message ||
              "نقوم بإجراء تحديثات مهمة على الموقع لتحسين الأداء وإضافة ميزات جديدة. نتوقع العودة قريباً مع تجربة مستخدم محسنة!"}
          </p>
        </div>

        {/* Status Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amaranth-200/30">
            <div className="w-12 h-12 bg-amaranth-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-amaranth-600" />
            </div>
            <h3 className="font-semibold text-amaranth-800 mb-2">
              الوقت المتوقع
            </h3>
            <p className="text-amaranth-600">2-4 ساعات</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amaranth-200/30">
            <div className="w-12 h-12 bg-royal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-6 h-6 text-royal-600" />
            </div>
            <h3 className="font-semibold text-amaranth-800 mb-2">
              نوع الصيانة
            </h3>
            <p className="text-amaranth-600">تحديث النظام</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amaranth-200/30">
            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="font-semibold text-amaranth-800 mb-2">التواصل</h3>
            <p className="text-amaranth-600">متاح للدعم</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-amaranth-600 to-royal-600 hover:from-amaranth-700 hover:to-royal-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3"
          >
            <RefreshCw className="w-5 h-5" />
            تحديث الصفحة
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-white hover:bg-amaranth-50 text-amaranth-700 border-2 border-amaranth-300 hover:border-amaranth-400 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </button>
        </div>

        {/* Contact Information */}
        {settings.store_email && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amaranth-200/30 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Mail className="w-5 h-5 text-amaranth-600 mr-2" />
              <h3 className="font-semibold text-amaranth-800">
                للتواصل والدعم
              </h3>
            </div>
            <p className="text-amaranth-600 mb-2">البريد الإلكتروني:</p>
            <a
              href={`mailto:${settings.store_email}`}
              className="text-amaranth-600 hover:text-amaranth-700 font-medium break-all"
            >
              {settings.store_email}
            </a>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="maintenance-bg-circle absolute top-10 left-10 w-20 h-20 bg-amaranth-200/30"></div>
        <div className="maintenance-bg-circle absolute bottom-10 right-10 w-32 h-32 bg-royal-200/30"></div>
        <div className="maintenance-bg-circle absolute top-1/2 left-5 w-16 h-16 bg-amaranth-100/50"></div>
      </div>
    </div>
  );
}
