<script lang="ts">
  import { supabase, isSupabaseConfigured } from '@/lib/supabase';
  import Button from '@/components/ui/Button.svelte';
  import Card from '@/components/ui/Card.svelte';

  let email = $state('');
  let loading = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!isSupabaseConfigured() || !supabase) {
      error = 'Authentication is not configured. Please try again later.';
      return;
    }

    loading = true;
    error = null;

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (resetError) {
        error = resetError.message;
        return;
      }

      success = true;
    } catch (err) {
      error = 'An unexpected error occurred. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<Card>
  <h1 class="text-2xl font-bold text-text dark:text-text-dark mb-2">
    Reset your password
  </h1>
  <p class="text-muted dark:text-muted-dark mb-6">
    Enter your email address and we'll send you a link to reset your password.
  </p>

  {#if success}
    <div class="p-4 bg-success/10 border border-success/20 rounded-lg">
      <h2 class="font-semibold text-success dark:text-success-dark mb-2">
        Check your email
      </h2>
      <p class="text-sm text-text dark:text-text-dark">
        If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox and spam folder.
      </p>
    </div>

    <p class="mt-6 text-center text-sm text-muted dark:text-muted-dark">
      <a href="/auth/login" class="text-primary dark:text-primary-light hover:underline">
        Back to sign in
      </a>
    </p>
  {:else}
    {#if error}
      <div class="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg text-error dark:text-error-dark text-sm">
        {error}
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-text dark:text-text-dark mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <Button type="submit" variant="primary" disabled={loading} class="w-full">
        {loading ? 'Sending...' : 'Send reset link'}
      </Button>
    </form>

    <p class="mt-6 text-center text-sm text-muted dark:text-muted-dark">
      Remember your password?{' '}
      <a href="/auth/login" class="text-primary dark:text-primary-light hover:underline">
        Sign in
      </a>
    </p>
  {/if}
</Card>
