import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package } from "lucide-react";

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
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Order Number:</p>
              <p className="text-muted-foreground">{orderNumber}</p>
            </div>
            <div>
              <p className="font-medium">Order Date:</p>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-muted-foreground">{shippingData.email}</p>
            </div>
            <div>
              <p className="font-medium">Payment Method:</p>
              <p className="text-muted-foreground capitalize">
                {paymentData.paymentMethod}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Shipping Address:</h4>
            <p className="text-sm text-muted-foreground">
              {shippingData.firstName} {shippingData.lastName}
              <br />
              {shippingData.address}
              <br />
              {shippingData.city}, {shippingData.postalCode}
              <br />
              {shippingData.country}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button variant="outline">Download Receipt</Button>
        <Button onClick={() => (window.location.href = "/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
