"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="text-sm text-muted-foreground mb-8">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label}>
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className="mx-2">
                <ChevronRight className="inline-block w-4 h-4" />
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
