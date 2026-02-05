import { supabase, isSupabaseConfigured } from './supabase';
import { enqueue } from './sync-queue';
import { isAuthenticatedStore, userStore } from '@/stores/auth';
import { setLessonProgress, setAllProgress, updateStreak } from '@/stores/progress';
import type { LessonProgress, StreakData, ExerciseResult } from './types';

const PROGRESS_KEY = 'dikduk_progress';
const STREAK_KEY = 'dikduk_streak';
const EXERCISE_RESULTS_KEY = 'dikduk_exercise_results';

// ============================================
// LocalStorage Operations
// ============================================

function saveToLocalStorage(lessonId: string, data: Partial<LessonProgress>): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(PROGRESS_KEY);
  const progress: Record<string, LessonProgress> = stored ? JSON.parse(stored) : {};

  const existing = progress[lessonId] || {
    lessonId,
    started: false,
    completed: false,
    score: 0,
    bestScore: 0,
    attempts: 0,
    lastAttemptAt: null,
    completedAt: null,
  };

  // Merge data, respecting replay rules
  progress[lessonId] = {
    ...existing,
    ...data,
    // Never overwrite completed: true to false
    completed: existing.completed || data.completed || false,
    // Never overwrite bestScore with lower score
    bestScore: Math.max(existing.bestScore, data.score || 0),
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  setLessonProgress(lessonId, progress[lessonId]);
}

function getFromLocalStorage(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {};

  const stored = localStorage.getItem(PROGRESS_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveStreakToLocalStorage(streak: StreakData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  updateStreak(streak);
}

function getStreakFromLocalStorage(): StreakData {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
  }

  const stored = localStorage.getItem(STREAK_KEY);
  return stored
    ? JSON.parse(stored)
    : { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
}

function saveExerciseResultToLocalStorage(result: ExerciseResult): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(EXERCISE_RESULTS_KEY);
  const results: ExerciseResult[] = stored ? JSON.parse(stored) : [];
  results.push(result);
  localStorage.setItem(EXERCISE_RESULTS_KEY, JSON.stringify(results));
}

function saveAdvancedToLocalStorage(lessonId: string, data: Partial<LessonProgress>): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(PROGRESS_KEY);
  const progress: Record<string, LessonProgress> = stored ? JSON.parse(stored) : {};

  const existing = progress[lessonId] || {
    lessonId,
    started: false,
    completed: false,
    score: 0,
    bestScore: 0,
    attempts: 0,
    lastAttemptAt: null,
    completedAt: null,
  };

  // Merge advanced data
  progress[lessonId] = {
    ...existing,
    advancedCompleted: existing.advancedCompleted || data.advancedCompleted || false,
    advancedScore: data.advancedScore ?? existing.advancedScore ?? 0,
    advancedBestScore: Math.max(existing.advancedBestScore ?? 0, data.advancedScore ?? 0),
    advancedAttempts: (existing.advancedAttempts ?? 0) + 1,
    advancedLastAttemptAt: data.advancedLastAttemptAt ?? existing.advancedLastAttemptAt ?? null,
  };

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  setLessonProgress(lessonId, progress[lessonId]);
}

// ============================================
// Supabase Operations
// ============================================

async function saveToSupabase(
  lessonId: string,
  data: Partial<LessonProgress>
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  const userId = userStore.get()?.id;
  if (!userId) return;

  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      started: data.started ?? true,
      completed: data.completed ?? false,
      score: data.score ?? 0,
      best_score: data.bestScore ?? data.score ?? 0,
      attempts: data.attempts ?? 1,
      last_attempt_at: data.lastAttemptAt ?? new Date().toISOString(),
      completed_at: data.completed ? (data.completedAt ?? new Date().toISOString()) : null,
    },
    {
      onConflict: 'user_id,lesson_id',
    }
  );

  if (error) throw error;
}

async function getFromSupabase(): Promise<Record<string, LessonProgress>> {
  if (!isSupabaseConfigured() || !supabase) return {};

  const userId = userStore.get()?.id;
  if (!userId) return {};

  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const progress: Record<string, LessonProgress> = {};
  for (const row of data || []) {
    progress[row.lesson_id] = {
      lessonId: row.lesson_id,
      started: row.started,
      completed: row.completed,
      score: row.score,
      bestScore: row.best_score,
      attempts: row.attempts,
      lastAttemptAt: row.last_attempt_at,
      completedAt: row.completed_at,
      // Advanced fields (may be null if columns don't exist yet)
      advancedCompleted: row.advanced_completed ?? undefined,
      advancedScore: row.advanced_score ?? undefined,
      advancedBestScore: row.advanced_best_score ?? undefined,
      advancedAttempts: row.advanced_attempts ?? undefined,
      advancedLastAttemptAt: row.advanced_last_attempt_at ?? undefined,
    };
  }

  return progress;
}

async function saveStreakToSupabase(streak: StreakData): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  const userId = userStore.get()?.id;
  if (!userId) return;

  const { error } = await supabase.from('streaks').upsert(
    {
      user_id: userId,
      current_streak: streak.currentStreak,
      longest_streak: streak.longestStreak,
      last_active_date: streak.lastActiveDate,
    },
    {
      onConflict: 'user_id',
    }
  );

  if (error) throw error;
}

async function getStreakFromSupabase(): Promise<StreakData> {
  if (!isSupabaseConfigured() || !supabase) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
  }

  const userId = userStore.get()?.id;
  if (!userId) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
  }

  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
  }

  return {
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastActiveDate: data.last_active_date,
  };
}

async function saveExerciseResultToSupabase(result: ExerciseResult): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  const userId = userStore.get()?.id;
  if (!userId) return;

  const { error } = await supabase.from('exercise_results').insert({
    user_id: userId,
    lesson_id: result.lessonId,
    exercise_id: result.exerciseId,
    correct: result.correct,
    answered_at: result.answeredAt,
  });

  if (error) throw error;
}

async function saveAdvancedToSupabase(
  lessonId: string,
  data: Partial<LessonProgress>
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  const userId = userStore.get()?.id;
  if (!userId) return;

  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      advanced_completed: data.advancedCompleted ?? false,
      advanced_score: data.advancedScore ?? 0,
      advanced_best_score: data.advancedBestScore ?? data.advancedScore ?? 0,
      advanced_attempts: data.advancedAttempts ?? 1,
      advanced_last_attempt_at: data.advancedLastAttemptAt ?? new Date().toISOString(),
    },
    {
      onConflict: 'user_id,lesson_id',
    }
  );

  if (error) throw error;
}

// ============================================
// Public API
// ============================================

export async function saveLessonProgress(
  lessonId: string,
  score: number,
  completed: boolean
): Promise<void> {
  const now = new Date().toISOString();
  const data: Partial<LessonProgress> = {
    started: true,
    completed,
    score,
    lastAttemptAt: now,
    completedAt: completed ? now : undefined,
  };

  // Always write to localStorage first (instant UI update)
  saveToLocalStorage(lessonId, data);

  // If authenticated, also write to Supabase
  if (isAuthenticatedStore.get()) {
    try {
      await saveToSupabase(lessonId, data);
    } catch {
      // Offline or error — enqueue for retry
      enqueue({
        table: 'lesson_progress',
        action: 'upsert',
        data: { lessonId, score, completed, ...data },
      });
    }
  }
}

export async function saveAdvancedLessonProgress(
  lessonId: string,
  score: number,
  completed: boolean
): Promise<void> {
  const now = new Date().toISOString();
  const data: Partial<LessonProgress> = {
    advancedCompleted: completed,
    advancedScore: score,
    advancedBestScore: score,
    advancedAttempts: 1,
    advancedLastAttemptAt: now,
  };

  // Always write to localStorage first (instant UI update)
  saveAdvancedToLocalStorage(lessonId, data);

  // If authenticated, also write to Supabase
  if (isAuthenticatedStore.get()) {
    try {
      await saveAdvancedToSupabase(lessonId, data);
    } catch {
      // Offline or error — enqueue for retry
      enqueue({
        table: 'lesson_progress',
        action: 'upsert',
        data: { lessonId, ...data },
      });
    }
  }
}

export async function getProgress(): Promise<Record<string, LessonProgress>> {
  if (isAuthenticatedStore.get()) {
    // Supabase is source of truth, localStorage is fallback
    try {
      const progress = await getFromSupabase();
      setAllProgress(progress);
      return progress;
    } catch {
      const progress = getFromLocalStorage();
      setAllProgress(progress);
      return progress;
    }
  }

  // Guest: localStorage only
  const progress = getFromLocalStorage();
  setAllProgress(progress);
  return progress;
}

export async function saveExerciseResult(result: ExerciseResult): Promise<void> {
  // Always save to localStorage
  saveExerciseResultToLocalStorage(result);

  // If authenticated, also save to Supabase
  if (isAuthenticatedStore.get()) {
    try {
      await saveExerciseResultToSupabase(result);
    } catch {
      enqueue({
        table: 'exercise_results',
        action: 'insert',
        data: result,
      });
    }
  }
}

export async function updateStreakForActivity(): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const streak = isAuthenticatedStore.get()
    ? await getStreakFromSupabase()
    : getStreakFromLocalStorage();

  if (streak.lastActiveDate === today) {
    // Already active today, no update needed
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newStreak: StreakData;
  if (streak.lastActiveDate === yesterday) {
    // Continuing streak
    newStreak = {
      currentStreak: streak.currentStreak + 1,
      longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
      lastActiveDate: today,
    };
  } else {
    // Streak broken or first activity
    newStreak = {
      currentStreak: 1,
      longestStreak: Math.max(streak.longestStreak, 1),
      lastActiveDate: today,
    };
  }

  // Save to localStorage
  saveStreakToLocalStorage(newStreak);

  // If authenticated, also save to Supabase
  if (isAuthenticatedStore.get()) {
    try {
      await saveStreakToSupabase(newStreak);
    } catch {
      enqueue({
        table: 'streaks',
        action: 'upsert',
        data: newStreak,
      });
    }
  }
}

export async function getStreak(): Promise<StreakData> {
  if (isAuthenticatedStore.get()) {
    try {
      const streak = await getStreakFromSupabase();
      updateStreak(streak);
      return streak;
    } catch {
      const streak = getStreakFromLocalStorage();
      updateStreak(streak);
      return streak;
    }
  }

  const streak = getStreakFromLocalStorage();
  updateStreak(streak);
  return streak;
}

// Migrate guest progress to authenticated user
export async function migrateGuestProgress(): Promise<void> {
  if (!isAuthenticatedStore.get()) return;

  const localProgress = getFromLocalStorage();
  if (!localProgress || Object.keys(localProgress).length === 0) return;

  for (const [lessonId, data] of Object.entries(localProgress)) {
    try {
      await saveToSupabase(lessonId, data);
    } catch {
      // If migration fails for one item, continue with others
      console.error(`Failed to migrate progress for ${lessonId}`);
    }
  }

  // Migrate streak
  const localStreak = getStreakFromLocalStorage();
  if (localStreak.currentStreak > 0 || localStreak.longestStreak > 0) {
    try {
      await saveStreakToSupabase(localStreak);
    } catch {
      console.error('Failed to migrate streak');
    }
  }
}

// Initialize progress on page load
export async function initProgress(): Promise<void> {
  await getProgress();
  await getStreak();
}
