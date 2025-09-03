"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import Script from "next/script";

export function Omnisend() {
  const { settings } = useGeneralSettings();

  const isEnabled = settings?.omnisend_enabled && settings?.omnisend_api_key;
  const apiKey = settings?.omnisend_api_key;

  if (!isEnabled || !apiKey) {
    return null;
  }

  return (
    <>
      {/* Omnisend Script */}
      <Script
        id="omnisend-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(){var e=window.omnisend||[];e.push(["init"]);var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://omnisrc.com/inshop/launcher-v2.js?shop=${apiKey}",document.head.appendChild(t),window.omnisend=e}();
          `,
        }}
      />
    </>
  );
}
