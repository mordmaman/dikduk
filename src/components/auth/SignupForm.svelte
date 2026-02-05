<script lang="ts">
  import { supabase, isSupabaseConfigured } from '@/lib/supabase';
  import { setUser } from '@/stores/auth';
  import { migrateGuestProgress } from '@/lib/progress';
  import Button from '@/components/ui/Button.svelte';
  import Card from '@/components/ui/Card.svelte';

  interface Props {
    redirectTo?: string;
  }

  let { redirectTo = '/curriculum' }: Props = $props();

  let email = $state('');
  let password = $state('');
  let displayName = $state('');
  let acceptedTerms = $state(false);
  let loading = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!isSupabaseConfigured() || !supabase) {
      error = 'Authentication is not configured. Please try again later.';
      return;
    }

    if (!acceptedTerms) {
      error = 'Please accept the Privacy Policy and Terms of Service to continue.';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters.';
      return;
    }

    loading = true;
    error = null;

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || undefined,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (authError) {
        error = authError.message;
        return;
      }

      if (data.user && !data.user.email_confirmed_at) {
        // Email confirmation required
        success = true;
      } else if (data.user) {
        // User is immediately logged in (no email confirmation)
        setUser(data.user);
        await migrateGuestProgress();
        window.location.href = redirectTo;
      }
    } catch (err) {
      error = 'An unexpected error occurred. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function handleGoogleSignup() {
    if (!isSupabaseConfigured() || !supabase) {
      error = 'Authentication is not configured. Please try again later.';
      return;
    }

    if (!acceptedTerms) {
      error = 'Please accept the Privacy Policy and Terms of Service to continue.';
      return;
    }

    loading = true;
    error = null;

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (authError) {
        error = authError.message;
      }
    } catch (err) {
      error = 'An unexpected error occurred. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<Card>
  <div class="text-center py-8">
    <div class="w-16 h-16 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-8 h-8 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h1 class="text-2xl font-bold text-text dark:text-text-dark mb-2">
      Coming Soon
    </h1>
    <p class="text-muted dark:text-muted-dark mb-6 max-w-sm mx-auto">
      Account creation will be available soon. For now, enjoy exploring the lessons — your progress is saved locally on this device.
    </p>
    <Button variant="primary" href="/curriculum">
      Explore Lessons
    </Button>
  </div>
</Card>
