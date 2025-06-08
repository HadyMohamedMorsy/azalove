"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import HeaderTitle from "../layout/header-title";
import ProductGrid from "../products/product-grid";
import Skeleton from "../ui/skeleton";

function SectionBestSelling() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_BEST_SELLING);

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
        <Skeleton length={5} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
        <div className="text-red-500">Error loading products: {error}</div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
      <ProductGrid products={products} />
    </section>
  );
}

export default SectionBestSelling;
