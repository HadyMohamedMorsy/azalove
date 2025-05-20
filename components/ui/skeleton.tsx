interface SkeletonProps {
  length?: number;
  className?: string;
  containerClassName?: string;
}

export const Skeleton = ({
  length = 5,
  containerClassName = "grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3",
}: SkeletonProps) => {
  return (
    <div className={containerClassName}>
      {[...Array(length)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
