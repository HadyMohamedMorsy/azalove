"use client";
import BlogCard from "@/components/cards/blog-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";
import Skeleton from "@/components/ui/skeleton";
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import { useFetch } from "@/hooks/use-fetch";
import { Blog } from "@/types/blogs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

function BlogsByCategory() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const {
    data: blogs,
    loading,
    error,
    totalRecords,
  } = useFetch<Blog[]>(`/api/blogs/${params.categoryslug}`);

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  if (loading) {
    return <Skeleton length={12} />;
  }

  if (error) {
    return (
      <div className="container py-10 px-4">
        <SectionPlaceholder
          icon="error"
          title="خطأ في تحميل المقالات"
          description="واجهنا مشكلة أثناء تحميل المقالات. يرجى إعادة تحديث الصفحة أو التواصل مع الدعم الفني إذا استمرت المشكلة."
        />
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="container py-10 px-4">
        <SectionPlaceholder
          icon="search"
          title="لا توجد مقالات متاحة"
          description="لا توجد مقالات في هذا القسم في الوقت الحالي. تحقق مرة أخرى لاحقاً أو استكشف الأقسام الأخرى لاكتشاف المزيد من المحتوى المفيد."
        />
      </div>
    );
  }

  const totalPages = Math.ceil((totalRecords || 0) / 6);
  const startItem = (currentPage - 1) * 6 + 1;
  const endItem = Math.min(currentPage * 6, totalRecords || 0);
  const resultsText =
    totalRecords && totalRecords > 0
      ? `عرض ${startItem}–${endItem} من ${totalRecords} نتيجة`
      : "لا توجد نتائج";

  // Get category name from first blog if available
  const categoryName = blogs[0]?.categories?.find(
    (cat) => cat.slug === params.categoryslug
  )?.name;

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
              <Link href="/blogs" className="text-gray-500 hover:text-gray-700">
                المدونة
              </Link>
            </li>
            {categoryName && (
              <li className="flex items-center space-x-2">
                <span className="text-gray-500">/</span>
                <span className="text-gray-700">{categoryName}</span>
              </li>
            )}
          </ol>
        </nav>
      </header>

      <section className="container py-10 px-4">
        {categoryName && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              مقالات {categoryName}
            </h1>
          </div>
        )}

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

        <PaginationWrapper
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showPagination={!!(totalRecords !== undefined && totalPages > 1)}
          className="mt-4"
        />
      </section>
    </>
  );
}

export default BlogsByCategory;
