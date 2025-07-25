"use client";

import {
  BODY_COLORS,
  CHIN_COLORS,
  CLOTHING_COLORS,
  GLASSES_COLORS,
  HAT_COLORS,
  MUSTACHE_COLORS,
  SHOES_COLORS,
  TABS,
} from "@/data/characterData";
import { CharacterState } from "@/types/avatar";
import React from "react";
// Import type selection components
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
import Shorts from "@/components/ui/svgs/shorts/shorts";

// Type definitions
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
  { id: "hat1", label: "Hat 1", component: Hat1 },
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

interface CharacterCustomizerProps {
  currentCharacter: CharacterState;
  setCurrentCharacter: (character: CharacterState) => void;
}

export default function CharacterCustomizer({
  currentCharacter,
  setCurrentCharacter,
}: CharacterCustomizerProps) {
  const [activeTab, setActiveTab] = React.useState(TABS[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "shoes" && !currentCharacter.showShoes) {
      setCurrentCharacter({ ...currentCharacter, showShoes: true });
    }
    if (tabId === "glasses" && !currentCharacter.showGlasses) {
      setCurrentCharacter({ ...currentCharacter, showGlasses: true });
    }
    if (tabId === "hats" && !currentCharacter.showHat) {
      setCurrentCharacter({ ...currentCharacter, showHat: true });
    }
    if (tabId === "mustache" && !currentCharacter.showMustache) {
      setCurrentCharacter({ ...currentCharacter, showMustache: true });
    }
    if (tabId === "chin" && !currentCharacter.showChin) {
      setCurrentCharacter({ ...currentCharacter, showChin: true });
    }
    if (tabId === "pants" && !currentCharacter.showPants) {
      setCurrentCharacter({ ...currentCharacter, showPants: true });
    }
    if (tabId === "clothing" && !currentCharacter.showClothing) {
      setCurrentCharacter({ ...currentCharacter, showClothing: true });
    }
  };

  const ColorPicker = ({
    colors,
    selectedColor,
    onColorChange,
    title,
  }: {
    colors: string[];
    selectedColor: string;
    onColorChange: (color: string) => void;
    title: string;
  }) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-6 gap-3 max-w-md mx-auto">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
              selectedColor === color
                ? "border-red-500 shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
            title={`${title} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  const TypeSelector = ({
    types,
    selectedType,
    onTypeChange,
    title,
    color,
  }: {
    types: { id: string; label: string; component: any }[];
    selectedType: string;
    onTypeChange: (type: string) => void;
    title: string;
    color: string;
  }) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
        {types.map((type) => {
          const Component = type.component;
          return (
            <button
              key={type.id}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                selectedType === type.id
                  ? "border-red-500 shadow-lg bg-red-50"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              }`}
              onClick={() => onTypeChange(type.id)}
              title={type.label}
            >
              <div className="w-16 h-16 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 53 108"
                  width="64"
                  height="64"
                >
                  <Component color={color} />
                </svg>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">
                {type.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const RemoveButton = ({
    onRemove,
    label,
  }: {
    onRemove: () => void;
    label: string;
  }) => (
    <div className="flex justify-center mt-4">
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
        onClick={onRemove}
      >
        Remove {label}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-lg font-medium transition border-b-2 ${
              activeTab === tab.id
                ? "border-red-500 text-red-600 bg-red-50"
                : "border-transparent text-gray-600 bg-transparent hover:bg-gray-50"
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "body" && (
        <ColorPicker
          colors={BODY_COLORS}
          selectedColor={currentCharacter.bodyColor}
          onColorChange={(color) =>
            setCurrentCharacter({ ...currentCharacter, bodyColor: color })
          }
          title="Choose Body Color"
        />
      )}

      {activeTab === "shoes" && (
        <div className="flex flex-col gap-4">
          <ColorPicker
            colors={SHOES_COLORS}
            selectedColor={currentCharacter.shoesColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, shoesColor: color })
            }
            title="Choose Shoes Color"
          />
          {currentCharacter.showShoes && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({ ...currentCharacter, showShoes: false })
              }
              label="Shoes"
            />
          )}
        </div>
      )}

      {activeTab === "glasses" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={GLASSES_TYPES}
            selectedType={currentCharacter.glassesType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, glassesType: type })
            }
            title="Choose Glasses Type"
            color={currentCharacter.glassesColor}
          />
          <ColorPicker
            colors={GLASSES_COLORS}
            selectedColor={currentCharacter.glassesColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, glassesColor: color })
            }
            title="Choose Glasses Color"
          />
          {currentCharacter.showGlasses && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({ ...currentCharacter, showGlasses: false })
              }
              label="Glasses"
            />
          )}
        </div>
      )}

      {activeTab === "hats" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={HAT_TYPES}
            selectedType={currentCharacter.hatType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, hatType: type })
            }
            title="Choose Hat Type"
            color={currentCharacter.hatColor}
          />
          <ColorPicker
            colors={HAT_COLORS}
            selectedColor={currentCharacter.hatColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, hatColor: color })
            }
            title="Choose Hat Color"
          />
          {currentCharacter.showHat && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({ ...currentCharacter, showHat: false })
              }
              label="Hat"
            />
          )}
        </div>
      )}

      {activeTab === "mustache" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={MUSTACHE_TYPES}
            selectedType={currentCharacter.mustacheType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, mustacheType: type })
            }
            title="Choose Mustache Type"
            color={currentCharacter.mustacheColor}
          />
          <ColorPicker
            colors={MUSTACHE_COLORS}
            selectedColor={currentCharacter.mustacheColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, mustacheColor: color })
            }
            title="Choose Mustache Color"
          />
          {currentCharacter.showMustache && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({
                  ...currentCharacter,
                  showMustache: false,
                })
              }
              label="Mustache"
            />
          )}
        </div>
      )}

      {activeTab === "chin" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={CHIN_TYPES}
            selectedType={currentCharacter.chinType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, chinType: type })
            }
            title="Choose Chin Type"
            color={currentCharacter.chinColor}
          />
          <ColorPicker
            colors={CHIN_COLORS}
            selectedColor={currentCharacter.chinColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, chinColor: color })
            }
            title="Choose Chin Color"
          />
          {currentCharacter.showChin && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({ ...currentCharacter, showChin: false })
              }
              label="Chin"
            />
          )}
        </div>
      )}

      {activeTab === "pants" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={PANTS_TYPES}
            selectedType={currentCharacter.pantsType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, pantsType: type })
            }
            title="Choose Pants Type"
            color={currentCharacter.pantsColor}
          />
          <ColorPicker
            colors={CLOTHING_COLORS}
            selectedColor={currentCharacter.pantsColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, pantsColor: color })
            }
            title="Choose Pants Color"
          />
          {currentCharacter.showPants && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({ ...currentCharacter, showPants: false })
              }
              label="Pants"
            />
          )}
        </div>
      )}

      {activeTab === "clothing" && (
        <div className="flex flex-col gap-6">
          <TypeSelector
            types={CLOTHING_TYPES}
            selectedType={currentCharacter.clothingType}
            onTypeChange={(type) =>
              setCurrentCharacter({ ...currentCharacter, clothingType: type })
            }
            title="Choose Clothing Type"
            color={currentCharacter.clothingColor}
          />
          <ColorPicker
            colors={CLOTHING_COLORS}
            selectedColor={currentCharacter.clothingColor}
            onColorChange={(color) =>
              setCurrentCharacter({ ...currentCharacter, clothingColor: color })
            }
            title="Choose Clothing Color"
          />
          {currentCharacter.showClothing && (
            <RemoveButton
              onRemove={() =>
                setCurrentCharacter({
                  ...currentCharacter,
                  showClothing: false,
                })
              }
              label="Clothing"
            />
          )}
        </div>
      )}
    </div>
  );
}
