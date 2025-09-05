export interface QuizAnswer {
  id: number;
  answerText: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionType: "select" | "checkbox" | "input";
  answers: QuizAnswer[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface QuizResponse {
  success: boolean;
  data: QuizQuestion[];
}

export interface SelectedAnswer {
  questionId: number;
  answerId?: number; // For select and checkbox questions
  answerIds?: number[]; // For checkbox questions (multiple selections)
  textAnswer?: string; // For input questions
}
