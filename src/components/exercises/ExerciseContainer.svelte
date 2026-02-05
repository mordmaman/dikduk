<script lang="ts">
  import type { ExerciseSet, Exercise } from '@/lib/types';
  import ExerciseWrapper from './ExerciseWrapper.svelte';

  // More permissive input type to handle JSON imports where difficulty is typed as string
  interface ExerciseSetInput {
    lessonId: string;
    difficulty?: string;
    exercises: Exercise[];
  }

  interface Props {
    basicExerciseSet: ExerciseSetInput;
    advancedExerciseSet: ExerciseSetInput | null;
    lessonTitle: string;
  }

  let { basicExerciseSet, advancedExerciseSet, lessonTitle }: Props = $props();

  // Cast to proper ExerciseSet type for internal use
  const basicSet = basicExerciseSet as ExerciseSet;
  const advancedSet = advancedExerciseSet as ExerciseSet | null;

  let showAdvanced = $state(false);

  function handleStartAdvanced() {
    showAdvanced = true;
  }

  let hasAdvancedExercises = $derived(
    advancedSet !== null && advancedSet.exercises.length > 0
  );

  let advancedExerciseCount = $derived(
    advancedSet?.exercises.length ?? 0
  );
</script>

{#if showAdvanced && advancedSet}
  <ExerciseWrapper
    exerciseSet={advancedSet}
    {lessonTitle}
    isAdvanced={true}
    hasAdvancedExercises={false}
  />
{:else}
  <ExerciseWrapper
    exerciseSet={basicSet}
    {lessonTitle}
    isAdvanced={false}
    {hasAdvancedExercises}
    {advancedExerciseCount}
    onStartAdvanced={handleStartAdvanced}
  />
{/if}
