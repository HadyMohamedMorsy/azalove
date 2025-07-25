"use client";

import Character from "@/components/ui/svgs/character";
import Chin1 from "@/components/ui/svgs/chin/chin-1";
import Chin2 from "@/components/ui/svgs/chin/chin-2";
import Chin3 from "@/components/ui/svgs/chin/chin-3";
import Glasses1 from "@/components/ui/svgs/glassess/glasses-1";
import Glasses10 from "@/components/ui/svgs/glassess/glasses-10";
import Glasses2 from "@/components/ui/svgs/glassess/glasses-2";
import Glasses3 from "@/components/ui/svgs/glassess/glasses-3";
import Glasses4 from "@/components/ui/svgs/glassess/glasses-4";
import Glasses5 from "@/components/ui/svgs/glassess/glasses-5";
import Glasses6 from "@/components/ui/svgs/glassess/glasses-6";
import Glasses7 from "@/components/ui/svgs/glassess/glasses-7";
import Glasses8 from "@/components/ui/svgs/glassess/glasses-8";
import Glasses9 from "@/components/ui/svgs/glassess/glasses-9";
import Hat1 from "@/components/ui/svgs/hates/hates-1";
import Hat10 from "@/components/ui/svgs/hates/hates-10";
import Hat2 from "@/components/ui/svgs/hates/hates-2";
import Hat3 from "@/components/ui/svgs/hates/hates-3";
import Hat4 from "@/components/ui/svgs/hates/hates-4";
import Hat5 from "@/components/ui/svgs/hates/hates-5";
import Hat6 from "@/components/ui/svgs/hates/hates-6";
import Hat7 from "@/components/ui/svgs/hates/hates-7";
import Hat8 from "@/components/ui/svgs/hates/hates-8";
import Hat9 from "@/components/ui/svgs/hates/hates-9";
import Jalabia from "@/components/ui/svgs/jalabiya/jalabia";
import Mustache from "@/components/ui/svgs/mustache/mustache";
import Mustache2 from "@/components/ui/svgs/mustache/mustache-2";
import Mustache3 from "@/components/ui/svgs/mustache/mustache-3";
import Mustache4 from "@/components/ui/svgs/mustache/mustache-4";
import Mustache5 from "@/components/ui/svgs/mustache/mustache-5";
import Mustache6 from "@/components/ui/svgs/mustache/mustache-6";
import Mustache7 from "@/components/ui/svgs/mustache/mustache-7";
import Mustache8 from "@/components/ui/svgs/mustache/mustache-8";
import Pants from "@/components/ui/svgs/pants/pants";
import Shamakh from "@/components/ui/svgs/shamakh/shamakh";
import Shamakh1 from "@/components/ui/svgs/shamakh/shamakh-1";
import Shirt from "@/components/ui/svgs/shirt/shirt";
import TShirt from "@/components/ui/svgs/shirt/t-shirt";
import Shoes from "@/components/ui/svgs/shoes/shoes-1";
import Shorts from "@/components/ui/svgs/shorts/shorts";
import { CharacterState } from "@/types/avatar";
import React from "react";

const GLASSES_TYPES = [
  { id: "glasses1", label: "Glasses 1", component: Glasses1 },
  { id: "glasses2", label: "Glasses 2", component: Glasses2 },
  { id: "glasses3", label: "Glasses 3", component: Glasses3 },
  { id: "glasses4", label: "Glasses 4", component: Glasses4 },
  { id: "glasses5", label: "Glasses 5", component: Glasses5 },
  { id: "glasses6", label: "Glasses 6", component: Glasses6 },
  { id: "glasses7", label: "Glasses 7", component: Glasses7 },
  { id: "glasses8", label: "Glasses 8", component: Glasses8 },
  { id: "glasses9", label: "Glasses 9", component: Glasses9 },
  { id: "glasses10", label: "Glasses 10", component: Glasses10 },
];

const HAT_TYPES = [
  { id: "hat2", label: "Hat 2", component: Hat2 },
  { id: "hat3", label: "Hat 3", component: Hat3 },
  { id: "hat4", label: "Hat 4", component: Hat4 },
  { id: "hat5", label: "Hat 5", component: Hat5 },
  { id: "hat6", label: "Hat 6", component: Hat6 },
  { id: "hat7", label: "Hat 7", component: Hat7 },
  { id: "hat8", label: "Hat 8", component: Hat8 },
  { id: "hat9", label: "Hat 9", component: Hat9 },
  { id: "hat10", label: "Hat 10", component: Hat10 },
  { id: "shamakh", label: "Shamakh", component: Shamakh },
  { id: "shamakh1", label: "Shamakh 1", component: Shamakh1 },
];

const MUSTACHE_TYPES = [
  { id: "mustache1", label: "Mustache 1", component: Mustache },
  { id: "mustache2", label: "Mustache 2", component: Mustache2 },
  { id: "mustache3", label: "Mustache 3", component: Mustache3 },
  { id: "mustache4", label: "Mustache 4", component: Mustache4 },
  { id: "mustache5", label: "Mustache 5", component: Mustache5 },
  { id: "mustache6", label: "Mustache 6", component: Mustache6 },
  { id: "mustache7", label: "Mustache 7", component: Mustache7 },
  { id: "mustache8", label: "Mustache 8", component: Mustache8 },
];

const CHIN_TYPES = [
  { id: "chin1", label: "Chin 1", component: Chin1 },
  { id: "chin2", label: "Chin 2", component: Chin2 },
  { id: "chin3", label: "Chin 3", component: Chin3 },
];

const PANTS_TYPES = [
  { id: "pants", label: "Pants", component: Pants },
  { id: "shorts", label: "Shorts", component: Shorts },
];

const CLOTHING_TYPES = [
  { id: "shirt", label: "Shirt", component: Shirt },
  { id: "tshirt", label: "T-Shirt", component: TShirt },
  { id: "jalabia", label: "Jalabia", component: Jalabia },
];

interface CharacterPreviewProps {
  character: CharacterState;
  size?: number;
  className?: string;
}

export default function CharacterPreview({
  character,
  size = 300,
  className = "",
}: CharacterPreviewProps) {
  const getSelectedGlassesComponent = () => {
    const glassesType = GLASSES_TYPES.find(
      (glasses) => glasses.id === character.glassesType
    );
    return glassesType ? glassesType.component : Glasses1;
  };

  const getSelectedHatComponent = () => {
    const hatType = HAT_TYPES.find((hat) => hat.id === character.hatType);
    return hatType ? hatType.component : Hat1;
  };

  const getSelectedMustacheComponent = () => {
    const mustacheType = MUSTACHE_TYPES.find(
      (mustache) => mustache.id === character.mustacheType
    );
    return mustacheType ? mustacheType.component : Mustache;
  };

  const getSelectedChinComponent = () => {
    const chinType = CHIN_TYPES.find((chin) => chin.id === character.chinType);
    return chinType ? chinType.component : Chin1;
  };

  const getSelectedPantsComponent = () => {
    const pantsType = PANTS_TYPES.find(
      (pants) => pants.id === character.pantsType
    );
    return pantsType ? pantsType.component : Pants;
  };

  const getSelectedClothingComponent = () => {
    const clothingType = CLOTHING_TYPES.find(
      (clothing) => clothing.id === character.clothingType
    );
    return clothingType ? clothingType.component : Shirt;
  };

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
        <Character color={character.bodyColor} />
        {character.showShoes && <Shoes color={character.shoesColor} />}
        {character.showGlasses &&
          React.createElement(getSelectedGlassesComponent(), {
            color: character.glassesColor,
          })}
        {character.showHat &&
          React.createElement(getSelectedHatComponent(), {
            color: character.hatColor,
          })}
        {character.showMustache &&
          React.createElement(getSelectedMustacheComponent(), {
            color: character.mustacheColor,
          })}
        {character.showChin &&
          React.createElement(getSelectedChinComponent(), {
            color: character.chinColor,
          })}
        {character.showPants &&
          React.createElement(getSelectedPantsComponent(), {
            color: character.pantsColor,
          })}
        {character.showClothing &&
          React.createElement(getSelectedClothingComponent(), {
            color: character.clothingColor,
          })}
      </svg>
    </div>
  );
}
