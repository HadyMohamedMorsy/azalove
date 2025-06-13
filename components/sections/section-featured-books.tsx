import HeaderTitle from "../layout/header-title";
import FeaturedBooksList from "./featured-books-list/featured-books-list";

function SectionFeaturedBooks() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="كتب مميزة" />
      <FeaturedBooksList />
    </section>
  );
}

export default SectionFeaturedBooks;
