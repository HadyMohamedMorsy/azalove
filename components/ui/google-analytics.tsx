"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();
  const pathname = usePathname();

  const isEnabled =
    settings?.google_analytics_enabled &&
    settings?.google_analytics_id &&
    preferences?.analytical;

  const trackingId = settings?.google_analytics_id;

  useEffect(() => {
    if (!isEnabled || !trackingId || !pathname) return;

    // Track page view when route changes
    if (window.gtag) {
      window.gtag("config", trackingId, {
        page_path: pathname,
      });
    }
  }, [isEnabled, trackingId, pathname]);

  if (!isEnabled || !trackingId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
