import PromoBlock from "../blocks/promo-block";
import HeaderTitle from "../layout/header-title";
import NewReleasesList from "./new-releases-list/new-releases-list";

function SectionNewReleases() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title=" المنتجات الجديده" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        <div className="border-b border-[#eae8e4] bg-[#fff6f6] lg:px-[3.5rem] sm:px-[1.5rem] px-[1rem] py-4">
          <div className="flex flex-col items-center justify-center h-full">
            <PromoBlock />
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-1">
          <NewReleasesList />
        </div>
      </div>
    </section>
  );
}

export default SectionNewReleases;
