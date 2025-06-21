import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import { Product, productBySlug } from "@/types/product";
import {
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import ProductGrid from "../product-grid";
import ImageGallery from "./image-gallary";
import ProductReviews from "./product-reviews";
import ProductSpecs from "./product-spec";

const ProductView = () => {
  const params = useParams();
  const { data, loading, error } = useFetch<productBySlug>(
    `/api/product/by-slug/${params.productslug}`
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const { toast } = useToast();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const getAvailableQuantity = () => {
    if (!product.sku?.quantity) return 0;
    return product.sku.quantity - getItemQuantity(product.id.toString());
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !data?.data?.product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        Error: {error || "Product not found"}
      </div>
    );
  }

  const { product, relatedProducts } = data.data;
  const discount = product.sku?.discount
    ? Math.round((Number(product.sku.discount) / product.sku.price) * 100)
    : 0;

  const calculateDiscount = () => {
    if (!product.sku?.discount) {
      return { finalPrice: product.sku?.price ?? 0 };
    }

    const { price, discount, discountType } = product.sku;
    const discountAmount =
      discountType === "percentage"
        ? (Number(price) * Number(discount)) / 100
        : Number(discount);

    return {
      finalPrice: Number(price) - Number(discountAmount),
    };
  };

  const { finalPrice } = calculateDiscount();

  const handleAddToCart = () => {
    if (!product.sku?.quantity) return;

    const availableQuantity = getAvailableQuantity();
    if (availableQuantity <= 0) {
      toast({
        title: "Cannot add more",
        description: `You've reached the maximum available quantity for ${name}.`,
      });
      return;
    }

    addToCart({
      id: product.id.toString(),
      finalPrice: finalPrice ?? product.sku?.price,
      skuQuantity: product.sku?.quantity,
      name: product.name,
      price: product.sku?.price,
      image: product.images?.[0] ?? "",
      quantity: quantity,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
    const isItemFavorite = isFavorite(product.id);

    if (isItemFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
        description: `${name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.sku?.price ?? 0,
        finalPrice: finalPrice ?? product.sku?.price ?? 0,
        image: product.images?.[0] ?? "",
      });
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: product.name }]}
      />

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        {product.images && (
          <div className="space-y-4">
            <ImageGallery images={product.images} />
          </div>
        )}

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className={`${
                  quantity >= product.sku?.quantity
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {quantity >= product.sku?.quantity
                  ? "Out of Stock"
                  : "In Stock"}
              </Badge>
              {discount > 0 && (
                <Badge variant="destructive">
                  {product.sku?.discountType === "percentage"
                    ? `${product.sku?.discount}% OFF`
                    : `$${product.sku?.discount} OFF`}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  {product.rating || 0} (
                  {product.rating ? "reviews" : "No reviews"})
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              ${finalPrice?.toFixed(2)}
            </span>
            {product.sku?.discount && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.sku?.price}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  disabled={quantity >= product.sku?.quantity}
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <Button
                disabled={quantity >= product.sku?.quantity}
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {quantity >= product.sku?.quantity
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="lg" className="w-full">
              Buy Now
            </Button>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      Orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">2 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">
                      Full coverage
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">30 Day Returns</p>
                    <p className="text-xs text-muted-foreground">
                      No questions asked
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="reviews" className="mb-16">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          {/* <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger> */}
        </TabsList>
        <TabsContent value="reviews" className="mt-8">
          <ProductReviews reviews={product.reviews} />
        </TabsContent>
        <TabsContent value="specifications" className="mt-8">
          <ProductSpecs specifications={product.specifications} />
        </TabsContent>
      </Tabs>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <ProductGrid
            products={relatedProducts as Product[]}
            gridCols={{
              lg: 4,
              md: 3,
              sm: 2,
              default: 1,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductView;
