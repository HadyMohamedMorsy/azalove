import { useState } from "react";

export interface CreateCustomOrderData {
  couponId?: number;
  paperTypeId: string;
  booksIds: string[];
  paymentMethodId: string;
  images: File[];
}

export interface CreateCustomOrderResponse {
  statusCode: number;
  data?: any;
  message?: string;
  error?: string;
}

export function useCreateCustomOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomOrder = async (
    data: CreateCustomOrderData
  ): Promise<CreateCustomOrderResponse> => {
    try {
      setLoading(true);
      setError(null);

      // Create FormData
      const formData = new FormData();

      // Add basic data
      if (data.couponId) {
        formData.append("couponId", data.couponId.toString());
      }
      formData.append("paperTypeId", data.paperTypeId);
      formData.append("paymentMethodId", data.paymentMethodId);

      // Add books IDs as array - each ID as separate field
      data.booksIds.forEach((bookId, index) => {
        formData.append(`booksIds[${index}]`, bookId);
      });

      // Add images
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      // Send request
      const response = await fetch("/api/custom-orders/store", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create custom order");
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return {
        statusCode: 500,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createCustomOrder,
    loading,
    error,
  };
}
