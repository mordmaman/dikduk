import type { CookiePreferences } from './types';

const COOKIE_PREFS_KEY = 'dikduk_cookie_prefs';

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return { essential: true, analytics: false };
  }

  const stored = localStorage.getItem(COOKIE_PREFS_KEY);
  if (!stored) {
    return { essential: true, analytics: false };
  }

  try {
    const prefs = JSON.parse(stored);
    return {
      essential: true, // Always true
      analytics: prefs.analytics ?? false,
    };
  } catch {
    return { essential: true, analytics: false };
  }
}

export function setCookiePreferences(prefs: Omit<CookiePreferences, 'essential'>): void {
  if (typeof window === 'undefined') return;

  const fullPrefs: CookiePreferences = {
    essential: true,
    analytics: prefs.analytics,
  };

  localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(fullPrefs));

  // Dispatch event for components to react
  window.dispatchEvent(new CustomEvent('cookie-preferences-changed', { detail: fullPrefs }));
}

export function hasConsentBeenGiven(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(COOKIE_PREFS_KEY) !== null;
}

export function acceptAllCookies(): void {
  setCookiePreferences({ analytics: true });
}

export function rejectAnalytics(): void {
  setCookiePreferences({ analytics: false });
}

export function canLoadAnalytics(): boolean {
  const prefs = getCookiePreferences();
  return prefs.analytics;
}
