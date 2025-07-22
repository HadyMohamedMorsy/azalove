import { useMemo, useState } from "react";

interface UsePaginationProps {
  totalRecords: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoToNextPage: boolean;
  canGoToPreviousPage: boolean;
  resultsText: string;
}

export function usePagination({
  totalRecords,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.ceil(totalRecords / itemsPerPage);
  }, [totalRecords, itemsPerPage]);

  const startItem = useMemo(() => {
    return (currentPage - 1) * itemsPerPage + 1;
  }, [currentPage, itemsPerPage]);

  const endItem = useMemo(() => {
    return Math.min(currentPage * itemsPerPage, totalRecords);
  }, [currentPage, itemsPerPage, totalRecords]);

  const canGoToNextPage = currentPage < totalPages;
  const canGoToPreviousPage = currentPage > 1;

  const goToNextPage = () => {
    if (canGoToNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (canGoToPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resultsText = useMemo(() => {
    if (totalRecords === 0) {
      return "لا توجد نتائج";
    }
    return `عرض ${startItem}–${endItem} من ${totalRecords} نتيجة`;
  }, [startItem, endItem, totalRecords]);

  return {
    currentPage,
    totalPages,
    startItem,
    endItem,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    resultsText,
  };
}
