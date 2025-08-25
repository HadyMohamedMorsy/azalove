"use client";
import { getTranslation } from "@/lib/translations";
import { useLocale } from "./use-locale";

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  return { t, locale };
}
