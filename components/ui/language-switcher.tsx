"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, changeLocale } = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    changeLocale(newLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-rose-50 transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {locale === "ar" ? "English" : "العربية"}
      </span>
    </Button>
  );
}
