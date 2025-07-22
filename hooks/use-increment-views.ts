import { useCallback, useState } from "react";

interface UseIncrementViewsReturn {
  incrementViews: (slug: string) => Promise<void>;
  isIncrementing: boolean;
  error: string | null;
}

export const useIncrementViews = (): UseIncrementViewsReturn => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incrementViews = useCallback(async (slug: string) => {
    try {
      setIsIncrementing(true);
      setError(null);

      const response = await fetch(`/api/blog/increment-views/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to increment views");
      }

      const data = await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to increment views";
      setError(errorMessage);
      console.error("Error incrementing views:", errorMessage);
    } finally {
      setIsIncrementing(false);
    }
  }, []);

  return {
    incrementViews,
    isIncrementing,
    error,
  };
};
