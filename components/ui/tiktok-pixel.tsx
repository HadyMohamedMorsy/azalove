"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    ttq: {
      track: (eventName: string, parameters?: Record<string, any>) => void;
      page: () => void;
      identify: (userId: string, parameters?: Record<string, any>) => void;
      setAndDefer: (target: any, method: string) => void;
      load: (pixelId: string, config?: Record<string, any>) => void;
      instance: (pixelId: string) => any;
      methods: string[];
      _i: Record<string, any>;
      _t: Record<string, any>;
      _o: Record<string, any>;
    };
  }
}

export function TikTokPixel() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();
  const pathname = usePathname();

  const isEnabled =
    settings?.init_tiktok_enabled &&
    settings?.init_tiktok_id &&
    preferences?.marketing;

  const pixelId = settings?.init_tiktok_id;

  useEffect(() => {
    if (!isEnabled || !pixelId || !pathname) return;

    // Track page view when route changes
    if (window.ttq) {
      window.ttq.page();
    }
  }, [isEnabled, pixelId, pathname]);

  if (!isEnabled || !pixelId) {
    return null;
  }

  return (
    <>
      {/* TikTok Pixel Script */}
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
              };
              for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i])
              }
              ttq.instance = function (t) {
                var e = ttq._i[t] || [];
                for (var n = 0; n < ttq.methods.length; n++) {
                  ttq.setAndDefer(e, ttq.methods[n])
                }
                return e
              };
              ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = i;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date;
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript";
                o.async = !0;
                o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
              };

              ttq.load('${pixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />
    </>
  );
}
