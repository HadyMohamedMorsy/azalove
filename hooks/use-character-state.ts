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

  // Get layers filtered by active body type for a specific character
  const getCurrentLayersForBodyType = (
    bodyType: string,
    character?: "Layer_2" | "Layer_4"
  ) => {
    const targetCharacter = character || selection.activeCharacter;
    if (!characterState?.[targetCharacter]) return [];
    return characterState[targetCharacter].filter(
      (layer) => layer.bodyType === bodyType
    );
  };

  // Function to add or update a character layer
  const updateCharacterLayer = useCallback(
    (
      bodyType: string,
      svg: string,
      color?: string,
      label?: string,
      isPart: boolean = false
    ) => {
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

        // Check if this exact part already exists
        const existingIndex = layer.findIndex(
          (item) =>
            item.bodyType === bodyType &&
            item.svg === svg &&
            item.color === color
        );

        // If we're clearing (empty svg or undefined), remove the layer
        if (
          !svg ||
          svg.trim() === "" ||
          svg === undefined ||
          (color === "" && label === "")
        ) {
          newState[selection.activeCharacter] = layer.filter(
            (item) => item.bodyType !== bodyType
          );
          return newState;
        }

        const newLayer: CharacterLayer = {
          bodyType,
          svg,
          color,
          label,
        };

        if (isPart) {
          // For parts: add new layer (multi-layer support)
          if (existingIndex >= 0) {
            // Remove if already exists (toggle off)
            layer.splice(existingIndex, 1);
          } else {
            // Add new part only if it has valid content
            if (svg && svg.trim() !== "") {
              layer.push(newLayer);
            }
          }
        } else {
          // For body: replace existing body type
          if (existingIndex >= 0) {
            layer[existingIndex] = newLayer;
          } else {
            // Add new layer only if it has valid content
            if (svg && svg.trim() !== "") {
              layer.push(newLayer);
            }
          }
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
    getCurrentLayersForBodyType,
    updateCharacterLayer,
    removeCharacterLayer,
    getCharacterLayer,
    switchActiveCharacter,
    setActiveBodyType,
    setActiveColor,
    setCharacterState,
  };
}
