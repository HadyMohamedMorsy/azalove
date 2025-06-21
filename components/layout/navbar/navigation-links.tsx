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
              className={`text-lg px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                isActive
                  ? "text-red-600 bg-red-50"
                  : "text-muted-foreground hover:text-red-600 hover:bg-red-50"
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
