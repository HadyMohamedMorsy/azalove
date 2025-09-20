"use client";
import { useStartCharacterShapes } from "@/hooks/use-start-character-shapes";
import { useEffect, useRef } from "react";

interface CharacterSelectorProps {
  activeCharacter: string;
  onCharacterChange: (character: string) => void;
}

export default function CharacterSelector({
  activeCharacter,
  onCharacterChange,
}: CharacterSelectorProps) {
  const { shapes } = useStartCharacterShapes();
  const hasInitialized = useRef(false);

  // Function to get display text for character type
  const getDisplayText = (type: string) => {
    if (type === "Layer_2") return "الشخصية الأولى";
    if (type === "Layer_4") return "الشخصية الثانية";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  useEffect(() => {
    if (shapes.types && shapes.types.length > 0 && !hasInitialized.current) {
      onCharacterChange(shapes.types[0]);
      hasInitialized.current = true;
    }
  }, [shapes.types, onCharacterChange]);

  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-4">
        {shapes.types?.map((type: string) => (
          <button
            key={type}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeCharacter === type
                ? "bg-amaranth-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onCharacterChange(type)}
          >
            {getDisplayText(type)}
          </button>
        ))}
      </div>
    </div>
  );
}
