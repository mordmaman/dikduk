<script lang="ts">
  import { onMount } from 'svelte';
  import { lessonProgressStore } from '@/stores/progress';
  import { getProgress } from '@/lib/progress';
  import type { LessonProgress } from '@/lib/types';

  interface Props {
    lessonId: string;
  }

  let { lessonId }: Props = $props();

  let progress = $state<LessonProgress | null>(null);
  let loaded = $state(false);

  onMount(async () => {
    // Subscribe to the store
    const unsub = lessonProgressStore.subscribe((allProgress) => {
      progress = allProgress[lessonId] || null;
    });

    // Fetch progress if not already loaded
    await getProgress();
    loaded = true;

    return unsub;
  });
</script>

{#if loaded && progress}
  <div class="flex items-center gap-1.5">
    {#if progress.completed}
      <!-- Basic completed checkmark -->
      <div class="w-5 h-5 rounded-full bg-success/20 dark:bg-success-dark/20 flex items-center justify-center" title="Completed">
        <svg class="w-3 h-3 text-success dark:text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    {:else if progress.started}
      <!-- In progress indicator -->
      <div class="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center" title="In progress">
        <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
      </div>
    {/if}

    {#if progress.advancedCompleted}
      <!-- Advanced completed star -->
      <div class="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center" title="Advanced completed">
        <svg class="w-3 h-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    {/if}
  </div>
{/if}
