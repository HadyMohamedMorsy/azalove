"use client";
import BlogFilters from "@/components/blog/filters";
import BlogCard from "@/components/cards/blog-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { useFilteredBlogs } from "@/hooks/use-filtered-blogs";
import type { Blog } from "@/types/blogs";
import Link from "next/link";
import { useState } from "react";

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [filters, setFilters] = useState({
    category: "",
    sortBy: "",
  });

  // Build filter parameters
  const filterParams = {
    categorySlug: filters.category || undefined,
    length: 10,
    start: (currentPage - 1) * 10,
  };

  const hasFilters = filters.category;

  const {
    data: filteredBlogs,
    loading: filteredLoading,
    error: filteredError,
    totalRecords: filteredTotalRecords,
  } = useFilteredBlogs(hasFilters ? filterParams : null);

  // Always call original blogs endpoint
  const {
    data: originalBlogs,
    loading: originalLoading,
    error: originalError,
    totalRecords: originalTotalRecords,
  } = useFetch<Blog[]>(API_ENDPOINTS_FROM_NEXT.BLOGS);

  // Use filtered data if filters are applied, otherwise use original data
  const blogs = hasFilters ? filteredBlogs : originalBlogs;
  const loading = hasFilters ? filteredLoading : originalLoading;
  const error = hasFilters ? filteredError : originalError;
  const totalRecords = hasFilters ? filteredTotalRecords : originalTotalRecords;

  const showBlogsSkeleton =
    hasFilters && (filteredLoading || (!filteredBlogs && !filteredError));

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
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <div className="blogs col-span-3">
              <Skeleton length={12} />
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
      <SectionPlaceholder
        icon="error"
        title="حدث خطأ في تحميل المقالات"
        description="نعتذر، حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً."
        actionLabel="إعادة التحميل"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!blogs || blogs.length === 0) {
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
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            <div className="blogs col-span-3">
              <div className="text-center py-16">
                <div className="text-gray-500 text-xl mb-4">
                  {hasFilters
                    ? "لا توجد مقالات تطابق الفلاتر المحددة"
                    : "لا توجد مقالات متاحة حاليًا"}
                </div>
                <p className="text-gray-400">
                  {hasFilters
                    ? "جرب تغيير الفلاتر أو المراجعة لاحقًا"
                    : "جرب المراجعة لاحقًا أو اتصل بنا للمساعدة"}
                </p>
              </div>
            </div>
            <div className="filters">
              <BlogFilters
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
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalRecords || 0);
  const resultsText =
    totalRecords && totalRecords > 0
      ? `عرض ${startItem}–${endItem} من ${totalRecords} نتيجة`
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
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          <div className="blogs col-span-3">
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
            <div className="bg-white rounded-lg overflow-hidden">
              {showBlogsSkeleton ? (
                <div className="p-4">
                  <Skeleton length={8} />
                </div>
              ) : (
                <div
                  className={`blogs ${
                    viewMode === "grid"
                      ? "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4"
                      : "space-y-4 p-4"
                  }`}
                >
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} viewMode={viewMode} />
                  ))}
                </div>
              )}
              {!showBlogsSkeleton && (
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
            <BlogFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
