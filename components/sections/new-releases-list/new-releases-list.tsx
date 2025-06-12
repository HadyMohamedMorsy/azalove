"use client";

import ProductGrid from "@/components/products/product-grid";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";

export default function NewReleasesList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_IS_NEW);

  if (loading) {
    return <Skeleton length={3} />;
  }

  if (error) {
    return <div className="text-red-500">Error loading products: {error}</div>;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return <ProductGrid products={products} />;
}
