import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultFeatures, featureOptions } from "@/data/avatarData";
import { AvatarFeatures, FeatureCategory } from "@/types/avatar";
import { Download, Plus, Save, X } from "lucide-react";
import { useState } from "react";
import AvatarPreview from "./avatar-preview";
import CategoryTabs from "./category-tabs";
import FeatureGrid from "./featured-grid";

const AvatarCustomizer = () => {
  const [selectedFeatures, setSelectedFeatures] =
    useState<AvatarFeatures>(defaultFeatures);
  const [activeCategory, setActiveCategory] =
    useState<FeatureCategory>("faceShape");
  const [savedCharacters, setSavedCharacters] = useState<AvatarFeatures[]>([]);
  const [coverCharacters, setCoverCharacters] = useState<AvatarFeatures[]>([]);

  const handleFeatureSelect = (
    category: FeatureCategory,
    featureId: string
  ) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [category]: featureId,
    }));
  };

  const handleSave = () => {
    setSavedCharacters((prev) => [...prev, { ...selectedFeatures }]);
  };

  const handleSubmitToCover = () => {
    setCoverCharacters((prev) => [...prev, { ...selectedFeatures }]);
  };

  const handleDownload = () => {};

  const removeFromCover = (index: number) => {
    setCoverCharacters((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Avatar Creator
            </h1>
            <p className="text-gray-600 mt-2">Customize your perfect avatar</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleSubmitToCover}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cover
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <AvatarPreview
                features={selectedFeatures}
                coverCharacters={coverCharacters}
                onRemoveFromCover={removeFromCover}
              />
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <div className="mt-6">
                <FeatureGrid
                  category={activeCategory}
                  options={featureOptions[activeCategory]}
                  selectedFeature={selectedFeatures[activeCategory]}
                  onFeatureSelect={(featureId) =>
                    handleFeatureSelect(activeCategory, featureId)
                  }
                />
              </div>
            </Card>

            {/* Saved Characters */}
            {savedCharacters.length > 0 && (
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Saved Characters</h3>
                <div className="grid grid-cols-3 gap-4">
                  {savedCharacters.map((character, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedFeatures(character)}
                    >
                      <div className="w-16 h-16 mx-auto mb-2">
                        {/* Mini avatar preview */}
                        <svg width="64" height="64" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="30" fill="#F4C2A1" />
                          <text
                            x="32"
                            y="36"
                            textAnchor="middle"
                            className="text-xs"
                          >
                            Avatar
                          </text>
                        </svg>
                      </div>
                      <p className="text-xs text-center">
                        Character {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
