<script lang="ts">
  import { onMount } from 'svelte';
  import { themeStore, resolvedThemeStore, setTheme, initTheme } from '@/stores/theme';
  import type { Theme } from '@/lib/types';

  let currentTheme = $state<Theme>('system');
  let resolvedTheme = $state<'light' | 'dark'>('light');
  let isOpen = $state(false);

  onMount(() => {
    initTheme();
    // Subscribe to store changes
    const unsubTheme = themeStore.subscribe((value) => {
      currentTheme = value;
    });
    const unsubResolved = resolvedThemeStore.subscribe((value) => {
      resolvedTheme = value;
    });

    return () => {
      unsubTheme();
      unsubResolved();
    };
  });

  function handleThemeChange(theme: Theme) {
    setTheme(theme);
    isOpen = false;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.theme-toggle')) {
      isOpen = false;
    }
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div class="theme-toggle relative">
  <button
    onclick={toggleDropdown}
    class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-800"
    aria-label="Toggle theme"
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {#if resolvedTheme === 'dark'}
      <!-- Moon icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    {:else}
      <!-- Sun icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    {/if}
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-36 bg-surface dark:bg-surface-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
      role="menu"
    >
      <button
        onclick={() => handleThemeChange('light')}
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
        class:font-medium={currentTheme === 'light'}
        role="menuitem"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Light
        {#if currentTheme === 'light'}
          <svg class="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>
      <button
        onclick={() => handleThemeChange('dark')}
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
        class:font-medium={currentTheme === 'dark'}
        role="menuitem"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        Dark
        {#if currentTheme === 'dark'}
          <svg class="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>
      <button
        onclick={() => handleThemeChange('system')}
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
        class:font-medium={currentTheme === 'system'}
        role="menuitem"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        System
        {#if currentTheme === 'system'}
          <svg class="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        {/if}
      </button>
    </div>
  {/if}
</div>
