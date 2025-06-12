"use client";

import HeaderTitle from "../layout/header-title";
import SliderProductsList from "./slider-products-list/slider-products-list";

const SectionSliderProducts = () => {
  return (
    <div className="bg-[#fff6f6]">
      <section className="container py-10 relative px-4">
        <HeaderTitle title="عروض" titleRoute="كل المنتجات" route="#" />
        <SliderProductsList />
      </section>
    </div>
  );
};

export default SectionSliderProducts;
