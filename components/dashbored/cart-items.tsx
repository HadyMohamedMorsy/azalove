"use client";

import { useState } from "react";
import CartCard from "../dashboard/cart-components/cart-card";
import CartItemsList, {
  CartItem,
} from "../dashboard/cart-components/cart-items-list";
import CartSummary from "../dashboard/cart-components/cart-summary";
import CartWrapper from "../dashboard/cart-components/cart-wrapper";

const CartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleCartChange = (items: CartItem[]) => {
    setCartItems(items);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <CartWrapper
      header={
        <CartCard>
          <CartItemsList onCartChange={handleCartChange} />
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
