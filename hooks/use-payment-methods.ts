import { useEffect, useRef, useState } from "react";

export interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  slug: string;
  is_active: boolean;
}

// Global cache to prevent multiple requests
let paymentMethodsCache: PaymentMethod[] | null = null;
let isLoading = false;
let cachePromise: Promise<PaymentMethod[]> | null = null;

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    paymentMethodsCache || []
  );
  const [loading, setLoading] = useState(!paymentMethodsCache && isLoading);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // If we already have data in cache, use it
    if (paymentMethodsCache) {
      setPaymentMethods(paymentMethodsCache);
      setLoading(false);
      return;
    }

    // If we're already loading, wait for the existing request
    if (isLoading && cachePromise) {
      cachePromise
        .then((data) => {
          setPaymentMethods(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    // Prevent multiple simultaneous requests
    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;
    isLoading = true;

    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/payment-methods/front");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const paymentMethodsData = data.data || [];

        // Cache the data
        paymentMethodsCache = paymentMethodsData;
        setPaymentMethods(paymentMethodsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setPaymentMethods([]);
      } finally {
        setLoading(false);
        isLoading = false;
        cachePromise = null;
      }
    };

    cachePromise = fetchPaymentMethods().then(() => paymentMethodsCache || []);
  }, []);

  return { paymentMethods, loading, error };
}
