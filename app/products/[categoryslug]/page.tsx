"use client";
import ProductCard from "@/components/cards/product-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import Skeleton from "@/components/ui/skeleton";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useState } from "react";

function ProductsByCategory() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    loading,
    error,
    totalRecords,
  } = useFetch<Product[]>(`/api/products/${params.categoryslug}`);

  if (loading) {
    return <Skeleton length={12} />;
  }

  if (error) {
    return (
      <div className="container py-10 px-4">
        <SectionPlaceholder
          icon="error"
          title="خطأ في تحميل المنتجات"
          description="واجهنا مشكلة أثناء تحميل المنتجات. يرجى إعادة تحديث الصفحة أو التواصل مع الدعم الفني إذا استمرت المشكلة."
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container py-10 px-4">
        <SectionPlaceholder
          icon="package"
          title="لا توجد منتجات متاحة"
          description="لا توجد منتجات في هذا القسم في الوقت الحالي. تحقق مرة أخرى لاحقاً أو استكشف الأقسام الأخرى لاكتشاف أجمل قصص الحب."
        />
      </div>
    );
  }

  const totalPages = Math.ceil((totalRecords || 0) / 10);

  return (
    <div className="container py-10 px-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={Number(product.id)}
            srcImage={product.cover}
            name={product.name}
            sku={product.sku}
            categories={product.categories}
            slug={product.slug}
          />
        ))}
      </div>
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showPagination={!!totalRecords}
        className="mt-4"
      />
    </div>
  );
}

export default ProductsByCategory;
