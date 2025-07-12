"use client";

import { useEffect, useState } from "react";

interface CookiePreferences {
  necessary: boolean;
  analytical: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = "azalove_cookie_consent";
const COOKIE_PREFERENCES_KEY = "azalove_cookie_preferences";

export function useCookiePreferences() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytical: false,
    marketing: false,
    functional: false,
  });

  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = () => {
      if (typeof window !== "undefined") {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

        setHasConsent(consent !== null);

        if (savedPreferences) {
          try {
            const parsed = JSON.parse(savedPreferences);
            setPreferences(parsed);
          } catch (error) {
            console.error("Error parsing cookie preferences:", error);
          }
        }

        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated));
    }
  };

  const clearConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    }
    setHasConsent(false);
    setPreferences({
      necessary: true,
      analytical: false,
      marketing: false,
      functional: false,
    });
  };

  const canUseAnalytics = () => {
    return preferences.analytical && hasConsent;
  };

  const canUseMarketing = () => {
    return preferences.marketing && hasConsent;
  };

  const canUseFunctional = () => {
    return preferences.functional && hasConsent;
  };

  return {
    preferences,
    hasConsent,
    isLoading,
    updatePreferences,
    clearConsent,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional,
  };
}
