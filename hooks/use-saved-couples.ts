import { SaveAnswers } from "@/components/ui/character-save-dialog";
import { CharacterState } from "@/types/avatar";
import { useEffect, useState } from "react";

export interface SavedCouple {
  id: string;
  name: string;
  character1: CharacterState;
  character2: CharacterState;
  createdAt: string;
  answers: SaveAnswers;
}

export function useSavedCouples() {
  const [savedCouples, setSavedCouples] = useState<SavedCouple[]>([]);

  // Load saved couples from localStorage on mount
  useEffect(() => {
    const loadSavedCouples = () => {
      try {
        const stored = localStorage.getItem("savedCouples");
        if (stored) {
          setSavedCouples(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error loading saved couples:", error);
      }
    };

    loadSavedCouples();
  }, []);

  // Save a new couple
  const saveCouple = (couple: Omit<SavedCouple, "id" | "createdAt">) => {
    const newCouple: SavedCouple = {
      ...couple,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedCouples = [...savedCouples, newCouple];
    setSavedCouples(updatedCouples);

    try {
      localStorage.setItem("savedCouples", JSON.stringify(updatedCouples));
    } catch (error) {
      console.error("Error saving couple:", error);
    }

    return newCouple;
  };

  // Delete a couple
  const deleteCouple = (id: string) => {
    const updatedCouples = savedCouples.filter((couple) => couple.id !== id);
    setSavedCouples(updatedCouples);

    try {
      localStorage.setItem("savedCouples", JSON.stringify(updatedCouples));
    } catch (error) {
      console.error("Error deleting couple:", error);
    }
  };

  // Get a specific couple by ID
  const getCouple = (id: string) => {
    return savedCouples.find((couple) => couple.id === id);
  };

  return {
    savedCouples,
    saveCouple,
    deleteCouple,
    getCouple,
  };
}
