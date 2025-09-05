import {
  CharacterLayer,
  CharacterSelection,
  CharacterState,
} from "@/types/avatar";
import { useCallback, useState } from "react";

const createInitialCharacterState = (): CharacterState => ({
  Layer_2: [],
  Layer_4: [],
});

export function useCharacterState() {
  const [characterState, setCharacterState] = useState<CharacterState>(() =>
    createInitialCharacterState()
  );

  const [selection, setSelection] = useState<CharacterSelection>({
    activeCharacter: "Layer_2",
    activeBodyType: "",
    activeColor: "",
  });

  const currentLayers = characterState?.[selection.activeCharacter] || [];

  // Function to add or update a character layer
  const updateCharacterLayer = useCallback(
    (bodyType: string, svg: string, color?: string, label?: string) => {
      // Check if characterState is undefined
      if (!characterState) {
        return;
      }

      setCharacterState((prev) => {
        const newState = { ...prev };

        // Ensure the layer exists
        if (!newState[selection.activeCharacter]) {
          newState[selection.activeCharacter] = [];
        }

        const layer = newState[selection.activeCharacter];

        // Check if this body type already exists
        const existingIndex = layer.findIndex(
          (item) => item.bodyType === bodyType
        );

        const newLayer: CharacterLayer = {
          bodyType,
          svg,
          color,
          label,
        };

        if (existingIndex >= 0) {
          // Update existing layer
          layer[existingIndex] = newLayer;
        } else {
          // Add new layer
          layer.push(newLayer);
        }

        return newState;
      });
    },
    [characterState, selection.activeCharacter]
  );

  // Function to remove a character layer
  const removeCharacterLayer = useCallback(
    (bodyType: string) => {
      // Check if characterState is undefined
      if (!characterState) {
        return;
      }

      setCharacterState((prev) => {
        const newState = { ...prev };

        // Ensure the layer exists
        if (!newState[selection.activeCharacter]) {
          newState[selection.activeCharacter] = [];
        }

        const layer = newState[selection.activeCharacter];
        newState[selection.activeCharacter] = layer.filter(
          (item) => item.bodyType !== bodyType
        );
        return newState;
      });
    },
    [characterState, selection.activeCharacter]
  );

  // Function to get a specific layer by body type
  const getCharacterLayer = useCallback(
    (bodyType: string) => {
      return currentLayers.find((layer) => layer.bodyType === bodyType);
    },
    [currentLayers]
  );

  // Function to switch active character
  const switchActiveCharacter = useCallback(
    (character: "Layer_2" | "Layer_4") => {
      setSelection((prev) => ({
        ...prev,
        activeCharacter: character,
      }));
    },
    []
  );

  // Function to set active body type
  const setActiveBodyType = useCallback((bodyType: string) => {
    setSelection((prev) => ({
      ...prev,
      activeBodyType: bodyType,
    }));
  }, []);

  // Function to set active color
  const setActiveColor = useCallback((color: string) => {
    setSelection((prev) => ({
      ...prev,
      activeColor: color,
    }));
  }, []);

  return {
    characterState,
    selection,
    currentLayers,
    updateCharacterLayer,
    removeCharacterLayer,
    getCharacterLayer,
    switchActiveCharacter,
    setActiveBodyType,
    setActiveColor,
  };
}
