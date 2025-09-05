"use client";

import { useQuizQuestions } from "@/hooks/use-quiz-questions";
import { useTranslation } from "@/hooks/use-translation";
import { QuizQuestion, SelectedAnswer } from "@/types/quiz";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
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
  onSave: (answers: SaveAnswers) => void;
}

export interface SaveAnswers {
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
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);

  // Total steps: just the number of quiz questions
  const totalSteps = questions.length;

  useEffect(() => {
    // Initialize selected answers when questions are loaded
    if (questions.length > 0) {
      const initialAnswers = questions.map((q: QuizQuestion) => {
        const baseAnswer = { questionId: q.id };

        if (q.questionType === "checkbox") {
          return { ...baseAnswer, answerIds: [] };
        } else if (q.questionType === "input") {
          return { ...baseAnswer, textAnswer: "" };
        } else {
          return { ...baseAnswer, answerId: 0 }; // 0 means not selected yet
        }
      });
      setSelectedAnswers(initialAnswers);
    }
  }, [questions]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save everything and navigate
      const finalAnswers = selectedAnswers.filter((answer) => {
        // Filter out empty answers based on question type
        const question = questions.find(
          (q: QuizQuestion) => q.id === answer.questionId
        );
        if (!question) return false;

        switch (question.questionType) {
          case "select":
            return answer.answerId !== undefined && answer.answerId !== 0;
          case "checkbox":
            return answer.answerIds && answer.answerIds.length > 0;
          case "input":
            return answer.textAnswer && answer.textAnswer.trim() !== "";
          default:
            return false;
        }
      });
      onSave({
        selectedAnswers: finalAnswers,
      });
      onOpenChange(false);

      // Navigate to related books page with answers as URL parameters
      const params = new URLSearchParams({
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

  const handleCheckboxChange = (
    questionId: number,
    answerId: number,
    checked: boolean
  ) => {
    setSelectedAnswers((prev) =>
      prev.map((answer) => {
        if (answer.questionId === questionId) {
          const currentIds = answer.answerIds || [];
          if (checked) {
            return { ...answer, answerIds: [...currentIds, answerId] };
          } else {
            return {
              ...answer,
              answerIds: currentIds.filter((id) => id !== answerId),
            };
          }
        }
        return answer;
      })
    );
  };

  const handleTextAnswerChange = (questionId: number, text: string) => {
    setSelectedAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, textAnswer: text }
          : answer
      )
    );
  };

  const canProceed = () => {
    // For quiz questions, check if an answer is provided based on question type
    const questionIndex = step - 1; // -1 because we start from step 1
    if (questionIndex >= 0 && questionIndex < questions.length) {
      const question = questions[questionIndex];
      const selectedAnswer = selectedAnswers.find(
        (a) => a.questionId === question.id
      );

      if (!selectedAnswer) return false;

      switch (question.questionType) {
        case "select":
          return (
            selectedAnswer.answerId !== undefined &&
            selectedAnswer.answerId !== 0
          );
        case "checkbox":
          return (
            selectedAnswer.answerIds && selectedAnswer.answerIds.length > 0
          );
        case "input":
          return (
            selectedAnswer.textAnswer && selectedAnswer.textAnswer.trim() !== ""
          );
        default:
          return false;
      }
    }
    return false;
  };

  const renderStep = () => {
    // Render quiz questions dynamically based on question type
    const questionIndex = step - 1; // -1 because we start from step 1
    if (questionIndex >= 0 && questionIndex < questions.length) {
      const question = questions[questionIndex];
      const selectedAnswer = selectedAnswers.find(
        (a) => a.questionId === question.id
      );

      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
            <p className="text-gray-600 mb-4">
              {question.questionType === "input"
                ? "Please provide your answer"
                : "Please select your answer"}
            </p>
          </div>
          <div className="space-y-3">
            {renderQuestionInput(question, selectedAnswer)}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderQuestionInput = (
    question: QuizQuestion,
    selectedAnswer?: SelectedAnswer
  ) => {
    switch (question.questionType) {
      case "select":
        return (
          <>
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
                {question.answers.map((answer) => (
                  <SelectItem key={answer.id} value={answer.id.toString()}>
                    {answer.answerText}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        );

      case "checkbox":
        return (
          <>
            <Label>Select all that apply</Label>
            <div className="space-y-2">
              {question.answers.map((answer) => {
                const isChecked =
                  selectedAnswer?.answerIds?.includes(answer.id) || false;
                return (
                  <div key={answer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`answer-${answer.id}`}
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          question.id,
                          answer.id,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`answer-${answer.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {answer.answerText}
                    </Label>
                  </div>
                );
              })}
            </div>
          </>
        );

      case "input":
        return (
          <>
            <Label htmlFor={`question-${question.id}`}>Your answer</Label>
            <Input
              id={`question-${question.id}`}
              placeholder="Type your answer here..."
              value={selectedAnswer?.textAnswer || ""}
              onChange={(e) =>
                handleTextAnswerChange(question.id, e.target.value)
              }
              onKeyPress={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  handleNext();
                }
              }}
            />
          </>
        );

      default:
        return <div>Unsupported question type</div>;
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
