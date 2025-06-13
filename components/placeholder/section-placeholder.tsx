import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Search, ShoppingBag } from "lucide-react";

interface SectionPlaceholderProps {
  icon?: "package" | "shopping-bag" | "search" | "error";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const SectionPlaceholder = ({
  icon = "package",
  title = "No products found",
  description = "There are no products in this section yet. Check back later or explore other categories.",
  actionLabel,
  onAction,
  className = "",
}: SectionPlaceholderProps) => {
  const IconComponent = {
    package: Package,
    "shopping-bag": ShoppingBag,
    search: Search,
    error: AlertTriangle,
  }[icon];

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          icon === "error" ? "bg-destructive/10" : "bg-muted"
        }`}
      >
        <IconComponent
          className={`w-8 h-8 ${
            icon === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
        />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>

      <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default SectionPlaceholder;
