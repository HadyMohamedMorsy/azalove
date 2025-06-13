import { siteConfig } from "@/config/site";
import Link from "next/link";

export function NavigationLinks() {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {siteConfig.navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-lg font-bold ${
              index === 0 ? "text-foreground" : "text-muted-foreground"
            } hover:text-primary px-3 py-2 rounded-md font-medium`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
