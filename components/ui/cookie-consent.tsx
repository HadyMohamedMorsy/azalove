"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CookiePreferences {
  necessary: boolean;
  analytical: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = "azalove_cookie_consent";
const COOKIE_PREFERENCES_KEY = "azalove_cookie_preferences";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytical: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (!hasConsent) {
      setShowBanner(true);
    }

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytical: true,
      marketing: true,
      functional: true,
    };

    setPreferences(allAccepted);
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setShowBanner(false);

    // Initialize analytics and marketing cookies
    initializeCookies(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytical: false,
      marketing: false,
      functional: false,
    };

    setPreferences(onlyNecessary);
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(onlyNecessary));
    setShowBanner(false);

    // Only initialize necessary cookies
    initializeCookies(onlyNecessary);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "customized");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    setShowSettings(false);
    setShowBanner(false);

    // Initialize cookies based on preferences
    initializeCookies(preferences);
  };

  const initializeCookies = (prefs: CookiePreferences) => {
    // Initialize Google Analytics if analytical cookies are enabled
    if (prefs.analytical) {
      // Initialize GA4 here
      console.log("Initializing analytical cookies");
    }

    // Initialize marketing cookies if enabled
    if (prefs.marketing) {
      // Initialize marketing scripts here
      console.log("Initializing marketing cookies");
    }

    // Initialize functional cookies if enabled
    if (prefs.functional) {
      // Initialize functional features here
      console.log("Initializing functional cookies");
    }
  };

  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    if (type === "necessary") return; // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 text-right">
              <h3 className="text-lg font-web mb-2">
                هذا الموقع يستخدم ملفات تعريف الارتباط
              </h3>
              <p className="text-sm text-gray-600 font-web leading-relaxed">
                نحن نستخدم ملفات تعريف الارتباط لتخصيص المحتوى والإعلانات،
                وتوفير ميزات وسائل التواصل الاجتماعي، وتحليل حركة المرور. نشارك
                أيضاً معلومات حول استخدامك لموقعنا مع شركائنا في وسائل التواصل
                الاجتماعي والإعلانات والتحليلات. يمكنك اختيار قبول جميع الكوكيز
                أو رفض غير الضرورية أو تخصيص تفضيلاتك.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
              <Button
                onClick={handleAcceptAll}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 font-web"
              >
                قبول الكل
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 px-6 py-2 font-web"
              >
                رفض الكل
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 font-web"
              >
                إدارة الكوكيز
              </Button>
            </div>
          </div>

          <div className="mt-4 text-right">
            <Link
              href="/cookie-policy"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-web underline"
            >
              سياسة ملفات تعريف الارتباط
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="text-right">
            <DialogTitle className="text-xl font-web">
              إعدادات الكوكيز
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-right">
            {/* Necessary Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Switch
                  checked={preferences.necessary}
                  disabled={true}
                  className="data-[state=checked]:bg-yellow-600"
                />
                <h3 className="text-lg font-web">الكوكيز الضرورية والتخصيص</h3>
              </div>
              <p className="text-sm text-gray-600 font-web">
                هذه الكوكيز ضرورية لتشغيل الموقع وتوفير الوظائف الأساسية مثل
                الأمان وإدارة الشبكة. لا يمكن إيقاف هذه الكوكيز.
              </p>
            </div>

            {/* Analytical Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Switch
                  checked={preferences.analytical}
                  onCheckedChange={(checked) =>
                    updatePreference("analytical", checked)
                  }
                  className="data-[state=checked]:bg-yellow-600"
                />
                <h3 className="text-lg font-web">الكوكيز التحليلية</h3>
              </div>
              <p className="text-sm text-gray-600 font-web">
                تساعدنا هذه الكوكيز على فهم كيفية تفاعل الزوار مع موقعنا من خلال
                جمع وتقديم المعلومات بصورة مجهولة المصدر.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    updatePreference("marketing", checked)
                  }
                  className="data-[state=checked]:bg-yellow-600"
                />
                <h3 className="text-lg font-web">
                  كوكيز الطرف الثالث والإعلانات
                </h3>
              </div>
              <p className="text-sm text-gray-600 font-web">
                تُستخدم هذه الكوكيز لتقديم إعلانات مناسبة لك ولاهتماماتك. قد
                تُستخدم أيضاً لتحديد فعالية الحملات الإعلانية.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Switch
                  checked={preferences.functional}
                  onCheckedChange={(checked) =>
                    updatePreference("functional", checked as boolean)
                  }
                  className="data-[state=checked]:bg-yellow-600"
                />
                <h3 className="text-lg font-web">الكوكيز الوظيفية</h3>
              </div>
              <p className="text-sm text-gray-600 font-web">
                تُمكن هذه الكوكيز الموقع من تذكر الاختيارات التي تقوم بها لتوفير
                وظائف محسنة وأكثر تخصيصاً.
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-base font-web mb-2">مزيد من المعلومات</h4>
              <p className="text-sm text-gray-600 font-web">
                يمكنك تحديث تفضيلاتك في أي وقت من خلال العودة إلى لوحة الإعدادات
                هذه. لمزيد من التفاصيل، يرجى الاطلاع على{" "}
                <Link
                  href="/cookie-policy"
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  سياسة ملفات تعريف الارتباط
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="font-web"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-web"
              >
                حفظ التفضيلات
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
