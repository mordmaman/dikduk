// The lesson file format, and the checks every lesson must pass.
//
// One file per lesson in src/lessons/, named NN-slug.js. The build picks up
// every file there automatically; nothing else needs editing. A lesson file
// contains a single default export and no imports:
//
// export default {
//   id: 'dagesh',            // unique, lowercase; stored in save data, so never rename it
//   order: 3,                // position in the course
//   title: 'Dagesh',
//   hebrewTitle: 'דָּגֵשׁ',   // optional
//   summary: 'One line shown in the lesson list.',
//   placeholder: false,      // optional; true shows a "placeholder" badge
//
//   teach: [                 // teaching screens, in order
//     {
//       id: 'two-jobs',
//       heading: 'One dot, two jobs',
//       body: ['A paragraph per string. **bold** and *italic* work.',
//              'Hebrew such as בָּרוּךְ is detected and set right-to-left automatically.'],
//       examples: [          // optional; shown large
//         { he: 'בָּרוּךְ', note: 'Where the learner meets this word',
//           mark: 'dagesh' }, // optional: underline letters with this feature,
//                             // or letters: [0, 2] to underline by position
//       ],
//       table: { headers: ['Word', 'Why'], rows: [['שַׁבָּת', 'Doubled']] }, // optional
//       callout: { kind: 'note', text: '...' },  // optional; kind is 'note' or 'tip';
//                                                // may also be a list of these
//       check: [ /* one or two questions, asked straight after this screen */ ],
//     },
//   ],
//   test: [ /* about ten questions; finishing them completes the lesson */ ],
//   challenge: [ /* optional harder questions; 80% or more earns a star */ ],
// };
//
// Every question has an id (unique within the lesson), a type, and an explain
// (shown after answering). Prompts and option text may mix English and Hebrew.
//
// { type: 'choice', prompt, he?, options: [{ text, correct?: true }], keepOrder?: true }
//     One option is correct. Options are shuffled unless keepOrder is set.
// { type: 'truefalse', statement, answer: true | false }
// { type: 'tap', prompt, he, answer: [positions], feature?: 'dagesh', all?: true }
//     Tap letters in he. Positions count consonants only, from 0, across the whole
//     phrase. If feature is given, every answer must carry it, and (unless all is
//     false) every letter carrying it must be in the answer. Features: see
//     FEATURE_NAMES in hebrew.js (dagesh, shuruk, mappik, sheva, kamatz, ...).
// { type: 'wordbank', prompt?, before, after, rtl?: true, options: [{ text, correct?: true }] }
//     Tap a word to fill the gap between before and after.
// { type: 'match', prompt?, pairs: [{ left, right }] }
//     Pair each left item with its right item. The right column is shuffled.
// { type: 'predict', prompt?, parts: ['הַ', '...'], options: [{ text, correct?: true }] }
//     Shown "part + part", pick the combined form.
// { type: 'breakdown', prompt?, he, parts: [{ he, label }] }
//     Tap where he splits. The parts joined must equal he exactly.

import { lettersOf, hasFeature, gapsForParts, splitHebrew, FEATURE_NAMES } from './hebrew.js';

export const QUESTION_TYPES = ['choice', 'truefalse', 'tap', 'wordbank', 'match', 'predict', 'breakdown'];
const ONE_CORRECT = ['choice', 'wordbank', 'predict'];

export function allQuestions(lesson) {
  const out = [];
  for (const screen of lesson.teach || []) {
    for (const q of screen.check || []) out.push({ phase: 'check', q });
  }
  for (const q of lesson.test || []) out.push({ phase: 'test', q });
  for (const q of lesson.challenge || []) out.push({ phase: 'challenge', q });
  return out;
}

const isText = (v) => typeof v === 'string' && v.trim().length > 0;

export function validateQuestion(q, where) {
  const errors = [];
  const err = (m) => errors.push(`${where}: ${m}`);
  if (!isText(q.id)) err('missing id');
  if (!QUESTION_TYPES.includes(q.type)) {
    err(`unknown type "${q.type}"`);
    return errors;
  }
  if (!isText(q.explain)) err('missing explain');

  if (ONE_CORRECT.includes(q.type)) {
    if (!Array.isArray(q.options) || q.options.length < 2) err('needs at least two options');
    else {
      const n = q.options.filter((o) => o.correct === true).length;
      if (n !== 1) err(`needs exactly one correct option, has ${n}`);
      if (q.options.some((o) => !isText(o.text))) err('an option has no text');
      const texts = q.options.map((o) => o.text);
      if (new Set(texts).size !== texts.length) err('duplicate option text');
    }
  }

  switch (q.type) {
    case 'choice':
      if (!isText(q.prompt)) err('missing prompt');
      break;
    case 'truefalse':
      if (!isText(q.statement)) err('missing statement');
      if (typeof q.answer !== 'boolean') err('answer must be true or false');
      break;
    case 'tap': {
      if (!isText(q.prompt)) err('missing prompt');
      if (!isText(q.he)) { err('missing he'); break; }
      const letters = lettersOf(q.he);
      if (!Array.isArray(q.answer) || q.answer.length === 0) { err('answer must list positions'); break; }
      if (new Set(q.answer).size !== q.answer.length) err('answer repeats a position');
      for (const p of q.answer) {
        if (!Number.isInteger(p) || p < 0 || p >= letters.length) err(`position ${p} is outside the text (${letters.length} letters)`);
      }
      if (q.feature !== undefined) {
        if (!FEATURE_NAMES.includes(q.feature)) err(`unknown feature "${q.feature}"`);
        for (const p of q.answer) {
          const l = letters[p];
          if (l && !hasFeature(l, q.feature)) err(`letter ${p} (${l.text}) does not carry ${q.feature}`);
        }
        if (q.all !== false) {
          const want = letters.filter((l) => hasFeature(l, q.feature)).map((l) => l.index);
          const missing = want.filter((p) => !q.answer.includes(p));
          if (missing.length) err(`answer leaves out letters carrying ${q.feature}: ${missing.join(', ')}`);
        }
      }
      break;
    }
    case 'wordbank':
      if (typeof q.before !== 'string' || typeof q.after !== 'string') err('needs before and after (either may be empty)');
      if (!isText(q.before) && !isText(q.after)) err('before and after are both empty');
      break;
    case 'match': {
      if (!Array.isArray(q.pairs) || q.pairs.length < 2) { err('needs at least two pairs'); break; }
      if (q.pairs.some((p) => !isText(p.left) || !isText(p.right))) err('a pair is missing left or right');
      const lefts = q.pairs.map((p) => p.left);
      const rights = q.pairs.map((p) => p.right);
      if (new Set(lefts).size !== lefts.length) err('duplicate left item');
      if (new Set(rights).size !== rights.length) err('duplicate right item');
      break;
    }
    case 'predict':
      if (!Array.isArray(q.parts) || q.parts.length < 2 || q.parts.some((p) => !isText(p))) err('needs at least two parts');
      break;
    case 'breakdown': {
      if (!isText(q.he)) { err('missing he'); break; }
      if (!Array.isArray(q.parts) || q.parts.length < 2) { err('needs at least two parts'); break; }
      if (q.parts.some((p) => !isText(p.he) || !isText(p.label))) err('a part is missing he or label');
      const joined = q.parts.map((p) => p.he).join('');
      if (joined !== q.he) err(`parts joined (${joined}) do not equal he (${q.he})`);
      if (splitHebrew(q.he).some((t) => t.kind === 'other')) err('he must be a single word');
      if (gapsForParts(q.parts.map((p) => p.he)).some((g) => g < 0)) err('a part has no letters');
      break;
    }
  }
  return errors;
}

export function validateLesson(lesson, file = '') {
  const errors = [];
  const at = file || lesson?.id || 'lesson';
  const err = (m) => errors.push(`${at}: ${m}`);
  if (!lesson || typeof lesson !== 'object') return [`${at}: no default export`];
  if (!isText(lesson.id) || !/^[a-z0-9-]+$/.test(lesson.id)) err('id must be lowercase letters, digits and hyphens');
  if (!Number.isInteger(lesson.order)) err('order must be a whole number');
  if (!isText(lesson.title)) err('missing title');
  if (!isText(lesson.summary)) err('missing summary');
  if (!Array.isArray(lesson.teach) || lesson.teach.length === 0) err('needs at least one teach screen');
  if (!Array.isArray(lesson.test) || lesson.test.length === 0) err('needs test questions');
  if (lesson.challenge !== undefined && !Array.isArray(lesson.challenge)) err('challenge must be a list');

  const screenIds = new Set();
  (lesson.teach || []).forEach((s, i) => {
    const where = `teach[${i}]`;
    if (!isText(s.id)) err(`${where}: missing id`);
    else if (screenIds.has(s.id)) err(`${where}: duplicate screen id "${s.id}"`);
    screenIds.add(s.id);
    if (!isText(s.heading)) err(`${where}: missing heading`);
    if (!Array.isArray(s.body) || s.body.length === 0 || s.body.some((p) => !isText(p))) err(`${where}: body must be a list of paragraphs`);
    for (const ex of s.examples || []) {
      if (!isText(ex.he)) err(`${where}: example missing he`);
      if (ex.mark !== undefined && !FEATURE_NAMES.includes(ex.mark)) err(`${where}: unknown mark "${ex.mark}"`);
      if (ex.mark !== undefined && isText(ex.he) && !lettersOf(ex.he).some((l) => hasFeature(l, ex.mark))) {
        err(`${where}: example ${ex.he} has no letter carrying ${ex.mark}`);
      }
      const n = isText(ex.he) ? lettersOf(ex.he).length : 0;
      for (const p of ex.letters || []) if (!Number.isInteger(p) || p < 0 || p >= n) err(`${where}: example letter ${p} out of range`);
    }
    if (s.table) {
      const w = s.table.headers?.length;
      if (!w || !Array.isArray(s.table.rows) || s.table.rows.some((r) => r.length !== w)) err(`${where}: table rows must match headers`);
    }
    for (const c of s.callout ? [].concat(s.callout) : []) {
      if (!['note', 'tip'].includes(c.kind)) err(`${where}: callout kind must be note or tip`);
      if (!isText(c.text)) err(`${where}: callout has no text`);
    }
    if ((s.check || []).length > 2) err(`${where}: at most two check questions per screen`);
  });

  const qIds = new Set();
  for (const { phase, q } of allQuestions(lesson)) {
    const where = `${phase} ${q.id || '(no id)'}`;
    if (qIds.has(q.id)) err(`${where}: duplicate question id`);
    qIds.add(q.id);
    for (const e of validateQuestion(q, where)) errors.push(`${at}: ${e}`);
  }
  return errors;
}

// --- Text-level checks, run over the raw file text ---------------------------

// Divine names must never be printed in full. Returns the offending words.
// The patterns are written as escaped code points so this file does not print
// them either. Final letter forms are folded to their ordinary forms first.
const FINALS = { '\u05DA': '\u05DB', '\u05DD': '\u05DE', '\u05DF': '\u05E0', '\u05E3': '\u05E4', '\u05E5': '\u05E6' };
const NAME_YHWH = '\u05D9\u05D4\u05D5\u05D4';
const NAME_ELOK = /\u05D0\u05DC\u05D5?\u05D4\u05D9/; // Elokim and its forms, unaltered
const NAME_ELOAH = /\u05D0\u05DC\u05D5\u05D4$/; // Eloah, unaltered
const NAME_ADNY = '\u05D0\u05D3\u05E0\u05D9'; // the Name only with kamatz under the nun
const NAME_SHDY = '\u05E9\u05D3\u05D9'; // the Name only with shin dot and a dagesh in the dalet

export function findDivineNames(text) {
  const found = [];
  const words = text.split(/[^֑-ׇא-תיִ-ﭏ]+/).filter(Boolean);
  for (const word of words) {
    const letters = lettersOf(word);
    const bare = letters.map((l) => FINALS[l.base] || l.base).join('');
    let hit = bare.includes(NAME_YHWH) || NAME_ELOK.test(bare) || NAME_ELOAH.test(bare);
    const adon = bare.indexOf(NAME_ADNY);
    if (adon !== -1 && hasFeature(letters[adon + 2], 'kamatz')) hit = true;
    const shad = bare.indexOf(NAME_SHDY);
    if (shad !== -1 && hasFeature(letters[shad], 'shin-dot') && hasFeature(letters[shad + 1], 'dagesh')) hit = true;
    if (hit) found.push(word);
  }
  return found;
}

// English spellings that break the house style. Maps the wrong form to the right one.
export const BANNED_SPELLINGS = {
  shva: 'sheva', shewa: 'sheva', 'šewa': 'sheva', schwa: 'sheva',
  daghesh: 'dagesh', 'dagheš': 'dagesh', dagesch: 'dagesh',
  qamets: 'kamatz', qamats: 'kamatz', qames: 'kamatz', 'qameṣ': 'kamatz', kametz: 'kamatz',
  tsere: 'tzere', 'ṣere': 'tzere', sere: 'tzere',
  hiriq: 'chirik', hireq: 'chirik', 'ḥireq': 'chirik', hirik: 'chirik',
  seghol: 'segol',
  holem: 'cholam', holam: 'cholam',
  qibbuts: 'kubutz', qibbus: 'kubutz', kibbutz: 'kubutz',
  patah: 'patach', pathah: 'patach', pattah: 'patach',
  maqqeph: 'makaf', maqaf: 'makaf', maqqef: 'makaf',
  methegh: 'meteg', metheg: 'meteg',
  'mil’el': "mil'el",
};

export function findBannedSpellings(text) {
  const found = [];
  const words = text.toLowerCase().match(/[a-zšṣḥ’']+/g) || [];
  for (const w of words) {
    const clean = w.replace(/^'+|'+$/g, '');
    if (BANNED_SPELLINGS[clean]) found.push(`${clean} -> ${BANNED_SPELLINGS[clean]}`);
  }
  return [...new Set(found)];
}
