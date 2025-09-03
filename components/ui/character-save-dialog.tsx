"use client";

import { useQuizQuestions } from "@/hooks/use-quiz-questions";
import { useTranslation } from "@/hooks/use-translation";
import { SelectedAnswer } from "@/types/quiz";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  selectedAnswers: SelectedAnswer[];
}

export function CharacterSaveDialog({
  open,
  onOpenChange,
  onSave,
}: CharacterSaveDialogProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { questions, loading, error } = useQuizQuestions();

  const [step, setStep] = useState(1);
  const [coupleName, setCoupleName] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);

  // Total steps: 1 (couple name) + number of quiz questions
  const totalSteps = 1 + questions.length;

  useEffect(() => {
    // Initialize selected answers when questions are loaded
    if (questions.length > 0) {
      const initialAnswers = questions.map((q: any) => ({
        questionId: q.id,
        answerId: 0, // 0 means not selected yet
      }));
      setSelectedAnswers(initialAnswers);
    }
  }, [questions]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save everything and navigate
      const finalAnswers = selectedAnswers.filter(
        (answer) => answer.answerId !== 0
      );
      onSave(coupleName, { coupleName, selectedAnswers: finalAnswers });
      onOpenChange(false);

      // Navigate to related books page with answers as URL parameters
      const params = new URLSearchParams({
        coupleName,
        answers: JSON.stringify(finalAnswers),
      });
      router.push(`/related-books?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questionId ? { ...answer, answerId } : answer
      )
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return coupleName.trim() !== "";
      default:
        // For quiz questions, check if an answer is selected
        const questionIndex = step - 2; // -2 because step 1 is couple name
        if (questionIndex >= 0 && questionIndex < questions.length) {
          const question = questions[questionIndex];
          const selectedAnswer = selectedAnswers.find(
            (a) => a.questionId === question.id
          );
          return selectedAnswer && selectedAnswer.answerId !== 0;
        }
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

      default:
        // Render quiz questions
        const questionIndex = step - 2; // -2 because step 1 is couple name
        if (questionIndex >= 0 && questionIndex < questions.length) {
          const question = questions[questionIndex];
          const selectedAnswer = selectedAnswers.find(
            (a) => a.questionId === question.id
          );

          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {question.question}
                </h3>
                <p className="text-gray-600 mb-4">Please select your answer</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor={`question-${question.id}`}>Answer</Label>
                <Select
                  value={selectedAnswer?.answerId?.toString() || ""}
                  onValueChange={(value) =>
                    handleAnswerChange(question.id, parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.answers.map((answer: any) => (
                      <SelectItem key={answer.id} value={answer.id.toString()}>
                        {answer.answerText}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        }
        return null;
    }
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Loading questions...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error loading questions</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
                (stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full ${
                      stepNumber <= step ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                )
              )}
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
              {step === totalSteps ? t("character.saveDialog.save") : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
