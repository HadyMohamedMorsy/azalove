"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useEffect } from "react";

interface MetaTagManagerProps {
  pageType?: "home" | "other";
}

export default function MetaTagManager({
  pageType = "other",
}: MetaTagManagerProps) {
  const { settings } = useGeneralSettings();

  useEffect(() => {
    if (!settings) return;

    // Update document title
    if (pageType === "home" && settings.meta_title) {
      document.title = settings.meta_title;
    }

    // Update meta description
    if (pageType === "home" && settings.meta_description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", settings.meta_description);
      } else {
        // Create meta description if it doesn't exist
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = settings.meta_description;
        document.head.appendChild(newMetaDescription);
      }
    }

    // Update Open Graph meta tags
    if (pageType === "home") {
      // Update og:title
      if (settings.meta_title) {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute("content", settings.meta_title);
        }
      }

      // Update og:description
      if (settings.meta_description) {
        const ogDescription = document.querySelector(
          'meta[property="og:description"]'
        );
        if (ogDescription) {
          ogDescription.setAttribute("content", settings.meta_description);
        }
      }
    }
  }, [settings, pageType]);

  // This component doesn't render anything visible
  return null;
}
