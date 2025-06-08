"use client";
import { useFetch } from "@/hooks/use-fetch";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Slider } from "@heroui/slider";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FeaturedProduct {
  id: string;
  title: string;
  thumb: string;
  sku: {
    price: number;
  };
}

interface CategoryResponse {
  message: string;
  statusCode: number;
  data: {
    data: Category[];
  };
  timestamp: string;
}

interface FiltersData {
  categories: CategoryResponse;
  featuredProducts: FeaturedProduct[];
}

const FiltersProducts = () => {
  const {
    data: response,
    loading,
    error,
  } = useFetch<FiltersData>("/api/filters");

  if (loading) {
    return <div>Loading filters...</div>;
  }

  if (error || !response) {
    return <div>Error loading filters</div>;
  }

  const { categories, featuredProducts } = response;
  const categoryItems = categories.data.data;

  return (
    <>
      <div className="space-y-4">
        <div className="px-2 caategory-box border border-[#eae8e4]">
          <Accordion>
            <AccordionItem key="categories" aria-label="الفئات" title="الفئات">
              <ul className="m-0 p-0 flex flex-col gap-4">
                {categoryItems.map((category) => (
                  <li
                    key={category.id}
                    className="flex justify-between items-center"
                  >
                    <a href={`/shop?category=${category.slug}`}>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-2 caategory-box border border-[#eae8e4]">
          <Accordion>
            <AccordionItem
              key="price"
              aria-label="تصفية حسب السعر"
              title="تصفية حسب السعر"
            >
              <Slider
                className="max-w-md"
                defaultValue={[100, 500]}
                formatOptions={{ style: "currency", currency: "USD" }}
                label="نطاق السعر"
                maxValue={1000}
                minValue={0}
                step={50}
              />
            </AccordionItem>
          </Accordion>
        </div>

        {featuredProducts.length > 0 && (
          <div className="px-2 caategory-box border border-[#eae8e4]">
            <Accordion>
              <AccordionItem
                key="featured"
                aria-label="كتب مميزة"
                title="كتب مميزة"
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="flex gap-3 py-2">
                    <Image
                      src={product.thumb || "/media/placeholder.jpg"}
                      className="object-contain"
                      alt={product.title}
                      width={90}
                      height={60}
                    />
                    <div className="flex flex-col gap-3">
                      <h3 className="font-web text-sm">{product.title}</h3>
                      <span className="font-bold">
                        جنيه {product.sku.price}
                      </span>
                    </div>
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </>
  );
};

export default FiltersProducts;
