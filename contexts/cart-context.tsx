"use client";

import { AppliedCoupon, CartItem } from "@/types";
import { localStorageKeys, localStorageUtils } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

interface ShippingData {
  address: any;
  shipment: any;
  locationType: string;
  locationName: string;
}

interface CartContextType {
  cartItems: CartItem[];
  shippingData: ShippingData | null;
  appliedCoupon: AppliedCoupon | null;
  getItemQuantity: (id: string) => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => number;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  updateShippingData: (data: ShippingData) => void;
  getShippingCost: () => number;
  getTotalWithShipping: () => number;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  getDiscountAmount: () => number;
  getTotalWithDiscount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );

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
    const item = cartItems.find((item) => item.id === id);
    const quantity = item?.quantity || 0;
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    return quantity;
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
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateShippingData = (data: ShippingData) => {
    setShippingData(data);
  };

  const getShippingCost = () => {
    if (!shippingData) return 0;
    // Add your shipping calculation logic here
    return 0;
  };

  const getTotalWithShipping = () => {
    return getTotalPrice() + getShippingCost();
  };

  const applyCoupon = (coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percentage") {
      return (getTotalPrice() * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const getTotalWithDiscount = () => {
    return getTotalWithShipping() - getDiscountAmount();
  };

  const value: CartContextType = {
    cartItems,
    shippingData,
    appliedCoupon,
    getItemQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    updateShippingData,
    getShippingCost,
    getTotalWithShipping,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getTotalWithDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
