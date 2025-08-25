"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Interface matching backend DTO structure
export interface GeneralSettings {
  // Store Information
  store_name?: string;
  store_email?: string;
  store_phone?: string;
  store_address?: string;

  // Currency and Payment Settings
  default_currency?: string;
  currency_symbol?: string;
  tax_rate?: number;

  // Shipping Settings
  shipping_days?: number;

  // Google Tag Manager
  gtm_container_id?: string;
  google_analytics_id?: string;

  // Facebook Pixel
  facebook_pixel_id?: string;
  snapchat_pixel_id?: string;
  init_tiktok_id?: string;

  // Omnisend Integration
  omnisend_api_key?: string;
  omnisend_enabled?: boolean;
  gtm_enabled?: boolean;
  google_analytics_enabled?: boolean;
  facebook_pixel_enabled?: boolean;
  snapchat_pixel_enabled?: boolean;
  init_tiktok_enabled?: boolean;

  // Social Media
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;

  // Social Authentication Settings
  client_id_google?: string;
  client_secret_google?: string;
  client_id_facebook?: string;
  client_secret_facebook?: string;

  // SEO Settings
  meta_title?: string;
  meta_description?: string;

  // Email Settings
  smtp_host?: string;
  smtp_port?: number;
  smtp_username?: string;
  smtp_password?: string;
  smtp_encryption?: string;

  // Maintenance Mode
  maintenance_mode?: boolean;
  maintenance_message?: string;
}

interface GeneralSettingsContextType {
  settings: GeneralSettings | null;
  loading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

const GeneralSettingsContext = createContext<
  GeneralSettingsContextType | undefined
>(undefined);

interface GeneralSettingsProviderProps {
  children: ReactNode;
}

export const GeneralSettingsProvider: React.FC<
  GeneralSettingsProviderProps
> = ({ children }) => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/general-settings`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result?.data);
      if (result?.data) {
        setSettings(result?.data);
      } else {
        throw new Error(result.message || "Failed to fetch settings");
      }
    } catch (err) {
      console.error("Error fetching general settings:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value: GeneralSettingsContextType = {
    settings,
    loading,
    error,
    refreshSettings,
  };

  return (
    <GeneralSettingsContext.Provider value={value}>
      {children}
    </GeneralSettingsContext.Provider>
  );
};

export const useGeneralSettings = (): GeneralSettingsContextType => {
  const context = useContext(GeneralSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useGeneralSettings must be used within a GeneralSettingsProvider"
    );
  }
  return context;
};
