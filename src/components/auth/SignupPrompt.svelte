<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticatedStore } from '@/stores/auth';
  import Button from '@/components/ui/Button.svelte';
  import Card from '@/components/ui/Card.svelte';

  interface Props {
    context: 'lesson-complete' | 'dashboard' | 'header';
  }

  let { context }: Props = $props();

  let isAuthenticated = $state(false);
  let dismissed = $state(false);

  onMount(() => {
    const unsubscribe = isAuthenticatedStore.subscribe((value) => {
      isAuthenticated = value;
    });

    // Check if user has dismissed this prompt before
    const dismissedKey = `dikduk_prompt_dismissed_${context}`;
    dismissed = localStorage.getItem(dismissedKey) === 'true';

    return unsubscribe;
  });

  function dismiss() {
    dismissed = true;
    const dismissedKey = `dikduk_prompt_dismissed_${context}`;
    localStorage.setItem(dismissedKey, 'true');
  }

  // Don't show if authenticated or dismissed
  let shouldShow = $derived(!isAuthenticated && !dismissed);
</script>

{#if shouldShow}
  {#if context === 'lesson-complete'}
    <Card class="mt-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-medium text-text dark:text-text-dark">
            Nice work!
          </p>
          <p class="text-sm text-muted dark:text-muted-dark mt-1">
            Account sync is coming soon. For now, your progress is saved locally on this device.
          </p>
          <div class="flex gap-2 mt-3">
            <div class="relative group">
              <Button variant="primary" size="sm" disabled={true}>
                Create free account
              </Button>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Coming soon
              </div>
            </div>
            <Button variant="ghost" size="sm" onclick={dismiss}>
              Got it
            </Button>
          </div>
        </div>
      </div>
    </Card>
  {:else if context === 'dashboard'}
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-text dark:text-text-dark">
            Your progress is saved on this device. Account sync coming soon!
          </p>
        </div>
        <button
          onclick={dismiss}
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Dismiss"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  {:else if context === 'header'}
    <!-- Header context - coming soon -->
    <span class="text-sm text-muted dark:text-muted-dark cursor-default" title="Coming soon">
      Sign in (coming soon)
    </span>
  {/if}
{/if}
