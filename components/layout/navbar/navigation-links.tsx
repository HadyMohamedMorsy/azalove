"use client";
import { siteConfig } from "@/config/site";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BlogMegaMenu } from "./blog-mega-menu";
import { MegaMenu } from "./mega-menu";

export function NavigationLinks() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBlogMegaMenuOpen, setIsBlogMegaMenuOpen] = useState(false);
  const [closeTimeoutId, setCloseTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [blogCloseTimeoutId, setBlogCloseTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      setCloseTimeoutId(null);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150); // Small delay to prevent accidental closure
    setCloseTimeoutId(timeoutId);
  };

  const handleBlogMouseEnter = () => {
    if (blogCloseTimeoutId) {
      clearTimeout(blogCloseTimeoutId);
      setBlogCloseTimeoutId(null);
    }
    setIsBlogMegaMenuOpen(true);
  };

  const handleBlogMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setIsBlogMegaMenuOpen(false);
    }, 150); // Small delay to prevent accidental closure
    setBlogCloseTimeoutId(timeoutId);
  };

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4 relative">
        {siteConfig.navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const isShoppingItem = item.label === "التسوق";
          const isBlogItem = item.label === "المقالات";

          if (isShoppingItem) {
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm md:text-base lg:text-lg px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive || isMegaMenuOpen
                      ? "text-white bg-amaranth-900"
                      : "text-muted-foreground hover:text-white hover:bg-amaranth-900"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <MegaMenu
                  isOpen={isMegaMenuOpen}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClose={() => setIsMegaMenuOpen(false)}
                />
              </div>
            );
          }

          if (isBlogItem) {
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={handleBlogMouseEnter}
                onMouseLeave={handleBlogMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm md:text-base lg:text-lg px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive || isBlogMegaMenuOpen
                      ? "text-white bg-amaranth-900"
                      : "text-muted-foreground hover:text-white hover:bg-amaranth-900"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isBlogMegaMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <BlogMegaMenu
                  isOpen={isBlogMegaMenuOpen}
                  onMouseEnter={handleBlogMouseEnter}
                  onMouseLeave={handleBlogMouseLeave}
                  onClose={() => setIsBlogMegaMenuOpen(false)}
                />
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm md:text-base lg:text-lg px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "text-white bg-amaranth-900"
                  : "text-muted-foreground hover:text-white hover:bg-amaranth-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
