// Utility functions

/**
 * Combine class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a score as a percentage
 */
export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

/**
 * Format a date for display
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Check if we're running in the browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if the user is online
 */
export function isOnline(): boolean {
  if (!isBrowser()) return true;
  return navigator.onLine;
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get Hebrew characters from a string (for tap-to-select)
 */
export function getHebrewCharacters(text: string): string[] {
  // Split Hebrew text into characters, keeping combined marks together
  // This regex matches Hebrew letters with optional combining marks (nikud)
  const regex = /[\u0590-\u05FF][\u0591-\u05C7]*/g;
  return text.match(regex) || [];
}

/**
 * Check if a character is a Hebrew letter (not a mark)
 */
export function isHebrewLetter(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x05D0 && code <= 0x05EA; // Alef to Tav
}

/**
 * Get the unit display name
 */
export function getUnitDisplayName(unit: string): string {
  const names: Record<string, string> = {
    foundations: 'Foundations',
    'unit-1': 'Unit 1: The Noun',
    'unit-2': 'Unit 2: Prepositions & Adjectives',
    'unit-3': 'Unit 3: The Verb - Perfect',
    'unit-4': 'Unit 4: The Verb - Imperfect',
    'unit-5': 'Unit 5: Binyanim',
    'unit-6': 'Unit 6: Weak Verbs I',
    'unit-7': 'Unit 7: Weak Verbs II',
    'unit-8': 'Unit 8: Advanced Topics',
  };
  return names[unit] || unit;
}
