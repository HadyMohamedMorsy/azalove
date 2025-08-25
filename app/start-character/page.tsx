"use client";

import CharacterCustomizer from "@/components/avatars/character-customizer";
import CharacterSelector from "@/components/avatars/character-selector";
import CouplePreview from "@/components/avatars/couple-preview";
import {
  CharacterSaveDialog,
  SaveAnswers,
} from "@/components/ui/character-save-dialog";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useCharacterState } from "@/hooks/use-character-state";
import { useSavedCouples } from "@/hooks/use-saved-couples";
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";

export default function StartCharacterPage() {
  const {
    character1,
    character2,
    activeCharacter,
    currentCharacter,
    setActiveCharacter,
    setCurrentCharacter,
  } = useCharacterState();

  const { saveCouple } = useSavedCouples();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { t } = useTranslation();

  const handleSaveCharacter = (coupleName: string, answers: SaveAnswers) => {
    // Save characters using the hook with answers
    const savedCouple = saveCouple({
      name: coupleName,
      character1,
      character2,
      answers, // Include the answers in the saved couple
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("character.createCouple")}
          </h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              onClick={() => setShowSaveDialog(true)}
            >
              {t("character.saveCouple")}
            </button>
          </div>
        </div>

        {/* Character Selector */}
        <CharacterSelector
          activeCharacter={activeCharacter}
          onCharacterChange={setActiveCharacter}
        />

        {/* Characters Preview */}
        <CouplePreview character1={character1} character2={character2} />

        {/* Active Character Indicator */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-gray-700">
            {t("character.currentlyEditing")}{" "}
            <span className="text-red-600">
              {activeCharacter === "first"
                ? t("character.character1")
                : t("character.character2")}
            </span>
          </p>
        </div>

        {/* Character Customizer */}
        <CharacterCustomizer
          currentCharacter={currentCharacter}
          setCurrentCharacter={setCurrentCharacter}
        />
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
