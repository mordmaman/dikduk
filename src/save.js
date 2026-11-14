// Progress saved in localStorage under one versioned key. Pure helpers plus a
// thin storage wrapper that never throws (storage can be missing or full).

import { STAR_THRESHOLD } from './engine.js';

export const SAVE_KEY = 'dikduk.save';
export const SAVE_VERSION = 1;

export function defaultSave() {
  return {
    version: SAVE_VERSION,
    lessons: {}, // id -> { completed, bestTest, lastTest, attempts, bestChallenge, star }
    missed: {}, // "lessonId/questionId" -> { right } (questions to review)
    last: null, // id of the lesson most recently opened
    settings: { theme: 'auto', textSize: 'normal' },
  };
}

// Migrations from each old version to the next. migrations[n] turns version n
// into version n + 1. Add one here whenever SAVE_VERSION goes up, and add a
// fixture of the old shape to tests/fixtures/.
export const migrations = {};

const THEMES = ['auto', 'light', 'dark'];
const SIZES = ['normal', 'large', 'larger'];
const obj = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
const num = (v, d = 0) => (Number.isFinite(v) ? v : d);

// Accepts anything (parsed JSON, null, garbage) and returns a valid current save.
export function migrate(data, steps = migrations) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return defaultSave();
  let d = { ...data };
  let v = Number.isInteger(d.version) ? d.version : 0;
  if (v > SAVE_VERSION) return defaultSave(); // written by a newer build; don't guess
  while (v < SAVE_VERSION) {
    const step = steps[v];
    if (!step) return defaultSave();
    d = step(d);
    v += 1;
  }
  return normalise(d);
}

// Fill in anything missing or malformed, keeping what is valid.
function normalise(d) {
  const out = defaultSave();
  for (const [id, l] of Object.entries(obj(d.lessons))) {
    const x = obj(l);
    out.lessons[id] = {
      completed: x.completed === true,
      bestTest: num(x.bestTest, null),
      lastTest: num(x.lastTest, null),
      attempts: num(x.attempts),
      bestChallenge: num(x.bestChallenge, null),
      star: x.star === true,
    };
  }
  for (const [key, m] of Object.entries(obj(d.missed))) out.missed[key] = { right: num(obj(m).right) };
  out.last = typeof d.last === 'string' ? d.last : null;
  const s = obj(d.settings);
  if (THEMES.includes(s.theme)) out.settings.theme = s.theme;
  if (SIZES.includes(s.textSize)) out.settings.textSize = s.textSize;
  return out;
}

export function loadSave(storage = safeStorage()) {
  try {
    const raw = storage?.getItem(SAVE_KEY);
    return migrate(raw ? JSON.parse(raw) : null);
  } catch {
    return defaultSave();
  }
}

export function writeSave(save, storage = safeStorage()) {
  try {
    storage?.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}

function safeStorage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

function lessonEntry(save, id) {
  if (!save.lessons[id]) {
    save.lessons[id] = { completed: false, bestTest: null, lastTest: null, attempts: 0, bestChallenge: null, star: false };
  }
  return save.lessons[id];
}

// Finishing the test completes the lesson whatever the score. Replaying never
// un-completes a lesson, lowers a best score or removes a star.
export function recordResult(save, lessonId, phase, pct) {
  const e = lessonEntry(save, lessonId);
  if (phase === 'test') {
    e.completed = true;
    e.attempts += 1;
    e.lastTest = pct;
    e.bestTest = Math.max(e.bestTest ?? 0, pct);
  } else if (phase === 'challenge') {
    e.bestChallenge = Math.max(e.bestChallenge ?? 0, pct);
    if (pct >= STAR_THRESHOLD) e.star = true;
  }
  return save;
}

export function resetProgress(save) {
  const fresh = defaultSave();
  fresh.settings = { ...save.settings };
  return fresh;
}
