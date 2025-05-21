"use client";

import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import useFetch from "@/hooks/useFetch";
import CategoryCard from "../cards/category-card";
import HeaderTitle from "../layout/header-title";
import Skeleton from "../ui/skeleton";

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

function SectionCategories() {
  const { data, loading, error } = useFetch<Category[]>(
    API_ENDPOINTS_FROM_NEXT.CATEGORIES
  );

  if (loading) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle
          title="احدث التصنيفات"
          titleRoute="كل التصنيفات"
          route="#"
        />
        <Skeleton length={5} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-10 px-4">
        <HeaderTitle
          title="احدث التصنيفات"
          titleRoute="كل التصنيفات"
          route="#"
        />
        <div className="text-red-500">Error loading categories: {error}</div>
      </section>
    );
  }

  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="احدث التصنيفات" titleRoute="كل التصنيفات" route="#" />
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

export default SectionCategories;
