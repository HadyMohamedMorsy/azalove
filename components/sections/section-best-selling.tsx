"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/product";
import HeaderTitle from "../layout/header-title";
import Skeleton from "../ui/skeleton";
import ProductGrid from "../products/product-grid";

function SectionBestSelling() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_BEST_SELLING);

  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
      <div className="border-t border-l border-[#eae8e4]">
        {loading ? (
          <section className="container py-10 px-4">
            <HeaderTitle
              title="احدث التصنيفات"
              titleRoute="كل التصنيفات"
              route="#"
            />
            <Skeleton length={5} />
          </section>
        ) : error ? (
          <section className="container py-10 px-4">
            <HeaderTitle
              title="احدث التصنيفات"
              titleRoute="كل التصنيفات"
              route="#"
            />
            <div className="text-red-500">
              Error loading categories: {error}
            </div>
          </section>
        ) : (
          <ProductGrid products={products || []} />
        )}
      </div>
    </section>
  );
}

export default SectionBestSelling;
