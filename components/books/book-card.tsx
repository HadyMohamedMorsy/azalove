"use client";

import { Edit3 } from "lucide-react";
import { useState } from "react";

import { Book } from "./data/books-data";

interface BookCardProps {
  book: Book;
  onBookSelect: (book: Book) => void;
}

export default function BookCard({ book, onBookSelect }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-azalove-100 hover:border-azalove-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onBookSelect(book)}
    >
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

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
            <p className="font-semibold text-lg">Customize Cover</p>
            <p className="text-sm opacity-90">Click to edit text</p>
          </div>
        </div>
      </div>
    </div>
  );
}
