"use client";
import { CharacterLayer } from "@/types/avatar";
import MultiLayerPreview from "./multi-layer-preview";

interface CouplePreviewProps {
  character1: CharacterLayer[];
  character2: CharacterLayer[];
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
        {/* Character 1 - Layer 2 */}
        <MultiLayerPreview layers={character1} size={size} className="mr-4" />

        <div className="text-4xl text-red-500 mx-4">❤️</div>

        {/* Character 2 - Layer 4 */}
        <MultiLayerPreview layers={character2} size={size} className="ml-4" />
      </div>
    </div>
  );
}
