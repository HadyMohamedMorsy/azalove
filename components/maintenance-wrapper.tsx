"use client";

import { useGeneralSettings } from "@/contexts/general-settings-context";
import "@/styles/maintenance.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MaintenanceWrapperProps {
  children: React.ReactNode;
}

export default function MaintenanceWrapper({
  children,
}: MaintenanceWrapperProps) {
  const { settings, loading } = useGeneralSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Don't redirect if we're already on the maintenance page
    if (pathname === "/maintenance") {
      return;
    }

    // If settings are loaded and maintenance mode is enabled, redirect
    if (settings && !loading && settings.maintenance_mode) {
      setIsRedirecting(true);
      router.push("/maintenance");
    }
  }, [settings, loading, router, pathname]);

  // Show loading while checking maintenance mode
  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amaranth-50 via-royal-50 to-amaranth-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amaranth-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amaranth-600 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // If maintenance mode is enabled and we're not on maintenance page, don't render children
  if (settings?.maintenance_mode && pathname !== "/maintenance") {
    return null;
  }

  // If maintenance mode is disabled or we're on maintenance page, render children
  return <>{children}</>;
}
