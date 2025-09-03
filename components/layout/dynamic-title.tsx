"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useEffect } from "react";

export default function DynamicTitle() {
  const { settings, loading } = useGeneralSettings();

  useEffect(() => {
    if (!loading && settings?.store_name) {
      // Update the document title
      document.title = settings.store_name;

      // Also update meta tags if needed
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) {
        metaTitle.setAttribute("content", settings.store_name);
      }
    }
  }, [settings?.store_name, loading]);

  return null; // This component doesn't render anything
}
