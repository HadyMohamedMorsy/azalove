"use client";

import BlogCard from "@/components/blog/show/blog-card/blog-card";
import {
  API_BASE_URL,
  API_ENDPOINTS_FROM_NEXT,
  API_ENDPOINTS_FROM_SERVER,
} from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { Heart, Sparkles, Star } from "lucide-react";
import Link from "next/link";

interface BlogSubcategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
}

interface BlogCategoryData {
  id: number;
  name: string;
  slug: string;
  icon: string;
  categoryType: string;
  description: string;
  image: string;
  subCategories: BlogSubcategory[];
}

interface BlogArticle {
  id: string | number;
  title: string;
  shortDescription: string;
  thumb?: string;
  slug?: string;
  createdAt?: string;
  views?: number;
  category?: string;
}

interface BlogMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function BlogMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: BlogMegaMenuProps) {
  const { data: blogCategories, loading: categoriesLoading } = useFetch<
    BlogCategoryData[]
  >(API_ENDPOINTS_FROM_NEXT.MEGA_MENU_BLOG_CATEGORIES);

  const { data: blogs, loading: blogsLoading } = useFetch<BlogArticle[]>(
    `${API_BASE_URL}${API_ENDPOINTS_FROM_SERVER.BLOGS}?limit=3&featured=true`
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-[72px] left-0 w-full bg-white border-t border-amaranth-200 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Romantic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50/80 via-amaranth-50/60 to-royal-50/80 pointer-events-none" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-4 left-10 w-4 h-4 text-amaranth-300/30 animate-pulse" />
        <Star className="absolute top-8 right-20 w-3 h-3 text-royal-300/40 animate-pulse delay-1000" />
        <Sparkles className="absolute bottom-6 left-1/4 w-5 h-5 text-amaranth-200/50 animate-pulse delay-500" />
        <Heart className="absolute bottom-4 right-1/3 w-3 h-3 text-royal-200/40 animate-pulse delay-1500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Blog Categories Section - 8 columns */}
          <div className="col-span-8">
            {categoriesLoading ? (
              <div className="grid grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <div className="h-6 bg-amaranth-200 rounded animate-pulse" />
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, subIndex) => (
                        <div
                          key={subIndex}
                          className="h-4 bg-gray-200 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-8">
                {blogCategories?.map((category) => (
                  <div key={category.id} className="space-y-4">
                    {/* Category Title */}
                    <h3 className="text-lg font-bold text-amaranth-700 border-b-2 border-amaranth-200 pb-2 mb-4">
                      {category.name}
                    </h3>

                    {/* Subcategories */}
                    <ul className="space-y-3">
                      {category.subCategories &&
                      category.subCategories.length > 0 ? (
                        category.subCategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              href={`/blogs/${subcategory.slug}`}
                              onClick={onClose}
                              className="text-gray-700 hover:text-amaranth-600 text-sm transition-colors duration-200 hover:translate-x-1 transform block py-1"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <Link
                            href={`/blogs/${category.slug}`}
                            onClick={onClose}
                            className="text-gray-700 hover:text-amaranth-600 text-sm transition-colors duration-200 hover:translate-x-1 transform block py-1"
                          >
                            عرض جميع المقالات
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t border-amaranth-200/50">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/blogs"
                    onClick={onClose}
                    className="text-amaranth-600 hover:text-amaranth-800 font-semibold transition-colors duration-200"
                  >
                    جميع المقالات ←
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Articles Section - 4 columns */}
          <div className="col-span-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-royal-600" />
                <h3 className="text-xl font-bold text-royal-800">
                  مقالات مميزة
                </h3>
              </div>

              {blogsLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-amaranth-200/50 overflow-hidden"
                    >
                      <div className="h-40 bg-gray-200 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : blogs && blogs.length > 0 ? (
                <div className="space-y-4">
                  {blogs.slice(0, 2).map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      onClick={onClose}
                    >
                      <BlogCard
                        title={article.title}
                        shortDescription={article.shortDescription || ""}
                        createdAt={
                          article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString(
                                "ar-EG"
                              )
                            : ""
                        }
                        thumb={article.thumb}
                        onClick={() => {}}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  لا توجد مقالات مميزة متاحة حالياً
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
