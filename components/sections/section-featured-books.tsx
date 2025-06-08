"use client";

import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import ProductGrid from "../products/product-grid";
import Skeleton from "../ui/skeleton";

function SectionFeaturedBooks() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_IS_FEATURED);

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <div className="flex flex-col justify-center items-center mb-5">
          <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
        </div>
        <div className="border-t border-l border-[#eae8e4]">
          <Skeleton length={3} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <div className="flex flex-col justify-center items-center mb-5">
          <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
        </div>
        <div className="border-t border-l border-[#eae8e4]">
          <div className="text-red-500">Error loading products: {error}</div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="container py-10 px-4">
      <div className="flex flex-col justify-center items-center mb-5">
        <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
      </div>
      <ProductGrid
        products={products}
        gridCols={{ lg: 5, md: 5, sm: 2, default: 1 }}
      />
    </section>
  );
}

export default SectionFeaturedBooks;
