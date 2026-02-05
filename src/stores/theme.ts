import { atom } from 'nanostores';
import type { Theme } from '@/lib/types';

export const themeStore = atom<Theme>('system');
export const resolvedThemeStore = atom<'light' | 'dark'>('light');

// Initialize theme from localStorage and system preference
export function initTheme() {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem('dikduk_theme') as Theme | null;
  const theme = stored || 'system';
  themeStore.set(theme);

  updateResolvedTheme(theme);

  // Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (themeStore.get() === 'system') {
      updateResolvedTheme('system');
    }
  });
}

export function setTheme(theme: Theme) {
  themeStore.set(theme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('dikduk_theme', theme);
  }
  updateResolvedTheme(theme);
}

function updateResolvedTheme(theme: Theme) {
  let resolved: 'light' | 'dark';

  if (theme === 'system') {
    if (typeof window !== 'undefined') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = 'light';
    }
  } else {
    resolved = theme;
  }

  resolvedThemeStore.set(resolved);

  // Update document class
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }
}
