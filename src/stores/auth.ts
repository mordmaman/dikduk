import { atom } from 'nanostores';
import type { User } from '@supabase/supabase-js';

export const userStore = atom<User | null>(null);
export const isAuthenticatedStore = atom<boolean>(false);
export const isAuthLoadingStore = atom<boolean>(true);

export function setUser(user: User | null) {
  userStore.set(user);
  isAuthenticatedStore.set(user !== null);
  isAuthLoadingStore.set(false);
}

export function clearAuth() {
  userStore.set(null);
  isAuthenticatedStore.set(false);
  isAuthLoadingStore.set(false);
}
