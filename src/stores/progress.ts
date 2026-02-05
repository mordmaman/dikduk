import { atom, map } from 'nanostores';
import type { LessonProgress, StreakData } from '@/lib/types';

// Current lesson/exercise state
export const currentStreakStore = atom<number>(0);
export const currentLessonScoreStore = atom<number>(0);
export const exerciseIndexStore = atom<number>(0);
export const totalExercisesStore = atom<number>(0);
export const correctAnswersStore = atom<number>(0);

// Lesson progress map (lessonId -> progress)
export const lessonProgressStore = map<Record<string, LessonProgress>>({});

// Streak data
export const streakDataStore = atom<StreakData>({
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
});

// Exercise session state
export const isExerciseActiveStore = atom<boolean>(false);
export const showFeedbackStore = atom<boolean>(false);
export const feedbackCorrectStore = atom<boolean>(false);

// Actions
export function startExerciseSession(totalExercises: number) {
  exerciseIndexStore.set(0);
  totalExercisesStore.set(totalExercises);
  correctAnswersStore.set(0);
  currentLessonScoreStore.set(0);
  isExerciseActiveStore.set(true);
  showFeedbackStore.set(false);
}

export function recordAnswer(correct: boolean) {
  if (correct) {
    correctAnswersStore.set(correctAnswersStore.get() + 1);
  }
  showFeedbackStore.set(true);
  feedbackCorrectStore.set(correct);
}

export function nextExercise() {
  exerciseIndexStore.set(exerciseIndexStore.get() + 1);
  showFeedbackStore.set(false);
}

export function completeExerciseSession() {
  const correct = correctAnswersStore.get();
  const total = totalExercisesStore.get();
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  currentLessonScoreStore.set(score);
  isExerciseActiveStore.set(false);
  return score;
}

export function setLessonProgress(lessonId: string, progress: LessonProgress) {
  lessonProgressStore.setKey(lessonId, progress);
}

export function setAllProgress(progress: Record<string, LessonProgress>) {
  for (const [lessonId, lessonProgress] of Object.entries(progress)) {
    lessonProgressStore.setKey(lessonId, lessonProgress);
  }
}

export function updateStreak(streak: StreakData) {
  streakDataStore.set(streak);
  currentStreakStore.set(streak.currentStreak);
}
