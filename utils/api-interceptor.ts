import { API_BASE_URL } from "@/config/api";
import axios, { AxiosRequestConfig } from "axios";

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
) {
  try {
    const response = await axiosInstance(endpoint, options);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
    };
  }
}
