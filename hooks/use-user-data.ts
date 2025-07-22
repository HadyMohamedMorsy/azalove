import { authStorage, userStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UseUserDataReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  refreshUserData: () => void;
  clearUserData: () => void;
}

export const useUserData = (): UseUserDataReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = authStorage.getToken();
      const userData = userStorage.getUser() as User | null;

      if (token && userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError("Failed to load user data from localStorage");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    loadUserData();
  };

  const clearUserData = () => {
    try {
      userStorage.removeUser();
      authStorage.removeToken();
      setUser(null);
      setError(null);
    } catch (err) {
      setError("Failed to clear user data");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const isAuthenticated = !!(user && authStorage.getToken());

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    refreshUserData,
    clearUserData,
  };
};

// Utility function to get user data synchronously (for use outside of components)
export const getUserDataSync = (): User | null => {
  try {
    return userStorage.getUser() as User | null;
  } catch {
    return null;
  }
};

// Utility function to check if user is authenticated synchronously
export const isUserAuthenticatedSync = (): boolean => {
  try {
    const token = authStorage.getToken();
    const user = userStorage.getUser();
    return !!(token && user);
  } catch {
    return false;
  }
};

// Utility function to get user display name
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "";

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  return user.name || user.email;
};
