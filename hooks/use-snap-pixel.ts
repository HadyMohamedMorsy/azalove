"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCookiePreferences } from "@/hooks/use-cookie-preferences";

export function useSnapPixel() {
  const { settings } = useGeneralSettings();
  const { preferences } = useCookiePreferences();

  const isEnabled =
    settings?.snapchat_pixel_enabled &&
    settings?.snapchat_pixel_id &&
    preferences?.marketing;

  const pixelId = settings?.snapchat_pixel_id;

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", eventName, parameters);
  };

  const trackPageView = () => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "PAGE_VIEW");
  };

  const trackAddToCart = (
    itemId: string,
    itemName: string,
    category: string,
    quantity: number,
    price: number,
    currency: string = "USD"
  ) => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "ADD_CART", {
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      quantity: quantity,
      price: price,
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
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "REMOVE_CART", {
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      quantity: quantity,
      price: price,
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
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "VIEW_ITEM", {
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      price: price,
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
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "PURCHASE", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  };

  const trackSearch = (searchTerm: string) => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "SEARCH", {
      search_term: searchTerm,
    });
  };

  const trackSignUp = (method?: string) => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "SIGN_UP", {
      method: method,
    });
  };

  const trackLogin = (method?: string) => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "LOGIN", {
      method: method,
    });
  };

  const trackStartCheckout = (value: number, currency: string = "USD") => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "START_CHECKOUT", {
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
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "ADD_TO_WISHLIST", {
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      price: price,
      currency: currency,
    });
  };

  const trackCompleteRegistration = () => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "COMPLETE_REGISTRATION");
  };

  const trackContact = () => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "CONTACT");
  };

  const trackSubscribe = () => {
    if (!isEnabled || !window.snaptr) return;

    window.snaptr("track", "SUBSCRIBE");
  };

  return {
    isEnabled,
    pixelId,
    trackEvent,
    trackPageView,
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
  };
}
