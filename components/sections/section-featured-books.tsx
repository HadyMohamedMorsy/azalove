import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/product";
import Skeleton from "../ui/skeleton";
import ProductGrid from "../products/product-grid";

function SectionFeaturedBooks() {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>("/api/products/is-featured");
  return (
    <section className="container py-10 px-4">
      <div className="flex flex-col justify-center items-center mb-5">
        <h3 className="text-3xl font-web mb-3">كتب مميزة</h3>
        <ul className="flex gap-5">
          <li>
            <a className="text-xl font-web">مميزه</a>
          </li>
          <li>
            <a className="text-xl font-web">للبيع</a>
          </li>
          <li>
            <a className="text-xl font-web">الأكثر مشاهدة</a>
          </li>
        </ul>
      </div>
      <div className="border-t border-l border-[#eae8e4]">
        {loading ? (
          <Skeleton length={3} />
        ) : error ? (
          <div className="text-red-500">Error loading products: {error}</div>
        ) : (
          <ProductGrid
            products={products || []}
            gridCols={{ lg: 5, md: 5, sm: 2, default: 1 }}
          />
        )}
      </div>
    </section>
  );
}

export default SectionFeaturedBooks;
