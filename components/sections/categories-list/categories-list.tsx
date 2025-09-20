"use client";

import CategoryCard from "@/components/cards/category-card";
import SectionPlaceholder from "@/components/placeholder/section-placeholder";
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
      <SectionPlaceholder
        icon="error"
        title="فشل في تحميل الفئات"
        description="حدث خطأ أثناء تحميل هذا القسم. يرجى المحاولة مرة أخرى أو التحقق من الاتصال."
        actionLabel="إعادة المحاولة"
        onAction={() => {}}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <SectionPlaceholder
        icon="package"
        title="لا يوجد فئات"
        description="لا يوجد فئات في هذا القسم بعد. يرجى التحقق من قسم آخر"
        actionLabel="التحقق من قسم آخر"
        onAction={() => {}}
      />
    );
  }

  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {data?.map((category: Category) => (
        <li key={category.id}>
          <CategoryCard bgColor="#fff5e9" title={category.name} />
        </li>
      ))}
    </ul>
  );
}

export default CategoriesList;
