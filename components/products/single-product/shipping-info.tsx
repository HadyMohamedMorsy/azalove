import { Card, CardContent } from "@/components/ui/card";

const ShippingInfo = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium">Standard Shipping</h4>
            <p className="text-muted-foreground">
              5-7 business days - Free on orders over $50
            </p>
          </div>
          <div>
            <h4 className="font-medium">Express Shipping</h4>
            <p className="text-muted-foreground">2-3 business days - $9.99</p>
          </div>
          <div>
            <h4 className="font-medium">Returns</h4>
            <p className="text-muted-foreground">
              30-day return policy. Items must be in original condition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingInfo;
