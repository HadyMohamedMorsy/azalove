import MetaTagManager from "@/components/meta-tag-manager";
import SectionBestSelling from "@/components/sections/section-best-selling";
import SectionBlogs from "@/components/sections/section-blogs";
import SectionCategories from "@/components/sections/section-categories";
import SectionFeaturedBooks from "@/components/sections/section-featured-books";
import SectionHero from "@/components/sections/section-hero";
import SectionNewReleases from "@/components/sections/section-new-releases-products";
import SectionSliderProducts from "@/components/sections/section-slider-products";

export default function Home() {
  return (
    <>
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
