// Runs a lesson as a list of steps. Pure logic, no DOM.

import { gapsForParts } from './hebrew.js';
import { reviewKey } from './review.js';

export const STAR_THRESHOLD = 80;
export const REVIEW_SIZE = 10;

// Answers are stored by step key. In a lesson that is the question id; in a
// review, which mixes lessons, it is "lessonId/questionId".
export const stepKey = (step) => step.key ?? step.q.id;

// mode 'lesson': each teach screen, then its check questions, then the test.
// mode 'challenge': the challenge questions only.
export function buildRun(lesson, mode = 'lesson') {
  const steps = [];
  if (mode === 'lesson') {
    for (const screen of lesson.teach) {
      steps.push({ kind: 'teach', screen });
      for (const q of screen.check || []) steps.push({ kind: 'question', phase: 'check', q });
    }
    steps.push({ kind: 'intro', phase: 'test', count: lesson.test.length });
    for (const q of lesson.test) steps.push({ kind: 'question', phase: 'test', q });
    steps.push({ kind: 'results', phase: 'test' });
  } else if (mode === 'challenge') {
    const qs = lesson.challenge || [];
    steps.push({ kind: 'intro', phase: 'challenge', count: qs.length });
    for (const q of qs) steps.push({ kind: 'question', phase: 'challenge', q });
    steps.push({ kind: 'results', phase: 'challenge' });
  } else {
    throw new Error(`unknown mode ${mode}`);
  }
  return { lessonId: lesson.id, mode, steps, index: 0, answers: {} };
}

// A review session: up to `size` questions from the pool of keys
// ("lessonId/questionId"), in random order, from any lesson.
export function buildReviewRun(lessons, keys, size = REVIEW_SIZE, random = Math.random) {
  const found = new Map();
  for (const lesson of lessons) {
    const qs = [];
    for (const screen of lesson.teach) qs.push(...(screen.check || []));
    qs.push(...lesson.test, ...(lesson.challenge || []));
    for (const q of qs) found.set(reviewKey(lesson.id, q.id), { lesson, q });
  }
  const live = keys.filter((k) => found.has(k));
  const picked = shuffledIndexes(live.length, random).slice(0, size).map((i) => live[i]);
  const steps = [{ kind: 'intro', phase: 'review', count: picked.length }];
  for (const key of picked) {
    const { lesson, q } = found.get(key);
    steps.push({ kind: 'question', phase: 'review', q, key, lessonId: lesson.id });
  }
  steps.push({ kind: 'results', phase: 'review' });
  return { lessonId: null, mode: 'review', steps, index: 0, answers: {} };
}

const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

// The correct response for a question, in the same shape the UI produces.
export function correctResponse(q) {
  switch (q.type) {
    case 'choice':
    case 'wordbank':
    case 'predict':
      return q.options.findIndex((o) => o.correct === true);
    case 'truefalse':
      return q.answer;
    case 'tap':
      return [...q.answer];
    case 'match':
      return q.pairs.map((_, i) => i);
    case 'breakdown':
      return gapsForParts(q.parts.map((p) => p.he));
    default:
      throw new Error(`unknown type ${q.type}`);
  }
}

// response shapes:
//   choice / wordbank / predict: index of the chosen option (original order)
//   truefalse: boolean
//   tap: array of letter positions
//   match: array where response[leftIndex] = rightIndex (original pair order)
//   breakdown: array of gap positions
export function grade(q, response) {
  const want = correctResponse(q);
  switch (q.type) {
    case 'tap':
    case 'breakdown':
      return Array.isArray(response) && sameSet(response, want);
    case 'match':
      return Array.isArray(response) && response.length === want.length && response.every((r, i) => r === i);
    default:
      return response === want;
  }
}

export function answer(run, step, response) {
  const correct = grade(step.q, response);
  run.answers[stepKey(step)] = { response, correct, phase: step.phase };
  return correct;
}

export function scoreRun(run) {
  const phase = run.mode === 'lesson' ? 'test' : run.mode;
  const qs = run.steps.filter((s) => s.kind === 'question' && s.phase === phase);
  const right = qs.filter((s) => run.answers[stepKey(s)]?.correct).length;
  const total = qs.length;
  const missedSteps = qs.filter((s) => !run.answers[stepKey(s)]?.correct);
  const missed = missedSteps.map((s) => s.q);
  return { phase, right, total, pct: total ? Math.round((right / total) * 100) : 0, missed, missedSteps };
}

// A question step must be answered before moving on.
export function canAdvance(run) {
  const step = run.steps[run.index];
  if (!step || step.kind !== 'question') return run.index < run.steps.length - 1;
  return Boolean(run.answers[stepKey(step)]);
}

export function progressFraction(run) {
  const last = run.steps.length - 1;
  return last <= 0 ? 1 : run.index / last;
}

// Fisher-Yates; returns a new array of original indexes.
export function shuffledIndexes(n, random = Math.random) {
  const idx = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export function sortLessons(lessons) {
  return [...lessons].sort((a, b) => a.order - b.order);
}

export function nextLesson(lessons, id) {
  const sorted = sortLessons(lessons);
  const i = sorted.findIndex((l) => l.id === id);
  return i >= 0 ? sorted[i + 1] || null : null;
}
