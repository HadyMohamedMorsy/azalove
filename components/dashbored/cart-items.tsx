"use client";

import { useCart } from "@/contexts/cart-context";
import CartCard from "../dashboard/cart-components/cart-card";
import CartItemsList from "../dashboard/cart-components/cart-items-list";
import CartSummary from "../dashboard/cart-components/cart-summary";
import CartWrapper from "../dashboard/cart-components/cart-wrapper";

const CartItems = () => {
  const { cartItems, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <CartWrapper
      header={
        <CartCard>
          <CartItemsList />
        </CartCard>
      }
    >
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        disabled={cartItems.length === 0}
      />
    </CartWrapper>
  );
};

export default CartItems;
