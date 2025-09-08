"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import StructuredData from "../seo/structured-data";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}${item.href}`
        : undefined,
    })),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <nav
        className="text-sm text-muted-foreground mb-8"
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={item.label}>
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-foreground" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="mx-2" aria-hidden="true">
                  <ChevronRight className="inline-block w-4 h-4" />
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumb;
