import MetaTagManager from "@/components/meta-tag-manager";
import SectionBestSelling from "@/components/sections/section-best-selling";
import SectionBlogs from "@/components/sections/section-blogs";
import SectionCategories from "@/components/sections/section-categories";
import SectionFeaturedBooks from "@/components/sections/section-featured-books";
import SectionHero from "@/components/sections/section-hero";
import SectionNewReleases from "@/components/sections/section-new-releases-products";
import SectionSliderProducts from "@/components/sections/section-slider-products";
import StructuredData from "@/components/seo/structured-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك",
  description:
    "اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك - كتب رومانسية عربية من أزلــوڤ",
  keywords: "كتب رومانسية, روايات حب, أزلــوڤ, كتب عربية, رومانسية, قصص حب",
  openGraph: {
    type: "website",
    title: "أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك",
    description:
      "اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك - كتب رومانسية عربية من أزلــوڤ",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
    siteName: "أزلــوڤ",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك",
    description:
      "اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك - كتب رومانسية عربية من أزلــوڤ",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "أزلــوڤ" }],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
  },
};

export default function Home() {
  // Generate structured data for the home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "أزلــوڤ",
    description:
      "اكتشف قصص حب ساحرة ستأسر قلبك وتشعل خيالك - كتب رومانسية عربية",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "أزلــوڤ",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "كتب رومانسية",
      description: "مجموعة مختارة من أفضل الكتب الرومانسية العربية",
      numberOfItems: "50+",
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <MetaTagManager pageType="home" />
      <main>
        <SectionHero />
        <SectionCategories />
        <SectionBestSelling />
        <SectionFeaturedBooks />
        <SectionSliderProducts />
        <SectionNewReleases />
        <SectionBlogs />
      </main>
    </>
  );
}
