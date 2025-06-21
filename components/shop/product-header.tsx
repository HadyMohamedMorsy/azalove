import ButtonList from "@/components/shop/button-list";
import ShowProducts from "@/components/shop/show";
import SortProducts from "@/components/shop/sort";

interface ProductHeaderProps {
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  totalPages?: number;
  viewMode?: "list" | "grid";
  onViewModeChange?: (mode: "list" | "grid") => void;
}

export default function ProductHeader({
  currentPage = 1,
  itemsPerPage = 12,
  totalItems = 0,
  totalPages = 1,
  viewMode = "grid",
  onViewModeChange,
}: ProductHeaderProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const resultsText =
    totalItems > 0
      ? `عرض ${startItem}–${endItem} من ${totalItems} نتيجة`
      : "لا توجد نتائج";

  return (
    <div className="flex justify-between items-center py-5">
      <span>{resultsText}</span>
      <div className="flex gap-4">
        <SortProducts />
        <ShowProducts />
        <ButtonList viewMode={viewMode} onViewModeChange={onViewModeChange!} />
      </div>
    </div>
  );
}
