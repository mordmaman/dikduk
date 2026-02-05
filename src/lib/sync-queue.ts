import type { QueuedAction } from './types';
import { supabase } from './supabase';

const QUEUE_KEY = 'dikduk_sync_queue';

// Add a failed write to the retry queue
export function enqueue(action: Omit<QueuedAction, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;

  const queue = getQueue();
  const queuedAction: QueuedAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  queue.push(queuedAction);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

// Get all pending actions
export function getQueue(): QueuedAction[] {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(QUEUE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Clear the queue
export function clearQueue(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(QUEUE_KEY);
}

// Execute a single queued action
async function executeAction(action: QueuedAction): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { table, action: actionType, data } = action;

  if (actionType === 'upsert') {
    const { error } = await supabase.from(table).upsert(data);
    if (error) throw error;
  } else if (actionType === 'insert') {
    const { error } = await supabase.from(table).insert(data);
    if (error) throw error;
  }
}

// Attempt to flush all pending actions to Supabase
export async function flushQueue(): Promise<{ flushed: number; failed: number }> {
  const queue = getQueue();
  if (queue.length === 0) return { flushed: 0, failed: 0 };

  const remaining: QueuedAction[] = [];
  let flushed = 0;

  for (const action of queue) {
    try {
      await executeAction(action);
      flushed++;
    } catch {
      remaining.push(action);
    }
  }

  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  return { flushed, failed: remaining.length };
}

// Get queue size
export function getQueueSize(): number {
  return getQueue().length;
}

// Initialize online/offline listeners
export function initSyncQueue(): void {
  if (typeof window === 'undefined') return;

  // Flush queue when coming back online
  window.addEventListener('online', () => {
    flushQueue();
  });

  // Also try to flush on page load if online
  if (navigator.onLine) {
    flushQueue();
  }
}
