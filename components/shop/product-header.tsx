import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";

export default function ProductHeader() {
  return (
    <div className="flex justify-between items-center py-5">
      <span> عرض 1–12 من 89 نتيجة</span>
      <div className="flex gap-4">
        <SortProducts />
        <ShowProducts />
        <ButtonList />
      </div>
    </div>
  );
}
