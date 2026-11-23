// Boot and routing. LESSONS is provided by build.py from src/lessons/*.js.
/* global LESSONS */

import { loadSave, writeSave } from './save.js';
import { sortLessons } from './engine.js';
import { validateLesson } from './lesson-format.js';
import { renderHome, renderSettings, renderLesson, renderReview, renderProgress, renderMissing } from './ui.js';

const THEME_COLOURS = { light: '#f5f5f0', dark: '#121212' };

function boot() {
  const lessons = sortLessons(typeof LESSONS !== 'undefined' ? LESSONS : []);
  for (const l of lessons) {
    const errors = validateLesson(l);
    if (errors.length) console.warn(`[dikduk] lesson problems:\n${errors.join('\n')}`);
  }

  const app = document.getElementById('app');
  const ctx = {
    lessons,
    save: loadSave(),
    persist() { writeSave(ctx.save); },
    applySettings() { applySettings(ctx.save.settings); },
  };
  ctx.applySettings();

  const dark = window.matchMedia?.('(prefers-color-scheme: dark)');
  dark?.addEventListener?.('change', () => ctx.applySettings());

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (parts.length === 0) renderHome(app, ctx);
    else if (parts[0] === 'settings') renderSettings(app, ctx);
    else if (parts[0] === 'progress') renderProgress(app, ctx);
    else if (parts[0] === 'review') renderReview(app, ctx);
    else if (parts[0] === 'lesson' && parts[1]) renderLesson(app, ctx, parts[1], parts[2] === 'challenge' ? 'challenge' : 'lesson');
    else renderMissing(app, ctx);
  }
  window.addEventListener('hashchange', route);

  // The skip link must not change the hash, which would trigger the router.
  document.querySelector('.skip')?.addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.getElementById('main');
    if (main) { main.setAttribute('tabindex', '-1'); main.focus(); }
  });

  route();
  registerServiceWorker();
}

// Offline support. Only on https (or a local test server), where browsers allow it.
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  if (location.protocol !== 'https:' && !local) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

function applySettings(settings) {
  const root = document.documentElement;
  root.dataset.theme = settings.theme;
  root.dataset.textSize = settings.textSize;
  const isDark = settings.theme === 'dark'
    || (settings.theme === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? THEME_COLOURS.dark : THEME_COLOURS.light);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
