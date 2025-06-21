"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CreditCard, Eye, Package } from "lucide-react";
import { useState } from "react";
import OrderDetailsDialog from "./order-details-dialog";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  id: string;
  date: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const orders: OrderDetails[] = [
    {
      id: "ORD-001",
      date: "2024-06-01",
      status: "delivered",
      total: 129.99,
      subtotal: 119.99,
      shipping: 5.99,
      tax: 4.01,
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "2",
          name: "Premium Phone Case",
          price: 24.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "3",
          name: "USB-C Cable",
          price: 15.01,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567",
      },
      paymentMethod: {
        type: "Visa",
        last4: "4242",
      },
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "June 5, 2024",
    },
    {
      id: "ORD-002",
      date: "2024-05-28",
      status: "shipped",
      total: 89.5,
      subtotal: 79.5,
      shipping: 5.99,
      tax: 4.01,
      items: [
        {
          id: "4",
          name: "Smart Watch Band",
          price: 39.75,
          quantity: 2,
          image: "/placeholder.svg",
        },
        {
          id: "5",
          name: "Screen Protector",
          price: 9.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567",
      },
      paymentMethod: {
        type: "Mastercard",
        last4: "8888",
      },
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "June 2, 2024",
    },
    {
      id: "ORD-003",
      date: "2024-05-20",
      status: "processing",
      total: 199.99,
      subtotal: 189.99,
      shipping: 5.99,
      tax: 4.01,
      items: [
        {
          id: "6",
          name: "Portable Bluetooth Speaker",
          price: 189.99,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567",
      },
      paymentMethod: {
        type: "Visa",
        last4: "4242",
      },
      estimatedDelivery: "May 25, 2024",
    },
    {
      id: "ORD-004",
      date: "2024-05-15",
      status: "cancelled",
      total: 45.0,
      subtotal: 40.0,
      shipping: 0.0,
      tax: 5.0,
      items: [
        {
          id: "7",
          name: "Phone Charger",
          price: 25.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "8",
          name: "Cable Organizer",
          price: 15.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "+1 (555) 123-4567",
      },
      paymentMethod: {
        type: "PayPal",
        last4: "1234",
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (order: OrderDetails) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order History
          </CardTitle>
          <CardDescription>
            Track your recent orders and view order details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {order.items.length} item
                      {order.items.length > 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />${order.total}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.items.map((item) => item.name).join(", ")}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(order)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <OrderDetailsDialog
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default OrderHistory;
