interface SkeletonProps {
  length?: number;
  className?: string;
  containerClassName?: string;
}

export const Skeleton = ({
  length = 5,
  containerClassName = "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4",
}: SkeletonProps) => {
  return (
    <div className={containerClassName}>
      {[...Array(length)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300 animate-shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
