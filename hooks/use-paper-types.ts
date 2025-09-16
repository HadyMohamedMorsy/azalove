import { useEffect, useRef, useState } from "react";

export interface PaperType {
  id: string;
  label: string;
  value: number;
}

// Global cache to prevent multiple requests
let paperTypesCache: PaperType[] | null = null;
let isLoading = false;
let cachePromise: Promise<PaperType[]> | null = null;

export function usePaperTypes() {
  const [paperTypes, setPaperTypes] = useState<PaperType[]>(
    paperTypesCache || []
  );
  const [loading, setLoading] = useState(!paperTypesCache && isLoading);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // If we already have data in cache, use it
    if (paperTypesCache) {
      setPaperTypes(paperTypesCache);
      setLoading(false);
      return;
    }

    // If we're already loading, wait for the existing request
    if (isLoading && cachePromise) {
      cachePromise
        .then((data) => {
          setPaperTypes(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    // Prevent multiple simultaneous requests
    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;
    isLoading = true;

    const fetchPaperTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/paper-type/label-value");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const paperTypesData = data.data || [];

        // Cache the data
        paperTypesCache = paperTypesData;
        setPaperTypes(paperTypesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setPaperTypes([]);
      } finally {
        setLoading(false);
        isLoading = false;
        cachePromise = null;
      }
    };

    cachePromise = fetchPaperTypes().then(() => paperTypesCache || []);
  }, []);

  return { paperTypes, loading, error };
}
