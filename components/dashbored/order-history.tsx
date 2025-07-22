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
import { useTranslation } from "@/hooks/use-translation";
import {
  Calendar,
  CreditCard,
  Eye,
  Heart,
  Package,
  Sparkles,
} from "lucide-react";
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
  const { t, locale } = useTranslation();

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
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    return t(`orderHistory.status.${status}`);
  };

  const handleViewDetails = (order: OrderDetails) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {t("orderHistory.title")}
            </CardTitle>
            <Sparkles className="w-6 h-6 text-rose-500" />
          </div>
          <CardDescription className="text-lg text-gray-600">
            {t("orderHistory.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-rose-200 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-rose-500" />
                          <h3 className="font-bold text-lg text-gray-800">
                            {t("orderHistory.orderId")}: {order.id}
                          </h3>
                        </div>
                        <Badge
                          className={`${getStatusColor(order.status)} font-semibold px-3 py-1`}
                        >
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-rose-400" />
                          <span>
                            {t("orderHistory.orderDate")}:{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Package className="w-4 h-4 text-rose-400" />
                          <span>
                            {order.items.length}{" "}
                            {order.items.length === 1
                              ? t("orderHistory.item")
                              : t("orderHistory.items")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <CreditCard className="w-4 h-4 text-rose-400" />
                          <span className="font-semibold text-rose-600">
                            ${order.total}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 italic">
                        {order.items.map((item) => item.name).join(", ")}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                        className="group-hover:bg-rose-50 group-hover:border-rose-300 group-hover:text-rose-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {t("orderHistory.viewDetails")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
