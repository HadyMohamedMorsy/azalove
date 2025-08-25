"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";

export function useGoogleAnalytics() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();

  const isEnabled =
    settings?.google_analytics_enabled &&
    settings?.google_analytics_id &&
    preferences?.analytical;

  const trackingId = settings?.google_analytics_id;

  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  const trackPageView = (pagePath: string) => {
    if (!isEnabled || !trackingId || !window.gtag) return;

    window.gtag("config", trackingId, {
      page_path: pagePath,
    });
  };

  const trackConversion = (conversionId: string, value?: number) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "conversion", {
      send_to: conversionId,
      value: value,
    });
  };

  const trackPurchase = (
    transactionId: string,
    value: number,
    currency: string = "USD",
    items?: Array<{
      item_id: string;
      item_name: string;
      category: string;
      quantity: number;
      price: number;
    }>
  ) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  };

  const trackAddToCart = (
    itemId: string,
    itemName: string,
    category: string,
    quantity: number,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "add_to_cart", {
      currency: currency,
      value: price * quantity,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: quantity,
          price: price,
        },
      ],
    });
  };

  const trackRemoveFromCart = (
    itemId: string,
    itemName: string,
    category: string,
    quantity: number,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "remove_from_cart", {
      currency: currency,
      value: price * quantity,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: quantity,
          price: price,
        },
      ],
    });
  };

  const trackViewItem = (
    itemId: string,
    itemName: string,
    category: string,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "view_item", {
      currency: currency,
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          price: price,
        },
      ],
    });
  };

  const trackSearch = (searchTerm: string) => {
    if (!isEnabled || !window.gtag) return;

    window.gtag("event", "search", {
      search_term: searchTerm,
    });
  };

  return {
    isEnabled,
    trackingId,
    trackEvent,
    trackPageView,
    trackConversion,
    trackPurchase,
    trackAddToCart,
    trackRemoveFromCart,
    trackViewItem,
    trackSearch,
  };
}
