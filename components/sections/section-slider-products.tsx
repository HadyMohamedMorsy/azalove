"use client";

import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/utilities.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../cards/product-card";
import HeaderTitle from "../layout/header-title";
import Skeleton from "../ui/skeleton";

const SectionSliderProducts = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_SLIDER);

  if (loading) {
    return (
      <div className="bg-[#fff6f6]">
        <section className="container py-10 relative px-4">
          <HeaderTitle title="عروض" titleRoute="كل المنتجات" route="#" />
          <Skeleton length={5} />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fff6f6]">
        <section className="container py-10 relative px-4">
          <HeaderTitle title="عروض" titleRoute="كل المنتجات" route="#" />
          <div className="text-red-500">Error loading products: {error}</div>
        </section>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#fff6f6]">
      <section className="container py-10 relative px-4">
        <HeaderTitle title="عروض" titleRoute="كل المنتجات" route="#" />
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          className="border-t border-l border-[#eae8e4]"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex items-center justify-center text-white text-2xl md:p-[2.5rem] p-[1.5rem] bg-white">
                <ProductCard
                  srcImage={product.cover}
                  name={product.name}
                  sku={product.sku}
                  categories={product.categories}
                  slug={product.slug}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default SectionSliderProducts;
