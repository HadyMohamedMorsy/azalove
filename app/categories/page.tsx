import CategoriesSection, { Category } from "@/components/categories/categories-section";
import StructuredData from "@/components/seo/structured-data";
import { Metadata } from "next";

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
    numberOfItems: 0, // Will be updated by client component
    itemListElement: [],
  },
};

export default function CategoriesPage() {
  return (
    <>
      <StructuredData data={structuredData} />
      <CategoriesSection />
    </>
  );
}
