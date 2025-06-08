import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";
import { Sku } from "@/types/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!sku || sku?.quantity <= 0) return;

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
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${name} has been ${isFavorited ? "removed from" : "added to"} your favorites.`,
    });
  };

  const handleViewProduct = () => {
    toast({
      title: "View product",
      description: `Opening ${name} details...`,
    });
  };

  const calculateDiscount = () => {
    if (!sku || sku?.discount <= 0)
      return { finalPrice: sku?.price, discount: 0 };

    let finalPrice = sku?.price;
    let discount = 0;

    if (sku?.discountType === "percentage") {
      discount = sku?.discount;
      finalPrice = sku?.price - sku?.price * (sku?.discount / 100);
    } else if (sku?.discountType === "fixed") {
      finalPrice = sku?.price - sku?.discount;
    }

    return { finalPrice, discount };
  };

  const { finalPrice, discount } = calculateDiscount();

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={`${domain}${srcImage}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {sku && sku?.discount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {sku?.discountType === "percentage" ? `${discount}%` : discount}
            </Badge>
          )}
          {sku && sku?.quantity <= 0 && (
            <Badge variant="secondary" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full p-0"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 rounded-full p-0"
            onClick={handleViewProduct}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <span key={index} className="text-[#f75454] text-xs uppercase">
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-web mb-1 line-clamp-2">
          <Link href={`/shop/${slug}`} className="hover:text-blue-500 text-xl">
            {name}
          </Link>
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${finalPrice?.toFixed(2)}</span>
          {sku && sku?.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${sku?.price?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={sku && sku?.quantity <= 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {sku && sku?.quantity > 0 ? "أضف إلى السلة" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
