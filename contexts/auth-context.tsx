"use client";

import {
  authStorage,
  returnUrlStorage,
  userStorage,
} from "@/utils/localStorage";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
    username: string,
    phoneNumber: string,
    birthOfDate: string,
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

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { access_token, refreshToken, user } = response.data.data;

      // Store tokens and complete user data
      authStorage.saveTokens(access_token, refreshToken);
      userStorage.saveUser(user);

      Cookies.set("auth_token", access_token, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "lax",
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
    username: string,
    phoneNumber: string,
    birthOfDate: string,
    password: string
  ) => {
    try {
      const response = await axios.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        birthOfDate,
        password,
      });
      const { access_token, refreshToken, user } = response.data.data;

      // Store tokens and complete user data
      authStorage.saveTokens(access_token, refreshToken);
      userStorage.saveUser(user);

      Cookies.set("auth_token", access_token, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "lax",
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

  const logout = async () => {
    try {
      // Call server-side logout to remove httpOnly cookies
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    }

    // Clean up client-side storage
    authStorage.removeTokens();
    userStorage.removeUser();

    // Remove client-side cookies
    Cookies.remove("auth_token", {
      path: "/",
      secure: true,
      sameSite: "lax",
    });

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
