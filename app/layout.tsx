import "@/styles/globals.css";
import "@/styles/utilities.css";

import LayoutWrapper from "@/components/layout/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/media/main-icon.ico",
  },
};

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
        <title>Romantic Blog - Love Stories & Romance</title>
        <meta
          name="description"
          content="Beautiful romantic blog with love stories and relationship advice"
        />
        <meta name="author" content="azalove" />
        <meta
          property="og:title"
          content="Romantic Blog - Love Stories & Romance"
        />
        <meta
          property="og:description"
          content="Beautiful romantic blog with love stories and relationship advice"
        />
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
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
