import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  CreditCard,
  Download,
  Mail,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";

interface OrderConfirmationProps {
  shippingData: any;
  paymentData: any;
}

const OrderConfirmation = ({
  shippingData,
  paymentData,
}: OrderConfirmationProps) => {
  const orderNumber =
    "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-royal-900">
            Order Confirmed!
          </h2>
          <p className="text-royal-600 mt-2 text-lg">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <Badge className="bg-azalove-100 text-azalove-700 border-azalove-200 mt-3">
            Order #{orderNumber}
          </Badge>
        </div>
      </div>

      {/* Order Details Card */}
      <Card className="border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-cream-200">
          <CardTitle className="flex items-center gap-2 text-royal-900">
            <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
              <Package className="w-4 h-4 text-azalove-600" />
            </div>
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-royal-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-royal-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-royal-900">
                    Order Number
                  </p>
                  <p className="text-sm text-royal-600">{orderNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-azalove-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-royal-900">
                    Order Date
                  </p>
                  <p className="text-sm text-royal-600">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-royal-900">Email</p>
                  <p className="text-sm text-royal-600">{shippingData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amaranth-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-amaranth-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-royal-900">
                    Payment Method
                  </p>
                  <p className="text-sm text-royal-600 capitalize">
                    {paymentData.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border-t border-cream-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-azalove-700" />
              </div>
              <h4 className="font-medium text-royal-900">Shipping Address</h4>
            </div>
            <div className="bg-cream-50/50 p-4 rounded-lg">
              <p className="text-sm text-royal-900">
                {shippingData.firstName} {shippingData.lastName}
              </p>
              <p className="text-sm text-royal-600">{shippingData.address}</p>
              <p className="text-sm text-royal-600">
                {shippingData.city}, {shippingData.postalCode}
              </p>
              <p className="text-sm text-royal-600">{shippingData.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-cream-200">
          <CardTitle className="text-royal-900">What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <p className="text-sm text-royal-700">
                Order confirmation email sent
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-azalove-100 flex items-center justify-center">
                <Package className="w-3 h-3 text-azalove-600" />
              </div>
              <p className="text-sm text-royal-700">
                Order will be processed within 24 hours
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-royal-100 flex items-center justify-center">
                <MapPin className="w-3 h-3 text-royal-600" />
              </div>
              <p className="text-sm text-royal-700">
                Tracking information will be sent via email
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button
          variant="outline"
          className="border-cream-300 text-royal-700 hover:bg-cream-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </Button>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-royal-500 hover:bg-azalove-600 text-white"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
