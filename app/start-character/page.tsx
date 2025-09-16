"use client";

import CharacterCustomizer from "@/components/avatars/character-customizer";
import CharacterSelector from "@/components/avatars/character-selector";
import CouplePreview from "@/components/avatars/couple-preview";
import CharacterCustomizerSkeleton from "@/components/ui/character-customizer-skeleton";
import {
  CharacterSaveDialog,
  SaveAnswers,
} from "@/components/ui/character-save-dialog";
import { StartCharacterShapesProvider } from "@/contexts/start-character-shapes-context";
import { useCharacterState } from "@/hooks/use-character-state";
import { useSavedCouples } from "@/hooks/use-saved-couples";
import { useStartCharacterShapes } from "@/hooks/use-start-character-shapes";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { useState } from "react";

function StartCharacterContent() {
  const {
    characterState,
    selection,
    currentLayers,
    getCurrentLayersForBodyType,
    updateCharacterLayer,
    switchActiveCharacter,
    setActiveBodyType,
    setActiveColor,
    setCharacterState,
  } = useCharacterState();

  const { loading } = useStartCharacterShapes();
  const { saveCouple } = useSavedCouples();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  // Check if both characters have layers
  const hasCharacter1 =
    characterState.Layer_2 && characterState.Layer_2.length > 0;
  const hasCharacter2 =
    characterState.Layer_4 && characterState.Layer_4.length > 0;
  const canCreateCouple = hasCharacter1 && hasCharacter2;

  const handleSaveCharacter = (answers: SaveAnswers) => {
    // Prepare character selection data with null safety
    const characterSelection = [
      {
        character: "layer_2",
        colorsCode: (characterState.Layer_2 || [])
          .map((layer: any) => layer.color)
          .filter(Boolean),
        bodyType: (characterState.Layer_2 || []).map(
          (layer: any) => layer.bodyType
        ),
        body: (characterState.Layer_2 || []).map((layer: any) => ({
          bodyType: layer.bodyType,
          label: layer.label,
          color: layer.color,
        })),
      },
      {
        character: "layer_4",
        colorsCode: (characterState.Layer_4 || [])
          .map((layer: any) => layer.color)
          .filter(Boolean),
        bodyType: (characterState.Layer_4 || []).map(
          (layer: any) => layer.bodyType
        ),
        body: (characterState.Layer_4 || []).map((layer: any) => ({
          bodyType: layer.bodyType,
          label: layer.label,
          color: layer.color,
        })),
      },
    ];

    const savedCouple = saveCouple({
      name: `Couple ${Date.now()}`,
      character1: characterState.Layer_2,
      character2: characterState.Layer_4,
      answers,
      characterSelection,
    });

    // Navigate to related books page - data will be retrieved from saved couple
    router.push("/related-books");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("character.createCouple")}
          </h1>
          <div className="flex flex-col items-end">
            <button
              onClick={() => setShowSaveDialog(true)}
              disabled={!canCreateCouple}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                canCreateCouple
                  ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {t("character.createCouples")}
            </button>
            {!canCreateCouple && (
              <p className="text-xs text-gray-500 mt-1">
                {!hasCharacter1 && !hasCharacter2
                  ? "يرجى إنشاء الشخصيتين أولاً"
                  : !hasCharacter1
                    ? "يرجى إنشاء الشخصية الأولى (Layer_2)"
                    : "يرجى إنشاء الشخصية الثانية (Layer_4)"}
              </p>
            )}
          </div>
        </div>

        {/* Character Selector */}
        <CharacterSelector
          activeCharacter={selection.activeCharacter}
          onCharacterChange={(character: string) =>
            switchActiveCharacter(character as "Layer_2" | "Layer_4")
          }
        />

        {/* Characters Preview */}
        <CouplePreview
          character1={characterState.Layer_2 || []}
          character2={characterState.Layer_4 || []}
        />

        {/* Active Character Indicator */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700">
            {t("character.currentlyEditing")}{" "}
            <span className="text-red-600">
              {selection.activeCharacter === "Layer_2"
                ? t("character.character1")
                : t("character.character2")}
            </span>
          </p>
        </div>

        {/* Character Customizer */}
        {loading ? (
          <CharacterCustomizerSkeleton />
        ) : (
          <CharacterCustomizer
            characterState={characterState}
            selection={selection}
            currentLayers={currentLayers}
            updateCharacterLayer={updateCharacterLayer}
            setActiveBodyType={setActiveBodyType}
            setActiveColor={setActiveColor}
            setCharacterState={setCharacterState}
          />
        )}
      </div>

      {/* Save Dialog */}
      <CharacterSaveDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        onSave={handleSaveCharacter}
      />
    </div>
  );
}

export default function StartCharacterPage() {
  return (
    <StartCharacterShapesProvider>
      <StartCharacterContent />
    </StartCharacterShapesProvider>
  );
}
