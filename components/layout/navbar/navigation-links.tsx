"use client";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {siteConfig.navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm md:text-base lg:text-lg px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "text-amaranth-600 bg-amaranth-100"
                  : "text-muted-foreground hover:text-amaranth-900 hover:bg-amaranth-100"
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
