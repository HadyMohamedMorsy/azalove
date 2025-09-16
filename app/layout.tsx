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
import { StartCharacterShapesProvider } from "@/contexts/start-character-shapes-context";
import { Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ec4899" },
    { media: "(prefers-color-scheme: dark)", color: "#be185d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Azalove" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Azalove" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/media/logo/main-icon.ico" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/media/logo/main-icon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//localhost:3001" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <GeneralSettingsProvider>
                <StartCharacterShapesProvider>
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
                </StartCharacterShapesProvider>
              </GeneralSettingsProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
