import axios from "axios";
import { authCookies } from "./cookies";
import { authStorage } from "./localStorage";

// Helper function to get refresh token (works on both client and server)
const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return authStorage.getRefreshToken();
  } else {
    return authCookies.getRefreshToken();
  }
};

// Helper function to save tokens (works on both client and server)
const saveTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    authStorage.saveTokens(accessToken, refreshToken);
  } else {
    authCookies.saveTokens(accessToken, refreshToken);
  }
};

// Helper function to remove tokens (works on both client and server)
const removeTokens = () => {
  if (typeof window !== "undefined") {
    authStorage.removeTokens();
  } else {
    authCookies.removeTokens();
  }
};

// Helper function to get token (works on both client and server)
const getToken = () => {
  if (typeof window !== "undefined") {
    return authStorage.getToken();
  } else {
    return authCookies.getToken();
  }
};

export const refreshTokens = async (): Promise<{
  access_token: string;
  refreshToken: string;
  user: any;
} | null> => {
  try {
    const token = getRefreshToken();

    if (!token) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post("/api/auth/refresh-tokens", {
      token,
    });

    const { access_token, refreshToken, user } = response.data.data;
    console.log(response);

    // Save new tokens
    saveTokens(access_token, refreshToken);

    return {
      access_token,
      refreshToken,
      user,
    };
  } catch (error) {
    console.error("Token refresh failed:", error);

    // Clear tokens and redirect to login
    removeTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const shouldRefreshToken = async (): Promise<boolean> => {
  const token = await getToken();
  if (!token) return false;

  return isTokenExpired(token);
};
