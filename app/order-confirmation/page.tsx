"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useTranslation } from "@/hooks/use-translation";
import { CheckCircle, Clock, Heart, Home, MapPin, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderData {
  orderId: string;
  totalAmount: number;
  itemsCount: number;
  estimatedDelivery: string;
  address: string;
  paymentMethod: string;
}

export default function OrderConfirmationPage() {
  const { t } = useTranslation();
  const { settings } = useGeneralSettings();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Get currency from settings, fallback to SAR if not set
  const currency = settings?.default_currency || "SAR";

  useEffect(() => {
    // Get order data from URL params or localStorage
    const orderId = searchParams.get('orderId');
    const totalAmount = searchParams.get('totalAmount');
    const itemsCount = searchParams.get('itemsCount');
    const address = searchParams.get('address');
    const paymentMethod = searchParams.get('paymentMethod');
    const urlCurrency = searchParams.get('currency');

    if (orderId) {
      setOrderData({
        orderId,
        totalAmount: totalAmount ? parseFloat(totalAmount) : 0,
        itemsCount: itemsCount ? parseInt(itemsCount) : 1,
        estimatedDelivery: settings?.shipping_days ? `${settings.shipping_days} ${settings.shipping_days === 1 ? 'يوم عمل' : 'أيام عمل'}` : "5-7 أيام عمل",
        address: address ? decodeURIComponent(address) : "سيتم تحديد العنوان",
        paymentMethod: paymentMethod ? decodeURIComponent(paymentMethod) : "طريقة الدفع المختارة"
      });
    } else {
      // If no order data, redirect to home
      router.push('/');
    }
  }, [searchParams, router, settings]);

  // Use currency from URL params if available, otherwise from settings
  const displayCurrency = searchParams.get('currency') || currency;

  // Helper function to format currency display
  const formatCurrency = (currencyCode: string) => {
    return currencyCode;
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-azalove-50/30 font-arabic flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azalove-500 mx-auto mb-4"></div>
          <p className="text-royal-600">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-azalove-50/30 font-arabic" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-azalove-200 to-azalove-300 rounded-full opacity-20 animate-float-slow flex items-center justify-center">
          <Heart className="w-12 h-12 text-azalove-400" />
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-amaranth-300 to-amaranth-400 rounded-full opacity-30 animate-float-medium flex items-center justify-center">
          <Package className="w-10 h-10 text-amaranth-500" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-azalove-400 to-azalove-500 rounded-full opacity-25 animate-float-fast flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-azalove-600" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-200/50 mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            تم تأكيد طلبك بنجاح! 🎉
          </h1>
          <p className="text-xl text-royal-600 max-w-2xl mx-auto">
            شكراً لك على اختيار أزلــوڤ! سنقوم بتحضير كتابك الرومانسي الساحر وإرساله إليك قريباً
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl shadow-azalove-100/50 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-royal-800 mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-azalove-600" />
              تفاصيل طلبك
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="bg-azalove-50 p-4 rounded-lg border border-azalove-200">
                  <h3 className="font-semibold text-royal-800 mb-3">معلومات الطلب</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-royal-600">رقم الطلب:</span>
                      <span className="font-medium text-royal-800">#{orderData.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-royal-600">عدد العناصر:</span>
                      <span className="font-medium text-royal-800">{orderData.itemsCount} عنصر</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-royal-600">المجموع:</span>
                      <span className="font-bold text-azalove-600 text-lg">
                        {orderData.totalAmount} {formatCurrency(displayCurrency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    موعد التوصيل المتوقع
                  </h3>
                  <p className="text-green-700 font-medium">{orderData.estimatedDelivery}</p>
                </div>
              </div>

              {/* Address & Payment */}
              <div className="space-y-4">
                <div className="bg-royal-50 p-4 rounded-lg border border-royal-200">
                  <h3 className="font-semibold text-royal-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    عنوان التوصيل
                  </h3>
                  <p className="text-royal-700">{orderData.address}</p>
                </div>

                <div className="bg-amaranth-50 p-4 rounded-lg border border-amaranth-200">
                  <h3 className="font-semibold text-amaranth-800 mb-3">طريقة الدفع</h3>
                  <p className="text-amaranth-700">{orderData.paymentMethod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl shadow-azalove-100/50 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-royal-800 mb-6">الخطوات التالية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-azalove-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-azalove-600" />
                </div>
                <h3 className="font-semibold text-royal-800 mb-2">تحضير الطلب</h3>
                <p className="text-royal-600 text-sm">سنقوم بتحضير كتابك الرومانسي بعناية فائقة</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-royal-800 mb-2">مراجعة الجودة</h3>
                <p className="text-royal-600 text-sm">سنتأكد من جودة الطباعة والتغليف</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto bg-amaranth-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-amaranth-600" />
                </div>
                <h3 className="font-semibold text-royal-800 mb-2">التوصيل</h3>
                <p className="text-royal-600 text-sm">سنرسل لك كتابك بأسرع وقت ممكن</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-azalove-500 to-azalove-600 hover:from-azalove-600 hover:to-azalove-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            العودة للصفحة الرئيسية
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-azalove-100 to-amaranth-100 p-6 rounded-2xl border border-azalove-200">
            <h3 className="text-xl font-bold text-royal-800 mb-2">
              شكراً لك على ثقتك في أزلــوڤ! 💕
            </h3>
            <p className="text-royal-600">
              نحن متحمسون لرؤية كيف سيستمتع قراءك بقصتك الرومانسية الساحرة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
