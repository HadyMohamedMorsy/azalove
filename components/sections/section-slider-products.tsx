"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/utilities.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderTitle from "../layout/header-title";

const SectionSliderProducts = () => {
  const slides = [
    { id: 1, title: "Slide 1", image: "/media/22-200x327.jpg" },
    { id: 2, title: "Slide 2", image: "/media/22-200x327.jpg" },
    { id: 3, title: "Slide 3", image: "/media/22-200x327.jpg" },
    { id: 4, title: "Slide 4", image: "/media/22-200x327.jpg" },
    { id: 5, title: "Slide 5", image: "/media/22-200x327.jpg" },
  ];

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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex items-center justify-center text-white text-2xl md:p-[2.5rem] p-[1.5rem] border-r border-b border-[#eae8e4] bg-white">
                <div className="flex gap-5">
                  <div className="image-wrapper">
                    <Image
                      src={slide.image}
                      className="object-contain"
                      alt="logo"
                      width={200}
                      height={327}
                    />
                  </div>
                  <div className="content text-black">
                    <span className="categort__name text-[#f75454] text-xs uppercase">
                      غلاف فني
                    </span>
                    <h2 className="font-web  mb-1 line-clamp-2">
                      <a href="#" className="hover:text-blue-500 text-xl">
                        الإيمان المكسور: داخل كلمة الإيمان…
                      </a>
                    </h2>
                    <p className="author__name text-gray-700 text-xs">
                      دكتور حسن
                    </p>
                    <span className="text-base font-semibold mt-3 inline-flex">
                      <span>
                        <bdi>
                          <span>جنيه</span>
                          29.59
                        </bdi>
                      </span>
                      –
                      <span>
                        <bdi>
                          <span>جنيه</span>
                          59.95
                        </bdi>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default SectionSliderProducts;
