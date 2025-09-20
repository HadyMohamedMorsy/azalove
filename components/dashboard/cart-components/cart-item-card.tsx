"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config/api";
import { useCart } from "@/contexts/cart-context";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCurrency } from "@/hooks/use-currency";
import { useGlobalAnalytics } from "@/hooks/use-global-analytics";
import { useTranslation } from "@/hooks/use-translation";
import { CartItem } from "@/types";
import { Heart, Minus, Plus, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemCardProps {
  item: CartItem;
  variant?: "dropdown" | "list";
}

export function CartItemCard({ item, variant = "list" }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const { trackRemoveFromCart } = useGlobalAnalytics();
  const { settings } = useGeneralSettings();

  // Get currency from settings, fallback to USD if not set
  const currency = settings?.default_currency || "USD";

  // Use finalPrice if available, otherwise use price
  const displayPrice = item.finalPrice || item.price;
  const hasDiscount = item.finalPrice && item.finalPrice < item.price;

  const handleRemoveFromCart = () => {
    // Track remove from cart event
    trackRemoveFromCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: "General",
      currency: currency,
    });

    removeFromCart(item.id);
  };

  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity < 1) return;

    // If quantity is reduced to 0, track as remove from cart
    if (newQuantity === 0) {
      handleRemoveFromCart();
      return;
    }

    updateQuantity(item.id, newQuantity);
  };

  if (variant === "dropdown") {
    return (
      <Card className="border bg-cream-100">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center overflow-hidden relative">
              <Image
                src={`${API_BASE_URL}${item.image}`}
                alt={item.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-1 -right-1">
                <Heart className="w-3 h-3 text-amaranth-900" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                {hasDiscount ? (
                  <>
                    <span className="text-sm font-bold text-amaranth-900">
                      {formatCurrency(displayPrice)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {formatCurrency(item.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-gray-900">
                    {formatCurrency(displayPrice)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 border-rose-300 hover:bg-rose-50 text-amaranth-900"
                onClick={() => handleQuantityUpdate(item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-6 text-center text-gray-700">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 border-rose-300 hover:bg-rose-50 text-amaranth-900"
                onClick={() => handleQuantityUpdate(item.quantity + 1)}
                disabled={item.quantity >= item.skuQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-400 hover:text-amber-900 hover:bg-rose-50"
                onClick={handleRemoveFromCart}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex gap-4 p-6 border border-rose-200 rounded-xl bg-cream-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-amaranth-900 pointer-events-none"></div>

      <div className="relative z-10 w-24 h-24 bg-cream-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
        <Image
          src={`${API_BASE_URL}${item.image}`}
          alt={item.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
        <div className="absolute -top-1 -right-1">
          <Heart className="w-4 h-4 text-amber-900" />
        </div>
      </div>

      <div className="flex-1 space-y-3 relative z-10">
        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
        <div className="flex items-center space-x-3">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
                {formatCurrency(displayPrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(item.price)}
              </span>
              <div className="flex items-center gap-1 bg-cream-100 px-2 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amaranth-900" />
                <span className="text-xs font-medium text-amber-900">
                  {t("cart.specialOffer")}
                </span>
              </div>
            </>
          ) : (
            <span className="text-xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
              {formatCurrency(displayPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between relative z-10">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-amber-900 hover:bg-rose-50 rounded-full"
          onClick={handleRemoveFromCart}
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-rose-300 hover:bg-rose-50 text-amaranth-900 rounded-full"
            onClick={() => handleQuantityUpdate(item.quantity - 1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Input
            value={item.quantity}
            onChange={(e) =>
              handleQuantityUpdate(parseInt(e.target.value) || 1)
            }
            className="w-16 text-center border-rose-300 focus:border-amber-900 focus:ring-amber-500 rounded-full"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            className="border-rose-300 hover:bg-rose-50 text-amaranth-900 rounded-full"
            onClick={() => handleQuantityUpdate(item.quantity + 1)}
            disabled={item.quantity >= item.skuQuantity}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
