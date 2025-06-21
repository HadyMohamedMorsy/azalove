"use client";
import ProductCard from "@/components/cards/product-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/contexts/favorites-context";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favoriteItems, getTotalFavorites } = useFavorites();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          My Favorites
        </CardTitle>
        <CardDescription>
          Items you've saved for later. {getTotalFavorites()} item
          {getTotalFavorites() !== 1 ? "s" : ""} in your wishlist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {favoriteItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground">
              Start browsing to add items to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                srcImage={item.image}
                name={item.name}
                sku={{
                  id: 0,
                  sku: "",
                  price: item.price,
                  quantity: 1,
                  discount: 0,
                  discountType: "percentage",
                }}
                categories={[]}
                slug={`product-${item.id}`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Favorites;
