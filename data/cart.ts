export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 299.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg",
  },
];

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08;
};

export const calculateShipping = (subtotal: number): number => {
  return subtotal > 100 ? 0 : 10;
};

export const calculateTotal = (
  subtotal: number,
  tax: number,
  shipping: number
): number => {
  return subtotal + tax + shipping;
};
