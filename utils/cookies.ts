export const cookieKeys = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  RETURN_URL: "returnUrl",
  CART: "cart",
  FAVORITES: "favorites",
  COOKIE_CONSENT: "azalove_cookie_consent",
  COOKIE_PREFERENCES: "azalove_cookie_preferences",
} as const;

export const cookieUtils = {
  setItem: (
    key: string,
    value: any,
    options?: { maxAge?: number; path?: string }
  ): void => {
    if (typeof window !== "undefined") {
      // Client-side
      const cookieValue = JSON.stringify(value);
      const cookieOptions = [
        `path=${options?.path || "/"}`,
        options?.maxAge ? `max-age=${options.maxAge}` : "",
        "SameSite=Lax",
        "Secure",
      ]
        .filter(Boolean)
        .join("; ");

      document.cookie = `${key}=${encodeURIComponent(cookieValue)}; ${cookieOptions}`;
    }
  },

  getItem: async <T>(key: string, defaultValue?: T): Promise<T | null> => {
    if (typeof window !== "undefined") {
      // Client-side
      const cookies = document.cookie.split(";");
      const cookie = cookies.find((c) => c.trim().startsWith(`${key}=`));
      if (cookie) {
        const value = cookie.split("=")[1];
        try {
          return JSON.parse(decodeURIComponent(value)) as T;
        } catch {
          return defaultValue || null;
        }
      }
      return defaultValue || null;
    } else {
      // Server-side - dynamically import next/headers only when needed
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const cookie = cookieStore.get(key);
        if (cookie) {
          try {
            return JSON.parse(decodeURIComponent(cookie.value)) as T;
          } catch {
            return defaultValue || null;
          }
        }
        return defaultValue || null;
      } catch {
        return defaultValue || null;
      }
    }
  },

  removeItem: (key: string, path?: string): void => {
    if (typeof window !== "undefined") {
      // Client-side
      document.cookie = `${key}=; path=${path || "/"}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      // Client-side
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
    }
  },
};

export const authCookies = {
  saveToken: (token: string): void => {
    cookieUtils.setItem(cookieKeys.AUTH_TOKEN, token, {
      maxAge: 7 * 24 * 60 * 60,
    }); // 7 days
  },

  getToken: async (): Promise<string | null> => {
    return await cookieUtils.getItem<string>(cookieKeys.AUTH_TOKEN);
  },

  removeToken: (): void => {
    cookieUtils.removeItem(cookieKeys.AUTH_TOKEN);
  },

  saveRefreshToken: (refreshToken: string): void => {
    cookieUtils.setItem(cookieKeys.REFRESH_TOKEN, refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
    }); // 30 days
  },

  getRefreshToken: async (): Promise<string | null> => {
    return await cookieUtils.getItem<string>(cookieKeys.REFRESH_TOKEN);
  },

  removeRefreshToken: (): void => {
    cookieUtils.removeItem(cookieKeys.REFRESH_TOKEN);
  },

  saveTokens: (accessToken: string, refreshToken: string): void => {
    authCookies.saveToken(accessToken);
    authCookies.saveRefreshToken(refreshToken);
  },

  removeTokens: (): void => {
    authCookies.removeToken();
    authCookies.removeRefreshToken();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const token = await authCookies.getToken();
    const user = await userCookies.getUser();
    return !!(token && user);
  },
};

export const userCookies = {
  saveUser: (userData: any): void => {
    cookieUtils.setItem(cookieKeys.USER_DATA, userData, {
      maxAge: 7 * 24 * 60 * 60,
    }); // 7 days
  },

  getUser: async () => {
    return await cookieUtils.getItem(cookieKeys.USER_DATA);
  },

  removeUser: (): void => {
    cookieUtils.removeItem(cookieKeys.USER_DATA);
  },

  updateUser: (updates: Partial<any>): void => {
    const currentUser = userCookies.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      userCookies.saveUser(updatedUser);
    }
  },
};

export const returnUrlCookies = {
  saveReturnUrl: (url: string): void => {
    cookieUtils.setItem(cookieKeys.RETURN_URL, url, { maxAge: 24 * 60 * 60 }); // 1 day
  },

  getReturnUrl: async (): Promise<string | null> => {
    return await cookieUtils.getItem<string>(cookieKeys.RETURN_URL);
  },

  removeReturnUrl: (): void => {
    cookieUtils.removeItem(cookieKeys.RETURN_URL);
  },
};
