export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  amount: number;
}

export interface CreateOrderRequest {
  products: OrderItem[];
  payment_id: number;
  coupon_id?: number;
  address_id?: number;
  paymentStatus?: string;
  status?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data?: {
    order_id: string;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
  };
  error?: string;
}

export interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_method: string;
  address_id: number;
  products: OrderItem[];
  created_at: string;
  updated_at: string;
}
