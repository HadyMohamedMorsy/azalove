"use client";
import ProductCard from "@/components/cards/product-card";
import TabsDetails from "@/components/single-product/tabs-details";
import TabsFormat from "@/components/single-product/tabs-format";
import Rating from "@/components/ui/rating";
import { Button } from "@heroui/button";
import { NumberInput } from "@heroui/number-input";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
function ProductSlug() {
  return (
    <>
      <div className="container  px-6 py-4 border-t border-b border-[#eae8e4]"></div>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <ImageSlider />
          <div className="border-r border-[#eae8e4]">
            <div className="p-[30px]">
              <span className="text-[#f75454] text-xs uppercase">غلاف فني</span>
              <h2 className="font-web  mb-1 line-clamp-2 text-3xl">
                <a href="#" className="hover:text-blue-500">
                  الإيمان المكسور: داخل كلمة الإيمان…
                </a>
                <div className="flex gap-4">
                  <div className="rating">
                    <div className="flex items-center mt-2">
                      <Rating />
                      <span className="mr-3 inline-block text-base">(2)</span>
                      <span className="mr-3 inline-block text-base">
                        By (author) Anna Banks
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-semibold mt-3 inline-flex">
                        <span>
                          <bdi>
                            <span className="mx-2">جنيه</span>
                            29.59
                          </bdi>
                        </span>
                        –
                        <span>
                          <bdi>
                            <span className="mx-2">جنيه</span>
                            59.95
                          </bdi>
                        </span>
                      </span>

                      <Button color="primary" variant="light">
                        أضف إلى قائمة الرغبات
                        <svg
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          fill="none"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </Button>
                    </div>

                    <p className="description text-base my-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Excepteur sint occaecat.
                    </p>

                    <div className="mb-2 text-lg">
                      <span className="font-semibold">تنسيق الكتاب :</span>
                      <span className="ml-2 text-gray-600">اختر خيارًا</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                      <TabsFormat />
                    </div>
                    <div className="border-t border-[#eae8e4] mt-3">
                      <div className="flex items-center gap-4 mt-4">
                        <Button
                          startContent={<PlusIcon />}
                          color="primary"
                          variant="bordered"
                        >
                          اضف إلى السلة
                        </Button>
                        <NumberInput className="max-w-xs" placeholder="العدد" />
                      </div>
                    </div>
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[#eae8e4]">
        <div className="container">
          <TabsDetails />
        </div>
      </div>
      <div className="mb-4">
        <div className="container">
          <h3 className="text-xl mb-4 font-bold">المنتجات ذات الصلة</h3>
          <div className="border-t border-l  border-[#f8e6c0]">
            <ProductsRelatedSlider />
          </div>
        </div>
      </div>
    </>
  );
}

export const PlusIcon = () => {
  return (
    <svg
      fill="#000000"
      width={10}
      height={10}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.402 45.402"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path>
        </g>
      </g>
    </svg>
  );
};

const ImageSlider = () => {
  const slides = [
    { id: 1, image: "/media/22-200x327.jpg" },
    { id: 2, image: "/media/22-200x327.jpg" },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={false}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="flex items-center justify-center  md:p-[2.5rem] p-[1.5rem]  border-[#eae8e4] bg-white">
            <div className="flex gap-5">
              <div className="image-wrapper">
                <Image
                  src={slide.image}
                  className="object-contain"
                  alt="azalove"
                  width={200}
                  height={327}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ProductsRelatedSlider = () => {
  const slides = [
    { id: 1, image: "/media/22-200x327.jpg" },
    { id: 2, image: "/media/22-200x327.jpg" },
    { id: 3, image: "/media/22-200x327.jpg" },
    { id: 4, image: "/media/22-200x327.jpg" },
    { id: 5, image: "/media/22-200x327.jpg" },
    { id: 6, image: "/media/22-200x327.jpg" },
    { id: 7, image: "/media/22-200x327.jpg" },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={false}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlug;
