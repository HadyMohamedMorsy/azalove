"use client";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>المدونة</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="container py-10 px-4">
        <div className="flex justify-between items-center py-5">
          <span>عرض النتائج</span>
          <div className="flex gap-4">
            <SortProducts />
            <ShowProducts />
            <ButtonList />
          </div>
        </div>
        {children}
      </section>
    </>
  );
}
