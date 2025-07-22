"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";
import { BookOpen, Home, Phone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Shopping categories
  const shoppingCategories = [
    {
      title: "منتجات العناية",
      items: [
        { name: "العناية بالبشرة", href: "/products/skincare" },
        { name: "العناية بالشعر", href: "/products/haircare" },
        { name: "منتجات الاستحمام", href: "/products/bath" },
        { name: "العطور", href: "/products/perfumes" },
        { name: "مكياج", href: "/products/makeup" },
      ],
    },
    {
      title: "الهدايا الرومانسية",
      items: [
        { name: "باقات الورود", href: "/products/flowers" },
        { name: "شوكولاتة فاخرة", href: "/products/chocolate" },
        { name: "مجوهرات", href: "/products/jewelry" },
        { name: "هدايا شخصية", href: "/products/personalized" },
        { name: "بطاقات معايدة", href: "/products/cards" },
      ],
    },
    {
      title: "منتجات المنزل",
      items: [
        { name: "شموع معطرة", href: "/products/candles" },
        { name: "ديكورات رومانسية", href: "/products/decor" },
        { name: "أقمشة وستائر", href: "/products/fabrics" },
        { name: "إضاءة", href: "/products/lighting" },
        { name: "وسائد ومفروشات", href: "/products/bedding" },
      ],
    },
  ];

  // Blog categories
  const blogCategories = [
    {
      title: "نصائح العناية",
      items: [
        { name: "العناية بالبشرة", href: "/blogs/skincare-tips" },
        { name: "العناية بالشعر", href: "/blogs/haircare-tips" },
        { name: "روتين العناية اليومي", href: "/blogs/daily-routine" },
        { name: "منتجات طبيعية", href: "/blogs/natural-products" },
        { name: "نصائح للجمال", href: "/blogs/beauty-tips" },
      ],
    },
    {
      title: "أفكار الهدايا",
      items: [
        { name: "هدايا رومانسية", href: "/blogs/romantic-gifts" },
        { name: "هدايا عيد الحب", href: "/blogs/valentines-gifts" },
        { name: "هدايا الذكرى", href: "/blogs/anniversary-gifts" },
        { name: "هدايا المناسبات", href: "/blogs/occasion-gifts" },
        { name: "هدايا محلية الصنع", href: "/blogs/diy-gifts" },
      ],
    },
    {
      title: "نمط الحياة",
      items: [
        { name: "الحياة الصحية", href: "/blogs/healthy-lifestyle" },
        { name: "الثقة بالنفس", href: "/blogs/self-confidence" },
        { name: "العلاقات", href: "/blogs/relationships" },
        { name: "التوازن النفسي", href: "/blogs/mental-wellness" },
        { name: "الاسترخاء", href: "/blogs/relaxation" },
      ],
    },
  ];

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full max-h-screen w-full max-w-full m-0 p-0 rounded-none md:hidden">
        <DialogHeader className="p-4 pr-12 border-b">
          <DialogTitle className="text-right text-xl font-bold text-amaranth-700">
            القائمة
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
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
                      className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                        isActive
                          ? "bg-amaranth-100 text-amaranth-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {getIcon(item.label)}
                      <span className="font-medium">{item.label}</span>
                    </Link>

                    {/* Shopping Categories Accordion */}
                    <Accordion type="single" collapsible className="pr-4">
                      <AccordionItem value="shopping" className="border-none">
                        <AccordionTrigger className="text-right hover:no-underline py-3">
                          <span className="text-sm font-medium text-gray-600">
                            تصفح الأقسام
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-4">
                            {shoppingCategories.map((category, index) => (
                              <div key={index} className="space-y-2">
                                <h3 className="font-semibold text-amaranth-700 text-sm">
                                  {category.title}
                                </h3>
                                <ul className="space-y-1 pr-4">
                                  {category.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block text-sm text-gray-600 hover:text-amaranth-600 py-2 hover:bg-amaranth-50 px-2 rounded transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
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
                      className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                        isActive
                          ? "bg-amaranth-100 text-amaranth-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {getIcon(item.label)}
                      <span className="font-medium">{item.label}</span>
                    </Link>

                    {/* Blog Categories Accordion */}
                    <Accordion type="single" collapsible className="pr-4">
                      <AccordionItem value="blogs" className="border-none">
                        <AccordionTrigger className="text-right hover:no-underline py-3">
                          <span className="text-sm font-medium text-gray-600">
                            تصفح المواضيع
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="space-y-4">
                            {blogCategories.map((category, index) => (
                              <div key={index} className="space-y-2">
                                <h3 className="font-semibold text-amaranth-700 text-sm">
                                  {category.title}
                                </h3>
                                <ul className="space-y-1 pr-4">
                                  {category.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block text-sm text-gray-600 hover:text-amaranth-600 py-2 hover:bg-amaranth-50 px-2 rounded transition-colors"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
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
                  className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-amaranth-100 text-amaranth-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {getIcon(item.label)}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
