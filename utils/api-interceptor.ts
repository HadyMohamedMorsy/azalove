import { API_BASE_URL } from "@/config/api";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiFetch<T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance(endpoint, options);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        error: error.response?.data?.error || error.message,
        status: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status: 500,
    };
  }
}
