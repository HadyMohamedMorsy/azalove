"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useFetch } from "@/hooks/use-fetch";
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
          <Accordion type="single" collapsible>
            <AccordionItem value="categories">
              <AccordionTrigger>الفئات</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-2 caategory-box border border-[#eae8e4]">
          <Accordion type="single" collapsible>
            <AccordionItem value="price">
              <AccordionTrigger>تصفية حسب السعر</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[100, 500]}
                    max={1000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 جنيه</span>
                    <span>1000 جنيه</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {featuredProducts.length > 0 && (
          <div className="px-2 caategory-box border border-[#eae8e4]">
            <Accordion type="single" collapsible>
              <AccordionItem value="featured">
                <AccordionTrigger>كتب مميزة</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </>
  );
};

export default FiltersProducts;
