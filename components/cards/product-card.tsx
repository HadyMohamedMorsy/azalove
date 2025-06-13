import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { Sku } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  srcImage: string;
  name: string;
  sku?: Sku;
  categories: Category[];
  slug: string;
}

const ProductCard = ({
  id,
  srcImage,
  name,
  sku,
  categories,
  slug,
}: ProductCardProps) => {
  const domain = process.env.MAIN_DOMAIN;
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    if (!sku || !sku?.quantity) return;

    addToCart({
      id: id.toString(),
      name: name,
      price: sku?.price ?? 0,
      image: srcImage,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
    const isItemFavorite = isFavorite(id);

    if (isItemFavorite) {
      removeFromFavorites(id);
      toast({
        title: "Removed from favorites",
        description: `${name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites({
        id,
        name,
        price: sku?.price ?? 0,
        image: srcImage,
      });
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  const handleViewProduct = () => {
    toast({
      title: "View product",
      description: `Opening ${name} details...`,
    });
  };

  const calculateDiscount = () => {
    if (!sku || !sku.discount)
      return { finalPrice: sku?.price ?? 0, discount: 0 };

    const { price, discount, discountType } = sku;
    const finalPrice =
      discountType === "percentage"
        ? price - (price * discount) / 100
        : price - discount;

    return { finalPrice };
  };

  const { finalPrice } = calculateDiscount();

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in bg-gradient-to-br from-white to-rose-50/30">
      {/* Product badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {sku && +sku?.discount && (
          <span className="px-2 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold rounded-full">
            {sku?.discountType === "percentage"
              ? `${sku?.discount}% OFF`
              : `$${sku?.discount} OFF`}
          </span>
        )}
        {sku && !sku?.quantity && (
          <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Heart icon */}
      <button
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-50"
        onClick={handleToggleFavorite}
      >
        <Heart
          className={`w-4 h-4 ${isFavorite(id) ? "fill-rose-500 text-rose-500" : "text-rose-500"} hover:fill-rose-500 transition-colors`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center overflow-hidden">
        <img
          src={`${domain}${srcImage}`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-rose-600 transition-colors duration-300">
          <Link href={`/shop/${slug}`}>{name}</Link>
        </h3>
        {categories && categories.length > 0 && (
          <p className="text-muted-foreground text-sm mb-3">
            {categories.map((cat) => cat.name).join(", ")}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-rose-600">
            ${finalPrice?.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full px-4 transition-all duration-300 hover:scale-105"
            onClick={handleAddToCart}
            disabled={sku && !sku?.quantity}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {sku && sku?.quantity ? "Add" : "Out of Stock"}
          </Button>
        </div>
      </div>

      {/* Decorative corner shape */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-rose-200/30 to-transparent rounded-tl-full"></div>
    </Card>
  );
};

export default ProductCard;
