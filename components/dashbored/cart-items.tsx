"use client";

import { useCart } from "@/contexts/cart-context";
import { useTranslation } from "@/hooks/use-translation";
import { Heart, Sparkles } from "lucide-react";
import CartCard from "../dashboard/cart-components/cart-card";
import CartItemsList from "../dashboard/cart-components/cart-items-list";
import CartSummary from "../dashboard/cart-components/cart-summary";
import CartWrapper from "../dashboard/cart-components/cart-wrapper";

const CartItems = () => {
  const { cartItems, getTotalPrice } = useCart();
  const { t, locale } = useTranslation();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Romantic Header */}
      <div className="text-center py-8 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            {t("cart.cartTitle")}
          </h1>
          <Sparkles className="w-8 h-8 text-purple-500 animate-bounce" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("cart.cartDescription")}
        </p>
      </div>

      <CartWrapper
        header={
          <CartCard>
            <CartItemsList />
          </CartCard>
        }
      >
        <CartSummary
          subtotal={subtotal}
          total={total}
          disabled={cartItems.length === 0}
        />
      </CartWrapper>
    </div>
  );
};

export default CartItems;
