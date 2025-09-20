import CategoriesSection from "@/components/categories/categories-section";
import StructuredData from "@/components/seo/structured-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فئات الكتب الرومانسية - أزلــوڤ",
  description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزلــوڤ",
  keywords: "فئات الكتب, كتب رومانسية, أزلــوڤ, تصنيفات الكتب",
  openGraph: {
    type: "website",
    title: "فئات الكتب الرومانسية - أزلــوڤ",
    description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزلــوڤ",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/categories`,
    siteName: "أزلــوڤ",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "فئات الكتب الرومانسية - أزلــوڤ",
    description: "اكتشف فئات مختلفة من الكتب الرومانسية العربية في أزلــوڤ",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "أزلــوڤ" }],
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
