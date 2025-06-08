"use client";
import BlogCard from "@/components/cards/blog-card";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import type { Blog } from "@/types/blogs";
import { Pagination } from "@heroui/pagination";

function Blog() {
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

  return (
    <>
      <div className="blogs grid md:grid-cols-3 grid-cols-1 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {total !== undefined && (
        <div className="mt-4 flex justify-center">
          <Pagination initialPage={1} total={total} />
        </div>
      )}
    </>
  );
}

export default Blog;
