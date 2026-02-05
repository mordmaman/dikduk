<script lang="ts">
  import { onMount } from 'svelte';
  import { hasConsentBeenGiven, acceptAllCookies, rejectAnalytics } from '@/lib/cookies';
  import Button from './Button.svelte';

  let showBanner = $state(false);
  let showCustomize = $state(false);
  let analyticsEnabled = $state(false);

  onMount(() => {
    // Only show banner if consent hasn't been given
    if (!hasConsentBeenGiven()) {
      showBanner = true;
    }
  });

  function handleAcceptAll() {
    acceptAllCookies();
    showBanner = false;
  }

  function handleRejectAnalytics() {
    rejectAnalytics();
    showBanner = false;
  }

  function handleSavePreferences() {
    if (analyticsEnabled) {
      acceptAllCookies();
    } else {
      rejectAnalytics();
    }
    showBanner = false;
    showCustomize = false;
  }
</script>

{#if showBanner}
  <div
    class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 shadow-lg"
    role="dialog"
    aria-labelledby="cookie-title"
    aria-describedby="cookie-description"
  >
    <div class="max-w-4xl mx-auto">
      {#if !showCustomize}
        <!-- Main banner -->
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div class="flex-1">
            <h2 id="cookie-title" class="text-lg font-semibold text-text dark:text-text-dark">
              Cookie Preferences
            </h2>
            <p id="cookie-description" class="text-sm text-muted dark:text-muted-dark mt-1">
              We use essential cookies for authentication. You can also enable analytics cookies to help us improve the site.
              <a href="/privacy" class="text-primary dark:text-primary-light hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onclick={() => showCustomize = true}>
              Customise
            </Button>
            <Button variant="outline" size="sm" onclick={handleRejectAnalytics}>
              Essential Only
            </Button>
            <Button variant="primary" size="sm" onclick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      {:else}
        <!-- Customization panel -->
        <div>
          <h2 class="text-lg font-semibold text-text dark:text-text-dark mb-4">
            Cookie Settings
          </h2>

          <div class="space-y-4 mb-6">
            <!-- Essential cookies (always on) -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h3 class="font-medium text-text dark:text-text-dark">Essential Cookies</h3>
                <p class="text-sm text-muted dark:text-muted-dark">
                  Required for authentication and basic site functionality.
                </p>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-muted dark:text-muted-dark mr-2">Always on</span>
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="w-5 h-5 rounded border-gray-300 cursor-not-allowed"
                />
              </div>
            </div>

            <!-- Analytics cookies -->
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h3 class="font-medium text-text dark:text-text-dark">Analytics Cookies</h3>
                <p class="text-sm text-muted dark:text-muted-dark">
                  Help us understand how visitors use the site (Vercel Analytics).
                </p>
              </div>
              <input
                type="checkbox"
                bind:checked={analyticsEnabled}
                class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
              />
            </div>
          </div>

          <div class="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onclick={() => showCustomize = false}>
              Back
            </Button>
            <Button variant="primary" size="sm" onclick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
