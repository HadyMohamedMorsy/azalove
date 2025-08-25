"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  totalRecords?: number;
};

export const useFetch = <T>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
    totalRecords: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url);
        setState({
          data: data.data,
          loading: false,
          error: null,
          totalRecords: data.totalRecords || 0,
        });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "An error occurred",
          totalRecords: 0,
        });
      }
    }

    fetchData();
  }, [url]);

  return state;
};

export default useFetch;
