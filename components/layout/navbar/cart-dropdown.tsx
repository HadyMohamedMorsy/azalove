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
import { ShoppingCart } from "lucide-react";
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
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          <h3 className="heading-small">Shopping Cart</h3>
          <span className="body-tiny text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>

          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                <p>Your cart is empty.</p>
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
                <Button
                  asChild
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/dashboard?tab=cart">View Cart</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
