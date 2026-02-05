<script lang="ts">
  import { cn, getHebrewCharacters } from '@/lib/utils';
  import type { TapToSelectExercise } from '@/lib/types';
  import Button from '@/components/ui/Button.svelte';

  interface Props {
    exercise: TapToSelectExercise;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
  }

  let { exercise, onAnswer, disabled = false }: Props = $props();

  let selectedIndices = $state<Set<number>>(new Set());
  let submitted = $state(false);
  let isCorrect = $state(false);

  // Reset state when exercise changes
  $effect(() => {
    // Access exercise.id to track changes
    exercise.id;
    selectedIndices = new Set();
    submitted = false;
    isCorrect = false;
  });

  // Split Hebrew text into characters (including combined marks)
  let characters = $derived(getHebrewCharacters(exercise.hebrewText));

  function toggleCharacter(index: number) {
    if (submitted || disabled) return;

    const newSet = new Set(selectedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    selectedIndices = newSet;
  }

  function checkAnswer() {
    if (submitted) return;

    const correctSet = new Set(exercise.correctIndices);
    const selectedArray = Array.from(selectedIndices);

    // Check if selected matches correct (same elements, regardless of order)
    isCorrect =
      selectedArray.length === correctSet.size &&
      selectedArray.every((i) => correctSet.has(i));

    submitted = true;
    onAnswer(isCorrect);
  }

  function getCharacterClass(index: number): string {
    const isSelected = selectedIndices.has(index);
    const isCorrectChar = exercise.correctIndices.includes(index);

    if (!submitted) {
      return isSelected
        ? 'bg-primary/20 dark:bg-primary-light/20 ring-2 ring-primary dark:ring-primary-light'
        : 'hover:bg-gray-100 dark:hover:bg-gray-800';
    }

    // After submission
    if (isCorrectChar && isSelected) {
      return 'bg-success/20 dark:bg-success-dark/20 ring-2 ring-success dark:ring-success-dark';
    }
    if (isCorrectChar && !isSelected) {
      return 'bg-success/20 dark:bg-success-dark/20 ring-2 ring-success dark:ring-success-dark ring-dashed';
    }
    if (!isCorrectChar && isSelected) {
      return 'bg-error/20 dark:bg-error-dark/20 ring-2 ring-error dark:ring-error-dark';
    }
    return 'opacity-50';
  }
</script>

<div class="space-y-4">
  <p class="text-lg font-medium text-text dark:text-text-dark">
    {exercise.question}
  </p>

  <p class="text-sm text-muted dark:text-muted-dark">
    {exercise.instruction}
  </p>

  <div
    class="flex flex-wrap justify-center gap-2 py-6"
    dir="rtl"
    lang="he"
    role="group"
    aria-label="Hebrew characters to select"
  >
    {#each characters as char, index}
      <button
        onclick={() => toggleCharacter(index)}
        class={cn(
          'font-hebrew text-3xl px-3 py-2 rounded-lg transition-all cursor-pointer text-hebrew dark:text-hebrew-dark',
          getCharacterClass(index)
        )}
        disabled={submitted || disabled}
        aria-pressed={selectedIndices.has(index)}
        aria-label={`Character ${char}`}
      >
        {char}
      </button>
    {/each}
  </div>

  {#if !submitted}
    <Button
      variant="primary"
      onclick={checkAnswer}
      disabled={selectedIndices.size === 0 || disabled}
      class="w-full sm:w-auto"
    >
      Check Answer
    </Button>
  {/if}

  {#if submitted}
    <div
      class={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}
      role="alert"
      aria-live="polite"
    >
      <p class="font-semibold mb-1">
        {isCorrect ? 'Correct!' : 'Not quite'}
      </p>
      <p>{exercise.explanation}</p>
    </div>
  {/if}
</div>
