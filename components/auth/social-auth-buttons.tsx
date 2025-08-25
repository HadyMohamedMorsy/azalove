"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { signIn } from "next-auth/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

interface SocialAuthButtonsProps {
  isLoading?: boolean;
}

export function SocialAuthButtons({
  isLoading = false,
}: SocialAuthButtonsProps) {
  const { t } = useTranslation();

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleFacebookSignIn = () => {
    signIn("facebook", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-royal-200/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/80 px-2 text-royal-500 font-medium">
            {t("auth.social.orSignInWith")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white/70 hover:bg-white/90 border-2 border-royal-200 hover:border-royal-300 text-royal-700 font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <FaGoogle className="w-4 h-4 mr-2 text-red-500" />
          {t("auth.social.google")}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          className="w-full bg-white/70 hover:bg-white/90 border-2 border-royal-200 hover:border-royal-300 text-royal-700 font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <FaFacebook className="w-4 h-4 mr-2 text-blue-600" />
          {t("auth.social.facebook")}
        </Button>
      </div>
    </div>
  );
}
