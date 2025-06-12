"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useState } from "react";

const Favorites = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 89,
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Phone Case",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg",
      rating: 4.2,
      reviews: 256,
      inStock: false,
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      price: 59.99,
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 174,
      inStock: true,
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites list.",
    });
  };

  const addToCart = (item: any) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          My Favorites
        </CardTitle>
        <CardDescription>
          Items you've saved for later. {favorites.length} item
          {favorites.length !== 1 ? "s" : ""} in your wishlist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground">
              Start browsing to add items to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {favorites.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium line-clamp-2">{item.name}</h3>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {!item.inStock && (
                    <span className="text-sm text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFavorite(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Favorites;
