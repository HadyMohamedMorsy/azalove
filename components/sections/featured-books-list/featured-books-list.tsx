"use client";

import ProductGrid from "@/components/products/product-grid";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";

export default function FeaturedBooksList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_IS_FEATURED);

  if (loading) {
    return (
      <div className="border-t border-l border-[#eae8e4]">
        <Skeleton length={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-l border-[#eae8e4]">
        <div className="text-red-500">Error loading products: {error}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <ProductGrid
      products={products}
      gridCols={{ lg: 5, md: 5, sm: 2, default: 1 }}
    />
  );
}
