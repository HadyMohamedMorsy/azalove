"use client";

interface CharacterSelectorProps {
  activeCharacter: "first" | "second";
  onCharacterChange: (character: "first" | "second") => void;
}

export default function CharacterSelector({
  activeCharacter,
  onCharacterChange,
}: CharacterSelectorProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-4">
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeCharacter === "first"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onCharacterChange("first")}
        >
          Character 1
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeCharacter === "second"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onCharacterChange("second")}
        >
          Character 2
        </button>
      </div>
    </div>
  );
}
