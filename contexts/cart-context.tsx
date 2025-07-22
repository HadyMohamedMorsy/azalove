"use client";

import { CartItem } from "@/types";
import { localStorageKeys, localStorageUtils } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartItems: CartItem[];
  getItemQuantity: (id: string) => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorageUtils.getItem<CartItem[]>(
      localStorageKeys.CART,
      []
    );
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorageUtils.setItem(localStorageKeys.CART, cartItems);
  }, [cartItems]);

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item?.quantity || 0;
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Don't add if it would exceed SKU quantity
        if (existingItem.quantity + item.quantity > existingItem.skuQuantity) {
          return prevItems;
        }
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }

      // Don't add if initial quantity exceeds SKU quantity
      if (item.quantity > item.skuQuantity) {
        return prevItems;
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (!item || quantity > item.skuQuantity) return prevItems;

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Use finalPrice if available, otherwise use price
      const itemPrice = item.finalPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getItemQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
