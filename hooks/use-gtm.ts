import { useGeneralSettings } from "@/contexts/general-settings-context";
import {
  clearPreviousEcommerce,
  getGTMConfig,
  initGTMConfig,
  initGTMScript,
  isGTMScriptLoaded,
  pushToDataLayer,
  trackAddToCart,
  trackBeginCheckout,
  trackButtonClick,
  trackEcommerceEvent,
  trackEvent,
  trackFormSubmission,
  trackPageView,
  trackProductView,
  trackPurchase,
  trackSearch,
  trackUserEngagement,
} from "@/utils/gtm";
import { useCallback, useEffect } from "react";

export const useGTM = () => {
  const { settings } = useGeneralSettings();

  // Initialize GTM configuration when settings change
  useEffect(() => {
    if (settings?.gtm_container_id) {
      initGTMConfig({
        enabled: true,
        containerId: settings.gtm_container_id,
      });
    }
  }, [settings?.gtm_container_id]);

  // Initialize GTM script if enabled
  const initializeGTM = useCallback(
    (containerId?: string) => {
      if (!settings?.gtm_container_id) {
        return;
      }

      const finalContainerId = containerId || settings.gtm_container_id;
      if (finalContainerId) {
        initGTMScript(finalContainerId);
      } else {
        console.warn("GTM container ID not provided");
      }
    },
    [settings]
  );

  // Enhanced tracking functions that check settings
  const trackPageViewGTM = useCallback(
    (pageData?: Record<string, any>) => {
      if (settings?.gtm_container_id) {
        trackPageView(pageData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackCustomEvent = useCallback(
    (event: string, eventData: any) => {
      if (settings?.gtm_container_id) {
        trackEvent(event, eventData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackEcommerce = useCallback(
    (eventName: string, ecommerceData: any) => {
      if (settings?.gtm_container_id) {
        trackEcommerceEvent(eventName, ecommerceData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackAddToCartGTM = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      category?: string;
      variant?: string;
    }) => {
      if (settings?.gtm_container_id) {
        trackAddToCart(product);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackPurchaseGTM = useCallback(
    (transaction: {
      transaction_id: string;
      value: number;
      tax?: number;
      shipping?: number;
      currency?: string;
      items: Array<{
        item_id: string;
        item_name: string;
        price: number;
        quantity: number;
        category?: string;
        variant?: string;
      }>;
    }) => {
      if (settings?.gtm_container_id) {
        trackPurchase(transaction);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackProductViewGTM = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      category?: string;
      variant?: string;
      brand?: string;
    }) => {
      if (settings?.gtm_container_id) {
        trackProductView(product);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackCheckoutGTM = useCallback(
    (cartData: {
      currency?: string;
      value: number;
      items: Array<{
        item_id: string;
        item_name: string;
        price: number;
        quantity: number;
        category?: string;
      }>;
    }) => {
      if (settings?.gtm_container_id) {
        trackBeginCheckout(cartData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackSearchGTM = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      if (settings?.gtm_container_id) {
        trackSearch(searchTerm, resultsCount);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackUserEngagementGTM = useCallback(
    (engagementData: { engagement_time_msec: number; session_id?: string }) => {
      if (settings?.gtm_container_id) {
        trackUserEngagement(engagementData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackFormGTM = useCallback(
    (formData: {
      form_name: string;
      form_id?: string;
      form_type?: string;
      success?: boolean;
    }) => {
      if (settings?.gtm_container_id) {
        trackFormSubmission(formData);
      }
    },
    [settings?.gtm_container_id]
  );

  const trackButtonGTM = useCallback(
    (buttonData: {
      button_name: string;
      button_id?: string;
      button_location?: string;
      button_type?: string;
    }) => {
      if (settings?.gtm_container_id) {
        trackButtonClick(buttonData);
      }
    },
    [settings?.gtm_container_id]
  );

  const clearEcommerceGTM = useCallback(() => {
    if (settings?.gtm_container_id) {
      clearPreviousEcommerce();
    }
  }, [settings?.gtm_container_id]);

  const pushDataGTM = useCallback(
    (data: any) => {
      if (settings?.gtm_container_id) {
        pushToDataLayer(data);
      }
    },
    [settings?.gtm_container_id]
  );

  return {
    // Configuration
    isEnabled: !!settings?.gtm_container_id,
    config: getGTMConfig(),
    isScriptLoaded: isGTMScriptLoaded(),
    containerId: settings?.gtm_container_id,

    // Initialization
    initializeGTM,

    // Tracking methods (automatically check if enabled)
    trackPageView: trackPageViewGTM,
    trackCustomEvent,
    trackEcommerce,
    trackAddToCart: trackAddToCartGTM,
    trackPurchase: trackPurchaseGTM,
    trackProductView: trackProductViewGTM,
    trackCheckout: trackCheckoutGTM,
    trackSearch: trackSearchGTM,
    trackUserEngagement: trackUserEngagementGTM,
    trackForm: trackFormGTM,
    trackButton: trackButtonGTM,
    clearEcommerce: clearEcommerceGTM,
    pushData: pushDataGTM,

    // Raw tracking methods (for advanced usage)
    trackEvent: trackEvent,
    trackPageViewRaw: trackPageView,
    trackEcommerceEvent: trackEcommerceEvent,
    trackAddToCartRaw: trackAddToCart,
    trackPurchaseRaw: trackPurchase,
    trackProductViewRaw: trackProductView,
    trackBeginCheckoutRaw: trackBeginCheckout,
    trackSearchRaw: trackSearch,
    trackUserEngagementRaw: trackUserEngagement,
    trackFormSubmissionRaw: trackFormSubmission,
    trackButtonClickRaw: trackButtonClick,
    clearPreviousEcommerceRaw: clearPreviousEcommerce,
    pushToDataLayerRaw: pushToDataLayer,
  };
};
