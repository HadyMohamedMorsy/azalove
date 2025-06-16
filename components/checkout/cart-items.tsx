"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const CartItems = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState([
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
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    console.log("checkout");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart
            </CardTitle>
            <CardDescription>
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
              cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground">
                  Add some items to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <div className="text-sm text-muted-foreground text-center">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </div>
            )}

            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
              disabled={cartItems.length === 0}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartItems;
