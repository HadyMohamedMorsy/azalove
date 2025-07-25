import {
  BODY_COLORS,
  CHIN_COLORS,
  CLOTHING_COLORS,
  GLASSES_COLORS,
  HAT_COLORS,
  MUSTACHE_COLORS,
  SHOES_COLORS,
} from "@/data/characterData";
import { CharacterState } from "@/types/avatar";
import { useState } from "react";

const createInitialCharacterState = (
  bodyColorIndex: number = 0
): CharacterState => ({
  bodyColor: BODY_COLORS[bodyColorIndex],
  shoesColor: SHOES_COLORS[0],
  glassesColor: GLASSES_COLORS[0],
  glassesType: "glasses1",
  hatColor: HAT_COLORS[0],
  hatType: "hat2",
  mustacheColor: MUSTACHE_COLORS[0],
  mustacheType: "mustache1",
  chinColor: CHIN_COLORS[0],
  chinType: "chin1",
  pantsColor: CLOTHING_COLORS[0],
  pantsType: "pants",
  clothingColor: CLOTHING_COLORS[0],
  clothingType: "shirt",
  showShoes: false,
  showGlasses: false,
  showHat: false,
  showMustache: false,
  showChin: false,
  showPants: false,
  showClothing: false,
});

export function useCharacterState() {
  const [character1, setCharacter1] = useState<CharacterState>(() =>
    createInitialCharacterState(0)
  );

  const [character2, setCharacter2] = useState<CharacterState>(() =>
    createInitialCharacterState(1)
  );

  const [activeCharacter, setActiveCharacter] = useState<"first" | "second">(
    "first"
  );

  const currentCharacter =
    activeCharacter === "first" ? character1 : character2;
  const setCurrentCharacter =
    activeCharacter === "first" ? setCharacter1 : setCharacter2;

  return {
    character1,
    character2,
    activeCharacter,
    currentCharacter,
    setCharacter1,
    setCharacter2,
    setActiveCharacter,
    setCurrentCharacter,
  };
}
