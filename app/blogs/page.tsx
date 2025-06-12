"use client";
import BlogCard from "@/components/cards/blog-card";
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
import { useState } from "react";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: blogs,
    loading,
    error,
    total,
  } = useFetch<Blog[]>(API_ENDPOINTS_FROM_NEXT.BLOGS);

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

  return (
    <>
      <div className="blogs grid md:grid-cols-3 grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
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
    </>
  );
}

export default Blog;
