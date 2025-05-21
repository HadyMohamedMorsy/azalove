import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/product";
import Image from "next/image";
import HeaderTitle from "../layout/header-title";
import Skeleton from "../ui/skeleton";
import ProductGrid from "../products/product-grid";

function SectionNewReleases() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(API_ENDPOINTS_FROM_NEXT.PRODUCTS_IS_NEW);
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
            {loading ? (
              <Skeleton length={3} />
            ) : error ? (
              <div className="text-red-500">
                Error loading products: {error}
              </div>
            ) : (
              <ProductGrid
                products={products || []}
                gridCols={{ lg: 3, md: 2, sm: 2, default: 1 }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionNewReleases;
