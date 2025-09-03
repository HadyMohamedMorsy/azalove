import "@/styles/globals.css";
import "@/styles/utilities.css";

import AnalyticsManager from "@/components/layout/analytics-manager";
import AnalyticsWrapper from "@/components/layout/analytics-wrapper";
import DynamicTitle from "@/components/layout/dynamic-title";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { LocaleWrapper } from "@/components/layout/locale-wrapper";
import SplashWrapper from "@/components/layout/splash-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { GeneralSettingsProvider } from "@/contexts/general-settings-context";
import { Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="azalove" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/media/opengraph-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@azalove" />
        <meta name="twitter:image" content="/media/opengraph-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <GeneralSettingsProvider>
                <DynamicTitle />
                <AnalyticsManager />
                <AnalyticsWrapper>
                  <LocaleWrapper>
                    <SplashWrapper>
                      <LayoutWrapper>{children}</LayoutWrapper>
                      <Toaster />
                    </SplashWrapper>
                  </LocaleWrapper>
                </AnalyticsWrapper>
              </GeneralSettingsProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
