import { useAuth } from "@/contexts/auth-context";
import { refreshTokens } from "@/utils/token-refresh";
import { useCallback } from "react";
import { useToast } from "./use-toast";

export const useTokenRefresh = () => {
  const { updateUserData } = useAuth();
  const { toast } = useToast();

  const handleTokenRefresh = useCallback(async () => {
    try {
      const result = await refreshTokens();

      if (result) {
        // Update user data in context
        updateUserData(result.user);

        toast({
          title: "تم تحديث الجلسة",
          description: "تم تحديث جلسة المستخدم بنجاح.",
        });

        return result.access_token;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      toast({
        title: "خطأ في تحديث الجلسة",
        description: "فشل في تحديث جلسة المستخدم. يرجى تسجيل الدخول مرة أخرى.",
      });
    }

    return null;
  }, [updateUserData, toast]);

  return { handleTokenRefresh };
};
