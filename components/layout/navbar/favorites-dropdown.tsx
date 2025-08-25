"use client";
import CardPlaceholder from "@/components/placeholder/card-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFavorites } from "@/contexts/favorites-context";
import { useCurrency } from "@/hooks/use-currency";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";

export function FavoritesDropdown() {
  const { favoriteItems, getTotalFavorites, removeFromFavorites } =
    useFavorites();
  const { formatCurrency } = useCurrency();
  const domain = process.env.MAIN_DOMAIN;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-royal-50 transition-all duration-300 group"
        >
          <Heart className="w-7 h-7 text-royal-500 group-hover:text-royal-600 group-hover:scale-110 transition-all duration-300" />
          {getTotalFavorites() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-royal-500 hover:bg-royal-600 text-white border-2 border-white shadow-lg">
              {getTotalFavorites()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-background shadow-lg rounded-xl"
      >
        <div className="p-4">
          <h3 className="font-semibold mb-3 text-lg text-royal-700 flex items-center gap-2">
            <Heart className="w-5 h-5 text-royal-500" />
            Favorites ({getTotalFavorites()})
          </h3>
          {favoriteItems.length === 0 ? (
            <CardPlaceholder
              title="No favorites"
              description="Start browsing to add items to your wishlist!"
            />
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {favoriteItems.map((item: any) => (
                <Card
                  key={`${item.id}-${item.selectedColor}`}
                  className="p-0 shadow-sm border-royal-100 hover:border-royal-200 transition-colors"
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-royal-50 flex items-center justify-center">
                        {item.image ? (
                          <Image
                            src={`${domain}${item.image}`}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                        ) : null}
                        <div
                          className={`absolute inset-0 flex items-center justify-center text-xs text-royal-500 ${item.image ? "hidden" : ""}`}
                        >
                          {item.name?.charAt(0) || "N"}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate text-gray-900">
                          {item.name}
                        </h4>
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-royal-600">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatCurrency(item.originalPrice)}
                              </span>
                            )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeFromFavorites(item.id, item.selectedColor)
                        }
                        className="h-8 w-8 text-gray-500 hover:text-royal-500 hover:bg-royal-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
