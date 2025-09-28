"use client";

import CategoryCard from "@/components/cards/category-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Custom styles for Swiper navigation
const swiperStyles = `
  .categories-swiper {
    padding: 0 60px;
  }
  
  .categories-swiper .swiper-button-next,
  .categories-swiper .swiper-button-prev {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border: 2px solid #e9ecef;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-top: -25px;
  }
  
  .categories-swiper .swiper-button-next:hover,
  .categories-swiper .swiper-button-prev:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    border-color: #dee2e6;
  }
  
  .categories-swiper .swiper-button-next:active,
  .categories-swiper .swiper-button-prev:active {
    transform: scale(0.95);
  }
  
  .categories-swiper .swiper-button-next::after,
  .categories-swiper .swiper-button-prev::after {
    font-size: 18px;
    font-weight: bold;
    color: #6c757d;
    transition: color 0.3s ease;
  }
  
  .categories-swiper .swiper-button-next:hover::after,
  .categories-swiper .swiper-button-prev:hover::after {
    color: #fa5e5d;
  }
  
  .categories-swiper .swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: scale(0.9);
  }
  
  .categories-swiper .swiper-button-disabled:hover {
    transform: scale(0.9);
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  .categories-swiper .swiper-slide {
    height: auto;
  }
  
  .categories-swiper .swiper-slide-active {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
  
  .swiper-button-prev-custom,
  .swiper-button-next-custom {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .swiper-button-prev-custom:hover,
  .swiper-button-next-custom:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: scale(1.1);
  }
  
  .swiper-button-prev-custom:active,
  .swiper-button-next-custom:active {
    transform: scale(0.95);
  }
`;

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

function CategoriesList() {
  const { data, loading, error } = useFetch<Category[]>(
    API_ENDPOINTS_FROM_NEXT.CATEGORIES
  );

  if (loading) {
    return <Skeleton length={5} />;
  }

  if (error) {
    return (
      <SectionPlaceholder
        icon="error"
        title="فشل في تحميل الفئات"
        description="حدث خطأ أثناء تحميل هذا القسم. يرجى المحاولة مرة أخرى أو التحقق من الاتصال."
        actionLabel="إعادة المحاولة"
        onAction={() => {}}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <SectionPlaceholder
        icon="package"
        title="لا يوجد فئات"
        description="لا يوجد فئات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="w-full relative">
      <style jsx>{swiperStyles}</style>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
        }}
        className="categories-swiper"
      >
        {data?.map((category: Category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard 
              bgColor="#fff5e9" 
              title={category.name} 
              image={category.image}
              slug={category.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:from-gray-50 hover:to-gray-100 transition-all duration-300 border border-gray-200 group">
        <svg className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:from-gray-50 hover:to-gray-100 transition-all duration-300 border border-gray-200 group">
        <svg className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default CategoriesList;
