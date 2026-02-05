<script lang="ts">
  import { cn } from '@/lib/utils';
  import type { WordBreakdownExercise, WordPart } from '@/lib/types';
  import Button from '@/components/ui/Button.svelte';

  interface Props {
    exercise: WordBreakdownExercise;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
  }

  let { exercise, onAnswer, disabled = false }: Props = $props();

  let submitted = $state(false);
  let isCorrect = $state(false);

  // Reset state when exercise changes
  $effect(() => {
    exercise.id;
    submitted = false;
    isCorrect = false;
  });

  // For this exercise, we show the breakdown and ask users to verify understanding
  // Since it's educational, we make it a "review and confirm" type

  function confirmUnderstanding() {
    // This exercise is primarily educational - showing the breakdown
    // User confirms they understand the breakdown
    isCorrect = true;
    submitted = true;
    onAnswer(true);
  }

  const partTypeColors: Record<WordPart['type'], string> = {
    prefix: 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700',
    root: 'bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700',
    suffix: 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700',
    pattern: 'bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700',
  };

  const partTypeLabels: Record<WordPart['type'], string> = {
    prefix: 'Prefix',
    root: 'Root',
    suffix: 'Suffix',
    pattern: 'Pattern',
  };
</script>

<div class="space-y-4">
  <p class="text-sm text-muted dark:text-muted-dark">
    {exercise.instruction}
  </p>

  <!-- Display the full word -->
  <div class="text-center py-4">
    <span
      lang="he"
      dir="rtl"
      class="font-hebrew text-4xl text-hebrew dark:text-hebrew-dark"
    >
      {exercise.word}
    </span>
  </div>

  <!-- Word breakdown visualization -->
  <div class="flex flex-wrap justify-center gap-2 py-4" dir="rtl">
    {#each exercise.parts as part}
      <div
        class={cn(
          'flex flex-col items-center p-3 rounded-lg border-2',
          partTypeColors[part.type]
        )}
      >
        <span
          lang="he"
          class="font-hebrew text-2xl text-hebrew dark:text-hebrew-dark"
        >
          {part.text}
        </span>
        <span class="text-xs text-muted dark:text-muted-dark mt-1">
          {part.label}
        </span>
        <span class="text-xs font-medium mt-1">
          {partTypeLabels[part.type]}
        </span>
      </div>
    {/each}
  </div>

  <!-- Legend -->
  <div class="flex flex-wrap justify-center gap-4 text-sm">
    {#each Object.entries(partTypeLabels) as [type, label]}
      <div class="flex items-center gap-2">
        <div
          class={cn(
            'w-4 h-4 rounded border',
            partTypeColors[type as WordPart['type']]
          )}
        ></div>
        <span class="text-muted dark:text-muted-dark">{label}</span>
      </div>
    {/each}
  </div>

  {#if !submitted}
    <div class="text-center">
      <p class="text-sm text-muted dark:text-muted-dark mb-4">
        Study the breakdown above, then confirm you understand it.
      </p>
      <Button
        variant="primary"
        onclick={confirmUnderstanding}
        disabled={disabled}
      >
        I Understand
      </Button>
    </div>
  {/if}

  {#if submitted}
    <div class="feedback-correct" role="alert" aria-live="polite">
      <p class="font-semibold mb-1">Great!</p>
      <p>{exercise.explanation}</p>
    </div>
  {/if}
</div>
