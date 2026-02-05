<script lang="ts">
  import { onMount } from 'svelte';
  import { lessonProgressStore, streakDataStore } from '@/stores/progress';
  import { getProgress, getStreak } from '@/lib/progress';
  import { formatDate, formatScore } from '@/lib/utils';
  import type { LessonProgress, StreakData } from '@/lib/types';
  import Card from '@/components/ui/Card.svelte';
  import Badge from '@/components/ui/Badge.svelte';

  let progress = $state<Record<string, LessonProgress>>({});
  let streak = $state<StreakData>({ currentStreak: 0, longestStreak: 0, lastActiveDate: null });
  let loading = $state(true);

  onMount(async () => {
    // Subscribe to stores
    const unsubProgress = lessonProgressStore.subscribe((value) => {
      progress = value;
    });
    const unsubStreak = streakDataStore.subscribe((value) => {
      streak = value;
    });

    // Load data
    await Promise.all([getProgress(), getStreak()]);
    loading = false;

    return () => {
      unsubProgress();
      unsubStreak();
    };
  });

  let completedLessons = $derived(
    Object.values(progress).filter((p) => p.completed).length
  );
  let totalAttempts = $derived(
    Object.values(progress).reduce((sum, p) => sum + p.attempts, 0)
  );
  let averageScore = $derived(() => {
    const completed = Object.values(progress).filter((p) => p.completed);
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, p) => sum + p.bestScore, 0);
    return Math.round(total / completed.length);
  });

  let recentActivity = $derived(
    Object.entries(progress)
      .filter(([_, p]) => p.lastAttemptAt)
      .sort((a, b) => {
        const dateA = new Date(a[1].lastAttemptAt!).getTime();
        const dateB = new Date(b[1].lastAttemptAt!).getTime();
        return dateB - dateA;
      })
      .slice(0, 5)
  );
</script>

{#if loading}
  <div class="flex justify-center py-12">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-primary-light"></div>
  </div>
{:else}
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <div class="text-center">
          <div class="flex items-center justify-center gap-1 text-secondary mb-1">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-2xl font-bold text-text dark:text-text-dark">
            {streak.currentStreak}
          </p>
          <p class="text-xs text-muted dark:text-muted-dark">Day Streak</p>
        </div>
      </Card>

      <Card>
        <div class="text-center">
          <p class="text-2xl font-bold text-text dark:text-text-dark">
            {completedLessons}
          </p>
          <p class="text-xs text-muted dark:text-muted-dark">Lessons Completed</p>
        </div>
      </Card>

      <Card>
        <div class="text-center">
          <p class="text-2xl font-bold text-text dark:text-text-dark">
            {formatScore(averageScore())}
          </p>
          <p class="text-xs text-muted dark:text-muted-dark">Average Score</p>
        </div>
      </Card>

      <Card>
        <div class="text-center">
          <p class="text-2xl font-bold text-text dark:text-text-dark">
            {totalAttempts}
          </p>
          <p class="text-xs text-muted dark:text-muted-dark">Total Attempts</p>
        </div>
      </Card>
    </div>

    <!-- Streak Info -->
    {#if streak.longestStreak > 0}
      <Card>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted dark:text-muted-dark">Longest Streak</p>
            <p class="text-xl font-bold text-text dark:text-text-dark">
              {streak.longestStreak} days
            </p>
          </div>
          {#if streak.lastActiveDate}
            <div class="text-right">
              <p class="text-sm text-muted dark:text-muted-dark">Last Active</p>
              <p class="text-sm text-text dark:text-text-dark">
                {formatDate(streak.lastActiveDate)}
              </p>
            </div>
          {/if}
        </div>
      </Card>
    {/if}

    <!-- Recent Activity -->
    <div>
      <h2 class="text-lg font-semibold text-text dark:text-text-dark mb-4">
        Recent Activity
      </h2>

      {#if recentActivity.length > 0}
        <div class="space-y-3">
          {#each recentActivity as [lessonId, lessonProgress]}
            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-text dark:text-text-dark">
                    {lessonId.split('/').pop()?.replace(/-/g, ' ').replace(/^\d+-/, '')}
                  </p>
                  <p class="text-sm text-muted dark:text-muted-dark">
                    {formatDate(lessonProgress.lastAttemptAt)}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <Badge variant={lessonProgress.completed ? 'success' : 'neutral'}>
                    {lessonProgress.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                  <span class="font-medium text-text dark:text-text-dark">
                    {formatScore(lessonProgress.bestScore)}
                  </span>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      {:else}
        <Card class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p class="text-muted dark:text-muted-dark mb-4">
            No lessons completed yet
          </p>
          <a href="/curriculum" class="text-primary dark:text-primary-light hover:underline">
            Start your first lesson
          </a>
        </Card>
      {/if}
    </div>
  </div>
{/if}
