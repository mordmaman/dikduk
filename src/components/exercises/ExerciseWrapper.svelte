<script lang="ts">
  import { onMount } from 'svelte';
  import type { Exercise, ExerciseSet } from '@/lib/types';
  import {
    startExerciseSession,
    recordAnswer,
    nextExercise,
    completeExerciseSession,
  } from '@/stores/progress';
  import { saveLessonProgress, saveAdvancedLessonProgress, saveExerciseResult, updateStreakForActivity } from '@/lib/progress';
  import ProgressBar from '@/components/lesson/ProgressBar.svelte';
  import Button from '@/components/ui/Button.svelte';
  import Card from '@/components/ui/Card.svelte';
  import MultipleChoice from './MultipleChoice.svelte';
  import TapToSelect from './TapToSelect.svelte';
  import TrueFalse from './TrueFalse.svelte';
  import WordBank from './WordBank.svelte';
  import Matching from './Matching.svelte';
  import WordBreakdown from './WordBreakdown.svelte';
  import SignupPrompt from '@/components/auth/SignupPrompt.svelte';

  interface Props {
    exerciseSet: ExerciseSet;
    lessonTitle: string;
    isAdvanced?: boolean;
    hasAdvancedExercises?: boolean;
    advancedExerciseCount?: number;
    onStartAdvanced?: () => void;
  }

  let {
    exerciseSet,
    lessonTitle,
    isAdvanced = false,
    hasAdvancedExercises = false,
    advancedExerciseCount = 0,
    onStartAdvanced
  }: Props = $props();

  let currentIndex = $state(0);
  let correctCount = $state(0);
  let showFeedback = $state(false);
  let isComplete = $state(false);
  let finalScore = $state(0);

  let feedbackRef: HTMLElement;
  let exerciseRef: HTMLElement;

  onMount(() => {
    startExerciseSession(exerciseSet.exercises.length);
  });

  let currentExercise = $derived(exerciseSet.exercises[currentIndex]);
  let totalExercises = $derived(exerciseSet.exercises.length);
  let progress = $derived(currentIndex + 1);

  function handleAnswer(correct: boolean) {
    if (correct) {
      correctCount++;
    }

    // Save individual exercise result
    saveExerciseResult({
      exerciseId: currentExercise.id,
      lessonId: exerciseSet.lessonId,
      correct,
      answeredAt: new Date().toISOString(),
    });

    recordAnswer(correct);
    showFeedback = true;

    // Move focus to feedback for accessibility
    setTimeout(() => {
      feedbackRef?.focus();
    }, 100);
  }

  async function handleNext() {
    showFeedback = false;

    if (currentIndex < totalExercises - 1) {
      currentIndex++;
      nextExercise();

      // Move focus to next exercise
      setTimeout(() => {
        exerciseRef?.focus();
      }, 100);
    } else {
      // Complete the session
      const score = completeExerciseSession();
      finalScore = Math.round((correctCount / totalExercises) * 100);
      isComplete = true;

      // Save progress (different for basic vs advanced)
      if (isAdvanced) {
        await saveAdvancedLessonProgress(exerciseSet.lessonId, finalScore, true);
      } else {
        await saveLessonProgress(exerciseSet.lessonId, finalScore, true);
      }
      await updateStreakForActivity();
    }
  }

  function restartExercises() {
    currentIndex = 0;
    correctCount = 0;
    showFeedback = false;
    isComplete = false;
    finalScore = 0;
    startExerciseSession(exerciseSet.exercises.length);
  }
</script>

<div class="space-y-6">
  {#if !isComplete}
    <!-- Progress bar -->
    <ProgressBar current={progress} total={totalExercises} />

    <!-- Exercise card -->
    <Card>
      <div
        bind:this={exerciseRef}
        tabindex="-1"
        class="focus:outline-none"
        aria-label={`Exercise ${progress} of ${totalExercises}`}
      >
        {#if currentExercise.type === 'multiple-choice'}
          <MultipleChoice
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {:else if currentExercise.type === 'tap-to-select'}
          <TapToSelect
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {:else if currentExercise.type === 'true-false'}
          <TrueFalse
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {:else if currentExercise.type === 'word-bank'}
          <WordBank
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {:else if currentExercise.type === 'matching'}
          <Matching
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {:else if currentExercise.type === 'word-breakdown'}
          <WordBreakdown
            exercise={currentExercise}
            onAnswer={handleAnswer}
            disabled={showFeedback}
          />
        {/if}
      </div>

      <!-- Continue button -->
      {#if showFeedback}
        <div
          bind:this={feedbackRef}
          tabindex="-1"
          class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 focus:outline-none"
        >
          <Button variant="primary" onclick={handleNext} class="w-full sm:w-auto">
            {currentIndex < totalExercises - 1 ? 'Continue' : 'See Results'}
          </Button>
        </div>
      {/if}
    </Card>

    <!-- Exercise counter -->
    <p class="text-center text-sm text-muted dark:text-muted-dark">
      Exercise {progress} of {totalExercises}
    </p>
  {:else}
    <!-- Completion screen -->
    <Card class="text-center">
      <div class="py-8">
        <div class="mb-6">
          {#if finalScore >= 80}
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 dark:bg-success-dark/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-success dark:text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-text dark:text-text-dark">
              {isAdvanced ? 'Advanced Complete!' : 'Excellent work!'}
            </h2>
          {:else if finalScore >= 60}
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-text dark:text-text-dark">
              Good effort!
            </h2>
          {:else}
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-text dark:text-text-dark">
              Keep practicing!
            </h2>
          {/if}
        </div>

        <p class="text-4xl font-bold text-primary dark:text-primary-light mb-2">
          {finalScore}%
        </p>
        <p class="text-muted dark:text-muted-dark mb-8">
          You got {correctCount} out of {totalExercises} correct
        </p>

        <!-- Advanced exercises prompt (only show after basic completion, not after advanced) -->
        {#if hasAdvancedExercises && !isAdvanced && onStartAdvanced}
          <div class="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 class="font-semibold text-purple-800 dark:text-purple-300 mb-2">
              Ready for a challenge?
            </h3>
            <p class="text-sm text-purple-700 dark:text-purple-400 mb-4">
              Try {advancedExerciseCount} advanced exercises to master dagesh rules.
            </p>
            <div class="flex gap-3 justify-center">
              <Button variant="primary" onclick={onStartAdvanced}>
                Try Advanced
              </Button>
              <Button variant="ghost" href="/curriculum">
                Skip
              </Button>
            </div>
          </div>
        {/if}

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onclick={restartExercises}>
            Practice Again
          </Button>
          <Button variant="primary" href="/curriculum">
            Back to Curriculum
          </Button>
        </div>
      </div>
    </Card>

    <!-- Signup prompt for guests -->
    <SignupPrompt context="lesson-complete" />
  {/if}
</div>
