"use client";
import { useShapes } from "@/hooks/use-shapes";

interface CharacterPreviewProps {
  shapeId: string;
  size?: number;
  className?: string;
}

export default function CharacterPreview({
  shapeId,
  size = 300,
  className = "",
}: CharacterPreviewProps) {
  const { shapes } = useShapes();

  const getBodyShapeSVG = () => {
    if (!shapes.bodyShapes || !shapeId) {
      return null;
    }

    // Search through all bodyShapes to find the shape with matching ID
    for (const bodyType in shapes.bodyShapes) {
      const shapesForType = shapes.bodyShapes[bodyType];
      const foundShape = shapesForType.find(
        (shape: any) => shape.id === shapeId
      );
      if (foundShape) {
        return foundShape.svg || null;
      }
    }

    return null;
  };
  const bodyShapeSVG = getBodyShapeSVG();
  console.log(bodyShapeSVG);

  return (
    <div
      className={`bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 53 108"
        width={size}
        height={size}
      >
        {bodyShapeSVG && (
          <g dangerouslySetInnerHTML={{ __html: bodyShapeSVG }} />
        )}
      </svg>
    </div>
  );
}
