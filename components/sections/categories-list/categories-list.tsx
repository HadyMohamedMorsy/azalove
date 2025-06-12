"use client";

import CategoryCard from "@/components/cards/category-card";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

function CategoriesList() {
  const { data, loading, error } = useFetch<Category[]>(
    API_ENDPOINTS_FROM_NEXT.CATEGORIES
  );

  if (loading) {
    return <Skeleton length={5} />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading categories: {error}</div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {data?.map((category: Category) => (
        <li key={category.id}>
          <CategoryCard bgColor="#faf1ff" title={category.name} />
        </li>
      ))}
    </ul>
  );
}

export default CategoriesList;
