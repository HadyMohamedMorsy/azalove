"use client";

import CategoryCard from "@/components/cards/category-card";
import HeaderTitle from "@/components/layout/header-title";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useTranslation } from "@/hooks/use-translation";

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export default function CategoriesSection() {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch<Category[]>(
    API_ENDPOINTS_FROM_NEXT.CATEGORIES
  );

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title={t("categories.latestCategories")} />
        <Skeleton length={5} />
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle title={t("categories.latestCategories")} />
        <div className="text-red-500">
          {t("categories.errorLoadingCategories")}: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10 px-4">
      <HeaderTitle title={t("categories.latestCategories")} />
      <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {data?.map((category: Category) => (
          <li key={category.id}>
            <CategoryCard bgColor="#faf1ff" title={category.name} />
          </li>
        ))}
      </ul>
    </section>
  );
}
