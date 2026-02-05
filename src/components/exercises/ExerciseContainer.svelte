<script lang="ts">
  import type { ExerciseSet } from '@/lib/types';
  import ExerciseWrapper from './ExerciseWrapper.svelte';

  interface Props {
    basicExerciseSet: ExerciseSet;
    advancedExerciseSet: ExerciseSet | null;
    lessonTitle: string;
  }

  let { basicExerciseSet, advancedExerciseSet, lessonTitle }: Props = $props();

  let showAdvanced = $state(false);

  function handleStartAdvanced() {
    showAdvanced = true;
  }

  let hasAdvancedExercises = $derived(
    advancedExerciseSet !== null && advancedExerciseSet.exercises.length > 0
  );

  let advancedExerciseCount = $derived(
    advancedExerciseSet?.exercises.length ?? 0
  );
</script>

{#if showAdvanced && advancedExerciseSet}
  <ExerciseWrapper
    exerciseSet={advancedExerciseSet}
    {lessonTitle}
    isAdvanced={true}
    hasAdvancedExercises={false}
  />
{:else}
  <ExerciseWrapper
    exerciseSet={basicExerciseSet}
    {lessonTitle}
    isAdvanced={false}
    {hasAdvancedExercises}
    {advancedExerciseCount}
    onStartAdvanced={handleStartAdvanced}
  />
{/if}
