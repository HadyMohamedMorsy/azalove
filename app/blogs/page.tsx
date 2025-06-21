"use client";
import BlogCard from "@/components/cards/blog-card";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";
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
import useFetch from "@/hooks/use-fetch";
import type { Blog } from "@/types/blogs";
import Link from "next/link";
import { useState } from "react";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const {
    data: blogs,
    loading,
    error,
    total,
  } = useFetch<Blog[]>(API_ENDPOINTS_FROM_NEXT.BLOGS);

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  if (loading) {
    return <Skeleton length={12} />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading blogs: {error}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="blogs grid md:grid-cols-3 grid-cols-1 gap-6">
        <div className="col-span-full p-8 text-center text-gray-500">
          لا توجد مقالات متاحة في الوقت الحالي
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((total || 0) / 10); // Assuming 10 items per page
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, total || 0);
  const resultsText =
    total && total > 0
      ? `عرض ${startItem}–${endItem} من ${total} نتيجة`
      : "لا توجد نتائج";

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
              <span className="text-gray-700">المدونة</span>
            </li>
          </ol>
        </nav>
      </header>
      <section className="container py-10 px-4">
        <div className="flex justify-between items-center py-5">
          <span>{resultsText}</span>
          <div className="flex gap-4">
            <SortProducts />
            <ShowProducts />
            <ButtonList
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
          </div>
        </div>
        <div
          className={`blogs ${
            viewMode === "grid"
              ? "grid md:grid-cols-3 grid-cols-1 gap-6"
              : "space-y-6"
          }`}
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} viewMode={viewMode} />
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
      </section>
    </>
  );
}

export default Blog;
