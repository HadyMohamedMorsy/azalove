import HeaderTitle from "../layout/header-title";
import BestSellingList from "./best-selling-list/best-selling-list";

function SectionBestSelling() {
  return (
    <section className="container py-10 px-4">
      <HeaderTitle title="افضل المبيعات" titleRoute="كل المنتجات" route="#" />
      <BestSellingList />
    </section>
  );
}

export default SectionBestSelling;
