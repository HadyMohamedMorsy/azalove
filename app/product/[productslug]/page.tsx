"use client";
import ProductView from "@/components/products/single-product/product-view";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useGlobalAnalytics } from "@/hooks/use-global-analytics";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function ProductSlug() {
  const params = useParams();
  const { trackProductView } = useGlobalAnalytics();
  const { settings } = useGeneralSettings();

  // Get currency from settings, fallback to USD if not set
  const currency = settings?.default_currency || "USD";

  // Track product page view
  useEffect(() => {
    if (params.productslug) {
      // This will be enhanced when we have product data available
      trackProductView({
        id: params.productslug as string,
        name: "Product", // Will be updated when product data is available
        price: 0, // Will be updated when product data is available
        category: "General", // Will be updated when product data is available
        currency: currency,
      });
    }
  }, [params.productslug, trackProductView, currency]);

  return (
    <div className="min-h-screen bg-background">
      <ProductView />
    </div>
  );
}

export default ProductSlug;
