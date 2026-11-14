// Small DOM helpers and text formatting.

import { splitHebrew, hasFeature } from './hebrew.js';

// h('button', { class: 'x', onclick: fn }, 'text', child)
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v === null || v === undefined) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  appendAll(el, children);
  return el;
}

function appendAll(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
}

export function clear(el) {
  while (el.firstChild) el.firstChild.remove();
  return el;
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

// A run of Hebrew, allowing spaces, makaf and geresh inside it.
const HEB = '֑-״יִ-ﭏ';
const HEB_RUN = new RegExp(`[${HEB}]+(?:[\\s\\-]+[${HEB}]+)*`, 'g');

// English text with **bold**, *italic*, and Hebrew runs wrapped for RTL.
export function formatText(s) {
  return escapeHtml(s)
    .replace(HEB_RUN, (m) => `<span class="he" lang="he" dir="rtl">${m}</span>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export const isHebrew = (s) => new RegExp(`[${HEB}]`).test(s);

// Text node or element for a short label that may be Hebrew.
export function textEl(tag, s, attrs = {}) {
  return h(tag, { ...attrs, html: formatText(s) });
}

// Hebrew word with chosen letters underlined (mark: feature name, or letters: positions).
export function hebrewWithMarks(text, { mark, letters } = {}) {
  const wrap = h('span', { class: 'he', lang: 'he', dir: 'rtl' });
  for (const t of splitHebrew(text)) {
    const on = t.kind === 'letter' && ((mark && hasFeature(t, mark)) || (letters && letters.includes(t.index)));
    wrap.append(on ? h('span', { class: 'marked' }, t.text) : document.createTextNode(t.text));
  }
  return wrap;
}

export function focusEl(el) {
  if (!el) return;
  if (!el.hasAttribute('tabindex') && !/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: false });
}
