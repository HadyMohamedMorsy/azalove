"use client";
import ProductCard from "@/components/cards/product-card";
import FiltersProducts from "@/components/shop/filters";
import ProductHeader from "@/components/shop/product-header";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useFilteredProducts } from "@/hooks/use-filtered-products";
import { useTranslation } from "@/hooks/use-translation";
import { Product } from "@/types/product";
import Link from "next/link";
import { useMemo, useState } from "react";

function Shop() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    sortBy: "",
  });

  // Parse price range to min and max values
  const priceRange = useMemo(() => {
    if (!filters.priceRange)
      return { minPrice: undefined, maxPrice: undefined };

    const [min, max] = filters.priceRange.split("-").map(Number);
    return {
      minPrice: isNaN(min) ? undefined : min,
      maxPrice: isNaN(max) ? undefined : max,
    };
  }, [filters.priceRange]);

  const filterParams = {
    categorySlug: filters.category || undefined,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
    length: 10,
    start: (currentPage - 1) * 10,
  };

  const hasFilters = filters.category || filters.priceRange;

  const {
    data: filteredProducts,
    loading: filteredLoading,
    error: filteredError,
    totalRecords: filteredTotalRecords,
  } = useFilteredProducts(hasFilters ? filterParams : null);

  // Always call original shop endpoint
  const {
    data: originalProducts,
    loading: originalLoading,
    error: originalError,
    totalRecords: originalTotalRecords,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.SHOP);

  // Use filtered data if filters are applied, otherwise use original data
  const products = hasFilters ? filteredProducts : originalProducts;
  const loading = hasFilters ? filteredLoading : originalLoading;
  const error = hasFilters ? filteredError : originalError;
  const totalRecords = hasFilters ? filteredTotalRecords : originalTotalRecords;

  const showProductsSkeleton =
    hasFilters && (filteredLoading || (!filteredProducts && !filteredError));

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  if (error) {
    return (
      <div className="container py-10 px-4">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">
            {t("error.loading_products")}
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <header className="container px-6 py-4 border-t border-b border-amaranth-200 bg-cream-100">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 space-x-reverse">
              <li>
                <Link
                  href="/"
                  className="text-amaranth-600 hover:text-amaranth-700 transition-colors"
                >
                  {t("common.home")}
                </Link>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <span className="text-amaranth-400">/</span>
                <span className="text-amaranth-700 font-medium">
                  {t("common.shop")}
                </span>
              </li>
            </ol>
          </nav>
        </header>
        <section className="container py-10 px-4">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <div className="products col-span-3">
              <div className="text-center py-16">
                <div className="text-gray-500 text-xl mb-4">
                  {hasFilters
                    ? t("shop.no_products_match_filters")
                    : t("shop.no_products_available")}
                </div>
                <p className="text-gray-400">
                  {hasFilters
                    ? t("shop.try_changing_filters")
                    : t("shop.try_later_or_contact")}
                </p>
              </div>
            </div>
            <div className="filters">
              <FiltersProducts
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  const totalPages = Math.ceil((totalRecords || 0) / 10); // Assuming 10 items per page

  return (
    <>
      <header className="container px-6 py-4 border-t border-b ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 space-x-reverse">
            <li>
              <Link
                href="/"
                className="text-amaranth-600 hover:text-amaranth-700 transition-colors"
              >
                {t("common.home")}
              </Link>
            </li>
            <li className="flex items-center space-x-2 space-x-reverse">
              <span className="text-amaranth-400">/</span>
              <span className="text-amaranth-700 font-medium">
                {t("common.shop")}
              </span>
            </li>
          </ol>
        </nav>
      </header>
      <section className="container py-10 px-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          <div className="products col-span-3">
            <ProductHeader
              currentPage={currentPage}
              itemsPerPage={10}
              totalItems={totalRecords || 0}
              totalPages={totalPages}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
            <div className="bg-white rounded-lg overflow-hidden">
              {showProductsSkeleton ? (
                <div className="p-4">
                  <Skeleton length={8} />
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4"
                      : "space-y-4 p-4"
                  }
                >
                  {products &&
                    products.length > 0 &&
                    products.map((product: Product) => (
                      <ProductCard
                        key={product.id}
                        id={Number(product.id)}
                        srcImage={product.cover}
                        name={product.name}
                        sku={product.sku}
                        categories={product.categories}
                        slug={product.slug}
                        viewMode={viewMode}
                      />
                    ))}
                </div>
              )}
              {!showProductsSkeleton && (
                <PaginationWrapper
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  showPagination={!!(totalRecords && totalPages > 1)}
                />
              )}
            </div>
          </div>
          <div className="filters">
            <FiltersProducts
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
