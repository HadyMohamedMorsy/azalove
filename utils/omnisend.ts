// Omnisend utility functions
export interface OmnisendConfig {
  enabled: boolean;
  apiKey?: string;
  brandId?: string;
}

// Global Omnisend configuration
let omnisendConfig: OmnisendConfig = {
  enabled: false,
  apiKey: undefined,
  brandId: undefined,
};

// Initialize Omnisend configuration
export const initOmnisendConfig = (config: OmnisendConfig) => {
  omnisendConfig = config;
};

// Check if Omnisend is enabled
export const isOmnisendEnabled = (): boolean => {
  return omnisendConfig.enabled && typeof window !== "undefined";
};

// Initialize Omnisend script
export const initOmnisendScript = (brandId: string) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  // Check if already initialized
  if ((window as any).omnisend) {
    return;
  }

  try {
    (window as any).omnisend = (window as any).omnisend || [];
    (window as any).omnisend.push(["brandID", brandId]);
    (window as any).omnisend.push(["track", "$pageViewed"]);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://omnisnippet1.com/inshop/launcher-v2.js";

    // Try to insert before first script tag, fallback to head
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  } catch (error) {
    console.error("Error initializing Omnisend script:", error);
  }
};

// Track page viewed
export const trackPageViewed = () => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      (window as any).omnisend.push(["track", "$pageViewed"]);
    } catch (error) {
      console.error("Error tracking page viewed:", error);
    }
  } 
};

// Identify contact
export const identifyContact = (email: string, phone?: string) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      const contactData: any = { email };
      if (phone) {
        contactData.phone = phone;
      }

      (window as any).omnisend?.identifyContact?.(contactData);
    } catch (error) {
      console.error("Error identifying contact:", error);
    }
  } 
};

// Track custom event
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      if (properties) {
        (window as any).omnisend.push(["track", eventName, properties]);
      } else {
        (window as any).omnisend.push(["track", eventName]);
      }
    } catch (error) {
      console.error("Error tracking custom event:", error);
    }
  } 
};

// Track purchase
export const trackPurchase = (
  orderId: string,
  total: number,
  currency: string,
  items?: Array<{ id: string; name: string; price: number; quantity: number }>
) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      const purchaseData: any = {
        orderId,
        total,
        currency,
      };

      if (items && items.length > 0) {
        purchaseData.items = items;
      }

      (window as any).omnisend.push(["track", "$orderCompleted", purchaseData]);
    } catch (error) {
      console.error("Error tracking purchase:", error);
    }
  }
};

// Track add to cart
export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number,
  quantity: number = 1
) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      (window as any).omnisend.push([
        "track",
        "$cartUpdated",
        {
          productId,
          productName,
          price,
          quantity,
        },
      ]);
    } catch (error) {
      console.error("Error tracking add to cart:", error);
    }
  }
};

// Track product view
export const trackProductView = (
  productId: string,
  productName: string,
  price: number,
  category?: string
) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      const productData: any = {
        productId,
        productName,
        price,
      };

      if (category) {
        productData.category = category;
      }

      (window as any).omnisend.push(["track", "$productViewed", productData]);
    } catch (error) {
      console.error("Error tracking product view:", error);
    }
  } 
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (!isOmnisendEnabled()) {
    return;
  }

  if ((window as any).omnisend) {
    try {
      const searchData: any = { searchTerm };
      if (resultsCount !== undefined) {
        searchData.resultsCount = resultsCount;
      }

      (window as any).omnisend.push(["track", "$search", searchData]);
    } catch (error) {
      console.error("Error tracking search:", error);
    }
  } 
};

// Get current Omnisend configuration
export const getOmnisendConfig = (): OmnisendConfig => {
  return { ...omnisendConfig };
};

// Check if Omnisend script is loaded
export const isOmnisendScriptLoaded = (): boolean => {
  return typeof window !== "undefined" && !!(window as any).omnisend;
};

// Reset Omnisend configuration (useful for testing)
export const resetOmnisendConfig = () => {
  omnisendConfig = {
    enabled: false,
    apiKey: undefined,
    brandId: undefined,
  };
};
