import HeaderTitle from "../layout/header-title";
import CategoriesList from "./categories-list/categories-list";
function SectionCategories() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="احدث التصنيفات" titleRoute="كل التصنيفات" route="#" />
      <CategoriesList />
    </section>
  );
}
export default SectionCategories;
