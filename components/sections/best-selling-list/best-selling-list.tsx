"use client";

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
    return <div className="text-red-500">{error}</div>;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return <ProductGrid products={products} />;
}
