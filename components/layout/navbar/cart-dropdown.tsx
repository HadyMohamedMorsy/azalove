"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { useCurrency } from "@/hooks/use-currency";
import { useTranslation } from "@/hooks/use-translation";
import { Gift, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CartItemCard } from "../../dashboard/cart-components/cart-item-card";

export function CartDropdown() {
  const {
    cartItems,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
        >
          <Heart className="h-7 w-7 text-rose-500 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300" />
          {getTotalItems() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-96 p-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl rounded-xl border-0 overflow-hidden"
        align="end"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-pink-100/20 to-rose-100/20 pointer-events-none"></div>
        <div className="space-y-4 relative">
          <div className="border-b border-rose-200 pb-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-500" />
              {t("cart.loveCollection")}
            </h3>
            <span className="text-sm text-rose-600 flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {cartItems.length} {t("cart.items")}
            </span>
          </div>

          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <div className="text-center text-rose-500 py-8">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-rose-400" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {t("cart.emptyTitle")}
                </h3>
                <p className="text-sm text-rose-600">
                  {t("cart.emptyDescription")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item: any) => (
                  <CartItemCard
                    key={`${item.id}-${item.selectedColor}`}
                    item={item}
                    variant="dropdown"
                  />
                ))}
              </div>
            )}
          </CardContent>

          {cartItems.length > 0 && (
            <div className="border-t border-rose-200 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {t("cart.total")}: {formatCurrency(getTotalPrice())}
                </span>
                <span className="text-sm text-rose-600 flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {getTotalItems()} {t("cart.items")}
                </span>
              </div>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {t("cart.continueLoveStory")}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-rose-300 text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 font-medium py-3 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    href="/dashboard?tab=cart"
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    {t("cart.viewLoveCollection")}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
