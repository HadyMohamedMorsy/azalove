"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
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
  onSave: (answers: SaveAnswers) => void;
}

export interface SaveAnswers {
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
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SaveAnswers>({
    occasion: "",
    relationship: "",
    theme: "",
    style: "",
  });
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSave(answers);
      onOpenChange(false);

      // Navigate to the related books page with the answers as URL parameters
      const params = new URLSearchParams({
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

  const handleAnswerChange = (field: keyof SaveAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                What's the occasion?
              </h3>
              <p className="text-gray-600 mb-4">
                We'll help you find the best cover, but first tell us more about
                the occasion.
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

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Who is this for?</h3>
              <p className="text-gray-600 mb-4">
                Tell us about the relationship to personalize your story.
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

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                What theme do you prefer?
              </h3>
              <p className="text-gray-600 mb-4">
                Choose a theme that matches your story's mood.
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

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return answers.occasion !== "";
      case 2:
        return answers.relationship !== "";
      case 3:
        return answers.theme !== "";
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cover Select</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {renderStep()}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-red-600 hover:bg-red-700"
            >
              {step === 3 ? "Continue" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
