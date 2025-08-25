"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";

export interface AuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
  };
  facebook: {
    clientId: string;
    clientSecret: string;
  };
}

export function useAuthConfig(): AuthConfig | null {
  const { settings, loading } = useGeneralSettings();

  if (loading || !settings) {
    return null;
  }

  // Check if all required social auth settings are present
  if (
    !settings.client_id_google ||
    !settings.client_secret_google ||
    !settings.client_id_facebook ||
    !settings.client_secret_facebook
  ) {
    return null;
  }

  return {
    google: {
      clientId: settings.client_id_google,
      clientSecret: settings.client_secret_google,
    },
    facebook: {
      clientId: settings.client_id_facebook,
      clientSecret: settings.client_secret_facebook,
    },
  };
}
