"use client";

// Import the existing analytics components
import { FacebookPixel } from "@/components/ui/facebook-pixel";
import { GoogleAnalytics } from "@/components/ui/google-analytics";
import { GTM } from "@/components/ui/gtm";
import { Omnisend } from "@/components/ui/omnisend";
import { SnapPixel } from "@/components/ui/snap-pixel";
import { TikTokPixel } from "@/components/ui/tiktok-pixel";

export default function AnalyticsManager() {
  return (
    <>
      {/* Google Analytics - already properly implemented */}
      <GoogleAnalytics />

      {/* Google Tag Manager */}
      <GTM />

      {/* Omnisend */}
      <Omnisend />

      {/* Facebook Pixel */}
      <FacebookPixel />

      {/* Snapchat Pixel */}
      <SnapPixel />

      {/* TikTok Pixel */}
      <TikTokPixel />
    </>
  );
}
