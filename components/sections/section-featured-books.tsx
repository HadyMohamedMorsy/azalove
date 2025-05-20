import ProductCard from "../cards/product-card";

function SectionFeaturedBooks() {
  return (
    <section className="container py-10 px-4">
      <div className="flex flex-col justify-center items-center mb-5">
        <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
        <ul className="flex gap-5">
          <li>
            <a className="text-xl font-web">مميزه</a>
          </li>
          <li>
            <a className="text-xl font-web">للبيع</a>
          </li>
          <li>
            <a className="text-xl font-web">الأكثر مشاهدة</a>
          </li>
        </ul>
      </div>
      <div className="border-t border-l border-[#eae8e4]">
        <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 grid-cols-1">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

export default SectionFeaturedBooks;
