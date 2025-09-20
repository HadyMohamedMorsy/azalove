"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFetch } from "@/hooks/use-fetch";
import Image from "next/image";
import { useMemo } from "react";

interface Category {
  data: {
    id: string;
    name: string;
    slug: string;
    subCategories?: SubCategory[];
  }[];
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface FeaturedProduct {
  data: {
    id: string;
    title: string;
    thumb: string;
    sku: {
      price: number;
    };
  }[];
}

interface FiltersData {
  categories: Category;
  featuredProducts: FeaturedProduct;
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

  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        category: "",
        priceRange: "",
        sortBy: "",
      });
    }
  };

  // Parse current price range for slider
  const currentPriceRange = useMemo(() => {
    if (!filters?.priceRange) return [0, 1000];
    const [min, max] = filters.priceRange.split("-").map(Number);
    return [isNaN(min) ? 0 : min, isNaN(max) ? 1000 : max];
  }, [filters?.priceRange]);

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

  const categoryItems = response.categories.data;
  const featuredProducts = response.featuredProducts.data;

  if (!loading) {
    return (
      <>
        <div className="space-y-4">
          {/* Clear Filters Button */}
          {(filters?.category || filters?.priceRange) && (
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 text-sm font-medium text-amaranth-900 bg-amaranth-50 border border-amaranth-200 rounded-lg hover:bg-cream-100 transition-colors duration-200"
            >
              مسح الفلاتر
            </button>
          )}

          <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-cream-100">
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-0">
                <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                  الفئات
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="m-0 p-0 flex flex-col gap-3">
                    {categoryItems.map((category) => (
                      <li key={category.id} className="flex flex-col gap-2">
                        {/* Parent Category */}
                        <button
                          onClick={() => handleCategoryChange(category.slug)}
                          className={`text-right text-base font-medium hover:text-amaranth-600 transition-colors duration-200 ${
                            filters?.category === category.slug
                              ? "text-amaranth-900 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {category.name}
                        </button>

                        {/* Subcategories */}
                        {category.subCategories &&
                          category.subCategories.length > 0 && (
                            <ul className="mr-4 flex flex-col gap-2">
                              {category.subCategories.map((subCategory) => (
                                <li key={subCategory.id}>
                                  <button
                                    onClick={() =>
                                      handleCategoryChange(subCategory.slug)
                                    }
                                    className={`text-right text-sm font-normal hover:text-amaranth-600 transition-colors duration-200 ${
                                      filters?.category === subCategory.slug
                                        ? "text-amaranth-600 font-medium"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    • {subCategory.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {featuredProducts?.length > 0 && (
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
  }
};

export default FiltersProducts;
