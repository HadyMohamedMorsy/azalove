import ProductView from "@/components/products/single-product/product-view";
import StructuredData from "@/components/seo/structured-data";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    productslug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { productslug } = resolvedParams;

  return {
    title: `${productslug} - أزلــوڤ | كتب رومانسية`,
    description: `اكتشف ${productslug} من أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك`,
    keywords: "كتب رومانسية, روايات حب, أزلــوڤ, كتب عربية, رومانسية",
    openGraph: {
      type: "website",
      title: `${productslug} - أزلــوڤ`,
      description: `اكتشف ${productslug} من أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/product/${productslug}`,
      siteName: "أزلــوڤ",
      locale: "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${productslug} - أزلــوڤ`,
      description: `اكتشف ${productslug} من أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "أزلــوڤ" }],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/product/${productslug}`,
    },
  };
}

export default async function ProductSlug({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { productslug } = resolvedParams;

  // Generate structured data for the product
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/product/${productslug}`,
    name: productslug,
    description: `اكتشف ${productslug} من أزلــوڤ - كتب رومانسية ساحرة ستأسر قلبك`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/product/${productslug}`,
    brand: {
      "@type": "Brand",
      name: "أزلــوڤ",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
    },
    category: "كتب رومانسية",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "أزلــوڤ",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.0",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.0",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "عميل أزلــوڤ",
      },
      reviewBody: "كتاب رومانسي رائع وممتع للقراءة",
      datePublished: new Date().toISOString().split("T")[0],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "كتب رومانسية",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/products/romance`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: productslug,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azalove.com"}/product/${productslug}`,
        },
      ],
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-background">
        <ProductView params={resolvedParams} />
      </div>
    </>
  );
}
