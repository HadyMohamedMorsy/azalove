"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  redirectToLogin: (returnUrl?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Verify token with your API
          const response = await axios.post("/api/auth/verify", {
            token,
          });
          const { user } = response.data.data;
          setUser(user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("auth_token");
        Cookies.remove("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { access_token, user } = response.data.data;
      localStorage.setItem("auth_token", access_token);

      Cookies.set("auth_token", access_token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });

      setUser(user);

      // Check if there's a return URL to redirect to
      const returnUrl = localStorage.getItem("returnUrl");
      if (returnUrl) {
        localStorage.removeItem("returnUrl");
        router.push(returnUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    Cookies.remove("auth_token");
    setUser(null);
    router.push("/login");
  };

  const redirectToLogin = (returnUrl?: string) => {
    if (returnUrl) {
      localStorage.setItem("returnUrl", returnUrl);
    } else {
      // Store current page URL as return URL
      localStorage.setItem(
        "returnUrl",
        window.location.pathname + window.location.search
      );
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, redirectToLogin }}
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
