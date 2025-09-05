"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useFetch } from "./use-fetch";

export const useShapes = () => {
  const { data, loading, error } = useFetch<any>(
    API_ENDPOINTS_FROM_NEXT.SHAPES_GROUPED
  );

  return {
    shapes: data || {
      bodyTypes: [],
      bodyShapes: {},
      bodyColors: [],
      types: [],
    },
    loading,
    error,
  };
};
