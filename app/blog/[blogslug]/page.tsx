"use client";
import BlogCard from "@/components/blog/show/blog-card/blog-card";
import BlogPost from "@/components/blog/show/blog-post/blog-post";
import { useFetch } from "@/hooks/use-fetch";
import { RelatedBlogs, ShowBlog } from "@/types/blogs";
import { useParams } from "next/navigation";

const BlogView = () => {
  const params = useParams();
  const { data, loading, error } = useFetch<{
    blog: ShowBlog;
    relatedBlogs: RelatedBlogs[];
  }>(`/api/blog/by-slug/${params.blogslug}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Blog not found</div>
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
