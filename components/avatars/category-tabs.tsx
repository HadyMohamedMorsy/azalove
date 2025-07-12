import { Button } from "@/components/ui/button";
import { FeatureCategory } from "@/types/avatar";
import { Circle, Eye, Glasses, Palette, Smile, User } from "lucide-react";

interface CategoryTabsProps {
  activeCategory: FeatureCategory;
  onCategoryChange: (category: FeatureCategory) => void;
}

const categories = [
  { id: "faceShape" as FeatureCategory, label: "Face Shape", icon: User },
  { id: "eyes" as FeatureCategory, label: "Eyes", icon: Eye },
  { id: "nose" as FeatureCategory, label: "Nose", icon: Circle },
  { id: "mouth" as FeatureCategory, label: "Mouth", icon: Smile },
  { id: "hair" as FeatureCategory, label: "Hair", icon: Palette },
  { id: "accessories" as FeatureCategory, label: "Accessories", icon: Glasses },
];

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={isActive ? "default" : "outline"}
            className={`flex items-center gap-2 transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                : "hover:bg-gray-50 hover:scale-105"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{category.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
