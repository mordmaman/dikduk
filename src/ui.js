// Screens: home, lesson (teach / check / test / challenge / results), settings.

import { h, clear, formatText, textEl, hebrewWithMarks, focusEl } from './dom.js';
import { buildRun, answer, scoreRun, canAdvance, progressFraction, nextLesson, STAR_THRESHOLD } from './engine.js';
import { renderQuestion } from './questions.js';
import { recordResult, resetProgress } from './save.js';
import { noteAnswer } from './review.js';

const STAR = '★'; // ★
const TICK = '✓'; // ✓

// --- shared chrome ---------------------------------------------------------------

function siteHeader() {
  return h('header', { class: 'site-bar' },
    h('a', { class: 'brand', href: '#/' }, 'Dikduk'),
    h('a', { class: 'bar-link', href: '#/settings' }, 'Settings'));
}

function heTitle(lesson) {
  return lesson.hebrewTitle ? h('span', { class: 'he', lang: 'he', dir: 'rtl' }, lesson.hebrewTitle) : null;
}

function statusLine(entry, lesson) {
  if (!entry || !entry.completed) return h('span', { class: 'status status-todo' }, 'Not started');
  const bits = [h('span', { class: 'status status-done' }, `${TICK} Complete`)];
  if (entry.bestTest !== null) bits.push(h('span', { class: 'status' }, `best ${entry.bestTest}%`));
  if (entry.star) bits.push(h('span', { class: 'status status-star' }, `${STAR} Challenge`));
  else if (lesson.challenge?.length && entry.bestChallenge !== null) bits.push(h('span', { class: 'status' }, `challenge best ${entry.bestChallenge}%`));
  return bits;
}

export function continueTarget(lessons, save) {
  const last = lessons.find((l) => l.id === save.last);
  if (last && !save.lessons[last.id]?.completed) return { lesson: last, verb: 'Continue' };
  const next = lessons.find((l) => !save.lessons[l.id]?.completed);
  if (!next) return null;
  return { lesson: next, verb: Object.keys(save.lessons).length ? 'Next' : 'Start' };
}

// --- home ------------------------------------------------------------------------

export function renderHome(app, ctx) {
  const { lessons, save } = ctx;
  const target = continueTarget(lessons, save);
  const done = lessons.filter((l) => save.lessons[l.id]?.completed).length;
  const stars = lessons.filter((l) => save.lessons[l.id]?.star).length;

  const list = h('ol', { class: 'lesson-list' }, lessons.map((l, i) => h('li', {},
    h('a', { class: 'lesson-card', href: `#/lesson/${l.id}` },
      h('span', { class: 'lesson-num', 'aria-hidden': 'true' }, String(i + 1)),
      h('span', { class: 'lesson-main' },
        h('span', { class: 'lesson-title' },
          h('span', {}, l.title), ' ', heTitle(l),
          l.placeholder ? h('span', { class: 'badge-placeholder' }, 'placeholder') : null),
        textEl('span', l.summary, { class: 'lesson-summary' }),
        h('span', { class: 'lesson-meta' },
          statusLine(save.lessons[l.id], l)))))));

  clear(app).append(
    siteHeader(),
    h('main', { id: 'main', class: 'page' },
      h('section', { class: 'intro' },
        h('h1', { tabindex: '-1' }, 'Dikduk'),
        h('p', { class: 'lede' }, 'Biblical Hebrew grammar for people who already read Hebrew. Short lessons built on words you already know from tefillah and Tanakh.'),
        target
          ? h('a', { class: 'button primary', href: `#/lesson/${target.lesson.id}` }, `${target.verb}: ${target.lesson.title}`)
          : h('p', { class: 'all-done' }, `${TICK} Every lesson is complete.`),
        lessons.length ? h('p', { class: 'tally' }, `${done} of ${lessons.length} lessons complete`, stars ? ` · ${stars} ${STAR}` : '') : null),
      h('section', {}, h('h2', {}, 'Lessons'), lessons.length ? list : h('p', {}, 'No lessons yet.'))),
    footer());
  focusEl(app.querySelector('h1'));
}

function footer() {
  return h('footer', { class: 'site-foot' },
    h('p', {}, 'Your progress is saved on this device only. Nothing is sent anywhere.'),
    h('p', {}, h('a', { href: '#/settings' }, 'Settings and about')));
}

// --- settings --------------------------------------------------------------------

export function renderSettings(app, ctx) {
  const { save } = ctx;
  const radio = (name, value, label, current, onPick) => h('label', { class: 'radio' },
    h('input', { type: 'radio', name, value, checked: current === value, onchange: () => onPick(value) }), ' ', label);

  const sample = ctx.lessons.find((l) => l.hebrewTitle)?.hebrewTitle;
  const confirmRow = h('div', { class: 'confirm', hidden: true },
    h('p', {}, 'This clears every lesson result on this device. Settings are kept.'),
    h('button', { type: 'button', class: 'button danger', onclick: () => {
      ctx.save = resetProgress(ctx.save);
      ctx.persist();
      done.textContent = 'Progress reset.';
      confirmRow.hidden = true;
      resetBtn.hidden = false;
      focusEl(done);
    } }, 'Reset progress'), ' ',
    h('button', { type: 'button', class: 'button', onclick: () => { confirmRow.hidden = true; resetBtn.hidden = false; focusEl(resetBtn); } }, 'Cancel'));
  const resetBtn = h('button', { type: 'button', class: 'button', onclick: () => {
    resetBtn.hidden = true; confirmRow.hidden = false; focusEl(confirmRow.querySelector('button'));
  } }, 'Reset progress…');
  const done = h('p', { class: 'hint', 'aria-live': 'polite' });

  clear(app).append(
    siteHeader(),
    h('main', { id: 'main', class: 'page' },
      h('h1', { tabindex: '-1' }, 'Settings'),
      h('fieldset', {}, h('legend', {}, 'Theme'),
        ['auto', 'light', 'dark'].map((v) => radio('theme', v, { auto: 'Match this device', light: 'Light', dark: 'Dark' }[v], save.settings.theme,
          (val) => { ctx.save.settings.theme = val; ctx.persist(); ctx.applySettings(); })))
      ,
      h('fieldset', {}, h('legend', {}, 'Hebrew text size'),
        ['normal', 'large', 'larger'].map((v) => radio('size', v, { normal: 'Normal', large: 'Large', larger: 'Larger' }[v], save.settings.textSize,
          (val) => { ctx.save.settings.textSize = val; ctx.persist(); ctx.applySettings(); })),
        sample ? h('p', { class: 'size-sample' }, h('span', { class: 'he', lang: 'he', dir: 'rtl' }, sample)) : null),
      h('section', {}, h('h2', {}, 'Progress'), resetBtn, confirmRow, done),
      h('section', { class: 'about' }, h('h2', {}, 'About'),
        h('p', {}, 'Progress is kept in this browser on this device only. There are no accounts, no analytics and no cookies, and nothing is sent anywhere.'),
        h('p', {}, 'The explanations, examples and exercises are all original. Examples are taken from Tanakh and the siddur.'),
        h('p', {}, 'Divine names are not printed in full.'),
        h('p', {}, 'Hebrew is set in Frank Ruhl Libre, under the SIL Open Font License.'))),
    footer());
  focusEl(app.querySelector('h1'));
}

// --- lesson ----------------------------------------------------------------------

export function renderLesson(app, ctx, lessonId, mode) {
  const lesson = ctx.lessons.find((l) => l.id === lessonId);
  if (!lesson) return renderMissing(app, ctx);
  if (mode === 'challenge' && !lesson.challenge?.length) { location.hash = `#/lesson/${lesson.id}`; return; }

  ctx.save.last = lesson.id;
  ctx.persist();
  const run = buildRun(lesson, mode);
  let view = null; // current question view

  const bar = h('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Lesson progress', 'aria-valuemin': '0', 'aria-valuemax': '100' },
    h('div', { class: 'progress-fill' }));
  const stage = h('main', { id: 'main', class: 'page lesson-page' });
  const back = h('button', { type: 'button', class: 'button', onclick: () => go(run.index - 1) }, 'Back');
  const primary = h('button', { type: 'button', class: 'button primary' });
  const nav = h('footer', { class: 'lesson-nav' }, back, primary);

  clear(app).append(
    h('header', { class: 'site-bar lesson-bar' },
      h('a', { class: 'bar-link', href: '#/' }, '← Lessons'),
      h('span', { class: 'bar-title' }, lesson.title, mode === 'challenge' ? ' · Challenge' : ''),
      bar),
    stage, nav);

  primary.addEventListener('click', onPrimary);

  function go(i) {
    run.index = Math.max(0, Math.min(run.steps.length - 1, i));
    draw();
  }

  function onPrimary() {
    const step = run.steps[run.index];
    if (step.kind === 'question' && !run.answers[step.q.id]) {
      const response = view.response();
      if (response === undefined) return;
      const correct = answer(run, step, response);
      noteAnswer(ctx.save, lesson.id, step.q.id, correct);
      ctx.persist();
      showFeedback(step, correct, true);
      return;
    }
    if (canAdvance(run)) go(run.index + 1);
  }

  function showFeedback(step, correct, moveFocus) {
    view.reveal();
    const fb = stage.querySelector('.feedback');
    fb.hidden = false;
    fb.className = `feedback ${correct ? 'is-right' : 'is-wrong'}`;
    clear(fb).append(
      h('p', { class: 'verdict' }, correct ? `${TICK} Correct` : '✗ Not quite'),
      textEl('p', step.q.explain, { class: 'explain' }));
    setPrimary();
    if (moveFocus) focusEl(fb);
  }

  function setPrimary() {
    const step = run.steps[run.index];
    const last = run.steps[run.index + 1]?.kind === 'results';
    nav.hidden = step.kind === 'results';
    back.disabled = run.index === 0;
    primary.disabled = false;
    if (step.kind === 'teach') primary.textContent = 'Next';
    else if (step.kind === 'intro') primary.textContent = step.phase === 'challenge' ? 'Start the challenge' : 'Start the test';
    else if (step.kind === 'question') {
      if (run.answers[step.q.id]) primary.textContent = last ? 'See results' : 'Continue';
      else { primary.textContent = 'Check'; primary.disabled = view?.response() === undefined; }
    }
  }

  function draw() {
    const step = run.steps[run.index];
    const pct = Math.round(progressFraction(run) * 100);
    bar.setAttribute('aria-valuenow', String(pct));
    bar.firstChild.style.width = `${pct}%`;
    clear(stage);
    view = null;
    if (step.kind === 'teach') stage.append(teachView(step.screen));
    else if (step.kind === 'intro') stage.append(introView(lesson, step));
    else if (step.kind === 'question') stage.append(questionView(step));
    else if (step.kind === 'results') stage.append(resultsView(lesson, run, ctx));
    setPrimary();
    window.scrollTo(0, 0);
    focusEl(stage.querySelector('h2, h1'));
  }

  function questionView(step) {
    const qs = run.steps.filter((s) => s.kind === 'question' && s.phase === step.phase);
    const n = qs.indexOf(step) + 1;
    const label = step.phase === 'check' ? 'Quick check'
      : `${step.phase === 'challenge' ? 'Challenge' : 'Test'} · question ${n} of ${qs.length}`;
    view = renderQuestion(step, () => setPrimary());
    const wrap = h('section', { class: `question phase-${step.phase}` },
      h('h2', { class: 'phase-label', tabindex: '-1' }, label),
      view.el,
      h('div', { class: 'feedback', hidden: true, 'aria-live': 'polite' }));
    const prior = run.answers[step.q.id];
    if (prior) {
      view.setResponse(prior.response);
      queueMicrotask(() => showFeedback(step, prior.correct, false));
    }
    return wrap;
  }

  draw();
}

function teachView(screen) {
  return h('article', { class: 'teach' },
    h('h2', { tabindex: '-1' }, screen.heading),
    screen.body.map((p) => textEl('p', p)),
    screen.examples?.length ? h('ul', { class: 'examples' }, screen.examples.map((ex) => h('li', { class: 'example' },
      h('span', { class: 'example-he' }, hebrewWithMarks(ex.he, ex)),
      ex.note ? textEl('span', ex.note, { class: 'example-note' }) : null))) : null,
    screen.table ? h('div', { class: 'table-wrap' }, h('table', {},
      h('thead', {}, h('tr', {}, screen.table.headers.map((c) => textEl('th', c, { scope: 'col' })))),
      h('tbody', {}, screen.table.rows.map((r) => h('tr', {}, r.map((c) => textEl('td', c))))))) : null,
    screen.callout ? h('aside', { class: `callout callout-${screen.callout.kind}` },
      h('strong', {}, screen.callout.kind === 'tip' ? 'Try this' : 'Note'), ' ', h('span', { html: formatText(screen.callout.text) })) : null);
}

function introView(lesson, step) {
  const challenge = step.phase === 'challenge';
  return h('section', { class: 'intro-step' },
    h('h2', { tabindex: '-1' }, challenge ? 'Challenge' : 'Test'),
    h('p', {}, challenge
      ? `${step.count} harder questions that ask you to apply the rules. Score ${STAR_THRESHOLD}% or more to earn a star.`
      : `${step.count} questions on ${lesson.title}. Finishing them completes the lesson, whatever your score.`),
    h('p', { class: 'hint' }, 'Each answer is explained as you go.'));
}

function resultsView(lesson, run, ctx) {
  const s = scoreRun(run);
  if (!run.recorded) {
    recordResult(ctx.save, lesson.id, s.phase, s.pct);
    ctx.persist();
    run.recorded = true;
  }
  const entry = ctx.save.lessons[lesson.id];
  const next = nextLesson(ctx.lessons, lesson.id);
  const challenge = s.phase === 'challenge';
  const earnedStar = challenge && s.pct >= STAR_THRESHOLD;

  return h('section', { class: 'results' },
    h('h2', { tabindex: '-1' }, challenge ? 'Challenge finished' : `${TICK} ${lesson.title} complete`),
    h('p', { class: 'score' }, h('span', { class: 'score-big' }, `${s.right} of ${s.total}`), ` (${s.pct}%)`),
    challenge
      ? h('p', {}, earnedStar ? `${STAR} Star earned.` : `A star needs ${STAR_THRESHOLD}% or more.`, entry.bestChallenge !== null ? ` Best: ${entry.bestChallenge}%.` : '')
      : h('p', {}, `Best score: ${entry.bestTest}%.`),
    s.missed.length ? h('section', { class: 'missed' },
      h('h3', {}, s.missed.length === 1 ? 'The one to look at again' : `The ${s.missed.length} to look at again`),
      h('ul', {}, s.missed.map((q) => h('li', {},
        textEl('p', questionSummary(q), { class: 'missed-q' }),
        textEl('p', q.explain, { class: 'explain' }))))) : h('p', {}, 'Every answer right.'),
    h('div', { class: 'actions' },
      !challenge && lesson.challenge?.length ? h('a', { class: 'button primary', href: `#/lesson/${lesson.id}/challenge` }, entry.star ? `Retry the challenge` : 'Try the challenge') : null,
      challenge ? h('a', { class: 'button', href: `#/lesson/${lesson.id}/challenge`, onclick: rerun }, 'Try again') : null,
      next ? h('a', { class: next && (challenge || !lesson.challenge?.length) ? 'button primary' : 'button', href: `#/lesson/${next.id}` }, `Next: ${next.title}`) : null,
      h('a', { class: 'button', href: '#/' }, 'All lessons')));
}

// A same-hash link does not fire hashchange, so re-render explicitly.
function rerun(e) {
  if (location.hash === e.currentTarget.getAttribute('href')) {
    e.preventDefault();
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}

function questionSummary(q) {
  switch (q.type) {
    case 'truefalse': return q.statement;
    case 'tap': return `${q.prompt} ${q.he}`;
    case 'breakdown': return `${q.prompt || 'Split the word'} ${q.he}`;
    case 'predict': return `${q.prompt || 'Combine'} ${q.parts.join(' + ')}`;
    case 'wordbank': return `${q.before}___${q.after}`;
    case 'match': return q.prompt || 'Matching';
    default: return [q.prompt, q.he].filter(Boolean).join(' ');
  }
}

export function renderMissing(app) {
  clear(app).append(siteHeader(), h('main', { id: 'main', class: 'page' },
    h('h1', { tabindex: '-1' }, 'Not found'),
    h('p', {}, h('a', { href: '#/' }, 'Back to the lessons'))));
  focusEl(app.querySelector('h1'));
}
