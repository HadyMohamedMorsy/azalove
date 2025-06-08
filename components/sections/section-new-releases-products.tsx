"use client";

import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import PromoBlock from "../blocks/promo-block";
import HeaderTitle from "../layout/header-title";
import ProductGrid from "../products/product-grid";
import Skeleton from "../ui/skeleton";

function SectionNewReleases() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_IS_NEW);

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
          <div className="border-b border-[#eae8e4] bg-[#fff6f6] lg:px-[3.5rem] sm:px-[1.5rem] px-[1rem]">
            <div className="flex flex-col items-center justify-center h-full">
              <PromoBlock />
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-1">
            <Skeleton length={3} />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
          <div className="border-b border-[#eae8e4] bg-[#fff6f6] lg:px-[3.5rem] sm:px-[1.5rem] px-[1rem]">
            <div className="flex flex-col items-center justify-center h-full">
              <PromoBlock />
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-1">
            <div className="text-red-500">Error loading products: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="container py-10 px-4">
      <HeaderTitle
        title=" المنتجات الجديده"
        titleRoute="كل المنتجات"
        route="#"
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        <div className="flex flex-col items-center justify-center h-full">
          <PromoBlock />
        </div>
        <div className="lg:col-span-3 md:col-span-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}

export default SectionNewReleases;
