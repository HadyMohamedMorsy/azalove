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

interface Filters {
  category: string;
  priceRange: string;
  sortBy: string;
}

interface FiltersProductsProps {
  filters?: Filters;
  onFilterChange?: (filters: Filters) => void;
}

const FiltersProducts = ({ filters, onFilterChange }: FiltersProductsProps) => {
  const {
    data: response,
    loading,
    error,
  } = useFetch<FiltersData>("/api/filters");

  const handleCategoryChange = (categorySlug: string) => {
    if (onFilterChange) {
      onFilterChange({
        category: categorySlug,
        priceRange: filters?.priceRange || "",
        sortBy: filters?.sortBy || "",
      });
    }
  };

  const handlePriceChange = (priceRange: string) => {
    if (onFilterChange) {
      onFilterChange({
        category: filters?.category || "",
        priceRange,
        sortBy: filters?.sortBy || "",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !response) {
    return <div className="text-red-500">خطأ في تحميل الفلاتر</div>;
  }

  const { categories, featuredProducts } = response;
  const categoryItems = categories.data.data;

  return (
    <>
      <div className="space-y-4">
        <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
          <Accordion type="single" collapsible defaultValue="categories">
            <AccordionItem value="categories" className="border-0">
              <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                الفئات
              </AccordionTrigger>
              <AccordionContent>
                <ul className="m-0 p-0 flex flex-col gap-3">
                  {categoryItems.map((category) => (
                    <li
                      key={category.id}
                      className="flex justify-between items-center"
                    >
                      <button
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`text-right hover:text-amaranth-600 transition-colors duration-200 ${
                          filters?.category === category.slug
                            ? "text-amaranth-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
          <Accordion type="single" collapsible defaultValue="price">
            <AccordionItem value="price" className="border-0">
              <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                تصفية حسب السعر
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[100, 500]}
                    max={1000}
                    min={0}
                    step={50}
                    className="w-full"
                    onValueChange={(value) => {
                      if (value && value.length === 2) {
                        handlePriceChange(`${value[0]}-${value[1]}`);
                      }
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 جنيه</span>
                    <span>1000 جنيه</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {featuredProducts.length > 0 && (
          <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
            <Accordion type="single" collapsible defaultValue="featured">
              <AccordionItem value="featured" className="border-0">
                <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                  كتب مميزة
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {featuredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex gap-3 py-2 hover:bg-amaranth-50 rounded-lg transition-colors duration-200"
                      >
                        <Image
                          src={product.thumb || "/media/placeholder.jpg"}
                          className="object-contain rounded-md"
                          alt={product.title}
                          width={90}
                          height={60}
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="font-medium text-sm text-gray-800">
                            {product.title}
                          </h3>
                          <span className="font-bold text-amaranth-600">
                            جنيه {product.sku.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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
