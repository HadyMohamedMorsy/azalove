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
    return <Skeleton length={12} />;
  }

  if (error) {
    return <div className="text-red-500">Error loading products: {error}</div>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 border-t border-l border-[#eae8e4]">
        <div className="col-span-full p-8 text-center text-gray-500">
          No products available at the moment.
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((total || 0) / 10); // Assuming 10 items per page

  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسيه
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">التسويق</span>
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
            <div>
              <div
                className={
                  viewMode === "grid"
                    ? "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1"
                    : "space-y-4"
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
              {total !== undefined && (
                <div className="mt-4 flex justify-center">
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
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(
                                e: React.MouseEvent<HTMLAnchorElement>
                              ) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
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
