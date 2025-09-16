"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { useStartCharacterShapes } from "@/hooks/use-start-character-shapes";
import { useTranslation } from "@/hooks/use-translation";
import {
  CharacterLayer,
  CharacterSelection,
  CharacterState,
} from "@/types/avatar";
import axios from "axios";
import { useEffect, useState } from "react";

interface CharacterCustomizerProps {
  characterState: CharacterState;
  selection: CharacterSelection;
  currentLayers: CharacterLayer[];
  updateCharacterLayer: (
    bodyType: string,
    svg: string,
    color?: string,
    label?: string,
    isPart?: boolean
  ) => void;
  setActiveBodyType: (bodyType: string) => void;
  setActiveColor: (color: string) => void;
  setCharacterState: (
    state: CharacterState | ((prev: CharacterState) => CharacterState)
  ) => void;
}

export default function CharacterCustomizer({
  characterState,
  selection,
  currentLayers,
  updateCharacterLayer,
  setActiveBodyType,
  setActiveColor,
  setCharacterState,
}: CharacterCustomizerProps) {
  const { shapes, loading } = useStartCharacterShapes();
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState("");
  const [activeAvailablePart, setActiveAvailablePart] = useState("");
  const [availablePartsData, setAvailablePartsData] = useState<any[]>([]);
  const [allPartsData, setAllPartsData] = useState<any[]>([]); // Base array for all parts
  const [loadingParts, setLoadingParts] = useState(false);

  // Update activeType when character changes
  useEffect(() => {
    if (selection.activeCharacter) {
      setActiveType(selection.activeCharacter);
      // Reset parts data when switching characters
      setActiveAvailablePart("");
      setAvailablePartsData([]);
      setAllPartsData([]);
    }
  }, [selection.activeCharacter]);

  useEffect(() => {
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

    // Don't reset parts data - let user keep their loaded parts

    // Auto-select first available part for better UX
    const currentAvailableParts = getAvailableParts();
    if (currentAvailableParts.length > 0 && !activeAvailablePart) {
      setActiveAvailablePart(currentAvailableParts[0]);
    }
  }, [
    selection.activeCharacter,
    shapes.bodyColors,
    shapes.bodyTypes,
    shapes.bodyShapes,
    selection.activeColor,
    selection.activeBodyType,
  ]);

  useEffect(() => {
    if (activeAvailablePart && selection.activeBodyType) {
      fetchPartsData(selection.activeBodyType, activeAvailablePart);
    }
  }, [activeAvailablePart, selection.activeBodyType]);

  // Reset character when body type changes
  useEffect(() => {
    if (selection.activeBodyType && selection.activeCharacter) {
      // Clear all existing layers for this character
      updateCharacterLayer(selection.activeBodyType, "", "", "");
    }
  }, [selection.activeBodyType, selection.activeCharacter]);

  // Don't clear layers when character changes - preserve existing selections
  // This was causing the issue where Layer_2 character disappears when switching to Layer_4

  const filteredShapes =
    selection.activeBodyType && activeType
      ? (shapes.bodyShapes?.[selection.activeBodyType] || []).filter(
          (shape: any) => {
            const matchesType = shape.type === activeType;
            const matchesCharacter = shape.type === selection.activeCharacter;
            const matchesColor =
              !selection.activeColor ||
              shape.colorCode === selection.activeColor;
            const matchesAvailablePart =
              !activeAvailablePart ||
              !shape.availableParts ||
              shape.availableParts.length === 0 ||
              shape.availableParts.includes(activeAvailablePart);
            return (
              matchesType &&
              matchesCharacter &&
              matchesColor &&
              matchesAvailablePart
            );
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

  // Get available colors from current active part data
  const getPartsColors = () => {
    if (availablePartsData.length === 0) return [];

    const colors = Array.from(
      new Set(availablePartsData.map((part: any) => part.colorCode))
    );
    return colors.filter((color) => color);
  };

  const partsColors = getPartsColors();

  // Get filtered parts based on selected color from current active part
  const getFilteredParts = () => {
    if (availablePartsData.length === 0) return [];

    if (!selection.activeColor) return availablePartsData;

    const filtered = availablePartsData.filter(
      (part: any) => part.colorCode === selection.activeColor
    );

    return filtered;
  };

  const filteredParts = getFilteredParts();

  // Get available parts for the active body type
  const getAvailableParts = () => {
    if (
      !selection.activeBodyType ||
      !shapes.bodyShapes?.[selection.activeBodyType]
    ) {
      return [];
    }

    const bodyShapes = shapes.bodyShapes[selection.activeBodyType];
    const allAvailableParts = new Set<string>();

    bodyShapes.forEach((shape: any) => {
      if (shape.availableParts && Array.isArray(shape.availableParts)) {
        shape.availableParts.forEach((part: string) => {
          allAvailableParts.add(part);
        });
      }
    });

    return Array.from(allAvailableParts);
  };

  const availableParts = getAvailableParts();

  // Fetch parts data from API
  const fetchPartsData = async (shapeId: string, partType: string) => {
    try {
      setLoadingParts(true);
      const response = await axios.post(API_ENDPOINTS_FROM_NEXT.SHAPES_PARTS, {
        shapeId,
        partType,
      });
      const partsData = response.data || [];

      // Add to base array if not already exists
      setAllPartsData((prevData) => {
        const existingIds = new Set(prevData.map((part) => part.id));
        const newParts = partsData.filter(
          (part: any) => !existingIds.has(part.id)
        );
        return [...prevData, ...newParts];
      });

      setAvailablePartsData(partsData);

      if (partsData.length > 0) {
        const firstColor = partsData[0].colorCode;
        if (firstColor) {
          setActiveColor(firstColor);
        }

        // Auto-select first part
        const firstPart = partsData[0];
        if (firstPart) {
          updateCharacterLayer(
            selection.activeBodyType,
            firstPart.svg,
            firstPart.colorCode,
            firstPart.label
          );
        }
      }
    } catch (error) {
      console.error("Error fetching parts data:", error);
      setAvailablePartsData([]);
    } finally {
      setLoadingParts(false);
    }
  };

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

  // Clear all other body types except the selected one for the ACTIVE character
  const clearOtherBodyTypes = (selectedBodyType: string) => {
    // Get current layers for active character
    const currentLayers = characterState[selection.activeCharacter] || [];

    // Find all body types that exist in current layers
    const existingBodyTypes = Array.from(
      new Set(currentLayers.map((layer) => layer.bodyType))
    );

    // Clear all existing body types except the selected one
    existingBodyTypes.forEach((bodyType) => {
      if (bodyType !== selectedBodyType) {
        updateCharacterLayer(bodyType, "", "", "");
      }
    });
  };

  const handleTabClick = (tabId: string) => {
    // Clear all other body types first
    clearOtherBodyTypes(tabId);

    // Reset all states
    setActiveBodyType(tabId);
    setActiveAvailablePart("");
    setAvailablePartsData([]);
    setAllPartsData([]);
    setActiveColor("");

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

    // Auto-select first part with the selected color
    const filteredParts = allPartsData.filter(
      (part: any) => part.colorCode === color
    );

    if (filteredParts.length > 0) {
      const firstPart = filteredParts[0];
      updateCharacterLayer(
        selection.activeBodyType,
        firstPart.svg,
        firstPart.colorCode,
        firstPart.label
      );
    }
  };

  const handleShapeClick = (shape: any) => {
    updateCharacterLayer(
      selection.activeBodyType,
      shape.svg,
      shape.colorCode,
      shape.label,
      true // isPart = true for parts
    );
  };

  const handleAvailablePartClick = (part: string) => {
    setActiveAvailablePart(part);
    // Parts data will be fetched automatically by useEffect
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {shapes.bodyTypes
          // Filter body types by active character
          ?.filter((bodyType: any) => {
            const bodyShapes = shapes.bodyShapes?.[bodyType.id];
            return bodyShapes?.some(
              (shape: any) => shape.type === selection.activeCharacter
            );
          })
          .map((bodyType: any) => (
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

      {/* Available Parts Tabs */}
      {selection.activeBodyType && availableParts.length > 0 && (
        <div className="flex flex-col items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-gray-600">
            {t("character.availableParts") || "Available Parts"}
          </h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {availableParts.map((part: string) => (
              <button
                key={part}
                className={`px-4 py-2 rounded-lg font-medium transition border-b-2 ${
                  activeAvailablePart === part
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 bg-transparent hover:bg-gray-50"
                }`}
                onClick={() => handleAvailablePartClick(part)}
              >
                {part}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Parts Colors - Only show when parts data is available */}
      {activeAvailablePart && partsColors.length > 0 && (
        <div className="flex flex-col items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-gray-600">
            {t("character.availableColors") || "Available Colors"}
          </h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {partsColors.map((color: string) => (
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
                  className={`w-6 h-6 rounded-full mx-auto mb-1 border-2 ${
                    selection.activeColor === color
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs">{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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

      {/* Parts Display - Show when parts data is available */}
      {activeAvailablePart && availablePartsData.length > 0 && (
        <div className="flex flex-col items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {activeAvailablePart} - {t("character.parts") || "Parts"}
          </h3>
          {loadingParts ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">
                {t("character.loading") || "Loading..."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {filteredParts.length === 0 && selection.activeColor && (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-2">
                    {t("character.noPartsForColor") ||
                      "No parts available for this color"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("character.showingAllParts") ||
                      "Showing all available parts"}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                {(filteredParts.length > 0
                  ? filteredParts
                  : availablePartsData
                ).map((part: any) => {
                  const isSelected = currentLayers?.some(
                    (layer) =>
                      layer.bodyType === selection.activeBodyType &&
                      layer.svg === part.svg
                  );
                  const matchesColor =
                    !selection.activeColor ||
                    part.colorCode === selection.activeColor;
                  return (
                    <button
                      key={part.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : matchesColor
                            ? "border-gray-300 hover:border-gray-400 bg-white"
                            : "border-gray-200 hover:border-gray-300 bg-gray-50 opacity-60"
                      }`}
                      title={part.label}
                      onClick={() => handleShapeClick(part)}
                    >
                      <svg
                        className="w-16 h-16 mx-auto"
                        viewBox="0 0 53 108"
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: part.svg }}
                      />
                      <p className="text-xs text-gray-600 mt-1 text-center">
                        {part.label}
                      </p>
                      <div
                        className="w-4 h-4 rounded-full mx-auto mt-1 border border-gray-300"
                        style={{ backgroundColor: part.colorCode }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

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
                {filteredShapes.map((shape: any, index: number) => {
                  const isSelected = currentLayers?.some(
                    (layer) =>
                      layer.bodyType === selection.activeBodyType &&
                      layer.svg === shape.svg
                  );
                  return (
                    <button
                      key={shape.id || `shape-${index}`}
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
