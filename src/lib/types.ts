import type { User } from '@supabase/supabase-js';

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Lesson progress types
export interface LessonProgress {
  lessonId: string;
  started: boolean;
  completed: boolean;
  score: number;
  bestScore: number;
  attempts: number;
  lastAttemptAt: string | null;
  completedAt: string | null;
  // Advanced exercise tracking (optional)
  advancedCompleted?: boolean;
  advancedScore?: number;
  advancedBestScore?: number;
  advancedAttempts?: number;
  advancedLastAttemptAt?: string | null;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

// Exercise types
export interface BaseExercise {
  id: string;
  type:
    | 'multiple-choice'
    | 'tap-to-select'
    | 'true-false'
    | 'word-bank'
    | 'matching'
    | 'word-breakdown';
  instruction: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  question: string;
  hebrewWord?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface TapToSelectExercise extends BaseExercise {
  type: 'tap-to-select';
  question: string;
  hebrewText: string;
  correctIndices: number[];
  explanation: string;
}

export interface TrueFalseExercise extends BaseExercise {
  type: 'true-false';
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface WordBankExercise extends BaseExercise {
  type: 'word-bank';
  question: string;
  textBefore: string;
  textAfter: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingExercise extends BaseExercise {
  type: 'matching';
  pairs: MatchingPair[];
}

export interface WordPart {
  text: string;
  label: string;
  type: 'prefix' | 'root' | 'suffix' | 'pattern';
}

export interface WordBreakdownExercise extends BaseExercise {
  type: 'word-breakdown';
  word: string;
  parts: WordPart[];
  explanation: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | TapToSelectExercise
  | TrueFalseExercise
  | WordBankExercise
  | MatchingExercise
  | WordBreakdownExercise;

export interface ExerciseSet {
  lessonId: string;
  difficulty?: 'basic' | 'advanced';
  exercises: Exercise[];
}

// Exercise result types
export interface ExerciseResult {
  exerciseId: string;
  lessonId: string;
  correct: boolean;
  answeredAt: string;
}

// Sync queue types
export interface QueuedAction {
  id: string;
  table: string;
  action: 'upsert' | 'insert';
  data: Record<string, unknown>;
  timestamp: string;
}

// Cookie preferences
export interface CookiePreferences {
  essential: true; // Always true, cannot be disabled
  analytics: boolean;
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

// Lesson frontmatter
export interface LessonFrontmatter {
  title: string;
  hebrewTitle: string;
  unit:
    | 'foundations'
    | 'unit-1'
    | 'unit-2'
    | 'unit-3'
    | 'unit-4'
    | 'unit-5'
    | 'unit-6'
    | 'unit-7'
    | 'unit-8';
  chapter: number;
  weingreenRef: string;
  description: string;
  prerequisites?: string[];
  order: number;
}

// Unit info for curriculum
export interface UnitInfo {
  id: string;
  name: string;
  description: string;
  lessons: {
    slug: string;
    title: string;
    hebrewTitle: string;
    description: string;
    order: number;
  }[];
}
