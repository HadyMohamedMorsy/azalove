"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ShapesData {
  bodyTypes: any[];
  bodyShapes: Record<string, any[]>;
  bodyColors: string[];
  types: string[];
}

interface ShapesContextType {
  shapes: ShapesData;
  loading: boolean;
  error: string | null;
}

const StartCharacterShapesContext = createContext<
  ShapesContextType | undefined
>(undefined);

interface StartCharacterShapesProviderProps {
  children: ReactNode;
}

export function StartCharacterShapesProvider({
  children,
}: StartCharacterShapesProviderProps) {
  const [shapes, setShapes] = useState<ShapesData>({
    bodyTypes: [],
    bodyShapes: {},
    bodyColors: [],
    types: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShapes() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          API_ENDPOINTS_FROM_NEXT.SHAPES_GROUPED
        );
        setShapes(
          data.data || {
            bodyTypes: [],
            bodyShapes: {},
            bodyColors: [],
            types: [],
          }
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching shapes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchShapes();
  }, []);

  return (
    <StartCharacterShapesContext.Provider value={{ shapes, loading, error }}>
      {children}
    </StartCharacterShapesContext.Provider>
  );
}

export function useStartCharacterShapesContext() {
  const context = useContext(StartCharacterShapesContext);
  if (context === undefined) {
    throw new Error(
      "useStartCharacterShapesContext must be used within a StartCharacterShapesProvider"
    );
  }
  return context;
}
