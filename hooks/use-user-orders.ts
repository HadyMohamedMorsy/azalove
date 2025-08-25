"use client";
import axios from "axios";
import { useEffect, useState } from "react";

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

interface OrderApiResponse {
  data: {
    data: OrderDetails[];
    recordsFiltered: number;
    totalRecords: number;
  };
}

interface UseUserOrdersReturn {
  orders: {
    data: OrderDetails[];
    recordsFiltered: number;
    totalRecords: number;
  };
  loading: boolean;
  error: string | null;
  totalRecords: number;
  recordsFiltered: number;
  refetch: () => void;
}

export const useUserOrders = (
  page: number,
  limit: number = 10
): UseUserOrdersReturn => {
  const [orders, setOrders] = useState<{
    data: OrderDetails[];
    recordsFiltered: number;
    totalRecords: number;
  }>({ data: [], recordsFiltered: 0, totalRecords: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsFiltered, setRecordsFiltered] = useState(0);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await axios.get<OrderApiResponse>("/api/order/front", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
        },
      });
      const { data, recordsFiltered, totalRecords } = response.data.data;
      setOrders({ data, recordsFiltered, totalRecords });
      setRecordsFiltered(recordsFiltered);
      setTotalRecords(totalRecords);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      setOrders({ data: [], recordsFiltered: 0, totalRecords: 0 });
      setRecordsFiltered(0);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  const refetch = () => {
    fetchOrders();
  };

  return { orders, loading, error, totalRecords, recordsFiltered, refetch };
};
