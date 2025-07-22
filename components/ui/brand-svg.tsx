interface BrandSVGProps {
  svgName:
    | "artboard-39"
    | "artboard-45"
    | "artboard-46"
    | "artboard-49"
    | "artboard-49-1"
    | "artboard-50";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animate?: boolean;
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-80 h-80",
  "2xl": "w-96 h-96",
};

const svgPaths = {
  "artboard-39": "/media/svgs/Artboard 39.svg",
  "artboard-45": "/media/svgs/Artboard 45.svg",
  "artboard-46": "/media/svgs/Artboard 46.svg",
  "artboard-49": "/media/svgs/Artboard 49.svg",
  "artboard-49-1": "/media/svgs/Artboard 49 (1).svg",
  "artboard-50": "/media/svgs/Artboard 50.svg",
};

export function BrandSVG({
  svgName,
  className = "",
  size = "lg",
  animate = false,
}: BrandSVGProps) {
  const svgPath = svgPaths[svgName];
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`
        ${sizeClass} 
        ${animate ? "hover:scale-105 transition-transform duration-300" : ""} 
        ${className}
      `}
    >
      <img
        src={svgPath}
        alt="أزالوف - تصميم رومانسي"
        className="w-full h-full object-contain drop-shadow-lg"
        loading="lazy"
      />
    </div>
  );
}
