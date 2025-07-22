"use client";

import { useCart } from "@/contexts/cart-context";
import { useTranslation } from "@/hooks/use-translation";
import { Flower2, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { CartItemCard } from "./cart-item-card";

export default function CartItemsList() {
  const { cartItems } = useCart();
  const { t, locale } = useTranslation();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-12 h-12 text-rose-400" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </div>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          {t("cart.emptyTitle")}
        </h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          {t("cart.emptyDescription")}
        </p>
        <div className="flex items-center justify-center gap-2 text-purple-500">
          <Flower2 className="w-4 h-4" />
          <span className="text-sm font-medium">{t("cart.readyToLove")}</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-rose-500" />
        <span className="text-lg font-semibold text-gray-700">
          {t("cart.loveCollection")} ({cartItems.length} {t("cart.items")})
        </span>
      </div>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} item={item} variant="list" />
      ))}
    </div>
  );
}
