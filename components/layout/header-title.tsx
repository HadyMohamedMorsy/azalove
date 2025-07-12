import { Heart } from "lucide-react";

const HeaderTitle = ({ title = "", description = "" }) => {
  return (
    <div className="text-center mb-4 animate-fade-in">
      <div className="flex justify-center items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <Heart className="w-6 h-6 md:w-8 md:h-8 text-amaranth-500 animate-pulse" />
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amaranth-600 via-amaranth-700 to-royal-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <Heart className="w-6 h-6 md:w-8 md:h-8 text-amaranth-500 animate-pulse" />
      </div>
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default HeaderTitle;
