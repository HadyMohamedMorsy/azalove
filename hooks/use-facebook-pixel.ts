import { useGeneralSettings } from "@/contexts/general-settings-context";
import {
  getFacebookPixelConfig,
  initFacebookPixelConfig,
  initFacebookPixelScript,
  isFacebookPixelScriptLoaded,
  trackAddToCart,
  trackAddToWishlist,
  trackBeginCheckout,
  trackCompleteRegistration,
  trackCustomFacebookPixel,
  trackEvent,
  trackLead,
  trackPageView,
  trackProductView,
  trackPurchase,
  trackSearch,
} from "@/utils/facebook-pixel";
import { useCallback, useEffect } from "react";

export const useFacebookPixel = () => {
  const { settings } = useGeneralSettings();

  // Initialize Facebook Pixel configuration when settings change
  useEffect(() => {
    if (settings) {
      initFacebookPixelConfig({
        enabled: !!settings.facebook_pixel_id, // Enable if Facebook Pixel ID is set
        pixelId: settings.facebook_pixel_id,
      });
    }
  }, [settings]);

  // Initialize Facebook Pixel script if enabled
  const initializeFacebookPixel = useCallback(
    (pixelId?: string) => {
      if (!settings?.facebook_pixel_id) {
        return;
      }

      const finalPixelId = pixelId || settings.facebook_pixel_id;
      if (finalPixelId) {
        initFacebookPixelScript(finalPixelId);
      } else {
        console.warn("Facebook Pixel ID not provided");
      }
    },
    [settings]
  );

  // Enhanced tracking functions that check settings
  const trackPageViewFB = useCallback(
    (pagePath?: string) => {
      if (settings?.facebook_pixel_id) {
        trackPageView(pagePath);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackCustomEvent = useCallback(
    (eventName: string, parameters?: Record<string, any>) => {
      if (settings?.facebook_pixel_id) {
        trackEvent(eventName, parameters);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackAddToCartFB = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      category?: string;
      variant?: string;
      currency?: string;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackAddToCart(product);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackPurchaseFB = useCallback(
    (transaction: {
      transaction_id: string;
      value: number;
      currency?: string;
      content_ids?: string[];
      content_name?: string;
      content_type?: string;
      content_category?: string;
      num_items?: number;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackPurchase(transaction);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackProductViewFB = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      category?: string;
      variant?: string;
      currency?: string;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackProductView(product);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackCheckoutFB = useCallback(
    (cartData: {
      currency?: string;
      value: number;
      content_ids?: string[];
      content_name?: string;
      content_type?: string;
      content_category?: string;
      num_items?: number;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackBeginCheckout(cartData);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackSearchFB = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      if (settings?.facebook_pixel_id) {
        trackSearch(searchTerm, resultsCount);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackLeadFB = useCallback(
    (leadData: {
      value?: number;
      currency?: string;
      content_name?: string;
      content_category?: string;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackLead(leadData);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackRegistrationFB = useCallback(
    (registrationData: {
      value?: number;
      currency?: string;
      content_name?: string;
      content_category?: string;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackCompleteRegistration(registrationData);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackWishlistFB = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      category?: string;
      variant?: string;
      currency?: string;
    }) => {
      if (settings?.facebook_pixel_id) {
        trackAddToWishlist(product);
      }
    },
    [settings?.facebook_pixel_id]
  );

  const trackCustomFB = useCallback(
    (eventName: string, parameters?: Record<string, any>) => {
      if (settings?.facebook_pixel_id) {
        trackCustomFacebookPixel(eventName, parameters);
      }
    },
    [settings?.facebook_pixel_id]
  );

  return {
    // Configuration
    isEnabled: !!settings?.facebook_pixel_id,
    config: getFacebookPixelConfig(),
    isScriptLoaded: isFacebookPixelScriptLoaded(),
    pixelId: settings?.facebook_pixel_id,

    // Initialization
    initializeFacebookPixel,

    // Tracking methods (automatically check if enabled)
    trackPageView: trackPageViewFB,
    trackCustomEvent,
    trackAddToCart: trackAddToCartFB,
    trackPurchase: trackPurchaseFB,
    trackProductView: trackProductViewFB,
    trackCheckout: trackCheckoutFB,
    trackSearch: trackSearchFB,
    trackLead: trackLeadFB,
    trackRegistration: trackRegistrationFB,
    trackWishlist: trackWishlistFB,
    trackCustom: trackCustomFB,

    // Raw tracking methods (for advanced usage)
    trackPageViewRaw: trackPageView,
    trackEventRaw: trackEvent,
    trackAddToCartRaw: trackAddToCart,
    trackPurchaseRaw: trackPurchase,
    trackProductViewRaw: trackProductView,
    trackBeginCheckoutRaw: trackBeginCheckout,
    trackSearchRaw: trackSearch,
    trackLeadRaw: trackLead,
    trackCompleteRegistrationRaw: trackCompleteRegistration,
    trackAddToWishlistRaw: trackAddToWishlist,
    trackCustomFacebookPixelRaw: trackCustomFacebookPixel,
  };
};
