<script lang="ts">
  import { cn, shuffle } from '@/lib/utils';
  import type { MatchingExercise } from '@/lib/types';
  import Button from '@/components/ui/Button.svelte';

  interface Props {
    exercise: MatchingExercise;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
  }

  let { exercise, onAnswer, disabled = false }: Props = $props();

  // Shuffle the right side options
  let shuffledRight = $state(shuffle(exercise.pairs.map((p) => p.right)));

  // Track matches: left index -> right value
  let matches = $state<Map<number, string>>(new Map());
  let selectedLeft = $state<number | null>(null);
  let submitted = $state(false);
  let results = $state<Map<number, boolean>>(new Map());

  // Reset state when exercise changes
  $effect(() => {
    exercise.id;
    shuffledRight = shuffle(exercise.pairs.map((p) => p.right));
    matches = new Map();
    selectedLeft = null;
    submitted = false;
    results = new Map();
  });

  // Check if text is Hebrew
  function isHebrew(text: string): boolean {
    return /[\u0590-\u05FF]/.test(text);
  }

  function selectLeft(index: number) {
    if (submitted || disabled) return;
    if (matches.has(index)) {
      // Already matched, remove match
      const rightVal = matches.get(index)!;
      const newMatches = new Map(matches);
      newMatches.delete(index);
      matches = newMatches;
      shuffledRight = [...shuffledRight, rightVal];
    } else {
      selectedLeft = selectedLeft === index ? null : index;
    }
  }

  function selectRight(value: string) {
    if (submitted || disabled || selectedLeft === null) return;

    // Create the match
    const newMatches = new Map(matches);
    newMatches.set(selectedLeft, value);
    matches = newMatches;

    // Remove from available options
    shuffledRight = shuffledRight.filter((v) => v !== value);
    selectedLeft = null;
  }

  function checkAnswer() {
    if (matches.size !== exercise.pairs.length || submitted) return;

    const newResults = new Map<number, boolean>();
    let allCorrect = true;

    exercise.pairs.forEach((pair, index) => {
      const matched = matches.get(index);
      const correct = matched === pair.right;
      newResults.set(index, correct);
      if (!correct) allCorrect = false;
    });

    results = newResults;
    submitted = true;
    onAnswer(allCorrect);
  }

  function getLeftClass(index: number): string {
    const base = 'p-3 rounded-lg border-2 transition-colors cursor-pointer';

    if (submitted) {
      return cn(
        base,
        results.get(index)
          ? 'border-success bg-success/10 dark:border-success-dark dark:bg-success-dark/10'
          : 'border-error bg-error/10 dark:border-error-dark dark:bg-error-dark/10'
      );
    }

    if (matches.has(index)) {
      return cn(base, 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-light/10');
    }

    if (selectedLeft === index) {
      return cn(base, 'border-primary ring-2 ring-primary dark:border-primary-light dark:ring-primary-light');
    }

    return cn(base, 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500');
  }

  function getRightClass(value: string): string {
    const base = 'p-3 rounded-lg border-2 transition-colors cursor-pointer';

    if (selectedLeft !== null) {
      return cn(base, 'border-primary hover:bg-primary/10 dark:border-primary-light dark:hover:bg-primary-light/10');
    }

    return cn(base, 'border-gray-200 dark:border-gray-600 opacity-50');
  }
</script>

<div class="space-y-4">
  <p class="text-sm text-muted dark:text-muted-dark">
    {exercise.instruction || 'Match the items on the left with those on the right.'}
  </p>

  <div class="grid grid-cols-2 gap-4">
    <!-- Left column -->
    <div class="space-y-2">
      {#each exercise.pairs as pair, index}
        <button
          onclick={() => selectLeft(index)}
          class={cn(getLeftClass(index), 'w-full text-left')}
          disabled={submitted || disabled}
        >
          <div class="flex items-center justify-between gap-2">
            <span
              class={cn(isHebrew(pair.left) && 'font-hebrew text-lg text-hebrew dark:text-hebrew-dark')}
              lang={isHebrew(pair.left) ? 'he' : undefined}
              dir={isHebrew(pair.left) ? 'rtl' : undefined}
            >
              {pair.left}
            </span>
            {#if matches.has(index)}
              <span class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                {matches.get(index)}
              </span>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    <!-- Right column (available options) -->
    <div class="space-y-2">
      {#each shuffledRight as value}
        <button
          onclick={() => selectRight(value)}
          class={cn(getRightClass(value), 'w-full text-left')}
          disabled={submitted || disabled || selectedLeft === null}
        >
          <span
            class={cn(isHebrew(value) && 'font-hebrew text-lg text-hebrew dark:text-hebrew-dark')}
            lang={isHebrew(value) ? 'he' : undefined}
            dir={isHebrew(value) ? 'rtl' : undefined}
          >
            {value}
          </span>
        </button>
      {/each}
    </div>
  </div>

  {#if !submitted}
    <Button
      variant="primary"
      onclick={checkAnswer}
      disabled={matches.size !== exercise.pairs.length || disabled}
      class="w-full sm:w-auto"
    >
      Check Matches
    </Button>
  {/if}

  {#if submitted}
    {@const allCorrect = Array.from(results.values()).every(Boolean)}
    <div
      class={allCorrect ? 'feedback-correct' : 'feedback-incorrect'}
      role="alert"
      aria-live="polite"
    >
      <p class="font-semibold mb-1">
        {allCorrect ? 'All correct!' : 'Some matches are incorrect'}
      </p>
      {#if !allCorrect}
        <p>Review the highlighted items and try to understand the correct matches.</p>
      {/if}
    </div>
  {/if}
</div>
