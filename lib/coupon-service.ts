import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { CouponValidationResponse, ValidateCouponDto } from "@/types";

export class CouponService {
  static async validateCoupon(
    data: ValidateCouponDto
  ): Promise<CouponValidationResponse> {
    try {
      const response = await fetch(API_ENDPOINTS_FROM_NEXT.COUPON_VALIDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to validate coupon");
      }

      return await response.json();
    } catch (error) {
      console.error("Coupon validation error:", error);
      throw error;
    }
  }
}
