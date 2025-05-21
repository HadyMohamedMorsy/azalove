import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/useFetch";
import { Blog } from "@/types/blogs";
import BlogCard from "../cards/blog-card";
import HeaderTitle from "../layout/header-title";
import { Skeleton } from "../ui/skeleton";

function SectionBlogs() {
  const {
    data: blogs,
    loading,
    error,
  } = useFetch<Blog[]>(API_ENDPOINTS_FROM_NEXT.BLOGS);

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title="احدث المقالات" titleRoute="كل المقالات" route="#" />
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <Skeleton key={3} className="h-[300px] w-full" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title="احدث المقالات" titleRoute="كل المقالات" route="#" />
        <div className="text-center text-red-500">
          حدث خطأ في تحميل المقالات
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="احدث المقالات" titleRoute="كل المقالات" route="#" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </section>
  );
}

export default SectionBlogs;
