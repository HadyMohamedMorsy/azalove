import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, CreditCard, Eye } from "lucide-react";

const OrderHistory = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-06-01",
      status: "delivered",
      total: 129.99,
      items: 3,
      products: ["Wireless Headphones", "Phone Case", "USB Cable"],
    },
    {
      id: "ORD-002",
      date: "2024-05-28",
      status: "shipped",
      total: 89.5,
      items: 2,
      products: ["Smart Watch Band", "Screen Protector"],
    },
    {
      id: "ORD-003",
      date: "2024-05-20",
      status: "processing",
      total: 199.99,
      items: 1,
      products: ["Bluetooth Speaker"],
    },
    {
      id: "ORD-004",
      date: "2024-05-15",
      status: "cancelled",
      total: 45.0,
      items: 2,
      products: ["Phone Charger", "Cable Organizer"],
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

  return (
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
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />${order.total}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {order.products.join(", ")}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
