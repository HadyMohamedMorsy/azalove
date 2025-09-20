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
            <g className={bodyType} key={bodyType}>
              {validLayers.map((layer, index) => {
                // Remove <g> tags from layer.svg to prevent nested groups
                let cleanSvg = layer.svg
                  .replace(/<g[^>]*>/g, "") // Remove opening <g> tags
                  .replace(/<\/g>/g, ""); // Remove closing </g> tags

                // Add class to each path element that has fill color
                let pathCounter = 0;
                cleanSvg = cleanSvg.replace(
                  /<path([^>]*fill="[^"]*"[^>]*)>/g, 
                  (match, attributes) => {
                    // Extract the fill color
                    const fillMatch = attributes.match(/fill="([^"]*)"/);
                    if (fillMatch && fillMatch[1] && fillMatch[1] !== 'none' && fillMatch[1] !== 'transparent') {
                      const fillColor = fillMatch[1].replace('#', ''); // Remove # from color
                      return `<path${attributes} class="${layer.label || `${layer.bodyType}-${index}`}-${pathCounter++}-${fillColor}">`;
                    }
                    return match;
                  }
                );

                return (
                  <g
                    key={`${layer.bodyType}-${index}`}
                    className={layer.label || `${layer.bodyType}-${index}`}
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
