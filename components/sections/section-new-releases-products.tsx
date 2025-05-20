import Image from "next/image";
import ProductCard from "../cards/product-card";
import HeaderTitle from "../layout/header-title";

function SectionNewReleases() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle
        title=" المنتجات الجديده"
        titleRoute="كل المنتجات"
        route="#"
      />
      <div className="border-t border-r border-l border-[#eae8e4]">
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="border-b border-[#eae8e4] bg-[#fff6f6] lg:px-[3.5rem] sm:px-[1.5rem] px-[1rem]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="image-wrapper">
                <Image
                  src="/media/offer.png"
                  className="object-contain"
                  alt="logo"
                  width={345}
                  height={282}
                />
              </div>
              <div className="content">
                <div className="flex flex-col gap-2">
                  <span className="font-web lg:text-[2rem] text-xl">
                    احصل على المزيد
                  </span>
                  <span className="lg:text-[2ز5rem] text-2xl text-[#f75454] font-semibold">
                    تخفيضات -25%
                  </span>
                  <span className="lg:text-[1rem] text-xl text-gray-500 font-semibold">
                    عند الطلب بقيمة 500 جنيه مصري أو أكثر
                  </span>

                  <button className="btn text-white bg-[#fa5e5d] capitalize mt-4 w-[120px]">
                    تسوق الان
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionNewReleases;
