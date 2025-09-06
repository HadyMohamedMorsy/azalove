"use client";

import { useCurrency } from "@/hooks/use-currency";
import { Edit3 } from "lucide-react";
import { useState } from "react";

import { Book } from "./data/books-data";

interface BookCardProps {
  book: Book;
  onBookSelect: (book: Book) => void;
}

export default function BookCard({ book, onBookSelect }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatCurrency } = useCurrency();

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-azalove-100 hover:border-azalove-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onBookSelect(book)}
    >
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
        {book.imageUrl.startsWith("data:image/svg+xml") ? (
          <div
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            dangerouslySetInnerHTML={{
              __html: atob(book.imageUrl.split(",")[1]),
            }}
          />
        ) : (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Title overlay on image */}
        <div className="absolute top-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1 drop-shadow-lg">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-sm opacity-90 drop-shadow-lg">{book.subtitle}</p>
          )}
        </div>

        {/* Hover Cover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-royal-900/80 to-amaranth-900/80 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center text-white">
            <div className="mb-2">
              <Edit3 className="w-8 h-8 mx-auto mb-2 text-azalove-300" />
            </div>
            <p className="font-semibold text-lg">تخصيص الغلاف</p>
            <p className="text-sm opacity-90">انقر لتعديل النص</p>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-royal-700 font-bold text-sm bg-gradient-to-r from-azalove-500 to-azalove-600 text-white px-3 py-1 rounded-full shadow-sm">
            {formatCurrency(book.price)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {book.description}
          </span>
        </div>
      </div>
    </div>
  );
}
