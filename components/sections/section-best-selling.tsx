import ProductCard from "../cards/product-card";
import HeaderTitle from "../layout/header-title";

function SectionBestSelling() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
      <div className="border-t border-l border-[#eae8e4]">
        <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-2 grid-cols-1">
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

export default SectionBestSelling;
