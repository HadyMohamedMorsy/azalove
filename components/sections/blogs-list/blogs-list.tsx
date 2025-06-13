"use client";

import BlogCard from "@/components/cards/blog-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
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

  if (error) {
    return (
      <SectionPlaceholder
        icon="error"
        title="Failed to load blogs"
        description="Something went wrong while loading this section. Please try again or check your connection."
        actionLabel="Retry"
        onAction={() => {}}
      />
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <SectionPlaceholder
        icon="package"
        title="لا يوجد مقالات"
        description="لا يوجد مقالات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
}
