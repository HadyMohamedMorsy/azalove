"use client";

import { useGlobalAnalytics } from "@/hooks/use-global-analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

export default function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  const { trackPageView } = useGlobalAnalytics();
  const pathname = usePathname();

  // Track page view when route changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname, trackPageView]);

  return <>{children}</>;
}
