import { siteConfig } from "@/config/site";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: `Invoice - ${siteConfig.name}`,
  description: "Purchase invoice from azalove",
  icons: {
    icon: "/media/main-icon.ico",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Invoice - azalove",
    description: "Purchase invoice from azalove",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
