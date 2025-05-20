"use client";
import ProductCard from "@/components/cards/product-card";
import ButtonList from "@/components/shop/button-list";
import FiltersProducts from "@/components/shop/filters";
import ShowProducts from "@/components/shop/show";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Pagination } from "@heroui/pagination";
import SortProducts from "../../components/shop/sort";

function Shop() {
  return (
    <>
      <header className="container  px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>التسويق</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="container py-10 px-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          <div className="products col-span-3">
            <div className="flex justify-between items-center py-5">
              <span> عرض 1–12 من 89 نتيجة</span>
              <div className="flex gap-4">
                <SortProducts />
                <ShowProducts />
                <ButtonList />
              </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 border-t border-l border-[#eae8e4]">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
            <div className="mt-4 flex justify-center">
              <Pagination initialPage={1} total={300} />
            </div>
          </div>
          <div className="filters">
            <FiltersProducts />
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
