export interface HangmanResultView {
  user_id: string;
  user_name: string;
  word: string;
  letters_used: number;
  duration_seconds: number;
  won: boolean;
  played_at: string;
}

export interface HigherLowerResultView {
  user_id: string;
  user_name: string;
  correct_answers: number;
  total_rounds: number;
  played_at: string;
}

export interface TriviaResultView {
  user_id: string;
  user_name: string;
  correct_answers: number;
  total_questions: number;
  played_at: string;
}

export interface HiddenGoalResultView {
  user_id: string;
  user_name: string;
  completion_time_seconds: number;
  attempts: number;
  won: boolean;
  played_at: string;
}
