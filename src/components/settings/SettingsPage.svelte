<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, isSupabaseConfigured } from '@/lib/supabase';
  import { userStore, isAuthenticatedStore, clearAuth } from '@/stores/auth';
  import Card from '@/components/ui/Card.svelte';
  import Button from '@/components/ui/Button.svelte';

  let isAuthenticated = $state(false);
  let user = $state<{ email?: string; display_name?: string } | null>(null);
  let loading = $state(true);
  let showDeleteConfirm = $state(false);
  let deleteLoading = $state(false);
  let error = $state<string | null>(null);
  let success = $state<string | null>(null);

  onMount(() => {
    const unsubAuth = isAuthenticatedStore.subscribe((value) => {
      isAuthenticated = value;
      loading = false;
    });
    const unsubUser = userStore.subscribe((value) => {
      user = value
        ? { email: value.email, display_name: value.user_metadata?.display_name }
        : null;
    });

    return () => {
      unsubAuth();
      unsubUser();
    };
  });

  async function handleSignOut() {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    clearAuth();
    window.location.href = '/';
  }

  async function handleDeleteAccount() {
    if (!isSupabaseConfigured() || !supabase) return;

    deleteLoading = true;
    error = null;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        error = 'You must be logged in to delete your account.';
        return;
      }

      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete account');
      }

      // Clear local state and redirect
      clearAuth();
      localStorage.clear();
      window.location.href = '/?deleted=true';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to delete account';
    } finally {
      deleteLoading = false;
    }
  }
</script>

{#if loading}
  <div class="flex justify-center py-12">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-primary-light"></div>
  </div>
{:else if !isAuthenticated}
  <Card class="text-center py-8">
    <svg class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
    <p class="text-muted dark:text-muted-dark mb-4">
      Sign in to manage your account settings
    </p>
    <Button variant="primary" href="/auth/login?redirectTo=/settings">
      Sign in
    </Button>
  </Card>
{:else}
  <div class="space-y-6">
    {#if error}
      <div class="p-4 bg-error/10 border border-error/20 rounded-lg text-error dark:text-error-dark">
        {error}
      </div>
    {/if}

    {#if success}
      <div class="p-4 bg-success/10 border border-success/20 rounded-lg text-success dark:text-success-dark">
        {success}
      </div>
    {/if}

    <!-- Account Info -->
    <Card>
      <h2 class="text-lg font-semibold text-text dark:text-text-dark mb-4">
        Account Information
      </h2>
      <div class="space-y-3">
        <div>
          <label class="text-sm text-muted dark:text-muted-dark">Email</label>
          <p class="text-text dark:text-text-dark">{user?.email}</p>
        </div>
        {#if user?.display_name}
          <div>
            <label class="text-sm text-muted dark:text-muted-dark">Display Name</label>
            <p class="text-text dark:text-text-dark">{user.display_name}</p>
          </div>
        {/if}
      </div>
    </Card>

    <!-- Sign Out -->
    <Card>
      <h2 class="text-lg font-semibold text-text dark:text-text-dark mb-4">
        Session
      </h2>
      <Button variant="outline" onclick={handleSignOut}>
        Sign out
      </Button>
    </Card>

    <!-- Danger Zone -->
    <Card class="border-error/30">
      <h2 class="text-lg font-semibold text-error dark:text-error-dark mb-2">
        Danger Zone
      </h2>
      <p class="text-sm text-muted dark:text-muted-dark mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>

      {#if !showDeleteConfirm}
        <Button
          variant="outline"
          class="border-error text-error hover:bg-error hover:text-white"
          onclick={() => showDeleteConfirm = true}
        >
          Delete Account
        </Button>
      {:else}
        <div class="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p class="text-sm text-error dark:text-error-dark mb-4">
            Are you sure you want to delete your account? All your progress data will be permanently deleted.
          </p>
          <div class="flex gap-2">
            <Button
              variant="ghost"
              onclick={() => showDeleteConfirm = false}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              class="bg-error hover:bg-red-700"
              onclick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
            </Button>
          </div>
        </div>
      {/if}
    </Card>
  </div>
{/if}
