"use client";

import { CharacterState } from "@/types/avatar";
import CharacterPreview from "./character-preview";

interface CouplePreviewProps {
  character1: CharacterState;
  character2: CharacterState;
  size?: number;
}

export default function CouplePreview({
  character1,
  character2,
  size = 300,
}: CouplePreviewProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <CharacterPreview character={character1} size={size} className="mr-4" />
        <div className="text-4xl text-red-500 mx-4">❤️</div>
        <CharacterPreview character={character2} size={size} className="ml-4" />
      </div>
    </div>
  );
}
