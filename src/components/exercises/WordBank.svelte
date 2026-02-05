<script lang="ts">
  import { cn } from '@/lib/utils';
  import type { WordBankExercise } from '@/lib/types';
  import Button from '@/components/ui/Button.svelte';

  interface Props {
    exercise: WordBankExercise;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
  }

  let { exercise, onAnswer, disabled = false }: Props = $props();

  let selectedId = $state<string | null>(null);
  let submitted = $state(false);
  let isCorrect = $state(false);

  // Reset state when exercise changes
  $effect(() => {
    exercise.id;
    selectedId = null;
    submitted = false;
    isCorrect = false;
  });

  // Check if text is Hebrew
  function isHebrew(text: string): boolean {
    return /[\u0590-\u05FF]/.test(text);
  }

  function selectOption(id: string) {
    if (submitted || disabled) return;
    selectedId = selectedId === id ? null : id;
  }

  function checkAnswer() {
    if (!selectedId || submitted) return;

    const selected = exercise.options.find((o) => o.id === selectedId);
    isCorrect = selected?.isCorrect ?? false;
    submitted = true;
    onAnswer(isCorrect);
  }

  function getOptionClass(option: { id: string; isCorrect: boolean }): string {
    const base = 'px-4 py-2 rounded-lg border-2 transition-colors cursor-pointer';

    if (!submitted) {
      return cn(
        base,
        selectedId === option.id
          ? 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-light/10'
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
      );
    }

    if (option.isCorrect) {
      return cn(base, 'border-success bg-success/10 dark:border-success-dark dark:bg-success-dark/10');
    }

    if (selectedId === option.id && !option.isCorrect) {
      return cn(base, 'border-error bg-error/10 dark:border-error-dark dark:bg-error-dark/10');
    }

    return cn(base, 'border-gray-200 opacity-50 dark:border-gray-600');
  }

  let selectedText = $derived(
    exercise.options.find((o) => o.id === selectedId)?.text || '___'
  );
</script>

<div class="space-y-4">
  <p class="text-lg font-medium text-text dark:text-text-dark">
    {exercise.question}
  </p>

  <!-- Sentence with blank -->
  <div class="py-4 text-lg">
    <span>{exercise.textBefore}</span>
    <span
      class={cn(
        'inline-block min-w-[80px] px-2 py-1 mx-1 rounded border-2 border-dashed text-center',
        selectedId
          ? 'border-primary dark:border-primary-light'
          : 'border-gray-300 dark:border-gray-600',
        isHebrew(selectedText) && 'font-hebrew text-xl text-hebrew dark:text-hebrew-dark'
      )}
      lang={isHebrew(selectedText) ? 'he' : undefined}
      dir={isHebrew(selectedText) ? 'rtl' : undefined}
    >
      {selectedText}
    </span>
    <span>{exercise.textAfter}</span>
  </div>

  <!-- Word bank -->
  <div class="flex flex-wrap gap-2 justify-center py-4">
    {#each exercise.options as option}
      <button
        onclick={() => selectOption(option.id)}
        class={getOptionClass(option)}
        disabled={submitted || disabled}
        aria-pressed={selectedId === option.id}
      >
        <span
          class={cn(isHebrew(option.text) && 'font-hebrew text-lg')}
          lang={isHebrew(option.text) ? 'he' : undefined}
          dir={isHebrew(option.text) ? 'rtl' : undefined}
        >
          {option.text}
        </span>
      </button>
    {/each}
  </div>

  {#if !submitted}
    <Button
      variant="primary"
      onclick={checkAnswer}
      disabled={!selectedId || disabled}
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
