"use client";
import { API_ENDPOINTS_FROM_NEXT } from "@/config/api";
import { QuizResponse } from "@/types/quiz";
import { useFetch } from "./use-fetch";

export const useQuizQuestions = () => {
  const { data, loading, error } = useFetch<QuizResponse>(
    API_ENDPOINTS_FROM_NEXT.QUIZ_QUESTIONS
  );

  return {
    questions: data?.data || [],
    loading,
    error,
  };
};
