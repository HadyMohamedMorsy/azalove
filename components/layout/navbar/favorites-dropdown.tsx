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
import { Heart, Trash2 } from "lucide-react";

export function FavoritesDropdown() {
  const { favoriteItems, getTotalFavorites, removeFromFavorites } =
    useFavorites();
  const domain = process.env.MAIN_DOMAIN;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="w-5 h-5" />
          {getTotalFavorites() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {getTotalFavorites()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-background border border-border shadow-lg"
      >
        <div className="p-4">
          <h3 className="font-semibold mb-3">
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
                <Card key={`${item.id}-${item.selectedColor}`} className="p-0">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${domain}${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <p className="text-sm font-semibold">${item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeFromFavorites(item.id, item.selectedColor)
                        }
                        className="h-8 w-8"
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
