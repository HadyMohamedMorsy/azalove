"use client";

import {
  CharacterSaveDialog,
  SaveAnswers,
} from "@/components/ui/character-save-dialog";
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
import React, { useState } from "react";

const TABS = [
  { id: "body", label: "Body" },
  { id: "shoes", label: "Shoes" },
  { id: "glasses", label: "Glasses" },
  { id: "hats", label: "Hats" },
  { id: "mustache", label: "Mustache" },
  { id: "chin", label: "Chin" },
  { id: "pants", label: "Pants" },
  { id: "clothing", label: "Clothing" },
];

const BODY_COLORS = ["#ca8450", "#d6b89a"];
const SHOES_COLORS = [
  "#8B4513",
  "#654321",
  "#2F4F4F",
  "#8B0000",
  "#4B0082",
  "#006400",
];
const GLASSES_COLORS = [
  "#000000",
  "#8B4513",
  "#2F4F4F",
  "#4B0082",
  "#8B0000",
  "#006400",
  "#FFD700",
  "#FF6B6B",
];
const HAT_COLORS = [
  "#000000",
  "#8B4513",
  "#2F4F4F",
  "#4B0082",
  "#8B0000",
  "#006400",
  "#FFD700",
  "#FF6B6B",
  "#FF69B4",
  "#00CED1",
];
const MUSTACHE_COLORS = [
  "#000000",
  "#8B4513",
  "#654321",
  "#2F4F4F",
  "#4B0082",
  "#8B0000",
  "#006400",
  "#FFD700",
];
const CHIN_COLORS = ["#ca8450", "#d6b89a", "#8B4513", "#654321", "#2F4F4F"];
const CLOTHING_COLORS = [
  "#000000",
  "#8B4513",
  "#2F4F4F",
  "#4B0082",
  "#8B0000",
  "#006400",
  "#FFD700",
  "#FF6B6B",
  "#FF69B4",
  "#00CED1",
  "#FFFFFF",
  "#808080",
];

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

export default function StartCharacterPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [selectedBodyColor, setSelectedBodyColor] = useState(BODY_COLORS[0]);
  const [selectedShoesColor, setSelectedShoesColor] = useState(SHOES_COLORS[0]);
  const [selectedGlassesColor, setSelectedGlassesColor] = useState(
    GLASSES_COLORS[0]
  );
  const [selectedGlassesType, setSelectedGlassesType] = useState(
    GLASSES_TYPES[0].id
  );
  const [selectedHatColor, setSelectedHatColor] = useState(HAT_COLORS[0]);
  const [selectedHatType, setSelectedHatType] = useState(HAT_TYPES[0].id);
  const [selectedMustacheColor, setSelectedMustacheColor] = useState(
    MUSTACHE_COLORS[0]
  );
  const [selectedMustacheType, setSelectedMustacheType] = useState(
    MUSTACHE_TYPES[0].id
  );
  const [selectedChinColor, setSelectedChinColor] = useState(CHIN_COLORS[0]);
  const [selectedChinType, setSelectedChinType] = useState(CHIN_TYPES[0].id);
  const [selectedPantsColor, setSelectedPantsColor] = useState(
    CLOTHING_COLORS[0]
  );
  const [selectedPantsType, setSelectedPantsType] = useState(PANTS_TYPES[0].id);
  const [selectedClothingColor, setSelectedClothingColor] = useState(
    CLOTHING_COLORS[0]
  );
  const [selectedClothingType, setSelectedClothingType] = useState(
    CLOTHING_TYPES[0].id
  );

  const [showShoes, setShowShoes] = useState(false);
  const [showGlasses, setShowGlasses] = useState(false);
  const [showHat, setShowHat] = useState(false);
  const [showMustache, setShowMustache] = useState(false);
  const [showChin, setShowChin] = useState(false);
  const [showPants, setShowPants] = useState(false);
  const [showClothing, setShowClothing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveCharacter = (answers: SaveAnswers) => {};

  const getSelectedGlassesComponent = () => {
    const glassesType = GLASSES_TYPES.find(
      (glasses) => glasses.id === selectedGlassesType
    );
    return glassesType ? glassesType.component : Glasses1;
  };

  const getSelectedHatComponent = () => {
    const hatType = HAT_TYPES.find((hat) => hat.id === selectedHatType);
    return hatType ? hatType.component : Hat1;
  };

  const getSelectedMustacheComponent = () => {
    const mustacheType = MUSTACHE_TYPES.find(
      (mustache) => mustache.id === selectedMustacheType
    );
    return mustacheType ? mustacheType.component : Mustache;
  };

  const getSelectedChinComponent = () => {
    const chinType = CHIN_TYPES.find((chin) => chin.id === selectedChinType);
    return chinType ? chinType.component : Chin1;
  };

  const getSelectedPantsComponent = () => {
    const pantsType = PANTS_TYPES.find(
      (pants) => pants.id === selectedPantsType
    );
    return pantsType ? pantsType.component : Pants;
  };

  const getSelectedClothingComponent = () => {
    const clothingType = CLOTHING_TYPES.find(
      (clothing) => clothing.id === selectedClothingType
    );
    return clothingType ? clothingType.component : Shirt;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            onClick={() => setShowSaveDialog(true)}
          >
            Save
          </button>
        </div>

        {/* Character Preview */}
        <div className="flex justify-center mb-6">
          <div className="w-[500px] h-[500px] bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 53 108"
              width={500}
              height={500}
            >
              <Character color={selectedBodyColor} />
              {showShoes && <Shoes color={selectedShoesColor} />}
              {showGlasses &&
                React.createElement(getSelectedGlassesComponent(), {
                  color: selectedGlassesColor,
                })}
              {showHat &&
                React.createElement(getSelectedHatComponent(), {
                  color: selectedHatColor,
                })}
              {showMustache &&
                React.createElement(getSelectedMustacheComponent(), {
                  color: selectedMustacheColor,
                })}
              {showChin &&
                React.createElement(getSelectedChinComponent(), {
                  color: selectedChinColor,
                })}
              {showPants &&
                React.createElement(getSelectedPantsComponent(), {
                  color: selectedPantsColor,
                })}
              {showClothing &&
                React.createElement(getSelectedClothingComponent(), {
                  color: selectedClothingColor,
                })}
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center mb-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg font-medium transition border-b-2 ${activeTab === tab.id ? "border-red-500 text-red-600 bg-red-50" : "border-transparent text-gray-600 bg-transparent hover:bg-gray-50"}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "shoes" && !showShoes) setShowShoes(true);
                  if (tab.id === "glasses" && !showGlasses)
                    setShowGlasses(true);
                  if (tab.id === "hats" && !showHat) setShowHat(true);
                  if (tab.id === "mustache" && !showMustache)
                    setShowMustache(true);
                  if (tab.id === "chin" && !showChin) setShowChin(true);
                  if (tab.id === "pants" && !showPants) setShowPants(true);
                  if (tab.id === "clothing" && !showClothing)
                    setShowClothing(true);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "body" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Choose Body Color
              </h3>
              <div className="grid grid-cols-6 gap-3 max-w-md mx-auto">
                {BODY_COLORS.map((color, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedBodyColor === color
                        ? "border-red-500 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedBodyColor(color)}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "shoes" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Choose Shoes Color
              </h3>
              <div className="grid grid-cols-6 gap-3 max-w-md mx-auto">
                {SHOES_COLORS.map((color, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedShoesColor === color
                        ? "border-red-500 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedShoesColor(color)}
                    title={`Shoes Color ${index + 1}`}
                  />
                ))}
              </div>
              {showShoes && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowShoes(false)}
                  >
                    Remove Shoes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "glasses" && (
            <div className="flex flex-col gap-6">
              {/* Glasses Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Glasses Type
                </h3>
                <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
                  {GLASSES_TYPES.map((glasses) => (
                    <button
                      key={glasses.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedGlassesType === glasses.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedGlassesType(glasses.id)}
                      title={glasses.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(glasses.component, {
                            color: selectedGlassesColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {glasses.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glasses Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Glasses Color
                </h3>
                <div className="grid grid-cols-8 gap-3 max-w-2xl mx-auto">
                  {GLASSES_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedGlassesColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedGlassesColor(color)}
                      title={`Glasses Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showGlasses && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowGlasses(false)}
                  >
                    Remove Glasses
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "hats" && (
            <div className="flex flex-col gap-6">
              {/* Hat Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Hat Type
                </h3>
                <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
                  {HAT_TYPES.map((hat) => (
                    <button
                      key={hat.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedHatType === hat.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedHatType(hat.id)}
                      title={hat.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(hat.component, {
                            color: selectedHatColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {hat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hat Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Hat Color
                </h3>
                <div className="grid grid-cols-10 gap-3 max-w-2xl mx-auto">
                  {HAT_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedHatColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedHatColor(color)}
                      title={`Hat Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showHat && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowHat(false)}
                  >
                    Remove Hat
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "mustache" && (
            <div className="flex flex-col gap-6">
              {/* Mustache Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Mustache Type
                </h3>
                <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {MUSTACHE_TYPES.map((mustache) => (
                    <button
                      key={mustache.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedMustacheType === mustache.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedMustacheType(mustache.id)}
                      title={mustache.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(mustache.component, {
                            color: selectedMustacheColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {mustache.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mustache Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Mustache Color
                </h3>
                <div className="grid grid-cols-8 gap-3 max-w-2xl mx-auto">
                  {MUSTACHE_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedMustacheColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedMustacheColor(color)}
                      title={`Mustache Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showMustache && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowMustache(false)}
                  >
                    Remove Mustache
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "chin" && (
            <div className="flex flex-col gap-6">
              {/* Chin Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Chin Type
                </h3>
                <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
                  {CHIN_TYPES.map((chin) => (
                    <button
                      key={chin.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedChinType === chin.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedChinType(chin.id)}
                      title={chin.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(chin.component, {
                            color: selectedChinColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {chin.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chin Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Chin Color
                </h3>
                <div className="grid grid-cols-5 gap-3 max-w-xl mx-auto">
                  {CHIN_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedChinColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedChinColor(color)}
                      title={`Chin Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showChin && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowChin(false)}
                  >
                    Remove Chin
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "pants" && (
            <div className="flex flex-col gap-6">
              {/* Pants Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Pants Type
                </h3>
                <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
                  {PANTS_TYPES.map((pants) => (
                    <button
                      key={pants.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedPantsType === pants.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedPantsType(pants.id)}
                      title={pants.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(pants.component, {
                            color: selectedPantsColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {pants.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pants Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Pants Color
                </h3>
                <div className="grid grid-cols-12 gap-3 max-w-3xl mx-auto">
                  {CLOTHING_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedPantsColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedPantsColor(color)}
                      title={`Pants Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showPants && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowPants(false)}
                  >
                    Remove Pants
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "clothing" && (
            <div className="flex flex-col gap-6">
              {/* Clothing Type Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Clothing Type
                </h3>
                <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
                  {CLOTHING_TYPES.map((clothing) => (
                    <button
                      key={clothing.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedClothingType === clothing.id
                          ? "border-red-500 shadow-lg bg-red-50"
                          : "border-gray-300 hover:border-gray-400 bg-white"
                      }`}
                      onClick={() => setSelectedClothingType(clothing.id)}
                      title={clothing.label}
                    >
                      <div className="w-8 h-8 mx-auto mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 53 108"
                          width={32}
                          height={32}
                        >
                          {React.createElement(clothing.component, {
                            color: selectedClothingColor,
                          })}
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {clothing.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clothing Color Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  Choose Clothing Color
                </h3>
                <div className="grid grid-cols-12 gap-3 max-w-3xl mx-auto">
                  {CLOTHING_COLORS.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        selectedClothingColor === color
                          ? "border-red-500 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedClothingColor(color)}
                      title={`Clothing Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {showClothing && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={() => setShowClothing(false)}
                  >
                    Remove Clothing
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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
