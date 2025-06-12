"use client";
import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";
import Link from "next/link";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="container px-6 py-4 border-t border-b border-[#eae8e4]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسيه
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-700">المدونة</span>
            </li>
          </ol>
        </nav>
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
