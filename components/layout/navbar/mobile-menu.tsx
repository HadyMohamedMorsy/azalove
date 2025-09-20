"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { siteConfig } from "@/config/site";
import { useFetch } from "@/hooks/use-fetch";
import { BookOpen, Home, Phone, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
}

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  icon: string;
  categoryType: string;
  description: string;
  image: string;
  subCategories: Subcategory[];
}

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Fetch dynamic categories
  const { data: shoppingCategories, loading: shoppingLoading } = useFetch<
    CategoryData[]
  >(API_ENDPOINTS_FROM_NEXT.MEGA_MENU_CATEGORIES);

  const { data: blogCategories, loading: blogLoading } = useFetch<
    BlogCategoryData[]
  >(API_ENDPOINTS_FROM_NEXT.MEGA_MENU_BLOG_CATEGORIES);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getIcon = (label: string) => {
    switch (label) {
      case "الرئيسيه":
        return <Home className="w-5 h-5" />;
      case "التسوق":
        return <ShoppingBag className="w-5 h-5" />;
      case "المقالات":
        return <BookOpen className="w-5 h-5" />;
      case "تواصل معنا":
        return <Phone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-center text-lg font-bold text-gray-800">
              القائمة
            </h2>
            <div className="w-9"></div> {/* Spacer for balance */}
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 h-[calc(100vh-80px)]">
          <div className="space-y-3">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              const isShoppingItem = item.label === "التسوق";
              const isBlogItem = item.label === "المقالات";

              if (isShoppingItem) {
                return (
                  <div key={item.href} className="space-y-2">
                    {/* Main Shopping Link */}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 p-5 rounded-xl transition-all duration-200 shadow-sm ${
                        isActive
                          ? "bg-amaranth-900 border-r-4 border-amaranth-500"
                          : "hover:bg-white hover:shadow-md hover:scale-[1.02] bg-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive ? "bg-amaranth-200" : "bg-gray-100"
                        }`}
                      >
                        {getIcon(item.label)}
                      </div>
                      <span className="font-semibold text-lg">
                        {item.label}
                      </span>
                    </Link>

                    {/* Shopping Categories Accordion */}
                    <Accordion
                      type="single"
                      collapsible
                      className="pr-4 bg-white rounded-xl shadow-sm"
                    >
                      <AccordionItem value="shopping" className="border-none">
                        <AccordionTrigger className="text-right hover:no-underline py-4 px-4 rounded-xl hover:bg-gray-50">
                          <span className="text-base font-semibold text-amaranth-600">
                            تصفح الأقسام
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-4">
                            {shoppingLoading ? (
                              <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amaranth-600 mx-auto"></div>
                                <p className="text-sm text-gray-500 mt-2">
                                  جاري التحميل...
                                </p>
                              </div>
                            ) : shoppingCategories &&
                              shoppingCategories.length > 0 ? (
                              shoppingCategories.map((category) => (
                                <div key={category.id} className="space-y-2">
                                  <h3 className="font-bold text-amaranth-700 text-base mb-3 border-b border-amaranth-200 pb-2">
                                    {category.name}
                                  </h3>
                                  <ul className="space-y-2 pr-4">
                                    {category.subCategories &&
                                    category.subCategories.length > 0 ? (
                                      category.subCategories.map(
                                        (subcategory) => (
                                          <li key={subcategory.id}>
                                            <Link
                                              href={`/products/${subcategory.slug}`}
                                              onClick={onClose}
                                              className="block text-sm text-gray-700 hover:text-amaranth-900 py-3 hover:bg-cream-100 px-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                                            >
                                              {subcategory.name}
                                            </Link>
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li>
                                        <Link
                                          href={`/products/${category.slug}`}
                                          onClick={onClose}
                                          className="block text-sm text-gray-700 hover:text-amaranth-900 py-3 hover:bg-cream-100 px-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                                        >
                                          عرض جميع المنتجات
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4">
                                <p className="text-sm text-gray-500">
                                  لا توجد فئات متاحة
                                </p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                );
              }

              if (isBlogItem) {
                return (
                  <div key={item.href} className="space-y-2">
                    {/* Main Blog Link */}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 p-5 rounded-xl transition-all duration-200 shadow-sm ${
                        isActive
                          ? "bg-cream-100 text-amaranth-700 border-r-4 border-amaranth-500"
                          : "hover:bg-white hover:shadow-md hover:scale-[1.02] bg-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive ? "bg-amaranth-200" : "bg-gray-100"
                        }`}
                      >
                        {getIcon(item.label)}
                      </div>
                      <span className="font-semibold text-lg">
                        {item.label}
                      </span>
                    </Link>

                    {/* Blog Categories Accordion */}
                    <Accordion
                      type="single"
                      collapsible
                      className="pr-4 bg-white rounded-xl shadow-sm"
                    >
                      <AccordionItem value="blogs" className="border-none">
                        <AccordionTrigger className="text-right hover:no-underline py-4 px-4 rounded-xl hover:bg-gray-50">
                          <span className="text-base font-semibold text-amaranth-600">
                            تصفح المواضيع
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-4">
                            {blogLoading ? (
                              <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amaranth-600 mx-auto"></div>
                                <p className="text-sm text-gray-500 mt-2">
                                  جاري التحميل...
                                </p>
                              </div>
                            ) : blogCategories && blogCategories.length > 0 ? (
                              blogCategories.map((category) => (
                                <div key={category.id} className="space-y-2">
                                  <h3 className="font-bold text-amaranth-700 text-base mb-3 border-b border-amaranth-200 pb-2">
                                    {category.name}
                                  </h3>
                                  <ul className="space-y-2 pr-4">
                                    {category.subCategories &&
                                    category.subCategories.length > 0 ? (
                                      category.subCategories.map(
                                        (subcategory) => (
                                          <li key={subcategory.id}>
                                            <Link
                                              href={`/blogs/${subcategory.slug}`}
                                              onClick={onClose}
                                              className="block text-sm text-gray-700 hover:text-amaranth-900 hover:bg-cream-100 py-3  px-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                                            >
                                              {subcategory.name}
                                            </Link>
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <li>
                                        <Link
                                          href={`/blogs/${category.slug}`}
                                          onClick={onClose}
                                          className="block text-sm text-gray-700 hover:text-amaranth-900 py-3 hover:bg-cream-100 px-3 rounded-lg transition-all duration-200 hover:shadow-sm"
                                        >
                                          عرض جميع المقالات
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4">
                                <p className="text-sm text-gray-500">
                                  لا توجد فئات متاحة
                                </p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                );
              }

              // Regular navigation items
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 p-5 rounded-xl transition-all duration-200 shadow-sm ${
                    isActive
                      ? "bg-amaranth-900 border-r-4 border-amaranth-900"
                      : "hover:bg-white hover:shadow-md hover:scale-[1.02] bg-white"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? "bg-amaranth-200" : "bg-gray-100"
                    }`}
                  >
                    {getIcon(item.label)}
                  </div>
                  <span className="font-semibold text-lg">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
