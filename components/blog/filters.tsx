"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import Image from "next/image";

interface BlogCategory {
  data: {
    id: string;
    name: string;
    slug: string;
    subCategories?: BlogSubCategory[];
  }[];
}

interface BlogSubCategory {
  id: number;
  name: string;
  slug: string;
}

interface FeaturedBlog {
  data: {
    id: string;
    title: string;
    thumb: string;
    createdBy: {
      firstName: string;
      lastName: string;
    };
  }[];
}

interface BlogFiltersData {
  categories: BlogCategory;
  featuredBlogs: FeaturedBlog;
}

interface BlogFilters {
  category: string;
  sortBy: string;
}

interface BlogFiltersProps {
  filters?: BlogFilters;
  onFilterChange?: (filters: BlogFilters) => void;
}

const BlogFilters = ({ filters, onFilterChange }: BlogFiltersProps) => {
  const {
    data: response,
    loading,
    error,
  } = useFetch<BlogFiltersData>(API_ENDPOINTS_FROM_NEXT.BLOG_FILTERS);

  const handleCategoryChange = (categorySlug: string) => {
    if (onFilterChange) {
      onFilterChange({
        category: categorySlug,
        sortBy: filters?.sortBy || "",
      });
    }
  };

  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        category: "",
        sortBy: "",
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
      </div>
    );
  }

  if (error || !response) {
    return <div className="text-red-500">خطأ في تحميل فلاتر المقالات</div>;
  }

  const categoryItems = response.categories.data;
  const featuredBlogs = response.featuredBlogs.data;

  if (!loading) {
    return (
      <>
        <div className="space-y-4">
          {/* Clear Filters Button */}
          {filters?.category && (
            <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
              <Button
                onClick={handleClearFilters}
                variant="outline"
                className="w-full text-amaranth-700 hover:text-amaranth-800 hover:bg-amaranth-50"
              >
                مسح الفلاتر
              </Button>
            </div>
          )}

          <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories" className="border-0">
                <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                  فئات المقالات
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
                              ? "text-amaranth-600 font-semibold"
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

          {featuredBlogs?.length > 0 && (
            <div className="px-4 py-3 border border-amaranth-200 rounded-lg bg-gradient-to-r from-cream-50 to-amaranth-50">
              <Accordion type="single" collapsible defaultValue="featured">
                <AccordionItem value="featured" className="border-0">
                  <AccordionTrigger className="text-amaranth-700 font-semibold hover:text-amaranth-800">
                    مقالات مميزة
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {featuredBlogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="flex gap-3 py-2 hover:bg-amaranth-50 rounded-lg transition-colors duration-200"
                        >
                          <Image
                            src={blog.thumb || "/media/placeholder.jpg"}
                            className="object-cover rounded-md"
                            alt={blog.title}
                            width={90}
                            height={60}
                          />
                          <div className="flex flex-col gap-2">
                            <h3 className="font-medium text-sm text-gray-800 line-clamp-2">
                              {blog.title}
                            </h3>
                            <span className="text-xs text-gray-600">
                              بواسطة {blog.createdBy.firstName}{" "}
                              {blog.createdBy.lastName}
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

export default BlogFilters;
