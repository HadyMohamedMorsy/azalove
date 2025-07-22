import { Blog } from "@/types/blogs";
import axios from "axios";
import { useEffect, useState } from "react";

interface FilterParams {
  categorySlug?: string;
  length?: number;
  start?: number;
}

interface FilteredBlogsState {
  data: Blog[] | null;
  loading: boolean;
  error: string | null;
  totalRecords: number;
  recordsFiltered: number;
}

export const useFilteredBlogs = (filters: FilterParams | null) => {
  const [state, setState] = useState<FilteredBlogsState>({
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

    async function fetchFilteredBlogs() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const { data } = await axios.post("/api/blog/filter", filters);
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

    fetchFilteredBlogs();
  }, [filters?.categorySlug, filters?.length, filters?.start]);

  return state;
};
