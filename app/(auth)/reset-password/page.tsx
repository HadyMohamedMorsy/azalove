"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Validate token on component mount - SINGLE REQUEST
  useEffect(() => {
    const validateToken = async () => {
      const tokenFromUrl = searchParams.get("token");

      if (!tokenFromUrl) {
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description: t("auth.resetPassword.invalidToken"),
        });
        router.push("/login");
        return;
      }

      setToken(tokenFromUrl);

      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenFromUrl }),
        });

        const data = await response.json();

        if (data.status === "success" && data.data.valid) {
          setUserData(data.data.user);
          setIsValidatingToken(false);
        } else {
          toast({
            title: t("auth.resetPassword.errorTitle"),
            description: data.message || t("auth.resetPassword.tokenExpired"),
          });
          router.push("/login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description: t("auth.resetPassword.tokenValidationError"),
        });
        router.push("/login");
      }
    };

    validateToken();
  }, []); // Empty dependency array - runs only once on mount

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      // Validate password fields
      if (!password || !confirmPassword) {
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description: t("auth.resetPassword.fillBothFields"),
        });
        return;
      }

      if (password.length < 6) {
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description: t("auth.resetPassword.passwordTooShort"),
        });
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: t("auth.resetPassword.passwordsMismatchTitle"),
          description: t("auth.resetPassword.passwordsMismatchDescription"),
        });
        return;
      }

      if (!token) {
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description: t("auth.resetPassword.invalidToken"),
        });
        return;
      }

      // Call reset password API
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setPasswordReset(true);
        toast({
          title: t("auth.resetPassword.successTitle"),
          description: t("auth.resetPassword.successDescription"),
        });
      } else {
        toast({
          title: t("auth.resetPassword.errorTitle"),
          description:
            data.message || t("auth.resetPassword.resetPasswordError"),
        });
      }
    } catch (error) {
      toast({
        title: t("auth.resetPassword.errorTitle"),
        description: t("auth.resetPassword.resetPasswordError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while validating token
  if (isValidatingToken) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-azalove-50 via-cream-100 to-azalove-100 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-amaranth-100/50">
            <CardHeader className="space-y-4 pb-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-amaranth-900 rounded-full flex items-center justify-center shadow-lg shadow-amaranth-200/50">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
                <CardTitle className="text-3xl font-bold bg-amaranth-900 bg-clip-text text-transparent">
                  {t("auth.resetPassword.loading")}
                </CardTitle>
                <CardDescription className="text-amaranth-900/80 text-base">
                  {t("auth.resetPassword.verifyingToken")}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (passwordReset) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-azalove-50 via-cream-100 to-azalove-100 flex items-center justify-center p-4">
        {/* Romantic background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amaranth-200 to-amaranth-300 rounded-full opacity-20 animate-float-slow flex items-center justify-center">
            <svg
              className="w-12 h-12 text-amaranth-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-amaranth-300 to-amaranth-400 rounded-full opacity-30 animate-float-medium flex items-center justify-center">
            <svg
              className="w-10 h-10 text-amaranth-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-amaranth-400 to-amaranth-500 rounded-full opacity-25 animate-float-fast flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amaranth-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-amaranth-300 to-amaranth-400 rounded-full opacity-20 animate-float-slow flex items-center justify-center">
            <svg
              className="w-11 h-11 text-amaranth-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-amaranth-100/50">
            <CardHeader className="space-y-4 pb-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amaranth-500 to-royal-500 rounded-full flex items-center justify-center shadow-lg shadow-amaranth-200/50">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amaranth-600 to-royal-600 bg-clip-text text-transparent">
                  {t("auth.resetPassword.successTitle")}
                </CardTitle>
                <CardDescription className="text-royal-600/80 text-base">
                  {t("auth.resetPassword.successDescription")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-royal-600 text-sm">
                  {t("auth.resetPassword.successMessage")}
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r bg-amaranth-900 hover:bg-royal-900 text-white font-semibold py-3 rounded-xl shadow-lg shadow-amaranth-200/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/login">{t("auth.resetPassword.loginNow")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-azalove-50 via-cream-100 to-azalove-100 flex items-center justify-center p-4">
      {/* Romantic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amaranth-200 to-amaranth-300 rounded-full opacity-20 animate-float-slow flex items-center justify-center">
          <svg
            className="w-12 h-12 text-amaranth-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-amaranth-300 to-amaranth-400 rounded-full opacity-30 animate-float-medium flex items-center justify-center">
          <svg
            className="w-10 h-10 text-amaranth-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-amaranth-400 to-amaranth-500 rounded-full opacity-25 animate-float-fast flex items-center justify-center">
          <svg
            className="w-8 h-8 text-amaranth-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-amaranth-300 to-amaranth-400 rounded-full opacity-20 animate-float-slow flex items-center justify-center">
          <svg
            className="w-11 h-11 text-amaranth-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-amaranth-100/50">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amaranth-500 to-royal-500 rounded-full flex items-center justify-center shadow-lg shadow-amaranth-200/50">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amaranth-600 to-royal-600 bg-clip-text text-transparent">
                {t("auth.resetPassword.title")}
              </CardTitle>
              <CardDescription className="text-royal-600/80 text-base">
                {t("auth.resetPassword.description")}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-royal-700 font-medium"
                >
                  {t("auth.resetPassword.newPassword")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t("auth.resetPassword.newPasswordPlaceholder")}
                    required
                    minLength={8}
                    className="border-2 border-royal-200 focus:border-amaranth-400 focus:ring-2 focus:ring-amaranth-200/50 bg-white/70 backdrop-blur-sm transition-all duration-300 placeholder:text-royal-400/60"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amaranth-400 to-royal-400 rounded-r-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-royal-700 font-medium"
                >
                  {t("auth.resetPassword.confirmPassword")}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={t(
                      "auth.resetPassword.confirmPasswordPlaceholder"
                    )}
                    required
                    minLength={8}
                    className="border-2 border-royal-200 focus:border-amaranth-400 focus:ring-2 focus:ring-amaranth-200/50 bg-white/70 backdrop-blur-sm transition-all duration-300 placeholder:text-royal-400/60"
                  />
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amaranth-400 to-royal-400 rounded-r-full"></div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amaranth-500 to-royal-500 hover:from-amaranth-600 hover:to-royal-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-amaranth-200/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t("auth.resetPassword.loading")}</span>
                  </div>
                ) : (
                  t("auth.resetPassword.resetPasswordButton")
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-royal-200/50">
              <Link
                href="/login"
                className="text-amaranth-600 hover:text-amaranth-700 font-semibold text-sm transition-colors duration-200 hover:underline"
              >
                {t("auth.resetPassword.backToLogin")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;
