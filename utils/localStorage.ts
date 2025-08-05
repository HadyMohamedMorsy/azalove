export const localStorageKeys = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  RETURN_URL: "returnUrl",
  CART: "cart",
  FAVORITES: "favorites",
  COOKIE_CONSENT: "azalove_cookie_consent",
  COOKIE_PREFERENCES: "azalove_cookie_preferences",
} as const;

export const localStorageUtils = {
  setItem: (key: string, value: any): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue || null;
    }
    return defaultValue || null;
  },

  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

export const userStorage = {
  saveUser: (userData: any): void => {
    localStorageUtils.setItem(localStorageKeys.USER_DATA, userData);
  },

  getUser: () => {
    return localStorageUtils.getItem(localStorageKeys.USER_DATA);
  },

  removeUser: (): void => {
    localStorageUtils.removeItem(localStorageKeys.USER_DATA);
  },

  updateUser: (updates: Partial<any>): void => {
    const currentUser = userStorage.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      userStorage.saveUser(updatedUser);
    }
  },
};

export const authStorage = {
  saveToken: (token: string): void => {
    localStorageUtils.setItem(localStorageKeys.AUTH_TOKEN, token);
  },

  getToken: (): string | null => {
    return localStorageUtils.getItem<string>(localStorageKeys.AUTH_TOKEN);
  },

  removeToken: (): void => {
    localStorageUtils.removeItem(localStorageKeys.AUTH_TOKEN);
  },

  saveRefreshToken: (refreshToken: string): void => {
    localStorageUtils.setItem(localStorageKeys.REFRESH_TOKEN, refreshToken);
  },

  getRefreshToken: (): string | null => {
    return localStorageUtils.getItem<string>(localStorageKeys.REFRESH_TOKEN);
  },

  removeRefreshToken: (): void => {
    localStorageUtils.removeItem(localStorageKeys.REFRESH_TOKEN);
  },

  saveTokens: (accessToken: string, refreshToken: string): void => {
    authStorage.saveToken(accessToken);
    authStorage.saveRefreshToken(refreshToken);
  },

  removeTokens: (): void => {
    authStorage.removeToken();
    authStorage.removeRefreshToken();
  },

  isAuthenticated: (): boolean => {
    const token = authStorage.getToken();
    const user = userStorage.getUser();
    return !!(token && user);
  },
};

export const returnUrlStorage = {
  saveReturnUrl: (url: string): void => {
    localStorageUtils.setItem(localStorageKeys.RETURN_URL, url);
  },

  getReturnUrl: (): string | null => {
    return localStorageUtils.getItem<string>(localStorageKeys.RETURN_URL);
  },

  removeReturnUrl: (): void => {
    localStorageUtils.removeItem(localStorageKeys.RETURN_URL);
  },
};
