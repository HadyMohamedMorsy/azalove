import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
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
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: SectionPlaceholderProps) => {
  const { t } = useTranslation();

  // Use provided values or fall back to translations
  const displayTitle = title || t("blog.noProductsFound");
  const displayDescription = description || t("blog.noProductsDescription");

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

      <h3 className="text-xl font-semibold text-foreground mb-3">
        {displayTitle}
      </h3>

      <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
        {displayDescription}
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
