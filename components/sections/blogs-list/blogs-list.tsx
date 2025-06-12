"use client";

import BlogCard from "@/components/cards/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { Blog } from "@/types/blogs";

export default function BlogsList() {
  const {
    data: blogs,
    loading,
    error,
  } = useFetch<Blog[]>(API_ENDPOINTS_FROM_NEXT.BLOGS_HOME);

  if (loading) {
    return (
      <Skeleton
        length={3}
        className="h-[300px] w-full"
        containerClassName="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">حدث خطأ في تحميل المقالات</div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
}
