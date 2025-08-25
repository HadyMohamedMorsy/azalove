"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    snaptr: (...args: any[]) => void;
  }
}

export function SnapPixel() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();
  const pathname = usePathname();

  const isEnabled =
    settings?.snapchat_pixel_enabled &&
    settings?.snapchat_pixel_id &&
    preferences?.marketing;

  const pixelId = settings?.snapchat_pixel_id;

  useEffect(() => {
    if (!isEnabled || !pixelId || !pathname) return;

    // Track page view when route changes
    if (window.snaptr) {
      window.snaptr("track", "PAGE_VIEW");
    }
  }, [isEnabled, pixelId, pathname]);

  if (!isEnabled || !pixelId) {
    return null;
  }

  return (
    <>
      {/* Snap Pixel Script */}
      <Script
        id="snap-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
            a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');

            snaptr('init', '${pixelId}');
            snaptr('track', 'PAGE_VIEW');
          `,
        }}
      />
    </>
  );
}
