import { CreateOrderRequest, CreateOrderResponse } from "@/types/order";
import { useState } from "react";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (
    orderData: CreateOrderRequest
  ): Promise<CreateOrderResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/order/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result: CreateOrderResponse = await response.json();

      // Check for successful status codes (200, 201)
      if (response.status >= 200 && response.status < 300) {
        return result;
      } else {
        throw new Error(result.message || "Failed to create order");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading,
    error,
  };
};
