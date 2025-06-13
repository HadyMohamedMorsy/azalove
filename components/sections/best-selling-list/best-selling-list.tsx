"use client";

import EmptyState from "@/components/blocks/empty-state";
import ProductGrid from "@/components/products/product-grid";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";

export default function BestSellingList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_BEST_SELLING);

  if (loading) {
    return <Skeleton length={5} />;
  }

  if (error) {
    return (
      <EmptyState
        icon="error"
        title="Failed to load products"
        description="Something went wrong while loading this section. Please try again or check your connection."
        actionLabel="Retry"
        onAction={() => {}}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="لا يوجد منتجات"
        description="لا يوجد منتجات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return <ProductGrid products={products} />;
}
