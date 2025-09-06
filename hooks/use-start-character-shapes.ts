"use client";
import { useStartCharacterShapesContext } from "@/contexts/start-character-shapes-context";

export const useStartCharacterShapes = () => {
  const { shapes, loading, error } = useStartCharacterShapesContext();

  return {
    shapes,
    loading,
    error,
  };
};
