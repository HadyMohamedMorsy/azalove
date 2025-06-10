"use client";
import ProductCard from "@/components/cards/product-card";
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
import { useState } from "react";

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    loading,
    error,
    total,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.SHOP);

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
    <div>
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
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
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
  );
}

export default Shop;
