<script lang="ts">
  import { cn } from '@/lib/utils';
  import type { MultipleChoiceExercise } from '@/lib/types';
  import Button from '@/components/ui/Button.svelte';

  interface Props {
    exercise: MultipleChoiceExercise;
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

  function selectOption(id: string) {
    if (submitted || disabled) return;
    selectedId = id;
  }

  function checkAnswer() {
    if (!selectedId || submitted) return;

    const selected = exercise.options.find((o) => o.id === selectedId);
    isCorrect = selected?.isCorrect ?? false;
    submitted = true;
    onAnswer(isCorrect);
  }

  function getOptionClass(option: { id: string; isCorrect: boolean }): string {
    if (!submitted) {
      return selectedId === option.id ? 'option-btn-selected' : 'option-btn';
    }

    if (option.isCorrect) {
      return 'option-btn-correct';
    }

    if (selectedId === option.id && !option.isCorrect) {
      return 'option-btn-incorrect';
    }

    return 'option-btn opacity-50';
  }

  // Check if text is Hebrew
  function isHebrew(text: string): boolean {
    return /[\u0590-\u05FF]/.test(text);
  }
</script>

<div class="space-y-4">
  <p class="text-lg font-medium text-text dark:text-text-dark">
    {exercise.question}
  </p>

  {#if exercise.hebrewWord}
    <div class="text-center py-4">
      <span
        lang="he"
        dir="rtl"
        class="font-hebrew text-3xl text-hebrew dark:text-hebrew-dark"
      >
        {exercise.hebrewWord}
      </span>
    </div>
  {/if}

  <div class="space-y-2">
    {#each exercise.options as option}
      <button
        onclick={() => selectOption(option.id)}
        class={getOptionClass(option)}
        disabled={submitted || disabled}
        aria-pressed={selectedId === option.id}
      >
        <span
          class={cn(isHebrew(option.text) && 'font-hebrew text-xl')}
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
