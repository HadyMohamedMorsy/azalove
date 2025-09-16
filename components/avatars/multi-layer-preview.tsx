"use client";
import { CharacterLayer } from "@/types/avatar";

interface MultiLayerPreviewProps {
  layers: CharacterLayer[];
  size?: number;
  className?: string;
  characterType?: "Layer_2" | "Layer_4";
}

export default function MultiLayerPreview({
  layers,
  size = 300,
  className = "",
  characterType,
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
        id={characterType ? `${characterType}` : "character-unknown"}
      >
        {Object.entries(
          layers.reduce(
            (acc, layer) => {
              if (!acc[layer.bodyType]) {
                acc[layer.bodyType] = [];
              }
              acc[layer.bodyType].push(layer);
              return acc;
            },
            {} as Record<string, typeof layers>
          )
        ).map(([bodyType, bodyLayers]) => {
          // Filter out empty layers
          const validLayers = bodyLayers.filter(
            (layer) => layer.svg && layer.svg.trim() !== ""
          );

          // Only render if there are valid layers
          if (validLayers.length === 0) return null;

          return (
            <g id={bodyType} key={bodyType}>
              {validLayers.map((layer, index) => {
                // Remove <g> tags from layer.svg to prevent nested groups
                const cleanSvg = layer.svg
                  .replace(/<g[^>]*>/g, "") // Remove opening <g> tags
                  .replace(/<\/g>/g, ""); // Remove closing </g> tags

                return (
                  <g
                    key={`${layer.bodyType}-${index}`}
                    id={layer.label || `${layer.bodyType}-${index}`}
                    dangerouslySetInnerHTML={{ __html: cleanSvg }}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
