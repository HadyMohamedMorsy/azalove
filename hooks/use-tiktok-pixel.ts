"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";

export function useTikTokPixel() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();

  const isEnabled =
    settings?.init_tiktok_enabled &&
    settings?.init_tiktok_id &&
    preferences?.marketing;

  const pixelId = settings?.init_tiktok_id;

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track(eventName, parameters);
  };

  const trackPageView = () => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.page();
  };

  const identifyUser = (userId: string, parameters?: Record<string, any>) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.identify(userId, parameters);
  };

  // E-commerce Events
  const trackAddToCart = (
    itemId: string,
    itemName: string,
    category: string,
    quantity: number,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("AddToCart", {
      content_id: itemId,
      content_name: itemName,
      content_category: category,
      quantity: quantity,
      value: price,
      currency: currency,
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
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("RemoveFromCart", {
      content_id: itemId,
      content_name: itemName,
      content_category: category,
      quantity: quantity,
      value: price,
      currency: currency,
    });
  };

  const trackViewItem = (
    itemId: string,
    itemName: string,
    category: string,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("ViewContent", {
      content_id: itemId,
      content_name: itemName,
      content_category: category,
      value: price,
      currency: currency,
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
    if (!isEnabled || !window.ttq) return;

    const contentIds = items?.map((item) => item.item_id) || [];
    const contentNames = items?.map((item) => item.item_name) || [];
    const contentCategories = items?.map((item) => item.category) || [];

    window.ttq.track("Purchase", {
      content_id: contentIds,
      content_name: contentNames,
      content_category: contentCategories,
      value: value,
      currency: currency,
      content_type: "product",
    });
  };

  const trackSearch = (searchTerm: string) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("Search", {
      query: searchTerm,
    });
  };

  const trackSignUp = (method?: string) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("CompleteRegistration", {
      method: method,
    });
  };

  const trackLogin = (method?: string) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("Login", {
      method: method,
    });
  };

  const trackStartCheckout = (value: number, currency: string = "USD") => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("InitiateCheckout", {
      value: value,
      currency: currency,
    });
  };

  const trackAddToWishlist = (
    itemId: string,
    itemName: string,
    category: string,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("AddToWishlist", {
      content_id: itemId,
      content_name: itemName,
      content_category: category,
      value: price,
      currency: currency,
    });
  };

  const trackCompleteRegistration = () => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("CompleteRegistration");
  };

  const trackContact = () => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("Contact");
  };

  const trackSubscribe = () => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("Subscribe");
  };

  const trackViewContent = (
    contentId: string,
    contentName: string,
    contentType: string = "product",
    value?: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("ViewContent", {
      content_id: contentId,
      content_name: contentName,
      content_type: contentType,
      value: value,
      currency: currency,
    });
  };

  const trackAddPaymentInfo = (
    value: number,
    currency: string = "USD",
    contentCategory?: string
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("AddPaymentInfo", {
      value: value,
      currency: currency,
      content_category: contentCategory,
    });
  };

  const trackAddShippingInfo = (
    value: number,
    currency: string = "USD",
    contentCategory?: string
  ) => {
    if (!isEnabled || !window.ttq) return;

    window.ttq.track("AddShippingInfo", {
      value: value,
      currency: currency,
      content_category: contentCategory,
    });
  };

  return {
    isEnabled,
    pixelId,
    trackEvent,
    trackPageView,
    identifyUser,
    trackAddToCart,
    trackRemoveFromCart,
    trackViewItem,
    trackPurchase,
    trackSearch,
    trackSignUp,
    trackLogin,
    trackStartCheckout,
    trackAddToWishlist,
    trackCompleteRegistration,
    trackContact,
    trackSubscribe,
    trackViewContent,
    trackAddPaymentInfo,
    trackAddShippingInfo,
  };
}
