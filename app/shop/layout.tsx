"use client";

import FiltersProducts from "@/components/shop/filters";
import ProductHeader from "@/components/shop/product-header";
import Link from "next/link";

export default function ShopLayout({
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
              <span className="text-gray-700">التسويق</span>
            </li>
          </ol>
        </nav>
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
