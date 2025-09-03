"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCallback, useEffect, useMemo } from "react";

export const useGlobalAnalytics = () => {
  const { settings } = useGeneralSettings();

  // Check which services are enabled - memoized to prevent re-renders
  const serviceStatus = useMemo(
    () => ({
      isGTMEnabled: settings?.gtm_enabled && settings?.gtm_container_id,
      isGoogleAnalyticsEnabled:
        settings?.google_analytics_enabled && settings?.google_analytics_id,
      isOmnisendEnabled:
        settings?.omnisend_enabled && settings?.omnisend_api_key,
      isFacebookPixelEnabled:
        settings?.facebook_pixel_enabled && settings?.facebook_pixel_id,
      isSnapPixelEnabled:
        settings?.snapchat_pixel_enabled && settings?.snapchat_pixel_id,
      isTiktokPixelEnabled:
        settings?.init_tiktok_enabled && settings?.init_tiktok_id,
    }),
    [settings]
  );

  // Global tracking functions that work across all enabled services

  // Track page view across all services
  const trackPageView = useCallback(
    (pagePath?: string) => {
      const path =
        pagePath ||
        (typeof window !== "undefined" ? window.location.pathname : "");

      // Only track if we're in the browser
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: path,
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("config", settings?.google_analytics_id, {
          page_path: path,
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "PageView");
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "PAGE_VIEW");
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.page();
      }
    },
    [serviceStatus, settings?.google_analytics_id]
  );

  // Track add to cart across all services
  const trackAddToCart = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      category?: string;
      variant?: string;
      currency?: string;
    }) => {
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "add_to_cart",
          ecommerce: {
            add: {
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  item_category: product.category || "General",
                  currency: product.currency || "USD",
                },
              ],
            },
          },
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", "add_to_cart", {
          currency: product.currency || "USD",
          value: product.price * product.quantity,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "General",
              quantity: product.quantity,
              price: product.price,
            },
          ],
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "AddToCart", {
          content_ids: [product.id],
          content_name: product.name,
          content_category: product.category || "General",
          value: product.price,
          currency: product.currency || "USD",
          content_type: "product",
        });
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "ADD_CART", {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || "General",
          quantity: product.quantity,
          price: product.price,
          currency: product.currency || "USD",
        });
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track("AddToCart", {
          content_id: product.id,
          content_name: product.name,
          content_category: product.category || "General",
          quantity: product.quantity,
          value: product.price,
          currency: product.currency || "USD",
        });
      }
    },
    [serviceStatus]
  );

  // Track remove from cart across all services
  const trackRemoveFromCart = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      category?: string;
      variant?: string;
      currency?: string;
    }) => {
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "remove_from_cart",
          ecommerce: {
            remove: {
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  item_category: product.category || "General",
                  item_variant: product.variant,
                  currency: product.currency || "USD",
                },
              ],
            },
          },
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", "remove_from_cart", {
          currency: product.currency || "USD",
          value: product.price * product.quantity,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "General",
              quantity: product.quantity,
              price: product.price,
            },
          ],
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "RemoveFromCart", {
          content_ids: [product.id],
          content_name: product.name,
          content_category: product.category || "General",
          value: product.price,
          currency: product.currency || "USD",
          content_type: "product",
        });
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "REMOVE_CART", {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || "General",
          quantity: product.quantity,
          price: product.price,
          currency: product.currency || "USD",
        });
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track("RemoveFromCart", {
          content_id: product.id,
          content_name: product.name,
          content_category: product.category || "General",
          quantity: product.quantity,
          value: product.price,
          currency: product.currency || "USD",
        });
      }
    },
    [serviceStatus]
  );

  // Track purchase across all services
  const trackPurchase = useCallback(
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
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "purchase",
          ecommerce: {
            purchase: {
              transaction_id: transaction.transaction_id,
              value: transaction.value,
              tax: transaction.tax,
              shipping: transaction.shipping,
              currency: transaction.currency || "USD",
              items: transaction.items.map((item) => ({
                item_id: item.item_id,
                item_name: item.item_name,
                price: item.price,
                quantity: item.quantity,
                item_category: item.category || "General",
                item_variant: item.variant,
              })),
            },
          },
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", "purchase", {
          transaction_id: transaction.transaction_id,
          value: transaction.value,
          currency: transaction.currency || "USD",
          tax: transaction.tax,
          shipping: transaction.shipping,
          items: transaction.items.map((item) => ({
            item_id: item.item_id,
            item_name: item.item_name,
            item_category: item.category || "General",
            quantity: item.quantity,
            price: item.price,
          })),
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "Purchase", {
          transaction_id: transaction.transaction_id,
          value: transaction.value,
          currency: transaction.currency || "USD",
          content_ids: transaction.items.map((item) => item.item_id),
          content_name: transaction.items
            .map((item) => item.item_name)
            .join(", "),
          content_type: "product",
          content_category: transaction.items[0]?.category || "General",
          num_items: transaction.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
        });
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "PURCHASE", {
          transaction_id: transaction.transaction_id,
          value: transaction.value,
          currency: transaction.currency || "USD",
          items: transaction.items.map((item) => ({
            item_id: item.item_id,
            item_name: item.item_name,
            item_category: item.category || "General",
            quantity: item.quantity,
            price: item.price,
          })),
        });
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track("Purchase", {
          transaction_id: transaction.transaction_id,
          value: transaction.value,
          currency: transaction.currency || "USD",
          content_ids: transaction.items.map((item) => item.item_id),
          content_name: transaction.items
            .map((item) => item.item_name)
            .join(", "),
          content_type: "product",
          content_category: transaction.items[0]?.category || "General",
          num_items: transaction.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
        });
      }
    },
    [serviceStatus]
  );

  // Track product view across all services
  const trackProductView = useCallback(
    (product: {
      id: string;
      name: string;
      price: number;
      category?: string;
      variant?: string;
      brand?: string;
      currency?: string;
    }) => {
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "view_item",
          ecommerce: {
            view_item: {
              items: [
                {
                  item_id: product.id,
                  item_name: product.name,
                  price: product.price,
                  item_category: product.category || "General",
                  item_variant: product.variant,
                  item_brand: product.brand,
                  currency: product.currency || "USD",
                },
              ],
            },
          },
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", "view_item", {
          currency: product.currency || "USD",
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "General",
              price: product.price,
            },
          ],
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "ViewContent", {
          content_ids: [product.id],
          content_name: product.name,
          content_category: product.category || "General",
          value: product.price,
          currency: product.currency || "USD",
          content_type: "product",
        });
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "VIEW_ITEM", {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || "General",
          price: product.price,
          currency: product.currency || "USD",
        });
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track("ViewContent", {
          content_id: product.id,
          content_name: product.name,
          content_category: product.category || "General",
          value: product.price,
          currency: product.currency || "USD",
        });
      }
    },
    [serviceStatus]
  );

  // Track search across all services
  const trackSearch = useCallback(
    (searchTerm: string, resultsCount?: number) => {
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: "search",
          search_term: searchTerm,
          search_results: resultsCount,
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", "search", {
          search_term: searchTerm,
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", "Search", {
          search_string: searchTerm,
          content_category: "product",
        });
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", "SEARCH", {
          search_term: searchTerm,
          results_count: resultsCount,
        });
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track("Search", {
          query: searchTerm,
          results_count: resultsCount,
        });
      }
    },
    [serviceStatus]
  );

  // Track custom events across all services
  const trackCustomEvent = useCallback(
    (eventName: string, eventData?: Record<string, any>) => {
      if (typeof window === "undefined") return;

      // Track to GTM if enabled
      if (serviceStatus.isGTMEnabled && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventData,
        });
      }

      // Track to Google Analytics if enabled
      if (serviceStatus.isGoogleAnalyticsEnabled && window.gtag) {
        window.gtag("event", eventName, {
          event_category: "custom",
          event_label: eventData?.label,
          value: eventData?.value,
          ...eventData,
        });
      }

      // Track to Facebook Pixel if enabled
      if (serviceStatus.isFacebookPixelEnabled && window.fbq) {
        window.fbq("track", eventName, eventData);
      }

      // Track to Snapchat Pixel if enabled
      if (serviceStatus.isSnapPixelEnabled && window.snaptr) {
        window.snaptr("track", eventName, eventData);
      }

      // Track to TikTok Pixel if enabled
      if (serviceStatus.isTiktokPixelEnabled && window.ttq) {
        window.ttq.track(eventName, eventData);
      }
    },
    [serviceStatus]
  );

  // Auto-track page views when route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView();
    }
  }, [trackPageView]);

  return {
    // Service status
    ...serviceStatus,

    // Global tracking functions
    trackPageView,
    trackAddToCart,
    trackRemoveFromCart,
    trackPurchase,
    trackProductView,
    trackSearch,
    trackCustomEvent,
  };
};
