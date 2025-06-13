"use client";

import ProductCard from "@/components/cards/product-card";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/use-fetch";
import { Product } from "@/types/product";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderProductsList() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_SLIDER);

  if (loading) {
    return <Skeleton length={5} />;
  }

  if (error) {
    return (
      <SectionPlaceholder
        icon="error"
        title="Failed to load products"
        description="Something went wrong while loading this section. Please try again or check your connection."
        actionLabel="Retry"
        onAction={() => {}}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <SectionPlaceholder
        icon="package"
        title="لا يوجد منتجات"
        description="لا يوجد منتجات في هذا القسم بعد. "
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return (
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
              id={Number(product.id)}
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
  );
}
