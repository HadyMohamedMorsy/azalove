import HeaderTitle from "../layout/header-title";
import SliderProductsList from "./slider-products-list/slider-products-list";

const SectionSliderProducts = () => {
  return (
    <div className="bg-cream-100">
      <section className="container py-10 relative px-4">
        <HeaderTitle title="عروض" />
        <SliderProductsList />
      </section>
    </div>
  );
};

export default SectionSliderProducts;
