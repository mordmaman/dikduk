<script lang="ts">
  import { cn } from '@/lib/utils';
  import type { TrueFalseExercise } from '@/lib/types';

  interface Props {
    exercise: TrueFalseExercise;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
  }

  let { exercise, onAnswer, disabled = false }: Props = $props();

  let selected = $state<boolean | null>(null);
  let submitted = $state(false);
  let isCorrect = $state(false);

  // Reset state when exercise changes
  $effect(() => {
    exercise.id;
    selected = null;
    submitted = false;
    isCorrect = false;
  });

  function selectOption(value: boolean) {
    if (submitted || disabled) return;
    selected = value;
    checkAnswer(value);
  }

  function checkAnswer(value: boolean) {
    isCorrect = value === exercise.isTrue;
    submitted = true;
    onAnswer(isCorrect);
  }

  function getButtonClass(value: boolean): string {
    if (!submitted) {
      return selected === value
        ? 'option-btn-selected'
        : 'option-btn';
    }

    if (value === exercise.isTrue) {
      return 'option-btn-correct';
    }

    if (selected === value && value !== exercise.isTrue) {
      return 'option-btn-incorrect';
    }

    return 'option-btn opacity-50';
  }
</script>

<div class="space-y-4">
  <p class="text-sm text-muted dark:text-muted-dark">
    {exercise.instruction}
  </p>

  <p class="text-lg font-medium text-text dark:text-text-dark py-4">
    "{exercise.statement}"
  </p>

  <div class="flex gap-4">
    <button
      onclick={() => selectOption(true)}
      class={cn(getButtonClass(true), 'flex-1')}
      disabled={submitted || disabled}
      aria-pressed={selected === true}
    >
      <span class="flex items-center justify-center gap-2">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        True
      </span>
    </button>

    <button
      onclick={() => selectOption(false)}
      class={cn(getButtonClass(false), 'flex-1')}
      disabled={submitted || disabled}
      aria-pressed={selected === false}
    >
      <span class="flex items-center justify-center gap-2">
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        False
      </span>
    </button>
  </div>

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
