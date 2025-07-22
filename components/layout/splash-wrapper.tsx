"use client";

import { useState } from "react";
import SplashScreen from "@/components/ui/splash-screen";

interface SplashWrapperProps {
  children: React.ReactNode;
}

const SplashWrapper = ({ children }: SplashWrapperProps) => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <>{children}</>;
};

export default SplashWrapper; 