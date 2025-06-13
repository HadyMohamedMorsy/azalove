"use client";

import EmptyState from "@/components/blocks/empty-state";
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


  if (error) {
    return (
      <EmptyState
        icon="error"
        title="Failed to load categories"
        description="Something went wrong while loading this section. Please try again or check your connection."
        actionLabel="Retry"
        onAction={() => {}}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="لا يوجد منتجات"
        description="لا يوجد منتجات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
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
