"use client";

import FiltersProducts from "@/components/shop/filters";
import ProductHeader from "@/components/shop/product-header";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>التسويق</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="container py-10 px-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          <div className="products col-span-3">
            <ProductHeader />
            {children}
          </div>
          <div className="filters">
            <FiltersProducts />
          </div>
        </div>
      </section>
    </>
  );
}
