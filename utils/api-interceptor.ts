import axios, { AxiosError, AxiosResponse } from "axios";
import { authCookies, userCookies } from "./cookies";
import { authStorage, userStorage } from "./localStorage";

// User interface for typing
interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  birthOfDate?: string;
  type?: string;
  role?: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to get auth data (works on both client and server)
const getAuthData = async () => {
  if (typeof window !== "undefined") {
    // Client-side: use localStorage
    return {
      token: authStorage.getToken(),
      user: userStorage.getUser() as User | null,
    };
  } else {
    // Server-side: use cookies
    return {
      token: await authCookies.getToken(),
      user: (await userCookies.getUser()) as User | null,
    };
  }
};

// Helper function to save auth data (works on both client and server)
const saveAuthData = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    // Client-side: use localStorage
    authStorage.saveTokens(accessToken, refreshToken);
  } else {
    // Server-side: use cookies
    authCookies.saveTokens(accessToken, refreshToken);
  }
};

// Helper function to remove auth data (works on both client and server)
const removeAuthData = () => {
  if (typeof window !== "undefined") {
    // Client-side: use localStorage
    authStorage.removeTokens();
  } else {
    // Server-side: use cookies
    authCookies.removeTokens();
  }
};

// Create axios instance
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1",
  timeout: 10000,
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add auth token and user ID
api.interceptors.request.use(
  async (config) => {
    const { token, user } = await getAuthData();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (user && user.id) {
      config.headers["user-id"] = user.id;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken =
        typeof window !== "undefined"
          ? authStorage.getRefreshToken()
          : authCookies.getRefreshToken();

      if (!refreshToken) {
        // No refresh token available, logout user
        removeAuthData();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        // Call refresh token endpoint
        const response = await axios.post("/api/auth/refresh-tokens", {
          refreshToken,
        });

        const { access_token, refresh_token } = response.data.data;

        // Save new tokens
        saveAuthData(access_token, refresh_token);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Process queued requests
        processQueue(null, access_token);

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        removeAuthData();
        processQueue(refreshError, null);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// apiFetch function that wraps the axios instance
export const apiFetch = async (url: string, config?: any) => {
  try {
    const response = await api(url, config);
    return {
      data: response.data,
      status: response.status,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status || 500,
      error:
        error.response?.data?.message || error.message || "An error occurred",
    };
  }
};

export default api;
