<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, isSupabaseConfigured } from '@/lib/supabase';
  import { userStore, isAuthenticatedStore, setUser, clearAuth } from '@/stores/auth';
  import { currentStreakStore } from '@/stores/progress';
  import { getStreak } from '@/lib/progress';
  import ThemeToggle from './ThemeToggle.svelte';
  import Button from '@/components/ui/Button.svelte';

  let isAuthenticated = $state(false);
  let user = $state<{ email?: string; display_name?: string } | null>(null);
  let currentStreak = $state(0);
  let mobileMenuOpen = $state(false);
  let userMenuOpen = $state(false);

  onMount(async () => {
    // Subscribe to auth state
    const unsubAuth = isAuthenticatedStore.subscribe((value) => {
      isAuthenticated = value;
    });
    const unsubUser = userStore.subscribe((value) => {
      user = value
        ? { email: value.email, display_name: value.user_metadata?.display_name }
        : null;
    });
    const unsubStreak = currentStreakStore.subscribe((value) => {
      currentStreak = value;
    });

    // Initialize auth state
    if (isSupabaseConfigured() && supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        clearAuth();
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          clearAuth();
        }
      });
    } else {
      clearAuth();
    }

    // Load streak
    await getStreak();

    return () => {
      unsubAuth();
      unsubUser();
      unsubStreak();
    };
  });

  async function handleSignOut() {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    clearAuth();
    window.location.href = '/';
  }

  function toggleMobileMenu(event: MouseEvent) {
    event.stopPropagation();
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) userMenuOpen = false;
  }

  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      userMenuOpen = false;
    }
    if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
      mobileMenuOpen = false;
    }
  }
</script>

<svelte:window onclick={handleClickOutside} />

<header class="bg-surface dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
  <nav class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <span class="text-xl font-bold text-primary dark:text-primary-light">Dikduk</span>
        <span lang="he" dir="rtl" class="font-hebrew text-xl text-secondary hidden sm:inline">דִּקְדּוּק</span>
      </a>

      <!-- Desktop navigation -->
      <div class="hidden md:flex items-center gap-6">
        <a href="/curriculum" class="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-light transition-colors">
          Curriculum
        </a>
        <a href="/progress" class="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-light transition-colors">
          Progress
        </a>

        <!-- Streak indicator -->
        {#if currentStreak > 0}
          <div class="flex items-center gap-1 text-secondary">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{currentStreak}</span>
          </div>
        {/if}

        <ThemeToggle />

        {#if isAuthenticated}
          <div class="user-menu relative">
            <button
              onclick={toggleUserMenu}
              class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <div class="w-8 h-8 bg-primary dark:bg-primary-light rounded-full flex items-center justify-center text-white dark:text-gray-900 font-medium">
                {user?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
              </div>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {#if userMenuOpen}
              <div class="absolute right-0 mt-2 w-48 bg-surface dark:bg-surface-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-text dark:text-text-dark truncate">
                    {user?.display_name || 'User'}
                  </p>
                  <p class="text-xs text-muted dark:text-muted-dark truncate">
                    {user?.email}
                  </p>
                </div>
                <a
                  href="/settings"
                  class="block px-4 py-2 text-sm text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Settings
                </a>
                <button
                  onclick={handleSignOut}
                  class="w-full text-left px-4 py-2 text-sm text-error dark:text-error-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign out
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <div class="relative group">
            <Button variant="outline" size="sm" disabled={true}>
              Sign in
            </Button>
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              Coming soon
            </div>
          </div>
        {/if}
      </div>

      <!-- Mobile menu button -->
      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          onclick={toggleMobileMenu}
          class="mobile-menu-button p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {#if mobileMenuOpen}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    {#if mobileMenuOpen}
      <div class="mobile-menu md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="space-y-2">
          <a
            href="/curriculum"
            class="block px-4 py-2 text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Curriculum
          </a>
          <a
            href="/progress"
            class="block px-4 py-2 text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Progress
          </a>

          {#if currentStreak > 0}
            <div class="flex items-center gap-2 px-4 py-2 text-secondary">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">{currentStreak} day streak</span>
            </div>
          {/if}

          <div class="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            {#if isAuthenticated}
              <a
                href="/settings"
                class="block px-4 py-2 text-text dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Settings
              </a>
              <button
                onclick={handleSignOut}
                class="w-full text-left px-4 py-2 text-error dark:text-error-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Sign out
              </button>
            {:else}
              <div class="px-4 py-2">
                <span class="text-muted dark:text-muted-dark text-sm">
                  Sign in coming soon
                </span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </nav>
</header>
