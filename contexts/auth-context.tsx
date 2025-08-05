"use client";

import {
  authStorage,
  returnUrlStorage,
  userStorage,
} from "@/utils/localStorage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  redirectToLogin: (returnUrl?: string) => void;
  updateUserData: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = userStorage.getUser() as User | null;
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
        userStorage.removeUser();
      }
    };

    loadUserFromStorage();
  }, []);

  // useEffect(() => {
  //   // Check if user is logged in on mount
  //   const checkAuth = async () => {
  //     try {
  //       const token = authStorage.getToken();
  //       const refreshToken = authStorage.getRefreshToken();

  //       if (token && refreshToken) {
  //         try {
  //           // Verify token with your API
  //           const response = await axios.post("/api/auth/verify", {
  //             token,
  //           });
  //           const { user } = response.data.data;
  //           console.log(user);

  //           // Store complete user data in localStorage
  //           userStorage.saveUser(user);
  //           setUser(user);
  //         } catch (verifyError) {
  //           // If token verification fails, try to refresh
  //           try {
  //             const refreshResponse = await axios.post(
  //               "/api/auth/refresh-tokens",
  //               {
  //                 refreshToken,
  //               }
  //             );

  //             const { access_token, refresh_token, user } =
  //               refreshResponse.data.data;

  //             // Save new tokens
  //             authStorage.saveTokens(access_token, refresh_token);
  //             userStorage.saveUser(user);
  //             setUser(user);
  //           } catch (refreshError) {
  //             // Both verification and refresh failed, logout
  //             console.error("Auth check failed:", refreshError);
  //             authStorage.removeTokens();
  //             userStorage.removeUser();
  //             Cookies.remove("auth_token");
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Auth check failed:", error);
  //       authStorage.removeTokens();
  //       userStorage.removeUser();
  //       Cookies.remove("auth_token");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { access_token, refresh_token, user } = response.data.data;

      // Store tokens and complete user data
      authStorage.saveTokens(access_token, refresh_token);
      userStorage.saveUser(user);

      Cookies.set("auth_token", access_token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });

      setUser(user);

      // Check if there's a return URL to redirect to
      const returnUrl = returnUrlStorage.getReturnUrl();
      if (returnUrl) {
        returnUrlStorage.removeReturnUrl();
        router.push(returnUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      const { access_token, refresh_token, user } = response.data.data;

      // Store tokens and complete user data
      authStorage.saveTokens(access_token, refresh_token);
      userStorage.saveUser(user);

      Cookies.set("auth_token", access_token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });

      setUser(user);

      // Check if there's a return URL to redirect to
      const returnUrl = returnUrlStorage.getReturnUrl();
      if (returnUrl) {
        returnUrlStorage.removeReturnUrl();
        router.push(returnUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    authStorage.removeTokens();
    userStorage.removeUser();
    Cookies.remove("auth_token");
    setUser(null);
    router.push("/login");
  };

  const updateUserData = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      userStorage.saveUser(updatedUser);
    }
  };

  const redirectToLogin = (returnUrl?: string) => {
    if (returnUrl) {
      returnUrlStorage.saveReturnUrl(returnUrl);
    } else {
      // Store current page URL as return URL
      returnUrlStorage.saveReturnUrl(
        window.location.pathname + window.location.search
      );
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        redirectToLogin,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
