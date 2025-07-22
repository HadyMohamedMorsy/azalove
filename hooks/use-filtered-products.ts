"use client";
import { Product } from "@/types/product";
import axios from "axios";
import { useEffect, useState } from "react";

interface FilterParams {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  length?: number;
  start?: number;
}

export const useFilteredProducts = (filters: FilterParams | null) => {
  const [state, setState] = useState<FilteredProductsState>({
    data: null,
    loading: false,
    error: null,
    totalRecords: 0,
    recordsFiltered: 0,
  });

  useEffect(() => {
    // Don't make API call if no filters are provided
    if (!filters) {
      setState({
        data: null,
        loading: false,
        error: null,
        totalRecords: 0,
        recordsFiltered: 0,
      });
      return;
    }

    async function fetchFilteredProducts() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const { data } = await axios.post("/api/product/filter", filters);
        setState({
          data: data.data.data,
          loading: false,
          error: null,
          totalRecords: data.data.totalRecords,
          recordsFiltered: data.data.recordsFiltered,
        });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "An error occurred",
          totalRecords: 0,
          recordsFiltered: 0,
        });
      }
    }

    fetchFilteredProducts();
  }, [
    filters?.categorySlug,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.length,
    filters?.start,
  ]);

  return state;
};

type FilteredProductsState = {
  data: Product[] | null;
  loading: boolean;
  error: string | null;
  totalRecords: number;
  recordsFiltered: number;
};
