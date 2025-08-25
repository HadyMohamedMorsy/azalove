// Google Tag Manager utility functions
export interface GTMConfig {
  enabled: boolean;
  containerId?: string;
}

// Global GTM configuration
let gtmConfig: GTMConfig = {
  enabled: false,
  containerId: undefined,
};

// Initialize GTM configuration
export const initGTMConfig = (config: GTMConfig) => {
  gtmConfig = config;
};

// Check if GTM is enabled
export const isGTMEnabled = (): boolean => {
  return gtmConfig.enabled && typeof window !== "undefined";
};

// Initialize GTM script
export const initGTMScript = (gtmId: string) => {
  if (!isGTMEnabled()) {
    return;
  }

  // Check if already initialized
  if ((window as any).dataLayer) {
    return;
  }

  try {
    // Create and inject the main GTM script
    let scriptTag = document.createElement("script");
    scriptTag.text = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "${gtmId}");
    `;

    // Create and inject the noscript iframe
    let noScriptTag = document.createElement("noscript");
    let iframeTag = document.createElement("iframe");
    iframeTag.setAttribute(
      "src",
      `https://www.googletagmanager.com/ns.html?id=${gtmId}`
    );
    iframeTag.setAttribute("height", "0");
    iframeTag.setAttribute("width", "0");
    iframeTag.setAttribute("style", "display: none; visibility: hidden");
    noScriptTag.appendChild(iframeTag);

    // Inject both tags
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];

    if (head) {
      head.appendChild(scriptTag);
    }
    if (body) {
      body.appendChild(noScriptTag);
    }
  } catch (error) {
    console.error("Error initializing GTM script:", error);
  }
};

// Clear previous ecommerce data
export const clearPreviousEcommerce = () => {
  if (!isGTMEnabled()) {
    return;
  }

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ ecommerce: null });
  } catch (error) {
    console.error("Error clearing ecommerce data:", error);
  }
};

// Track custom events
export const trackEvent = (event: string, eventData: any) => {
  if (!isGTMEnabled()) {
    return;
  }

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event, ...eventData });
    }
  } catch (error) {
    console.error("Error tracking event in GTM:", error);
  }
};

// Track page view
export const trackPageView = (pageData?: Record<string, any>) => {
  if (!isGTMEnabled()) {
    return;
  }

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    const pageViewData = {
      event: "page_view",
      page_title: document.title,
      page_location: window.location.href,
      ...pageData,
    };
    (window as any).dataLayer.push(pageViewData);
  } catch (error) {
    console.error("Error tracking page view in GTM:", error);
  }
};

// Track ecommerce events
export const trackEcommerceEvent = (eventName: string, ecommerceData: any) => {
  if (!isGTMEnabled()) {
    return;
  }

  try {
    clearPreviousEcommerce();
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ecommerce: ecommerceData,
    });
  } catch (error) {
    console.error("Error tracking ecommerce event in GTM:", error);
  }
};

// Track add to cart
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  variant?: string;
}) => {
  if (!isGTMEnabled()) {
    return;
  }

  const ecommerceData = {
    currency: "USD", // Default currency, can be overridden
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
        item_category: product.category,
        item_variant: product.variant,
      },
    ],
  };

  trackEcommerceEvent("add_to_cart", ecommerceData);
};

// Track purchase
export const trackPurchase = (transaction: {
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
  if (!isGTMEnabled()) {
    return;
  }

  const ecommerceData = {
    transaction_id: transaction.transaction_id,
    value: transaction.value,
    tax: transaction.tax || 0,
    shipping: transaction.shipping || 0,
    currency: transaction.currency || "USD",
    items: transaction.items.map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category,
      item_variant: item.variant,
    })),
  };

  trackEcommerceEvent("purchase", ecommerceData);
};

// Track product view
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string;
  brand?: string;
}) => {
  if (!isGTMEnabled()) {
    return;
  }

  const ecommerceData = {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        item_variant: product.variant,
        item_brand: product.brand,
      },
    ],
  };

  trackEcommerceEvent("view_item", ecommerceData);
};

// Track begin checkout
export const trackBeginCheckout = (cartData: {
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
  if (!isGTMEnabled()) {
    return;
  }

  const ecommerceData = {
    currency: cartData.currency || "USD",
    value: cartData.value,
    items: cartData.items.map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category,
    })),
  };

  trackEcommerceEvent("begin_checkout", ecommerceData);
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (!isGTMEnabled()) {
    return;
  }

  const searchData = {
    search_term: searchTerm,
    ...(resultsCount !== undefined && { results_count: resultsCount }),
  };

  trackEvent("search", searchData);
};

// Track user engagement
export const trackUserEngagement = (engagementData: {
  engagement_time_msec: number;
  session_id?: string;
}) => {
  if (!isGTMEnabled()) {
    return;
  }

  trackEvent("user_engagement", engagementData);
};

// Track form submission
export const trackFormSubmission = (formData: {
  form_name: string;
  form_id?: string;
  form_type?: string;
  success?: boolean;
}) => {
  if (!isGTMEnabled()) {
    return;
  }

  trackEvent("form_submit", formData);
};

// Track button click
export const trackButtonClick = (buttonData: {
  button_name: string;
  button_id?: string;
  button_location?: string;
  button_type?: string;
}) => {
  if (!isGTMEnabled()) {
    return;
  }

  trackEvent("button_click", buttonData);
};

// Get current GTM configuration
export const getGTMConfig = (): GTMConfig => {
  return { ...gtmConfig };
};

// Check if GTM script is loaded
export const isGTMScriptLoaded = (): boolean => {
  return typeof window !== "undefined" && !!(window as any).dataLayer;
};

// Reset GTM configuration (useful for testing)
export const resetGTMConfig = () => {
  gtmConfig = {
    enabled: false,
    containerId: undefined,
  };
};

// Push custom data to dataLayer
export const pushToDataLayer = (data: any) => {
  if (!isGTMEnabled()) {
    return;
  }

  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(data);
  } catch (error) {
    console.error("Error pushing to GTM dataLayer:", error);
  }
};
