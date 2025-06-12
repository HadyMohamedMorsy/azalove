import FeaturedBooksList from "./featured-books-list/featured-books-list";

function SectionFeaturedBooks() {
  return (
    <section className="container py-10 px-4">
      <div className="flex flex-col justify-center items-center mb-5">
        <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
      </div>
      <FeaturedBooksList />
    </section>
  );
}

export default SectionFeaturedBooks;
