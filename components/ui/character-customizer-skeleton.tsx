"use client";

export default function CharacterCustomizerSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Body Types Skeleton */}
      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>

      {/* Colors Skeleton */}
      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-16 w-16 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>

      {/* Shapes Grid Skeleton */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border-2 border-gray-200 bg-gray-100 animate-pulse"
              >
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded" />
                <div className="h-3 w-12 bg-gray-200 rounded mt-1 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
