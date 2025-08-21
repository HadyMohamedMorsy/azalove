"use client";

import { CookieConsent } from "@/components/ui/cookie-consent";
import { usePathname } from "next/navigation";
import MaintenanceWrapper from "../maintenance-wrapper";
import Footer from "./footer";
import Navbar from "./navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is an invoice page
  const isInvoicePage = pathname?.startsWith("/invoice");

  // For invoice pages, render only children without header/footer
  if (isInvoicePage) {
    return <MaintenanceWrapper>{children}</MaintenanceWrapper>;
  }

  // For all other pages, render with header/footer
  return (
    <MaintenanceWrapper>
      <Navbar />
      {children}
      <Footer />
      <CookieConsent />
    </MaintenanceWrapper>
  );
}
