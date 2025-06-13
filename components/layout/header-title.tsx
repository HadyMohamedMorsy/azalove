import { Heart } from "lucide-react";

const HeaderTitle = ({ title = "", description = "" }) => {
  return (
    <div className="text-center mb-4 animate-fade-in">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default HeaderTitle;
