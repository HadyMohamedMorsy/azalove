"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Heart,
  Mail,
  MapPin,
  Package,
  Phone,
  Sparkles,
  Truck,
  XCircle,
} from "lucide-react";

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

interface OrderDetailsDialogProps {
  order: OrderDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsDialog = ({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) => {
  const { t, locale } = useTranslation();

  if (!order) return null;

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "delivered":
        return "Your order has been successfully delivered.";
      case "shipped":
        return "Your order is on its way to you.";
      case "processing":
        return "We're preparing your order for shipment.";
      case "cancelled":
        return "This order has been cancelled.";
      default:
        return "Order status unknown.";
    }
  };

  const getStatusText = (status: string) => {
    return t(`orderHistory.status.${status}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-cream-100">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-amber-900" />
            <DialogTitle className="text-2xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
              {t("orderHistory.orderDetails.title")} - {order.id}
            </DialogTitle>
            <Sparkles className="w-6 h-6 text-amber-900" />
          </div>
          <DialogDescription className="text-lg text-gray-600">
            {t("orderHistory.orderDetails.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-rose-100">
            <div className="flex items-center gap-3 mb-3">
              {getStatusIcon(order.status)}
              <Badge
                className={`${getStatusColor(order.status)} font-semibold px-3 py-1`}
              >
                {getStatusText(order.status)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {getStatusDescription(order.status)}
            </p>
            {order.trackingNumber && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-blue-800">
                  {t("orderHistory.orderDetails.trackingNumber")}:
                </p>
                <p className="text-sm text-blue-600 font-mono">
                  {order.trackingNumber}
                </p>
              </div>
            )}
            {order.estimatedDelivery && (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-semibold">
                  {t("orderHistory.orderDetails.estimatedDelivery")}:
                </span>{" "}
                {order.estimatedDelivery}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Information */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-rose-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                {t("orderHistory.orderDetails.orderInformation")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-amber-900" />
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t("orderHistory.orderDate")}:
                    </span>
                    <span className="text-gray-600 ml-2">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="w-5 h-5 text-amber-900" />
                  <div>
                    <span className="font-semibold text-gray-700">
                      {t("orderHistory.orderDetails.payment")}:
                    </span>
                    <span className="text-gray-600 ml-2">
                      {order.paymentMethod.type} ending in{" "}
                      {order.paymentMethod.last4}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-rose-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">
                {t("orderHistory.orderDetails.shippingAddress")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-900 mt-1" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {order.shippingAddress.name}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-amber-900" />
                  <span className="text-gray-600">
                    {order.shippingAddress.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-rose-200" />

          {/* Order Items */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-rose-100">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              {t("orderHistory.orderDetails.orderItems")}
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-cream-100 rounded-lg border border-rose-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-amaranth-900" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {t("orderHistory.orderDetails.quantity")}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-amaranth-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}{" "}
                      {t("orderHistory.orderDetails.each")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-rose-200" />

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-rose-100">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              {t("orderHistory.orderDetails.orderSummary")}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("cart.subtotal")}</span>
                <span className="font-semibold">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("cart.shipping")}</span>
                <span className="font-semibold">
                  ${order.shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("cart.tax")}</span>
                <span className="font-semibold">${order.tax.toFixed(2)}</span>
              </div>
              <Separator className="bg-rose-200" />
              <div className="flex justify-between font-bold text-lg text-amaranth-900">
                <span>{t("cart.total")}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              className="flex-1 bg-white/80 hover:bg-rose-50 border-rose-200 text-amber-900"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t("orderHistory.orderDetails.contactSupport")}
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              <Package className="w-4 h-4 mr-2" />
              {t("orderHistory.orderDetails.reorder")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
