"use client";
import BlogCard from "@/components/blog/show/blog-card/blog-card";
import BlogPost from "@/components/blog/show/blog-post/blog-post";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/use-fetch";
import { useIncrementViews } from "@/hooks/use-increment-views";
import { RelatedBlogs, ShowBlog } from "@/types/blogs";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const BlogView = () => {
  const params = useParams();
  const { incrementViews } = useIncrementViews();
  const hasIncremented = useRef(false);

  const { data, loading, error } = useFetch<{
    blog: ShowBlog;
    relatedBlogs: RelatedBlogs[];
  }>(`/api/blog/by-slug/${params.blogslug}`);

  // Increment views only once when component mounts
  useEffect(() => {
    if (params.blogslug && !hasIncremented.current) {
      hasIncremented.current = true;
      incrementViews(params.blogslug as string);
    }
  }, [params.blogslug, incrementViews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2">
              <Skeleton length={1} containerClassName="space-y-6" />
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <div>
                <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
                <Skeleton length={3} containerClassName="space-y-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SectionPlaceholder
          icon="error"
          title="Blog not found"
          description="The blog post you're looking for doesn't exist or has been removed."
          actionLabel="Go back"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const { blog, relatedBlogs } = data;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogPost {...blog} />
          </div>

          {/* Sidebar */}
          {relatedBlogs.length > 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Related Posts
                </h2>
                <div className="space-y-4">
                  {relatedBlogs.map((post: RelatedBlogs, index: number) => (
                    <BlogCard
                      key={index}
                      title={post.title}
                      shortDescription={post.shortDescription || ""}
                      createdAt={post.createdAt}
                      thumb={post.thumb || undefined}
                      onClick={() => console.log(`Clicked on: ${post.title}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
