"use client";
import ProductCard from "@/components/cards/product-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/use-fetch";
import { useTranslation } from "@/hooks/use-translation";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { useState } from "react";

function ProductsByCategory() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
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
          title={t("products.error.title")}
          description={t("products.error.description")}
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container py-10 px-4">
        <SectionPlaceholder
          icon="package"
          title={t("products.noProducts.title")}
          description={t("products.noProducts.description")}
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
