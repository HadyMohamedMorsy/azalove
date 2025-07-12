"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config/api";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  finalPrice: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  skuQuantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  variant?: "dropdown" | "list";
}

export function CartItemCard({ item, variant = "list" }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  if (variant === "dropdown") {
    return (
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <Image
              src={`${API_BASE_URL}${item.image}`}
              alt={item.name}
              width={100}
              height={100}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-amaranth-600">
                ${item.finalPrice?.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ${item.price?.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.skuQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                onClick={() => removeFromCart(item.id)}
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
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        <Image
          src={`${API_BASE_URL}${item.image}`}
          alt={item.name}
          width={100}
          height={100}
          className="w-16 h-16 object-cover rounded"
        />
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="font-medium">{item.name}</h3>
        <div className="text-lg font-bold">${item.finalPrice}</div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.id)}
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
  );
}
