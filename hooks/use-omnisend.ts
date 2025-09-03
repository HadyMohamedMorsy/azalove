import { useGeneralSettings } from "@/contexts/general-settings-context";
import {
  getOmnisendConfig,
  identifyContact,
  initOmnisendConfig,
  initOmnisendScript,
  isOmnisendScriptLoaded,
  trackAddToCart,
  trackEvent,
  trackPageViewed,
  trackProductView,
  trackPurchase,
  trackSearch,
} from "@/utils/omnisend";
import { useCallback, useEffect } from "react";

export const useOmnisend = () => {
  const { settings } = useGeneralSettings();

  // Initialize Omnisend configuration when settings change
  useEffect(() => {
    if (settings?.omnisend_enabled && settings?.omnisend_api_key) {
      initOmnisendConfig({
        enabled: true,
        apiKey: settings.omnisend_api_key,
        brandId: settings.omnisend_api_key, // Using API key as brand ID, adjust as needed
      });
    }
  }, [settings?.omnisend_enabled, settings?.omnisend_api_key]);

  // Initialize Omnisend script if enabled
  const initializeOmnisend = useCallback(
    (brandId?: string) => {
      if (!settings?.omnisend_enabled) {
        return;
      }

      const finalBrandId = brandId || settings.omnisend_api_key;
      if (finalBrandId) {
        initOmnisendScript(finalBrandId);
      } else {
        console.warn("Omnisend brand ID not provided");
      }
    },
    [settings]
  );

  // Enhanced tracking functions that check settings
  const trackPageView = useCallback(() => {
    if (settings?.omnisend_enabled) {
      trackPageViewed();
    }
  }, [settings?.omnisend_enabled]);

  const identifyUser = useCallback(
    (email: string, phone?: string) => {
      if (settings?.omnisend_enabled) {
        identifyContact(email, phone);
      }
    },
    [settings?.omnisend_enabled]
  );

  const trackCustomEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      if (settings?.omnisend_enabled) {
        trackEvent(eventName, properties);
      }
    },
    [settings?.omnisend_enabled]
  );

  const trackOrder = useCallback(
    (
      orderId: string,
      total: number,
      currency: string,
      items?: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
      }>
    ) => {
      if (settings?.omnisend_enabled) {
        trackPurchase(orderId, total, currency, items);
      }
    },
    [settings?.omnisend_enabled]
  );

  const trackCartUpdate = useCallback(
    (
      productId: string,
      productName: string,
      price: number,
      quantity: number = 1
    ) => {
      if (settings?.omnisend_enabled) {
        trackAddToCart(productId, productName, price, quantity);
      }
    },
    [settings?.omnisend_enabled]
  );

  const trackProduct = useCallback(
    (
      productId: string,
      productName: string,
      price: number,
      category?: string
    ) => {
      if (settings?.omnisend_enabled) {
        trackProductView(productId, productName, price, category);
      }
    },
    [settings?.omnisend_enabled]
  );

  const trackSearchQuery = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      if (settings?.omnisend_enabled) {
        trackSearch(searchTerm, resultsCount);
      }
    },
    [settings?.omnisend_enabled]
  );

  return {
    // Configuration
    isEnabled: settings?.omnisend_enabled || false,
    config: getOmnisendConfig(),
    isScriptLoaded: isOmnisendScriptLoaded(),

    // Initialization
    initializeOmnisend,

    // Tracking methods (automatically check if enabled)
    trackPageView,
    identifyUser,
    trackCustomEvent,
    trackOrder,
    trackCartUpdate,
    trackProduct,
    trackSearchQuery,

    // Raw tracking methods (for advanced usage)
    trackPageViewed,
    identifyContact,
    trackEvent,
    trackPurchase,
    trackAddToCart,
    trackProductView,
    trackSearch,
  };
};
