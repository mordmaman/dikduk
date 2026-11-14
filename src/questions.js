// One renderer per question type. Each returns:
//   el            the question's element
//   response()    the current response, or undefined if none yet
//   setResponse() restore a response (when revisiting an answered question)
//   reveal()      lock the question and show right / wrong / missed
// onChange is called whenever the response changes, so the caller can enable Check.

import { h, formatText, textEl, hebrewWithMarks } from './dom.js';
import { splitHebrew, gapsForParts } from './hebrew.js';
import { correctResponse, shuffledIndexes } from './engine.js';

const RIGHT = '✓'; // ✓
const WRONG = '✗'; // ✗

export function renderQuestion(step, onChange) {
  const q = step.q;
  const r = RENDERERS[q.type];
  if (!r) throw new Error(`no renderer for ${q.type}`);
  return r(q, step, onChange);
}

function promptEl(text) {
  return text ? textEl('p', text, { class: 'q-prompt' }) : null;
}

function bigHebrew(text) {
  return text ? h('div', { class: 'q-hebrew' }, hebrewWithMarks(text)) : null;
}

function statusTag(kind) {
  const label = { right: `${RIGHT} correct`, wrong: `${WRONG} your answer`, missed: 'correct answer' }[kind];
  return h('span', { class: `tag tag-${kind}` }, label);
}

// --- single choice: choice, truefalse, wordbank, predict ----------------------

function optionList(items, step, onChange, { keepOrder = false, cls = 'options' } = {}) {
  // items: [{ text }] in original order. Response = original index.
  if (!step.order) step.order = keepOrder ? items.map((_, i) => i) : shuffledIndexes(items.length);
  let chosen;
  const buttons = [];
  const list = h('div', { class: cls, role: 'group' });
  for (const i of step.order) {
    const b = h('button', { type: 'button', class: 'option', 'aria-pressed': 'false', 'data-i': i },
      h('span', { class: 'option-text', html: formatText(items[i].text) }));
    b.addEventListener('click', () => select(i));
    buttons[i] = b;
    list.append(b);
  }
  function select(i) {
    chosen = i;
    buttons.forEach((b, j) => b && b.setAttribute('aria-pressed', String(j === i)));
    onChange(i);
  }
  return {
    el: list,
    response: () => chosen,
    setResponse: (i) => select(i),
    reveal(want) {
      buttons.forEach((b, j) => {
        if (!b) return;
        b.disabled = true;
        if (j === want) { b.classList.add('right'); b.append(statusTag(j === chosen ? 'right' : 'missed')); }
        else if (j === chosen) { b.classList.add('wrong'); b.append(statusTag('wrong')); }
      });
    },
  };
}

function choice(q, step, onChange) {
  const opts = optionList(q.options, step, onChange, { keepOrder: q.keepOrder });
  const el = h('div', { class: 'q q-choice' }, promptEl(q.prompt), bigHebrew(q.he), opts.el);
  return { ...opts, el, reveal: () => opts.reveal(correctResponse(q)) };
}

function truefalse(q, step, onChange) {
  const items = [{ text: 'True' }, { text: 'False' }];
  const opts = optionList(items, step, (i) => onChange(i === 0), { keepOrder: true, cls: 'options options-row' });
  const el = h('div', { class: 'q q-truefalse' }, textEl('p', q.statement, { class: 'q-prompt q-statement' }), opts.el);
  return {
    el,
    response: () => (opts.response() === undefined ? undefined : opts.response() === 0),
    setResponse: (v) => opts.setResponse(v ? 0 : 1),
    reveal: () => opts.reveal(q.answer ? 0 : 1),
  };
}

function wordbank(q, step, onChange) {
  const slot = h('span', { class: 'slot', 'aria-live': 'polite' }, h('span', { class: 'slot-empty' }, 'choose a word'));
  const opts = optionList(q.options, step, (i) => {
    slot.innerHTML = formatText(q.options[i].text);
    slot.classList.add('filled');
    onChange(i);
  }, { keepOrder: q.keepOrder, cls: 'options options-chips' });
  const sentence = h('p', { class: 'q-sentence', dir: q.rtl ? 'rtl' : 'ltr', lang: q.rtl ? 'he' : null },
    h('span', { html: formatText(q.before) }), slot, h('span', { html: formatText(q.after) }));
  if (q.rtl) sentence.classList.add('he');
  const el = h('div', { class: 'q q-wordbank' }, promptEl(q.prompt || 'Choose the word that completes the sentence.'), sentence, opts.el);
  return {
    ...opts,
    el,
    reveal() {
      const want = correctResponse(q);
      opts.reveal(want);
      slot.classList.add(opts.response() === want ? 'right' : 'wrong');
    },
  };
}

function predict(q, step, onChange) {
  const sum = h('div', { class: 'q-predict he', dir: 'rtl', lang: 'he' });
  q.parts.forEach((p, i) => {
    if (i) sum.append(h('span', { class: 'op', 'aria-hidden': 'true' }, '+'));
    sum.append(h('span', { class: 'part' }, p));
  });
  sum.append(h('span', { class: 'op', 'aria-hidden': 'true' }, '='), h('span', { class: 'part unknown' }, '?'));
  const opts = optionList(q.options, step, onChange, { keepOrder: q.keepOrder });
  const el = h('div', { class: 'q q-predict-wrap' }, promptEl(q.prompt || 'What do these combine to make?'), sum, opts.el);
  return { ...opts, el, reveal: () => opts.reveal(correctResponse(q)) };
}

// --- tap the letters -----------------------------------------------------------

function tap(q, step, onChange) {
  const picked = new Set();
  const buttons = [];
  const tokens = splitHebrew(q.he);
  const total = tokens.filter((t) => t.kind === 'letter').length;
  const row = h('div', { class: 'tap-row he', dir: 'rtl', lang: 'he', role: 'group', 'aria-label': 'Letters' });
  for (const t of tokens) {
    if (t.kind !== 'letter') {
      row.append(h('span', { class: 'tap-gap', 'aria-hidden': 'true' }, t.text));
      continue;
    }
    const b = h('button', {
      type: 'button', class: 'letter', 'aria-pressed': 'false',
      'aria-label': `${t.text}, letter ${t.index + 1} of ${total}`,
    }, t.text);
    b.addEventListener('click', () => toggle(t.index));
    buttons[t.index] = b;
    row.append(b);
  }
  function toggle(i, silent) {
    if (picked.has(i)) picked.delete(i); else picked.add(i);
    buttons[i].setAttribute('aria-pressed', String(picked.has(i)));
    if (!silent) onChange([...picked]);
  }
  const legend = h('p', { class: 'legend', hidden: true },
    h('span', { class: 'key key-right' }, `${RIGHT} right`), ' ',
    h('span', { class: 'key key-wrong' }, `${WRONG} wrong`), ' ',
    h('span', { class: 'key key-missed' }, 'dashed: missed'));
  const el = h('div', { class: 'q q-tap' }, promptEl(q.prompt), row, h('p', { class: 'hint' }, 'Tap again to undo.'), legend);
  return {
    el,
    response: () => (picked.size ? [...picked].sort((a, b) => a - b) : undefined),
    setResponse(arr) { for (const i of arr) toggle(i, true); onChange([...picked]); },
    reveal() {
      const want = new Set(correctResponse(q));
      buttons.forEach((b, i) => {
        b.disabled = true;
        const sel = picked.has(i);
        if (sel && want.has(i)) { b.classList.add('right'); b.setAttribute('aria-label', `${b.textContent}, ${RIGHT} correct`); }
        else if (sel) { b.classList.add('wrong'); b.setAttribute('aria-label', `${b.textContent}, ${WRONG} should not be chosen`); }
        else if (want.has(i)) { b.classList.add('missed'); b.setAttribute('aria-label', `${b.textContent}, missed`); }
      });
      legend.hidden = false;
      el.querySelector('.hint')?.remove();
    },
  };
}

// --- matching ------------------------------------------------------------------

function match(q, step, onChange) {
  const n = q.pairs.length;
  if (!step.order) step.order = shuffledIndexes(n);
  const pairOf = new Array(n).fill(undefined); // left -> right
  let activeLeft;
  const leftBtns = [];
  const rightBtns = [];

  const leftCol = h('div', { class: 'match-col', role: 'group', 'aria-label': 'Items' });
  const rightCol = h('div', { class: 'match-col', role: 'group', 'aria-label': 'Matches' });
  q.pairs.forEach((p, i) => {
    const b = h('button', { type: 'button', class: 'option match-item', 'aria-pressed': 'false' },
      h('span', { class: 'badge', 'aria-hidden': 'true' }), h('span', { class: 'option-text', html: formatText(p.left) }));
    b.addEventListener('click', () => clickLeft(i));
    leftBtns[i] = b;
    leftCol.append(b);
  });
  for (const j of step.order) {
    const b = h('button', { type: 'button', class: 'option match-item', 'aria-pressed': 'false', 'data-i': j },
      h('span', { class: 'badge', 'aria-hidden': 'true' }), h('span', { class: 'option-text', html: formatText(q.pairs[j].right) }));
    b.addEventListener('click', () => clickRight(j));
    rightBtns[j] = b;
    rightCol.append(b);
  }

  function clickLeft(i) {
    if (pairOf[i] !== undefined) pairOf[i] = undefined; // tapping a paired item undoes the pair
    activeLeft = i;
    paint();
  }
  function clickRight(j) {
    const owner = pairOf.indexOf(j);
    if (owner !== -1) { pairOf[owner] = undefined; paint(); return; }
    if (activeLeft === undefined) {
      status.textContent = 'Choose an item on the left first.';
      return;
    }
    pairOf[activeLeft] = j;
    activeLeft = pairOf.findIndex((v) => v === undefined);
    if (activeLeft === -1) activeLeft = undefined;
    paint();
  }
  function paint() {
    status.textContent = '';
    leftBtns.forEach((b, i) => {
      const num = pairOf[i] !== undefined ? String(i + 1) : '';
      b.querySelector('.badge').textContent = num;
      b.classList.toggle('paired', pairOf[i] !== undefined);
      b.setAttribute('aria-pressed', String(activeLeft === i));
      b.setAttribute('aria-label', `${b.querySelector('.option-text').textContent}${num ? `, paired as ${num}` : ''}`);
    });
    rightBtns.forEach((b, j) => {
      const owner = pairOf.indexOf(j);
      const num = owner !== -1 ? String(owner + 1) : '';
      b.querySelector('.badge').textContent = num;
      b.classList.toggle('paired', owner !== -1);
      b.setAttribute('aria-pressed', String(owner !== -1));
      b.setAttribute('aria-label', `${b.querySelector('.option-text').textContent}${num ? `, paired as ${num}` : ''}`);
    });
    onChange(pairOf.every((v) => v !== undefined) ? [...pairOf] : undefined);
  }

  const status = h('p', { class: 'hint', 'aria-live': 'polite' });
  const answers = h('ol', { class: 'match-answers', hidden: true });
  const el = h('div', { class: 'q q-match' },
    promptEl(q.prompt || 'Match each item on the left with one on the right.'),
    h('p', { class: 'hint' }, 'Tap an item on the left, then its match on the right. Tap a pair again to undo.'),
    h('div', { class: 'match-grid' }, leftCol, rightCol), status, answers);
  queueMicrotask(paint);
  return {
    el,
    response: () => (pairOf.every((v) => v !== undefined) ? [...pairOf] : undefined),
    setResponse(arr) { arr.forEach((j, i) => { pairOf[i] = j; }); activeLeft = undefined; paint(); },
    reveal() {
      [...leftBtns, ...rightBtns].forEach((b) => { b.disabled = true; });
      el.querySelectorAll('.hint').forEach((x) => x.remove());
      q.pairs.forEach((p, i) => {
        const ok = pairOf[i] === i;
        leftBtns[i].classList.add(ok ? 'right' : 'wrong');
        answers.append(h('li', { class: ok ? 'right' : 'wrong' },
          h('span', { class: 'mark' }, ok ? RIGHT : WRONG), ' ',
          h('span', { html: formatText(p.left) }), ' → ', h('span', { html: formatText(p.right) })));
      });
      answers.hidden = false;
    },
  };
}

// --- word breakdown --------------------------------------------------------------

function breakdown(q, step, onChange) {
  const tokens = splitHebrew(q.he).filter((t) => t.kind === 'letter');
  const picked = new Set();
  const gapBtns = [];
  const row = h('div', { class: 'split-row he', dir: 'rtl', lang: 'he', role: 'group', 'aria-label': 'Places to split the word' });
  tokens.forEach((t, i) => {
    row.append(h('span', { class: 'split-letter' }, t.text));
    if (i < tokens.length - 1) {
      const b = h('button', { type: 'button', class: 'gap', 'aria-pressed': 'false', 'aria-label': `Split after letter ${i + 1} (${t.text})` },
        h('span', { class: 'gap-line', 'aria-hidden': 'true' }));
      b.addEventListener('click', () => toggle(i));
      gapBtns[i] = b;
      row.append(b);
    }
  });
  function toggle(i, silent) {
    if (picked.has(i)) picked.delete(i); else picked.add(i);
    gapBtns[i].setAttribute('aria-pressed', String(picked.has(i)));
    if (!silent) onChange(picked.size ? [...picked] : undefined);
  }
  const partsEl = h('div', { class: 'parts', dir: 'rtl', hidden: true },
    q.parts.map((p) => h('div', { class: 'part-card' },
      h('span', { class: 'he part-he', lang: 'he', dir: 'rtl' }, p.he),
      h('span', { class: 'part-label', dir: 'auto', html: formatText(p.label) }))));
  const el = h('div', { class: 'q q-breakdown' },
    promptEl(q.prompt || 'Tap where this word splits into its parts.'), row,
    h('p', { class: 'hint' }, 'Tap the space between two letters. Tap again to undo.'), partsEl);
  return {
    el,
    response: () => (picked.size ? [...picked].sort((a, b) => a - b) : undefined),
    setResponse(arr) { for (const i of arr) toggle(i, true); onChange([...picked]); },
    reveal() {
      const want = new Set(gapsForParts(q.parts.map((p) => p.he)));
      gapBtns.forEach((b, i) => {
        b.disabled = true;
        if (picked.has(i) && want.has(i)) b.classList.add('right');
        else if (picked.has(i)) b.classList.add('wrong');
        else if (want.has(i)) b.classList.add('missed');
      });
      el.querySelector('.hint')?.remove();
      partsEl.hidden = false;
    },
  };
}

const RENDERERS = { choice, truefalse, wordbank, predict, tap, match, breakdown };

export const RENDERER_TYPES = Object.keys(RENDERERS);
