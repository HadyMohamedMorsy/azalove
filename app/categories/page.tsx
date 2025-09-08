import CategoryCard from "@/components/cards/category-card";
import HeaderTitle from "@/components/layout/header-title";
import StructuredData from "@/components/seo/structured-data";
import Skeleton from "@/components/ui/skeleton";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { useTranslation } from "@/hooks/use-translation";
import { Metadata } from "next";

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

export const metadata: Metadata = {
  title: "فئات الكتب الرومانسية - أزالوف",
  description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزالوف",
  keywords: "فئات الكتب, كتب رومانسية, أزالوف, تصنيفات الكتب",
  openGraph: {
    type: "website",
    title: "فئات الكتب الرومانسية - أزالوف",
    description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزالوف",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/categories`,
    siteName: "أزالوف",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "فئات الكتب الرومانسية - أزالوف",
    description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزالوف",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "أزالوف" }],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/categories`,
  },
};

function SectionCategories() {
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

  if (!data || data.length === 0) {
    return null;
  }

  // Generate structured data for categories
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "فئات الكتب الرومانسية",
    description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/categories`,
    mainEntity: {
      "@type": "ItemList",
      name: "فئات الكتب",
      description: "مجموعة متنوعة من فئات الكتب الرومانسية",
      numberOfItems: data?.length || 0,
      itemListElement:
        data?.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.name,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/products/${category.slug}`,
        })) || [],
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
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
    </>
  );
}

export default SectionCategories;
