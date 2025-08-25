"use client";
import { Locale } from "@/lib/translations";
import { useEffect, useState } from "react";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    // Get locale from localStorage or default to Arabic
    const savedLocale = localStorage.getItem("azalove_locale") as Locale;
    if (savedLocale && (savedLocale === "ar" || savedLocale === "en")) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("azalove_locale", newLocale);
  };

  return { locale, changeLocale };
}
