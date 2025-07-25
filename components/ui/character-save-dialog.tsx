"use client";

import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface CharacterSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (coupleName: string, answers: SaveAnswers) => void;
}

export interface SaveAnswers {
  coupleName: string;
  occasion: string;
  relationship: string;
  theme: string;
  style: string;
}

const OCCASIONS = [
  { value: "valentine", label: "Valentine's Day" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "graduation", label: "Graduation" },
  { value: "christmas", label: "Christmas" },
  { value: "easter", label: "Easter" },
  { value: "halloween", label: "Halloween" },
];

const RELATIONSHIPS = [
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "parent-child", label: "Parent & Child" },
  { value: "siblings", label: "Siblings" },
];

const THEMES = [
  { value: "romantic", label: "Romantic" },
  { value: "adventure", label: "Adventure" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "nature", label: "Nature" },
  { value: "urban", label: "Urban" },
];

const STYLES = [
  { value: "modern", label: "Modern" },
  { value: "vintage", label: "Vintage" },
  { value: "cartoon", label: "Cartoon" },
  { value: "realistic", label: "Realistic" },
  { value: "minimalist", label: "Minimalist" },
];

export function CharacterSaveDialog({
  open,
  onOpenChange,
  onSave,
}: CharacterSaveDialogProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [coupleName, setCoupleName] = useState("");
  const [answers, setAnswers] = useState<Omit<SaveAnswers, "coupleName">>({
    occasion: "",
    relationship: "",
    theme: "",
    style: "",
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Save everything and navigate
      onSave(coupleName, { coupleName, ...answers });
      onOpenChange(false);
      // Navigate to related books page with answers as URL parameters
      const params = new URLSearchParams({
        coupleName,
        occasion: answers.occasion,
        relationship: answers.relationship,
        theme: answers.theme,
        style: answers.style,
      });
      router.push(`/related-books?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (
    field: keyof Omit<SaveAnswers, "coupleName">,
    value: string
  ) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return coupleName.trim() !== "";
      case 2:
        return answers.occasion !== "";
      case 3:
        return answers.relationship !== "";
      case 4:
        return answers.theme !== "";
      case 5:
        return answers.style !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t("character.saveDialog.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("character.saveDialog.description")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupleName">
                {t("character.saveDialog.coupleName")}
              </Label>
              <Input
                id="coupleName"
                placeholder={t("character.saveDialog.coupleNamePlaceholder")}
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && canProceed()) {
                    handleNext();
                  }
                }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t("character.saveDialog.questions.howMet")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("character.saveDialog.questions.howMetPlaceholder")}
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="occasion">Occasion Type</Label>
              <Select
                value={answers.occasion}
                onValueChange={(value) => handleAnswerChange("occasion", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an occasion" />
                </SelectTrigger>
                <SelectContent>
                  {OCCASIONS.map((occasion) => (
                    <SelectItem key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t("character.saveDialog.questions.firstDate")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("character.saveDialog.questions.firstDatePlaceholder")}
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="relationship">Relationship Type</Label>
              <Select
                value={answers.relationship}
                onValueChange={(value) =>
                  handleAnswerChange("relationship", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship type" />
                </SelectTrigger>
                <SelectContent>
                  {RELATIONSHIPS.map((relationship) => (
                    <SelectItem
                      key={relationship.value}
                      value={relationship.value}
                    >
                      {relationship.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t("character.saveDialog.questions.favoriteMemory")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("character.saveDialog.questions.favoriteMemoryPlaceholder")}
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={answers.theme}
                onValueChange={(value) => handleAnswerChange("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {t("character.saveDialog.questions.futurePlans")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("character.saveDialog.questions.futurePlansPlaceholder")}
              </p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="style">Style</Label>
              <Select
                value={answers.style}
                onValueChange={(value) => handleAnswerChange("style", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("character.saveDialog.title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-3 h-3 rounded-full ${
                    stepNumber <= step ? "bg-red-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              {t("character.saveDialog.cancel")}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-red-600 hover:bg-red-700"
            >
              {step === 5 ? t("character.saveDialog.save") : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
