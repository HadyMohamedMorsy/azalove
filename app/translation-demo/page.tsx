"use client";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/hooks/use-translation";
import { Heart } from "lucide-react";

export default function TranslationDemo() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>

        {/* Demo Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {t("cart.cartTitle")}
            </h1>
            <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {t("cart.emptyTitle")}
              </h2>
              <p className="text-gray-600 mb-4">{t("cart.emptyDescription")}</p>
              <p className="text-purple-600 font-medium">
                {t("cart.readyToLove")}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                {t("cart.loveCollection")} (3 {t("cart.items")})
              </h2>
              <p className="text-gray-600">{t("cart.cartDescription")}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Current Language: {locale === "ar" ? "العربية" : "English"}
              </h2>
              <p className="text-gray-600">
                This page demonstrates the translation functionality. Click the
                language switcher above to change languages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
