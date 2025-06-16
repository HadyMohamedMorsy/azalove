"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
};

interface CartItemsListProps {
  onCartChange?: (items: CartItem[]) => void;
}

export default function CartItemsList({ onCartChange }: CartItemsListProps) {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "/placeholder.svg",
      color: "Black",
      size: "One Size",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg",
      color: "Silver",
      size: "42mm",
    },
    {
      id: 3,
      name: "Premium Phone Case",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg",
      color: "Clear",
      size: "iPhone 15",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) => {
      const newItems = prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      onCartChange?.(newItems);
      return newItems;
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      onCartChange?.(newItems);
      return newItems;
    });
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-16 h-16 object-cover rounded"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="font-medium">{item.name}</h3>
            <div className="text-sm text-muted-foreground">
              Color: {item.color} • Size: {item.size}
            </div>
            <div className="text-lg font-bold">${item.price}</div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Input
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                }
                className="w-16 text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
