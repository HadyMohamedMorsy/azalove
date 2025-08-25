// Facebook Pixel utility functions
export interface FacebookPixelConfig {
  enabled: boolean;
  pixelId?: string;
}

// Global Facebook Pixel configuration
let facebookPixelConfig: FacebookPixelConfig = {
  enabled: false,
  pixelId: undefined,
};

// Initialize Facebook Pixel configuration
export const initFacebookPixelConfig = (config: FacebookPixelConfig) => {
  facebookPixelConfig = config;
};

// Check if Facebook Pixel is enabled
export const isFacebookPixelEnabled = (): boolean => {
  return facebookPixelConfig.enabled && typeof window !== "undefined";
};

// Initialize Facebook Pixel script
export const initFacebookPixelScript = (pixelId: string) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  // Check if already initialized
  if ((window as any).fbq) {
    return;
  }

  try {
    // Create and inject the Facebook Pixel script
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    script.async = true;

    // Create and inject the noscript fallback
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);

    // Inject both tags
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];

    if (head) {
      head.appendChild(script);
    }
    if (body) {
      body.appendChild(noscript);
    }
  } catch (error) {
    console.error("Error initializing Facebook Pixel script:", error);
  }
};

// Track page view
export const trackPageView = (pagePath?: string) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const path = pagePath || window.location.pathname;
      (window as any).fbq("track", "PageView", { page_path: path });
    }
  } catch (error) {
    console.error("Error tracking page view in Facebook Pixel:", error);
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      if (parameters) {
        (window as any).fbq("track", eventName, parameters);
      } else {
        (window as any).fbq("track", eventName);
      }
    }
  } catch (error) {
    console.error("Error tracking event in Facebook Pixel:", error);
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
  currency?: string;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        content_ids: [product.id],
        content_name: product.name,
        value: product.price * product.quantity,
        currency: product.currency || "USD",
        content_type: "product",
        ...(product.category && { content_category: product.category }),
        ...(product.variant && { content_variant: product.variant }),
      };

      (window as any).fbq("track", "AddToCart", eventData);
    }
  } catch (error) {
    console.error("Error tracking add to cart in Facebook Pixel:", error);
  }
};

// Track purchase
export const trackPurchase = (transaction: {
  transaction_id: string;
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  content_category?: string;
  num_items?: number;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        value: transaction.value,
        currency: transaction.currency || "USD",
        content_ids: transaction.content_ids || [],
        content_name: transaction.content_name,
        content_type: transaction.content_type || "product",
        content_category: transaction.content_category,
        num_items: transaction.num_items,
      };

      (window as any).fbq("track", "Purchase", eventData);
    }
  } catch (error) {
    console.error("Error tracking purchase in Facebook Pixel:", error);
  }
};

// Track product view
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string;
  currency?: string;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        content_ids: [product.id],
        content_name: product.name,
        value: product.price,
        currency: product.currency || "USD",
        content_type: "product",
        ...(product.category && { content_category: product.category }),
        ...(product.variant && { content_variant: product.variant }),
      };

      (window as any).fbq("track", "ViewContent", eventData);
    }
  } catch (error) {
    console.error("Error tracking product view in Facebook Pixel:", error);
  }
};

// Track begin checkout
export const trackBeginCheckout = (cartData: {
  currency?: string;
  value: number;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  content_category?: string;
  num_items?: number;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        value: cartData.value,
        currency: cartData.currency || "USD",
        content_ids: cartData.content_ids || [],
        content_name: cartData.content_name,
        content_type: cartData.content_type || "product",
        content_category: cartData.content_category,
        num_items: cartData.num_items,
      };

      (window as any).fbq("track", "InitiateCheckout", eventData);
    }
  } catch (error) {
    console.error("Error tracking begin checkout in Facebook Pixel:", error);
  }
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        search_string: searchTerm,
        ...(resultsCount !== undefined && {
          content_category: `Results: ${resultsCount}`,
        }),
      };

      (window as any).fbq("track", "Search", eventData);
    }
  } catch (error) {
    console.error("Error tracking search in Facebook Pixel:", error);
  }
};

// Track lead
export const trackLead = (leadData: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        ...(leadData.value && { value: leadData.value }),
        currency: leadData.currency || "USD",
        content_name: leadData.content_name,
        content_category: leadData.content_category,
      };

      (window as any).fbq("track", "Lead", eventData);
    }
  } catch (error) {
    console.error("Error tracking lead in Facebook Pixel:", error);
  }
};

// Track complete registration
export const trackCompleteRegistration = (registrationData: {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        ...(registrationData.value && { value: registrationData.value }),
        currency: registrationData.currency || "USD",
        content_name: registrationData.content_name,
        content_category: registrationData.content_category,
      };

      (window as any).fbq("track", "CompleteRegistration", eventData);
    }
  } catch (error) {
    console.error(
      "Error tracking complete registration in Facebook Pixel:",
      error
    );
  }
};

// Track add to wishlist
export const trackAddToWishlist = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string;
  currency?: string;
}) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      const eventData = {
        content_ids: [product.id],
        content_name: product.name,
        value: product.price,
        currency: product.currency || "USD",
        content_type: "product",
        ...(product.category && { content_category: product.category }),
        ...(product.variant && { content_variant: product.variant }),
      };

      (window as any).fbq("track", "AddToWishlist", eventData);
    }
  } catch (error) {
    console.error("Error tracking add to wishlist in Facebook Pixel:", error);
  }
};

// Get current Facebook Pixel configuration
export const getFacebookPixelConfig = (): FacebookPixelConfig => {
  return { ...facebookPixelConfig };
};

// Check if Facebook Pixel script is loaded
export const isFacebookPixelScriptLoaded = (): boolean => {
  return typeof window !== "undefined" && !!(window as any).fbq;
};

// Reset Facebook Pixel configuration (useful for testing)
export const resetFacebookPixelConfig = () => {
  facebookPixelConfig = {
    enabled: false,
    pixelId: undefined,
  };
};

// Custom Facebook Pixel tracking
export const trackCustomFacebookPixel = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (!isFacebookPixelEnabled()) {
    return;
  }

  try {
    if ((window as any).fbq) {
      if (parameters) {
        (window as any).fbq("track", eventName, parameters);
      } else {
        (window as any).fbq("track", eventName);
      }
    }
  } catch (error) {
    console.error("Error tracking custom event in Facebook Pixel:", error);
  }
};
