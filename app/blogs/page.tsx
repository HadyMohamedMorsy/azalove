"use client";
import BlogCard from "@/components/cards/blog-card";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Pagination } from "@heroui/pagination";
import SortProducts from "../../components/shop/sort";

function Blog() {
  return (
    <>
      <header className="container  px-6 py-4 border-t border-b border-[#eae8e4]">
        <Breadcrumbs>
          <BreadcrumbItem>الرئيسيه</BreadcrumbItem>
          <BreadcrumbItem>المقالات</BreadcrumbItem>
        </Breadcrumbs>
      </header>
      <section className="container py-10 px-4">
        <div className="flex justify-between items-center py-5">
          <span> عرض 1–12 من 89 نتيجة</span>
          <div className="flex gap-4">
            <SortProducts />
            <ShowProducts />
            <ButtonList />
          </div>
        </div>
        <div className="blogs grid md:grid-cols-3 grid-cols-1 gap-6 ">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination initialPage={1} total={300} />
        </div>
      </section>
    </>
  );
}

export default Blog;
