import HeaderTitle from "../layout/header-title";
import CategoriesList from "./categories-list/categories-list";
function SectionCategories() {
  return (
    <section className="py-10 px-4 overflow-hidden relative">
      {/* Romantic background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-rose-100/30 to-pink-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-100/40 to-purple-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-rose-200/30 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-rose-200/30 to-pink-100/40 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <HeaderTitle
          title="احدث التصنيفات"
          description="احدث التصنيفات في الموقع"
        />
        <CategoriesList />
      </div>
    </section>
  );
}
export default SectionCategories;
