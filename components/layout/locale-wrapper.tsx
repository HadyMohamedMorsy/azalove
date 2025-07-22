"use client";

import { useLocale } from "@/hooks/use-locale";
import { useEffect } from "react";

interface LocaleWrapperProps {
  children: React.ReactNode;
}

export function LocaleWrapper({ children }: LocaleWrapperProps) {
  const { locale } = useLocale();

  useEffect(() => {
    // Update document lang and dir attributes based on locale
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    // Update body class for RTL/LTR styling
    if (locale === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [locale]);

  return <>{children}</>;
}
