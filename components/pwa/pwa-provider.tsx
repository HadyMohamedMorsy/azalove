"use client";
import { useEffect, useState } from "react";

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    // Register service worker with minimal interference
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerServiceWorker = async () => {
        try {
          // Only register if not on character pages
          const isCharacterPage =
            window.location.pathname.includes("/start-character") ||
            window.location.pathname.includes("/character");

          if (!isCharacterPage) {
            await navigator.serviceWorker.register("/sw.js", {
              scope: "/",
            });
          }
        } catch (error) {
          console.error("Service Worker registration failed:", error);
          // Don't throw error, just log it
        }
      };

      // Register with delay to avoid conflicts
      setTimeout(registerServiceWorker, 2000);
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {children}

      {/* Offline indicator - only show on client side */}
      {isClient && !isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white text-center py-2 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>غير متصل بالإنترنت - يعمل في وضع عدم الاتصال</span>
          </div>
        </div>
      )}
    </>
  );
}
