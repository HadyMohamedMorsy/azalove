"use client";
import { useShapes } from "@/hooks/use-shapes";
import {
  CharacterLayer,
  CharacterSelection,
  CharacterState,
} from "@/types/avatar";
import { useEffect, useState } from "react";

interface CharacterCustomizerProps {
  characterState: CharacterState;
  selection: CharacterSelection;
  currentLayers: CharacterLayer[];
  updateCharacterLayer: (
    bodyType: string,
    svg: string,
    color?: string,
    label?: string
  ) => void;
  setActiveBodyType: (bodyType: string) => void;
  setActiveColor: (color: string) => void;
}

export default function CharacterCustomizer({
  characterState,
  selection,
  currentLayers,
  updateCharacterLayer,
  setActiveBodyType,
  setActiveColor,
}: CharacterCustomizerProps) {
  const { shapes } = useShapes();
  const [activeType, setActiveType] = useState("");
  useEffect(() => {
    if (selection.activeCharacter) {
      setActiveType(selection.activeCharacter);
    }
    if (
      shapes.bodyColors &&
      shapes.bodyColors.length > 0 &&
      !selection.activeColor
    ) {
      setActiveColor(shapes.bodyColors[0]);
    }
    if (
      shapes.bodyTypes &&
      shapes.bodyTypes.length > 0 &&
      !selection.activeBodyType
    ) {
      setActiveBodyType(shapes.bodyTypes[0].id);
    }
  }, [
    selection.activeCharacter,
    shapes.bodyColors,
    shapes.bodyTypes,
    activeType,
    selection.activeColor,
    selection.activeBodyType,
    setActiveColor,
    setActiveBodyType,
  ]);

  const filteredShapes =
    selection.activeBodyType && activeType
      ? (shapes.bodyShapes?.[selection.activeBodyType] || []).filter(
          (shape: any) => {
            const matchesType = shape.type === activeType;
            const matchesColor =
              !selection.activeColor ||
              shape.colorCode === selection.activeColor;
            return matchesType && matchesColor;
          }
        )
      : [];

  const getAvailableColors = () => {
    if (
      !selection.activeBodyType ||
      !activeType ||
      !shapes.bodyShapes?.[selection.activeBodyType]
    ) {
      return shapes.bodyColors || [];
    }

    const availableShapes = shapes.bodyShapes[selection.activeBodyType].filter(
      (shape: any) => shape.type === activeType
    );

    const availableColors = Array.from(
      new Set(availableShapes.map((shape: any) => shape.colorCode))
    );
    return availableColors.filter((color) => color);
  };

  const availableColors = getAvailableColors();

  const handleTabClick = (tabId: string) => {
    setActiveBodyType(tabId);
    if (activeType && shapes.bodyShapes?.[tabId]) {
      const availableShapes = shapes.bodyShapes[tabId].filter(
        (shape: any) => shape.type === activeType
      );
      if (availableShapes.length > 0) {
        const firstColor = availableShapes[0].colorCode;
        if (firstColor) {
          setActiveColor(firstColor);
        }
      }
    }
  };

  const handleTypeClick = (type: string) => {
    setActiveType(type);
    if (
      selection.activeBodyType &&
      shapes.bodyShapes?.[selection.activeBodyType]
    ) {
      const availableShapes = shapes.bodyShapes[
        selection.activeBodyType
      ].filter((shape: any) => shape.type === type);
      if (availableShapes.length > 0) {
        const firstColor = availableShapes[0].colorCode;
        if (firstColor) {
          setActiveColor(firstColor);
        }
      }
    }
  };

  const handleColorClick = (color: string) => {
    setActiveColor(color);
  };

  const handleShapeClick = (shape: any) => {
    updateCharacterLayer(
      selection.activeBodyType,
      shape.svg,
      shape.colorCode,
      shape.label
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {shapes.bodyTypes?.map((bodyType: any) => (
          <button
            key={bodyType.id}
            className={`px-4 py-2 rounded-lg font-medium transition border-b-2 ${
              selection.activeBodyType === bodyType.id
                ? "border-red-500 text-red-600 bg-red-50"
                : "border-transparent text-gray-600 bg-transparent hover:bg-gray-50"
            }`}
            onClick={() => handleTabClick(bodyType.id)}
          >
            {bodyType.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {availableColors?.map((color: string) => (
          <button
            key={color}
            className={`px-4 py-2 rounded-lg font-medium transition border-b-2 ${
              selection.activeColor === color
                ? "border-green-500 text-green-600 bg-green-50"
                : "border-transparent text-gray-600 bg-transparent hover:bg-gray-50"
            }`}
            onClick={() => handleColorClick(color)}
          >
            <div
              className="w-6 h-6 rounded-full mx-auto mb-1 border-2 border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs">{color}</span>
          </button>
        ))}
      </div>

      {selection.activeBodyType && (
        <div className="flex flex-col gap-6">
          {filteredShapes.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeType} - {selection.activeColor} -{" "}
                {
                  shapes.bodyTypes?.find(
                    (bt: any) => bt.id === selection.activeBodyType
                  )?.label
                }{" "}
                Shapes
              </h3>
              <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                {filteredShapes.map((shape: any) => {
                  const isSelected = currentLayers?.some(
                    (layer) =>
                      layer.bodyType === selection.activeBodyType &&
                      layer.svg === shape.svg
                  );
                  return (
                    <button
                      key={shape.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      title={shape.label}
                      onClick={() => handleShapeClick(shape)}
                    >
                      <svg
                        className="w-16 h-16 mx-auto"
                        viewBox="0 0 53 108"
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: shape.svg }}
                      />
                      <p className="text-xs text-gray-600 mt-1 text-center">
                        {shape.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
