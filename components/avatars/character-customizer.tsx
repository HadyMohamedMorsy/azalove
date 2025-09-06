"use client";
import { useStartCharacterShapes } from "@/hooks/use-start-character-shapes";
import { useTranslation } from "@/hooks/use-translation";
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
  const { shapes, loading } = useStartCharacterShapes();
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState("");
  useEffect(() => {
    if (selection.activeCharacter) {
      setActiveType(selection.activeCharacter);
    }

    // Auto-select first body type if none selected
    if (
      shapes.bodyTypes &&
      shapes.bodyTypes.length > 0 &&
      !selection.activeBodyType
    ) {
      const firstBodyType = shapes.bodyTypes[0].id;
      setActiveBodyType(firstBodyType);

      // Auto-select first available color and shape for the first body type
      if (
        shapes.bodyShapes?.[firstBodyType] &&
        shapes.bodyShapes[firstBodyType].length > 0
      ) {
        const firstShape = shapes.bodyShapes[firstBodyType][0];
        if (firstShape.colorCode) {
          setActiveColor(firstShape.colorCode);
        }
        if (firstShape.type) {
          setActiveType(firstShape.type);
        }
        // Auto-apply the first shape
        updateCharacterLayer(
          firstBodyType,
          firstShape.svg,
          firstShape.colorCode,
          firstShape.label
        );
      }
    }

    // Set default color if none selected and we have colors
    if (
      shapes.bodyColors &&
      shapes.bodyColors.length > 0 &&
      !selection.activeColor
    ) {
      setActiveColor(shapes.bodyColors[0]);
    }
  }, [
    selection.activeCharacter,
    shapes.bodyColors,
    shapes.bodyTypes,
    shapes.bodyShapes,
    activeType,
    selection.activeColor,
    selection.activeBodyType,
    setActiveColor,
    setActiveBodyType,
    updateCharacterLayer,
  ]);

  const filteredShapes =
    selection.activeBodyType && activeType
      ? (shapes.bodyShapes?.[selection.activeBodyType] || []).filter(
          (shape: any) => {
            const matchesType = shape.type === activeType;
            const matchesCharacter = shape.type === selection.activeCharacter;
            const matchesColor =
              !selection.activeColor ||
              shape.colorCode === selection.activeColor;
            return matchesType && matchesCharacter && matchesColor;
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
      (shape: any) =>
        shape.type === activeType && shape.type === selection.activeCharacter
    );

    const availableColors = Array.from(
      new Set(availableShapes.map((shape: any) => shape.colorCode))
    );
    return availableColors.filter((color) => color);
  };

  const availableColors = getAvailableColors();

  // Helper function to ensure first child is always selected for the active character
  const selectFirstAvailable = (
    bodyType: string,
    type?: string,
    color?: string
  ) => {
    if (!shapes.bodyShapes?.[bodyType]) return;

    let availableShapes = shapes.bodyShapes[bodyType];

    // Filter by type if provided
    if (type) {
      availableShapes = availableShapes.filter(
        (shape: any) => shape.type === type
      );
    }

    // Filter by color if provided
    if (color) {
      availableShapes = availableShapes.filter(
        (shape: any) => shape.colorCode === color
      );
    }

    // Filter by active character type (Layer_2 or Layer_4)
    const activeCharacterType = selection.activeCharacter;
    if (activeCharacterType) {
      availableShapes = availableShapes.filter(
        (shape: any) => shape.type === activeCharacterType
      );
    }

    if (availableShapes.length > 0) {
      const firstShape = availableShapes[0];

      // Set type if not provided
      if (!type && firstShape.type) {
        setActiveType(firstShape.type);
      }

      // Set color if not provided
      if (!color && firstShape.colorCode) {
        setActiveColor(firstShape.colorCode);
      }

      // Always apply the first shape
      updateCharacterLayer(
        bodyType,
        firstShape.svg,
        firstShape.colorCode,
        firstShape.label
      );
    }
  };

  // Don't render if still loading
  if (loading) {
    return null;
  }

  const handleTabClick = (tabId: string) => {
    setActiveBodyType(tabId);
    // Auto-select first available type and color for this body type
    selectFirstAvailable(tabId);
  };

  const handleTypeClick = (type: string) => {
    setActiveType(type);
    // Auto-select first available color and shape for this type
    if (selection.activeBodyType) {
      selectFirstAvailable(selection.activeBodyType, type);
    }
  };

  const handleColorClick = (color: string) => {
    setActiveColor(color);
    // Auto-select first available shape for this color
    if (selection.activeBodyType) {
      selectFirstAvailable(selection.activeBodyType, activeType, color);
    }
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
                {t("character.shapes")}
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
