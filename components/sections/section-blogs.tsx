import HeaderTitle from "../layout/header-title";
import BlogsList from "./blogs-list/blogs-list";

function SectionBlogs() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="احدث المقالات" titleRoute="كل المقالات" route="#" />
      <BlogsList />
    </section>
  );
}

export default SectionBlogs;
