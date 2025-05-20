import BlogCard from "../cards/blog-card";
import HeaderTitle from "../layout/header-title";

function SectionBlogs() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="احدث المقالات" titleRoute="كل المقالات" route="#" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}

export default SectionBlogs;
