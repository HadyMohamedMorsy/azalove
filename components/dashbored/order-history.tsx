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
import PaginationWrapper from "@/components/ui/pagination-wrapper";
import { usePagination } from "@/hooks/use-pagination";
import { useTranslation } from "@/hooks/use-translation";
import { useUserOrders } from "@/hooks/use-user-orders";
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

// Order Item Interface
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order Details Interface
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { orders, loading, error, totalRecords } = useUserOrders(
    currentPage,
    itemsPerPage
  );

  const pagination = usePagination({
    totalRecords,
    itemsPerPage,
    initialPage: currentPage,
  });

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination.setCurrentPage(page);
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-cream-100">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg bg-cream-100">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => setCurrentPage(1)} variant="outline">
              {t("common.retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-cream-100">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-amber-900" />
            <CardTitle className="text-2xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
              {t("orderHistory.title")}
            </CardTitle>
            <Sparkles className="w-6 h-6 text-amber-900" />
          </div>
          <CardDescription className="text-lg text-gray-600">
            {t("orderHistory.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!orders.data || orders.data.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t("orderHistory.noOrders")}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {orders.data.map((order: OrderDetails) => (
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
                              <Package className="w-5 h-5 text-amber-900" />
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
                              <Calendar className="w-4 h-4 text-amber-900" />
                              <span>
                                {t("orderHistory.orderDate")}:{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Package className="w-4 h-4 text-amber-900" />
                              <span>
                                {order.items.length}{" "}
                                {order.items.length === 1
                                  ? t("orderHistory.item")
                                  : t("orderHistory.items")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <CreditCard className="w-4 h-4 text-amber-900" />
                              <span className="font-semibold text-amaranth-900">
                                ${order.total}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 italic">
                            {order.items
                              .map((item: OrderItem) => item.name)
                              .join(", ")}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                            className="group-hover:bg-rose-50 group-hover:border-rose-300 group-hover:text-amber-900 transition-colors"
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

              {/* Pagination */}
              {totalRecords > itemsPerPage && (
                <div className="mt-8 flex justify-center">
                  <PaginationWrapper
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}

              {/* Results Info */}
              <div className="mt-4 text-center text-sm text-gray-600">
                {pagination.resultsText}
              </div>
            </>
          )}
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
