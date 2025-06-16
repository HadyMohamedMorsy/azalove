import "@/styles/globals.css";
import "@/styles/utilities.css";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
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
    icon: "/favicon.ico",
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
        <meta name="author" content="Lovable" />
        <meta
          property="og:title"
          content="Romantic Blog - Love Stories & Romance"
        />
        <meta
          property="og:description"
          content="Beautiful romantic blog with love stories and relationship advice"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://lovable.dev/opengraph-image-p98pqg.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lovable_dev" />
        <meta
          name="twitter:image"
          content="https://lovable.dev/opengraph-image-p98pqg.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
