"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCurrency } from "@/hooks/use-currency";
import { useFetch } from "@/hooks/use-fetch";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { Product, productBySlug } from "@/types/product";
import {
  Crown,
  Gift,
  Heart,
  HelpCircle,
  RotateCcw,
  Share2,
  ShoppingCart,
  Sparkles,
  Star
} from "lucide-react";

import { useState } from "react";
import StructuredData from "../../seo/structured-data";
import ProductGrid from "../product-grid";
import ImageGallery from "./image-gallary";
import ProductReviews from "./product-reviews";
import ProductSpecs from "./product-spec";

interface ProductViewProps {
  params: { productslug: string };
}

const ProductView = ({ params }: ProductViewProps) => {
  const { data, loading, error } = useFetch<productBySlug>(
    `/api/product/by-slug/${params.productslug}`
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getItemQuantity } = useCart();
  const { toast } = useToast();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const { settings } = useGeneralSettings();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azalove-500 mx-auto"></div>
            <p className="text-azalove-600 font-medium">
              {t("product.loading")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data?.product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="text-amaranth-500 text-6xl mb-4">💔</div>
          <h2 className="heading-section text-royal-700">
            {t("product.error")}
          </h2>
          <p className="body-medium text-muted-foreground">
            {error || t("product.notFound")}
          </p>
        </div>
      </div>
    );
  }

  const { product, relatedProducts } = data.data;

  // Get FAQ data from the backend product data
  const faqData = product?.faqs || [];

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

  const getAvailableQuantity = () => {
    const currentQuantity = getItemQuantity(product.id.toString());
    return Math.max(0, (product.sku?.quantity || 0) - currentQuantity);
  };

  const handleAddToCart = () => {
    if (!product.sku?.quantity) return;

    const availableQuantity = getAvailableQuantity();
    if (availableQuantity <= 0) {
      toast({
        title: "Cannot add more",
        description: `You've reached the maximum available quantity for ${product.name}.`,
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
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: finalPrice ?? product.sku?.price ?? 0,
        originalPrice: product.sku?.price ?? 0,
        image: product.images?.[0] ?? "",
      });
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing product: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Product link has been copied to clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Product link has been copied to clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Error",
          description: "Unable to share. Please try again.",
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-cream-100">
      {/* Romantic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float-slow">
          <Sparkles className="w-8 h-8 text-azalove-300" />
        </div>
        <div className="absolute top-40 right-20 animate-float-medium">
          <Heart className="w-6 h-6 text-amaranth-300" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float-fast">
          <Sparkles className="w-5 h-5 text-royal-300" />
        </div>
        <div className="absolute top-60 left-1/4 animate-float-slow">
          <Gift className="w-4 h-4 text-azalove-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: product.name }]}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          {product.images && (
            <div className="space-y-4">
              <div className="relative group">
                <div className="relative">
                  <ImageGallery images={product.images} />
                </div>
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="relative">
              {/* Status Badges */}
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className={`${
                    quantity >= product.sku?.quantity
                      ? "bg-royal-900"
                      : "bg-amaranth-900"
                  } border shadow-sm`}
                >
                  {quantity >= product.sku?.quantity
                    ? t("product.outOfStock")
                    : t("product.inStock")}
                </Badge>
                {discount > 0 && (
                  <Badge className="bg-amaranth-900 text-white border-0 shadow-lg">
                    {product.sku?.discountType === "percentage"
                      ? `${product.sku?.discount}% ${t("product.off")}`
                      : `$${product.sku?.discount} ${t("product.off")}`}
                  </Badge>
                )}
              </div>

              {/* Product Title */}
              <h1 className="heading-section mb-4 bg-royal-900 bg-clip-text text-transparent">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < (product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="body-tiny text-muted-foreground">
                    {product.rating || 0} (
                    {product.rating
                      ? t("product.reviews")
                      : t("product.noReviews")}
                    )
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="relative p-6 bg-gradient-to-br from-cream-50 to-azalove-50 rounded-2xl border border-azalove-200">
              <div className="absolute top-2 right-2">
                <Crown className="w-5 h-5 text-azalove-500" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-responsive-4xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
                  {formatCurrency(finalPrice || 0)}
                </span>
                {product.sku?.discount && (
                  <span className="text-responsive-xl text-muted-foreground line-through">
                    {formatCurrency(product.sku?.price || 0)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Information */}
            <div className="p-4 bg-cream-100 rounded-xl border border-azalove-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-royal-700">
                    {t("product.availableStock")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-azalove-600">
                    {getAvailableQuantity()}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {t("product.units")}
                  </span>
                </div>
              </div>
              {getAvailableQuantity() <= 10 && getAvailableQuantity() > 0 && (
                <div className="mt-2 text-xs text-amaranth-600 font-medium">
                  ⚠️ {t("product.lowStock")} - {t("product.hurryUp")}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-azalove-100">
              <p className="body-medium text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-azalove-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-azalove-50 transition-colors text-azalove-600 font-semibold"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 border-x border-azalove-200 font-semibold text-royal-700">
                    {quantity}
                  </span>
                  <button
                    disabled={quantity >= getAvailableQuantity()}
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-azalove-50 transition-colors text-azalove-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("product.availableQuantity")}: {getAvailableQuantity()}
                </div>
                <Button
                  disabled={
                    quantity > getAvailableQuantity() ||
                    getAvailableQuantity() <= 0
                  }
                  size="lg"
                  className="flex-1 bg-amaranth-900  text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {getAvailableQuantity() <= 0
                    ? t("product.outOfStock")
                    : quantity > getAvailableQuantity()
                      ? t("product.exceedsAvailable")
                      : t("product.addToCart")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amaranth-200 hover:border-amaranth-300 hover:bg-amaranth-50 transition-all duration-300"
                  onClick={handleToggleFavorite}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(product.id)
                        ? "fill-amaranth-500 text-amaranth-500"
                        : "text-amaranth-500"
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-royal-200 hover:border-royal-300 hover:bg-royal-50 transition-all duration-300"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 text-royal-500" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  quantity > getAvailableQuantity() ||
                  getAvailableQuantity() <= 0
                }
                onClick={handleAddToCart}
              >
                {getAvailableQuantity() <= 0
                  ? t("product.outOfStock")
                  : quantity > getAvailableQuantity()
                    ? t("product.exceedsAvailable")
                    : t("product.buyNow")}
              </Button>
            </div>

            {/* Shipping Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-cream-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div className="flex flex-col items-center gap-3 group">
                    <div className="p-3 bg-gradient-to-br from-royal-100 to-royal-200 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <RotateCcw className="w-6 h-6 text-royal-600" />
                    </div>
                    <div>
                      <p className="body-tiny font-semibold text-royal-700">
                        {`${settings?.shipping_days} يوم`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("product.noQuestionsAsked")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 group">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 text-green-600 font-bold text-lg">
                        📦
                      </div>
                    </div>
                    <div>
                      <p className="body-tiny font-semibold text-royal-700">
                        {t("product.inStock")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getAvailableQuantity()} {t("product.units")}
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
          <TabsList
            className={`grid w-full ${faqData.length > 0 ? "grid-cols-3" : "grid-cols-2"} bg-cream-100 border-2 border-azalove-200`}
          >
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-amaranth-900 data-[state=active]:text-white"
            >
              {t("product.customerReviews")}
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-amaranth-900 data-[state=active]:text-white"
            >
              {t("product.specifications")}
            </TabsTrigger>
            {faqData.length > 0 && (
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-amaranth-900 data-[state=active]:text-white"
              >
                {t("product.faq")}
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="reviews" className="mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-azalove-100 p-6">
              <ProductReviews reviews={product.reviews} />
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-azalove-100 p-6">
              <ProductSpecs specifications={product.specifications} />
            </div>
          </TabsContent>
          {faqData.length > 0 ? (
            <TabsContent value="faq" className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-azalove-100 p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-royal-700 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-azalove-500" />
                    {t("product.faq")}
                  </h3>
                  <p className="text-muted-foreground">
                    Find answers to commonly asked questions about this product
                  </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem
                      key={faq.id || index}
                      value={`faq-${faq.id || index}`}
                      className="border-b border-azalove-200 last:border-b-0"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-royal-700 hover:text-royal-900 transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* FAQ Structured Data */}
                <StructuredData
                  data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqData.map((faq, index) => ({
                      "@type": "Question",
                      name: faq.question,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                      },
                    })),
                  }}
                />
              </div>
            </TabsContent>
          ) : (
            <TabsContent value="faq" className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-azalove-100 p-6">
                <div className="text-center py-8">
                  <HelpCircle className="w-16 h-16 text-azalove-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-royal-700 mb-2">
                    No FAQs Available
                  </h3>
                  <p className="text-muted-foreground">
                    This product doesn't have any frequently asked questions
                    yet.
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="heading-section bg-amaranth-900 bg-clip-text text-transparent">
                {t("product.relatedProducts")}
              </h2>
              <div className="w-24 h-1 bg-amaranth-900 mx-auto mt-4 rounded-full"></div>
            </div>
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
    </div>
  );
};

export default ProductView;
