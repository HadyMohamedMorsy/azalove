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
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config/api";
import { useCart } from "@/contexts/cart-context";
import { useGeneralSettings } from "@/contexts/general-settings-context";
import { useCurrency } from "@/hooks/use-currency";
import { useTranslation } from "@/hooks/use-translation";
import { CouponService } from "@/lib/coupon-service";
import { AppliedCoupon } from "@/types";
import { ShoppingBag, Tag, Truck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderSummary = () => {
  const { t } = useTranslation();
  const {
    cartItems,
    getTotalPrice,
    getShippingCost,
    getTotalWithShipping,
    shippingData,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getTotalWithDiscount,
  } = useCart();
  const { formatCurrency } = useCurrency();
  const { settings, loading } = useGeneralSettings();

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const subtotal = getTotalPrice();
  const shippingCost = getShippingCost();
  const taxRate = settings?.tax_rate || 0;
  const tax = subtotal * (taxRate / 100); // Convert percentage to decimal
  const total = getTotalWithShipping() + tax;
  const discount = getDiscountAmount();

  // Check if applied coupon is still valid when cart changes
  useEffect(() => {
    if (appliedCoupon) {
      const currentSubtotal = getTotalPrice();
      const currentItemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      if (
        currentSubtotal < appliedCoupon.minOrderTotalPrice ||
        currentItemCount < appliedCoupon.minOrderItemCount
      ) {
        removeCoupon();
        setPromoError("لم يعد الكوبون صالحاً بسبب تغيير محتويات السلة");
      }
    }
  }, [cartItems, appliedCoupon, getTotalPrice, removeCoupon]);

  // Clear error when cart changes
  useEffect(() => {
    if (promoError && promoError.includes("لم يعد الكوبون صالحاً")) {
      const timer = setTimeout(() => {
        setPromoError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [promoError]);

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError(t("checkout.orderSummary.promoCodeError"));
      return;
    }

    if (cartItems.length === 0) {
      setPromoError(t("checkout.orderSummary.addProductsFirst"));
      return;
    }

    // Clear any previous errors
    setPromoError("");
    setIsValidating(true);

    try {
      // Prepare products data for backend validation
      const products = cartItems.map((item) => ({
        id: parseInt(item.id),
        amount: item.quantity,
        price: item.price,
      }));

      const response = await CouponService.validateCoupon({
        code: promoCode.trim(),
        products,
      });

      // Check if order meets minimum requirements
      if (subtotal < response.data.minOrderTotalPrice) {
        setPromoError(
          t("checkout.orderSummary.minOrderRequired")
            .replace("{minAmount}", response.data.minOrderTotalPrice.toString())
            .replace("{currentAmount}", subtotal.toString())
        );
        return;
      }

      if (
        cartItems.reduce((sum, item) => sum + item.quantity, 0) <
        response.data.minOrderItemCount
      ) {
        setPromoError(
          t("checkout.orderSummary.minProductCountRequired")
            .replace("{minCount}", response.data.minOrderItemCount.toString())
            .replace(
              "{currentCount}",
              cartItems.reduce((sum, item) => sum + item.quantity, 0).toString()
            )
        );
        return;
      }

      // Apply the coupon
      const couponData: AppliedCoupon = {
        code: promoCode.trim(),
        discount: response.data.discount,
        type: response.data.type,
        couponType: response.data.couponType,
        minOrderTotalPrice: response.data.minOrderTotalPrice,
        minOrderItemCount: response.data.minOrderItemCount,
      };

      applyCoupon(couponData);
      setPromoCode("");
      setPromoError("");
    } catch (error: any) {
      console.error("Coupon validation error:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setPromoError(t("checkout.orderSummary.promoCodeServerError"));
      } else {
        setPromoError(
          error.message || t("checkout.orderSummary.promoCodeValidationError")
        );
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemovePromoCode = () => {
    removeCoupon();
    setPromoError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && promoCode.trim()) {
      handleApplyPromoCode();
    }
  };

  if (loading) {
    return (
      <Card className="sticky top-8 border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-8 border-0 shadow-xl shadow-royal-900/5 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-cream-200">
        <CardTitle className="flex items-center gap-2 text-royal-900">
          <div className="w-8 h-8 rounded-full bg-azalove-100 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-azalove-600" />
          </div>
          {t("checkout.orderSummary.title")}
        </CardTitle>
        <CardDescription className="text-royal-600 text-base">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
          {t("checkout.orderSummary.itemsInOrder")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Order Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 bg-cream-50/50 rounded-lg"
            >
              <div className="w-12 h-12 bg-amaranth-100 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={`${API_BASE_URL}${item.image}`}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium truncate text-royal-900">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-base text-royal-600">
                    الكمية: {item.quantity}
                  </span>
                  <span className="text-base font-medium text-royal-900">
                    {formatCurrency(
                      (item.finalPrice || item.price) * item.quantity
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Information */}
        {shippingData && (
          <div className="border-t border-cream-200 pt-4 space-y-3">
            <div className="flex items-center gap-2 text-base text-royal-600">
              <div className="w-6 h-6 rounded-full bg-azalove-100 flex items-center justify-center">
                <Truck className="w-3 h-3 text-azalove-600" />
              </div>
              <span>معلومات الشحن</span>
            </div>
            <div className="p-3 bg-azalove-50 rounded-lg border border-azalove-200">
              <div className="text-base text-royal-900 font-medium">
                {shippingData.locationName}
              </div>
              <div className="text-sm text-royal-600 mt-1">
                {t("checkout.orderSummary.locationType")}{" "}
                {shippingData.locationType === "region"
                  ? t("checkout.orderSummary.region")
                  : t("checkout.orderSummary.city")}
              </div>
              <div className="text-sm text-royal-600 mt-1">
                {t("checkout.orderSummary.shippingCostLabel")}{" "}
                {formatCurrency(shippingData.shipment?.cost || 0)}
              </div>
              {settings?.shipping_days && (
                <div className="text-sm text-royal-600 mt-1">
                  {t("checkout.orderSummary.deliveryTimeLabel")}{" "}
                  {settings.shipping_days}{" "}
                  {t("checkout.orderSummary.workingDays")}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Promo Code */}
        <div className="border-t border-cream-200 pt-4 space-y-3">
          <div className="flex items-center gap-2 text-base text-royal-600">
            <div className="w-6 h-6 rounded-full bg-azalove-100 flex items-center justify-center">
              <Tag className="w-3 h-3 text-azalove-600" />
            </div>
            <span className="font-medium">
              {t("checkout.orderSummary.promoCode")}
            </span>
            {appliedCoupon && (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                {t("checkout.orderSummary.applied")}
              </span>
            )}
          </div>

          {!appliedCoupon ? (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t("checkout.orderSummary.promoCodePlaceholder")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-base focus:ring-2 focus:ring-azalove-500 focus:border-azalove-500 transition-all duration-200"
                disabled={isValidating}
                maxLength={20}
              />
              <Button
                onClick={handleApplyPromoCode}
                size="sm"
                className="bg-azalove-600 hover:bg-azalove-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isValidating || !promoCode.trim()}
              >
                {isValidating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("checkout.payment.processing")}
                  </div>
                ) : (
                  t("checkout.orderSummary.applyPromoCode")
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 border-green-200"
                >
                  {appliedCoupon.code}
                </Badge>
                <span className="text-base text-green-700">
                  {t("checkout.orderSummary.promoCodeApplied")}
                  <span className="font-medium">
                    {appliedCoupon.type === "percentage"
                      ? ` ${appliedCoupon.discount}%`
                      : ` ${appliedCoupon.discount} ${t("checkout.orderSummary.currency")}`}
                  </span>
                </span>
              </div>
              <Button
                onClick={handleRemovePromoCode}
                size="sm"
                variant="ghost"
                className="text-green-600 hover:text-green-700 hover:bg-green-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Coupon requirements info */}
          {appliedCoupon && (
            <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
              <div className="font-medium mb-1">
                {t("checkout.orderSummary.couponRequirements")}
              </div>
              <div>
                • {t("checkout.orderSummary.minOrderAmount")}{" "}
                {formatCurrency(appliedCoupon.minOrderTotalPrice)}{" "}
                {t("checkout.orderSummary.currency")}
              </div>
              <div>
                • {t("checkout.orderSummary.minProductCount")}{" "}
                {appliedCoupon.minOrderItemCount}{" "}
                {t("checkout.orderSummary.products")}
              </div>
            </div>
          )}

          {promoError && (
            <div className="text-red-600 text-base bg-red-50 p-3 rounded-lg border border-red-200 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="leading-relaxed">{promoError}</span>
              </div>
            </div>
          )}
        </div>

        {/* Order Totals */}
        <div className="border-t border-cream-200 pt-4 space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-royal-700">
              {t("checkout.orderSummary.subtotal")}
            </span>
            <span className="text-royal-900 font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>

          {shippingCost > 0 && (
            <div className="flex justify-between text-base">
              <span className="text-royal-700">
                {t("checkout.orderSummary.shippingCost")}
              </span>
              <span className="text-royal-900 font-medium">
                {formatCurrency(shippingCost)}
              </span>
            </div>
          )}

          {settings?.shipping_days && (
            <div className="flex justify-between text-base">
              <span className="text-royal-700">
                {t("checkout.orderSummary.deliveryTime")}
              </span>
              <span className="text-royal-900 font-medium">
                {settings.shipping_days}{" "}
                {t("checkout.orderSummary.workingDays")}
              </span>
            </div>
          )}

          {taxRate > 0 && (
            <div className="flex justify-between text-base">
              <span className="text-royal-700">
                {t("checkout.orderSummary.tax")} ({taxRate}%)
              </span>
              <span className="text-royal-900 font-medium">
                {formatCurrency(tax)}
              </span>
            </div>
          )}

          {appliedCoupon && discount > 0 && (
            <div className="flex justify-between text-base text-green-600">
              <span>
                {t("checkout.orderSummary.discount")} ({appliedCoupon.code}) -{" "}
                {appliedCoupon.type === "percentage"
                  ? `${appliedCoupon.discount}%`
                  : t("checkout.orderSummary.fixedAmount")}
              </span>
              <span className="font-medium">-{formatCurrency(discount)}</span>
            </div>
          )}

          <div className="border-t border-cream-200 pt-3">
            <div className="flex justify-between font-bold text-xl">
              <span className="text-royal-900">
                {t("checkout.orderSummary.total")}
              </span>
              <span className="text-royal-900">
                {formatCurrency(getTotalWithDiscount() + tax)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
