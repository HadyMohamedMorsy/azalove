import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPagination?: boolean;
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showPagination = true,
}: PaginationWrapperProps) {
  if (!showPagination || totalPages <= 1) {
    return null;
  }

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    if (totalPages <= 1) {
      return pages;
    }

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if there's a gap after page 1
    if (start > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if there's a gap before last page
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if different from first)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      className={`p-6 border-t border-amaranth-100 bg-gradient-to-r from-cream-50 to-amaranth-50 ${className}`}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              className={
                currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((pageNumber, index) => (
            <PaginationItem key={index}>
              {typeof pageNumber === "string" ? (
                <span className="px-3 py-2 text-sm text-gray-500">
                  {pageNumber}
                </span>
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={
                currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
