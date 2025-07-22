import PaginationWrapper from "@/components/ui/pagination-wrapper";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";

interface ExampleItem {
  id: number;
  name: string;
  description: string;
}

// Example data
const exampleData: ExampleItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}`,
}));

export default function PaginationExample() {
  const [itemsPerPage] = useState(10);
  const [totalRecords] = useState(exampleData.length);

  // Using the pagination hook
  const {
    currentPage,
    totalPages,
    startItem,
    endItem,
    setCurrentPage,
    resultsText,
  } = usePagination({
    totalRecords,
    itemsPerPage,
  });

  // Get current page items
  const currentItems = exampleData.slice(startItem - 1, endItem);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pagination Example</h1>

      {/* Results info */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">{resultsText}</p>
        <p className="text-xs text-gray-500 mt-1">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Items list */}
      <div className="grid gap-4 mb-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination component */}
      <PaginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        showPagination={totalPages > 1}
      />
    </div>
  );
}
