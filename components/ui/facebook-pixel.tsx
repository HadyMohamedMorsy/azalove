"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export function FacebookPixel() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();
  const pathname = usePathname();

  const isEnabled =
    settings?.facebook_pixel_enabled &&
    settings?.facebook_pixel_id &&
    preferences?.marketing;

  const pixelId = settings?.facebook_pixel_id;

  useEffect(() => {
    if (!isEnabled || !pixelId || !pathname) return;

    // Track page view when route changes
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [isEnabled, pixelId, pathname]);

  if (!isEnabled || !pixelId) {
    return null;
  }

  return (
    <>
      {/* Facebook Pixel Script */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Facebook Pixel NoScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
