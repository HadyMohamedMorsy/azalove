"use client";
import ProductCard from "@/components/cards/product-card";
import FiltersProducts from "@/components/shop/filters";
import ProductHeader from "@/components/shop/product-header";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import Link from "next/link";
import { useState } from "react";

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    sortBy: "",
  });

  const {
    data: products,
    loading,
    error,
    total,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.SHOP);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <>
        <header className="container px-6 py-4 border-t border-b border-amaranth-200 bg-gradient-to-r from-cream-50 to-amaranth-50">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 space-x-reverse">
              <li>
                <Link
                  href="/"
                  className="text-amaranth-600 hover:text-amaranth-700 transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <span className="text-amaranth-400">/</span>
                <span className="text-amaranth-700 font-medium">التسوق</span>
              </li>
            </ol>
          </nav>
        </header>
        <section className="container py-10 px-4">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <div className="products col-span-3">
              <div className="mb-6">
                <Skeleton length={1} containerClassName="h-16" />
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                <Skeleton length={8} />
              </div>
            </div>
            <div className="filters">
              <Skeleton length={3} containerClassName="space-y-4" />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <div className="container py-10 px-4">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">
            حدث خطأ أثناء تحميل المنتجات
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <header className="container px-6 py-4 border-t border-b border-amaranth-200 bg-gradient-to-r from-cream-50 to-amaranth-50">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 space-x-reverse">
              <li>
                <Link
                  href="/"
                  className="text-amaranth-600 hover:text-amaranth-700 transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <span className="text-amaranth-400">/</span>
                <span className="text-amaranth-700 font-medium">التسوق</span>
              </li>
            </ol>
          </nav>
        </header>
        <div className="container py-16 px-4">
          <div className="text-center">
            <div className="text-gray-500 text-xl mb-4">
              لا توجد منتجات متاحة حاليًا
            </div>
            <p className="text-gray-400">
              جرب المراجعة لاحقًا أو اتصل بنا للمساعدة
            </p>
          </div>
        </div>
      </>
    );
  }

  const totalPages = Math.ceil((total || 0) / 10); // Assuming 10 items per page

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
                الرئيسية
              </Link>
            </li>
            <li className="flex items-center space-x-2 space-x-reverse">
              <span className="text-amaranth-400">/</span>
              <span className="text-amaranth-700 font-medium">التسوق</span>
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
              totalItems={total || 0}
              totalPages={totalPages}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
            <div className="bg-white rounded-lg overflow-hidden">
              <div
                className={
                  viewMode === "grid"
                    ? "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4"
                    : "space-y-4 p-4"
                }
              >
                {products.map((product) => (
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
              {total !== undefined && totalPages > 1 && (
                <div className="p-6 border-t border-amaranth-100 bg-gradient-to-r from-cream-50 to-amaranth-50">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                            }
                          }}
                          className={
                            currentPage <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(totalPages, 7) },
                        (_, i) => {
                          let pageNumber;
                          if (totalPages <= 7) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 4) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 3) {
                            pageNumber = totalPages - 6 + i;
                          } else {
                            pageNumber = currentPage - 3 + i;
                          }

                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(
                                  e: React.MouseEvent<HTMLAnchorElement>
                                ) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNumber);
                                }}
                                isActive={currentPage === pageNumber}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                              setCurrentPage(currentPage + 1);
                            }
                          }}
                          className={
                            currentPage >= totalPages
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
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
