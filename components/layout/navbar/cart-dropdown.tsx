"use client";
import CardPlaceholder from "@/components/placeholder/card-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CartDropdown() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const domain = process.env.MAIN_DOMAIN;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {getTotalItems() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-4" align="end">
        <div className="space-y-4 ">
          <h3 className="font-semibold text-lg">Shopping Cart</h3>

          {cartItems.length === 0 ? (
            <CardPlaceholder
              title="No items in cart"
              description="Start shopping to fill it up with amazing products!"
            />
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {cartItems.map((item: any) => (
                  <Card key={`${item.id}-${item.selectedColor}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={`${domain}${item.image}`}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-bold text-rose-600">
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
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
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">
                    Total: ${getTotalPrice().toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {getTotalItems()} items
                  </span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    View Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
