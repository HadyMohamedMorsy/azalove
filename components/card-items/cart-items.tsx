import { CartItem } from "@/data/cart";
import React from "react";
import CardItem from "./card-item";

interface CartItemsProps {
  showUnitPrice?: boolean;
  showQuantitySelect?: boolean;
  showRemoveButton?: boolean;
  cartItems: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  showUnitPrice = false,
  showQuantitySelect = false,
  showRemoveButton = false,
}) => {
  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          quantity={item.quantity}
          showUnitPrice={showUnitPrice}
          showQuantitySelect={showQuantitySelect}
          showRemoveButton={showRemoveButton}
        />
      ))}
    </div>
  );
};

export default CartItems;
