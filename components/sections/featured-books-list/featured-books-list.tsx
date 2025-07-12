"use client";

import SectionPlaceholder from "@/components/placeholder/section-placeholder";
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
      <SectionPlaceholder
        icon="error"
        title="فشل في تحميل المنتجات"
        description="حدث خطأ أثناء تحميل هذا القسم. يرجى المحاولة مرة أخرى أو التحقق من الاتصال."
        actionLabel="إعادة المحاولة"
        onAction={() => {}}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <SectionPlaceholder
        icon="package"
        title="لا يوجد منتجات"
        description="لا يوجد منتجات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return (
    <ProductGrid
      products={products}
      gridCols={{ lg: 5, md: 5, sm: 2, default: 1 }}
    />
  );
}
