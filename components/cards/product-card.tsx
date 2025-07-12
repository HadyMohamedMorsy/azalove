import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { Sku } from "@/types/product";
import { BookOpen, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "../placeholder/image-placeholder";

interface ProductCardProps {
  id: number;
  srcImage: string;
  name: string;
  sku?: Sku;
  categories: Category[];
  slug: string;
  viewMode?: "list" | "grid";
}

const ProductCard = ({
  id,
  srcImage,
  name,
  sku,
  categories,
  slug,
  viewMode = "grid",
}: ProductCardProps) => {
  const domain = process.env.MAIN_DOMAIN;
  const { toast } = useToast();
  const { addToCart, getItemQuantity } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const getAvailableQuantity = (): number => {
    if (!sku?.quantity) return 0;
    return sku.quantity - getItemQuantity(id.toString());
  };

  const calculateDiscount = () => {
    if (!sku?.discount) {
      return { finalPrice: sku?.price ?? 0 };
    }

    const { price, discount, discountType } = sku;
    const discountAmount =
      discountType === "percentage" ? (price * discount) / 100 : discount;

    return {
      finalPrice: price - discountAmount,
      discountAmount,
      originalPrice: price,
    };
  };

  const { finalPrice, discountAmount, originalPrice } = calculateDiscount();
  const availableQuantity = getAvailableQuantity();

  const handleAddToCart = () => {
    if (!sku?.quantity) return;

    const availableQuantity = getAvailableQuantity();
    if (availableQuantity <= 0) {
      toast({
        title: "Cannot add more",
        description: `You've reached the maximum available quantity for ${name}.`,
      });
      return;
    }

    addToCart({
      id: id.toString(),
      name: name,
      price: sku?.price ?? 0,
      finalPrice: finalPrice ?? sku?.price ?? 0,
      image: srcImage,
      quantity: 1,
      skuQuantity: sku.quantity,
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
        finalPrice: finalPrice ?? sku?.price ?? 0,
        image: srcImage,
      });
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  return (
    <Card
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in bg-gradient-to-br from-white to-amaranth-50/30 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Product badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {sku && discountAmount && (
          <span className="px-2 py-1 bg-gradient-to-r from-amaranth-500 to-amaranth-600 text-white text-xs font-semibold rounded-full">
            {sku?.discountType === "percentage"
              ? `${sku?.discount}% OFF`
              : `$${sku?.discount} OFF`}
          </span>
        )}
        {sku && !sku?.quantity && (
          <span className="px-2 py-1 bg-gradient-to-r from-royal-500 to-amaranth-500 text-white text-xs font-semibold rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Heart icon */}
      <button
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amaranth-50"
        onClick={handleToggleFavorite}
      >
        <Heart
          className={`w-4 h-4 ${isFavorite(id) ? "fill-amaranth-500 text-amaranth-500" : "text-amaranth-500"} hover:fill-amaranth-500 transition-colors`}
        />
      </button>

      {/* Product Image */}
      <div
        className={`relative bg-gradient-to-br from-amaranth-100 to-amaranth-200 flex items-center justify-center overflow-hidden ${
          viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-64"
        }`}
      >
        {srcImage ? (
          <Image
            src={`${domain}${srcImage}`}
            width={100}
            height={100}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div
        className={`${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""} p-6`}
      >
        <div>
          <h3 className="font-bold text-base md:text-lg lg:text-xl text-foreground mb-1 group-hover:text-amaranth-600 transition-colors duration-300">
            <Link href={`/product/${slug}`}>{name}</Link>
          </h3>
          {categories && categories.length > 0 && (
            <p className="text-muted-foreground text-xs md:text-sm mb-3">
              {categories.map((cat) => cat.name).join(", ")}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs md:text-sm text-muted-foreground ml-1">
              (4.0)
            </span>
          </div>
        </div>

        {/* Price and Action */}
        <div
          className={`flex items-center justify-between ${viewMode === "list" ? "mt-auto" : ""}`}
        >
          <div className="flex flex-col">
            {discountAmount ? (
              <>
                <span className="text-lg md:text-xl font-bold text-amaranth-600">
                  ${finalPrice?.toFixed(2)}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground line-through">
                  ${originalPrice?.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg md:text-xl font-bold text-amaranth-600">
                ${finalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 text-white rounded-full px-4 transition-all duration-300 hover:scale-105"
            onClick={handleAddToCart}
            disabled={!sku || !availableQuantity}
          >
            <BookOpen size={16} />
            {sku && availableQuantity ? "Add" : "Out of Stock"}
          </Button>
        </div>
      </div>

      {/* Decorative corner shape */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amaranth-200/30 to-transparent rounded-tl-full"></div>
    </Card>
  );
};

export default ProductCard;
