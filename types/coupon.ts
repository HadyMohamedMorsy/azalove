export interface ProductItemDto {
  id: number;
  amount: number; // quantity
  price: number; // unit price
}

export interface ValidateCouponDto {
  code: string;
  products: ProductItemDto[];
}

export interface CouponValidationResponse {
  message: string;
  data: {
    discount: number;
    type: "percentage" | "fixed";
    couponType: string;
    minOrderTotalPrice: number;
    minOrderItemCount: number;
  };
}

export interface AppliedCoupon {
  id?: number;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  couponType: string;
  minOrderTotalPrice: number;
  minOrderItemCount: number;
}
