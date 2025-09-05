"use client";
import { CharacterLayer } from "@/types/avatar";

interface MultiLayerPreviewProps {
  layers: CharacterLayer[];
  size?: number;
  className?: string;
}

export default function MultiLayerPreview({
  layers,
  size = 300,
  className = "",
}: MultiLayerPreviewProps) {
  if (!layers || layers.length === 0) {
    return (
      <div
        className={`bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-gray-400 text-sm">No layers</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 53 108"
        width={size}
        height={size}
        className="absolute top-0 left-0"
      >
        {layers.map((layer, index) => (
          <g
            key={`${layer.bodyType}-${index}`}
            dangerouslySetInnerHTML={{ __html: layer.svg }}
          />
        ))}
      </svg>
    </div>
  );
}
