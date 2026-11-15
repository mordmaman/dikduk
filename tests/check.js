// Headless checks. Run: node tests/check.js
// Fails (exit 1) on any problem in lesson data, Hebrew marks, divine names,
// spelling, grading, save logic, or a stale index.html.

import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

import { splitHebrew, lettersOf, positionsWith, featuresOf, gapsForParts } from '../src/hebrew.js';
import { validateLesson, validateQuestion, allQuestions, findDivineNames, findBannedSpellings, QUESTION_TYPES } from '../src/lesson-format.js';
import { buildRun, grade, correctResponse, scoreRun, answer, STAR_THRESHOLD } from '../src/engine.js';
import { migrate, defaultSave, loadSave, writeSave, recordResult, resetProgress, SAVE_KEY, SAVE_VERSION } from '../src/save.js';
import { noteAnswer, reviewPool } from '../src/review.js';
import { RENDERER_TYPES } from '../src/questions.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSON_DIR = join(ROOT, 'src', 'lessons');

let failures = 0;
let passes = 0;
const section = (name) => console.log(`\n${name}`);
function ok(cond, msg) {
  if (cond) { passes++; return true; }
  failures++;
  console.log(`  FAIL ${msg}`);
  return false;
}
function eq(actual, expected, msg) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  return ok(a === e, `${msg}: expected ${e}, got ${a}`);
}
function noErrors(list, msg) {
  if (list.length === 0) return ok(true, msg);
  for (const e of list) ok(false, `${msg}: ${e}`);
  return false;
}

// Hebrew built from code points, so test-only strings (including divine names
// the detector must catch) never appear printed in this file.
const cp = (...codes) => String.fromCodePoint(...codes);

// --- lessons ------------------------------------------------------------------
section('Lessons');
const files = readdirSync(LESSON_DIR).filter((f) => f.endsWith('.js')).sort();
ok(files.length > 0, 'at least one lesson file');
const lessons = [];
for (const f of files) {
  ok(/^\d{2}-[a-z0-9-]+\.js$/.test(f), `${f}: file name should be NN-slug.js`);
  const mod = await import(pathToFileURL(join(LESSON_DIR, f)).href);
  const lesson = mod.default;
  const keys = Object.keys(mod).filter((k) => k !== 'default');
  ok(keys.length === 0, `${f}: only a default export is allowed (found ${keys.join(', ')})`);
  noErrors(validateLesson(lesson, f), `${f} is valid`);
  if (lesson) lessons.push({ file: f, lesson });
}
const ids = lessons.map((l) => l.lesson.id);
ok(new Set(ids).size === ids.length, `lesson ids are unique (${ids.join(', ')})`);
const orders = lessons.map((l) => l.lesson.order);
ok(new Set(orders).size === orders.length, 'lesson order numbers are unique');
for (const { file, lesson } of lessons) {
  const n = Number(file.slice(0, 2));
  ok(n === lesson.order, `${file}: file number ${n} matches order ${lesson.order}`);
}

section('Every question grades its own answer as correct');
for (const { file, lesson } of lessons) {
  for (const { phase, q } of allQuestions(lesson)) {
    const where = `${file} ${phase} ${q.id}`;
    ok(grade(q, correctResponse(q)) === true, `${where}: correct answer grades as correct`);
    if (['choice', 'wordbank', 'predict'].includes(q.type)) {
      q.options.forEach((o, i) => { if (!o.correct) ok(grade(q, i) === false, `${where}: wrong option ${i} grades as wrong`); });
    }
    if (q.type === 'truefalse') ok(grade(q, !q.answer) === false, `${where}: opposite answer grades as wrong`);
    if (q.type === 'tap' || q.type === 'breakdown') ok(grade(q, []) === false, `${where}: empty response grades as wrong`);
    if (q.type === 'match') ok(grade(q, [...correctResponse(q)].reverse()) === false, `${where}: reversed pairs grade as wrong`);
  }
}

section('Divine names and spelling');
const textFiles = [
  ...files.map((f) => join(LESSON_DIR, f)),
  ...readdirSync(join(ROOT, 'src')).filter((f) => /\.(js|html|css)$/.test(f)).map((f) => join(ROOT, 'src', f)),
];
for (const path of textFiles) {
  const text = readFileSync(path, 'utf8');
  const rel = path.slice(ROOT.length + 1);
  const names = findDivineNames(text);
  ok(names.length === 0, `${rel}: no divine name printed in full${names.length ? ` (found ${names.join(', ')})` : ''}`);
  // lesson-format.js lists the banned spellings themselves, so skip it here.
  if (!rel.endsWith('lesson-format.js')) {
    const bad = findBannedSpellings(text);
    ok(bad.length === 0, `${rel}: house spelling${bad.length ? ` (${bad.join('; ')})` : ''}`);
  }
}

section('No reliance on any one textbook');
for (const path of [...textFiles, join(ROOT, 'README.md'), join(ROOT, 'index.html')]) {
  const rel = path.slice(ROOT.length + 1);
  ok(!/weingreen/i.test(readFileSync(path, 'utf8')), `${rel}: does not name or reference Weingreen`);
}

// --- the detectors themselves ---------------------------------------------------
section('Divine-name detector');
const YHWH = cp(0x5d9, 0x5d4, 0x5d5, 0x5d4);
const YHWH_POINTED = cp(0x5d9, 0x5b0, 0x5d4, 0x5b9, 0x5d5, 0x5b8, 0x5d4);
const ELOKIM_REAL = cp(0x5d0, 0x5b1, 0x5dc, 0x5b9, 0x5d4, 0x5b4, 0x5d9, 0x5dd);
const ELOKIM_ALTERED = cp(0x5d0, 0x5b1, 0x5dc, 0x5b9, 0x5e7, 0x5b4, 0x5d9, 0x5dd);
const ELOKEINU_REAL = cp(0x5d0, 0x5b1, 0x5dc, 0x5b9, 0x5d4, 0x5b5, 0x5d9, 0x5e0, 0x5d5, 0x5bc);
const ADONAI_NAME = cp(0x5d0, 0x5b2, 0x5d3, 0x5b9, 0x5e0, 0x5b8, 0x5d9);
const ADONI_MYLORD = cp(0x5d0, 0x5b2, 0x5d3, 0x5b9, 0x5e0, 0x5b4, 0x5d9);
const HASHEM_ABBR = cp(0x5d4, 0x5f3);
const SHADDAI_NAME = cp(0x5e9, 0x5c1, 0x5b7, 0x5d3, 0x5bc, 0x5b7, 0x5d9);
const SADAI_FIELD = cp(0x5e9, 0x5c2, 0x5b8, 0x5d3, 0x5b8, 0x5d9);
ok(findDivineNames(`x ${YHWH} y`).length === 1, 'catches the four-letter Name unpointed');
ok(findDivineNames(YHWH_POINTED).length === 1, 'catches the four-letter Name pointed');
ok(findDivineNames(cp(0x5d5, 0x5b7) + YHWH_POINTED).length === 1, 'catches the Name with a prefix');
ok(findDivineNames(ELOKIM_REAL).length === 1, 'catches the unaltered Elokim');
ok(findDivineNames(ELOKEINU_REAL).length === 1, 'catches the unaltered Elokeinu');
ok(findDivineNames(ELOKIM_ALTERED).length === 0, 'allows the altered form with kuf');
ok(findDivineNames(ADONAI_NAME).length === 1, 'catches Adonai with kamatz under the nun');
ok(findDivineNames(ADONI_MYLORD).length === 0, 'allows adoni (my lord) with chirik');
ok(findDivineNames(HASHEM_ABBR).length === 0, 'allows the abbreviation he-geresh');
ok(findDivineNames(SHADDAI_NAME).length === 1, 'catches Shaddai');
ok(findDivineNames(SADAI_FIELD).length === 0, 'allows sadai (my field) with sin dot');

section('Spelling detector');
eq(findBannedSpellings('A shva and a Qamets'), ['shva -> sheva', 'qamets -> kamatz'], 'flags shva and qamets');
eq(findBannedSpellings('sheva, dagesh, kamatz, tzere, chirik, makaf'), [], 'house spellings pass');

// --- Hebrew analysis --------------------------------------------------------------
section('Hebrew analysis');
const BARUCH = cp(0x5d1, 0x5b8, 0x5bc, 0x5e8, 0x5d5, 0x5bc, 0x5da, 0x5b0);
const SHABBAT = cp(0x5e9, 0x5b7, 0x5c1, 0x5d1, 0x5b8, 0x5bc, 0x5ea);
eq(lettersOf(BARUCH).length, 4, 'letters counted per consonant');
eq(positionsWith(BARUCH, 'dagesh'), [0], 'dagesh found; the dot in a bare vav is a shuruk, not a dagesh');
eq(positionsWith(BARUCH, 'shuruk'), [2], 'shuruk found');
eq(positionsWith(SHABBAT, 'dagesh'), [1], 'shin dot is not counted as a dagesh');
eq(positionsWith(`${BARUCH} ${SHABBAT}`, 'dagesh'), [0, 5], 'positions run on across words');
eq(splitHebrew(`${BARUCH} ${SHABBAT}`).map((t) => t.text).join(''), `${BARUCH} ${SHABBAT}`, 'splitting keeps the text intact');
const VAV_DAGESH_VOWEL = cp(0x5e6, 0x5b4, 0x5d5, 0x5bc, 0x5b8, 0x5d4); // synthetic: vav with dot and kamatz
eq(positionsWith(VAV_DAGESH_VOWEL, 'dagesh'), [1], 'a vav with a dot and its own vowel has a dagesh');
const FINAL_HE_DOT = cp(0x5dc, 0x5b8, 0x5d4, 0x5bc); // synthetic: he with dot at word end
eq(positionsWith(FINAL_HE_DOT, 'mappik'), [1], 'a dot in a final he is a mappik');
eq(positionsWith(FINAL_HE_DOT, 'dagesh'), [], 'a mappik is not a dagesh');
const PRESENTATION = cp(0xfb31); // bet with dagesh as one presentation-form character
ok(featuresOf(lettersOf(PRESENTATION)[0]).has('dagesh'), 'presentation forms are decomposed');
const MAKAF = cp(0x5db, 0x5b4, 0x5d9, 0x5be, 0x5d8, 0x5d5, 0x5d1); // synthetic: two words joined by makaf
ok(lettersOf(MAKAF)[1].lastInWord && lettersOf(MAKAF)[1].word !== lettersOf(MAKAF)[2].word, 'makaf separates words');
const TORAH = cp(0x5ea, 0x5bc, 0x5d5, 0x5b9, 0x5e8, 0x5b8, 0x5d4);
eq(positionsWith(TORAH, 'vowel-letter'), [1, 3], 'vowel letters: cholam vav and final he');
eq(positionsWith(BARUCH, 'vowel-letter'), [2], 'vowel letters: shuruk');
const BEIT = cp(0x5d1, 0x5bc, 0x5b5, 0x5d9, 0x5ea);
eq(positionsWith(BEIT, 'vowel-letter'), [1], 'vowel letters: yod after tzere');
const MITZVOT = cp(0x5de, 0x5b4, 0x5e6, 0x5b0, 0x5d5, 0x5b9, 0x5ea);
eq(positionsWith(MITZVOT, 'vowel-letter'), [], 'a vav with cholam after a sheva is a consonant');
const VE_AMRU = cp(0x5d5, 0x5b0, 0x5d0, 0x5b8, 0x5de, 0x5b0, 0x5e8, 0x5d5, 0x5bc);
eq(positionsWith(VE_AMRU, 'vowel-letter'), [4], 'a vav with its own sheva is a consonant');
eq(positionsWith(FINAL_HE_DOT, 'vowel-letter'), [], 'a mappik he is not a vowel letter');
eq(gapsForParts([cp(0x5d4, 0x5b7), cp(0x5de, 0x5b6, 0x5bc, 0x5dc)]), [0], 'gap after first part');
eq(gapsForParts([cp(0x5d5), cp(0x5d4), cp(0x5de, 0x5dc)]), [0, 1], 'gaps for three parts');

section('Question validation catches mistakes');
const tapQ = { id: 't', type: 'tap', prompt: 'p', he: BARUCH, feature: 'dagesh', explain: 'e' };
ok(validateQuestion({ ...tapQ, answer: [0] }, 't').length === 0, 'correct tap answer passes');
ok(validateQuestion({ ...tapQ, answer: [2] }, 't').length > 0, 'tap answer on a shuruk fails');
ok(validateQuestion({ ...tapQ, answer: [0, 9] }, 't').length > 0, 'tap position out of range fails');
ok(validateQuestion({ id: 'c', type: 'choice', prompt: 'p', explain: 'e', options: [{ text: 'a', correct: true }, { text: 'b', correct: true }] }, 'c').length > 0, 'two correct options fail');
ok(validateQuestion({ id: 'c', type: 'choice', prompt: 'p', explain: 'e', options: [{ text: 'a' }, { text: 'b' }] }, 'c').length > 0, 'no correct option fails');
ok(validateQuestion({ id: 'b', type: 'breakdown', he: BARUCH, explain: 'e', parts: [{ he: cp(0x5d1), label: 'x' }, { he: cp(0x5e8), label: 'y' }] }, 'b').length > 0, 'breakdown parts that do not join to the word fail');
ok(validateQuestion({ id: 'x', type: 'choice', prompt: 'p', options: [{ text: 'a', correct: true }, { text: 'b' }] }, 'x').length > 0, 'missing explain fails');
eq([...RENDERER_TYPES].sort(), [...QUESTION_TYPES].sort(), 'every question type has a renderer');

// --- engine -------------------------------------------------------------------------
section('Engine');
for (const { lesson } of lessons) {
  const run = buildRun(lesson, 'lesson');
  const checks = lesson.teach.reduce((n, s) => n + (s.check || []).length, 0);
  eq(run.steps.length, lesson.teach.length + checks + 1 + lesson.test.length + 1, `${lesson.id}: lesson run has teach, checks, intro, test, results`);
  for (const step of run.steps.filter((s) => s.phase === 'test' && s.kind === 'question')) answer(run, step, correctResponse(step.q));
  eq(scoreRun(run).pct, 100, `${lesson.id}: all-correct test scores 100%`);
  if (lesson.challenge?.length) eq(buildRun(lesson, 'challenge').steps.length, lesson.challenge.length + 2, `${lesson.id}: challenge run`);
}

// --- save ---------------------------------------------------------------------------
section('Save data');
eq(migrate(null), defaultSave(), 'nothing saved gives the default');
eq(migrate('garbage'), defaultSave(), 'garbage gives the default');
eq(migrate([1, 2]), defaultSave(), 'an array gives the default');
eq(migrate({ version: SAVE_VERSION + 1, lessons: { a: { completed: true } } }), defaultSave(), 'a save from a newer build is not guessed at');
const fixture = JSON.parse(readFileSync(join(ROOT, 'tests', 'fixtures', 'save-v1.json'), 'utf8'));
const loaded = migrate(fixture);
eq(loaded.lessons.dagesh, fixture.lessons.dagesh, 'version 1 fixture keeps lesson results');
eq(loaded.settings, fixture.settings, 'version 1 fixture keeps settings');
eq(loaded.missed, fixture.missed, 'version 1 fixture keeps the review pool');
const messy = migrate({ version: 1, lessons: { x: { completed: 'yes', bestTest: 'high' } }, settings: { theme: 'purple' } });
eq(messy.lessons.x.completed, false, 'malformed fields are reset');
eq(messy.settings.theme, 'auto', 'unknown theme falls back to auto');
const chained = migrate({ version: 0, old: true }, { 0: (d) => ({ version: 1, lessons: { a: { completed: d.old } } }) });
eq(chained.lessons.a.completed, true, 'a migration step runs for an older version');
eq(migrate({ version: 0 }, {}).lessons, {}, 'an older version with no migration falls back to the default');

const mem = new Map();
const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const s1 = defaultSave();
recordResult(s1, 'dagesh', 'test', 60);
ok(writeSave(s1, storage), 'save writes');
eq(loadSave(storage), s1, 'save round-trips');
ok(mem.has(SAVE_KEY), `saved under ${SAVE_KEY}`);
mem.set(SAVE_KEY, '{not json');
eq(loadSave(storage), defaultSave(), 'corrupt storage gives the default');
const throwing = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('full'); } };
eq(loadSave(throwing), defaultSave(), 'storage that throws on read gives the default');
ok(writeSave(s1, throwing) === false, 'storage that throws on write reports failure without crashing');

section('Replay rules');
const r = defaultSave();
recordResult(r, 'dagesh', 'test', 90);
recordResult(r, 'dagesh', 'test', 40);
eq(r.lessons.dagesh.completed, true, 'replaying never un-completes');
eq(r.lessons.dagesh.bestTest, 90, 'a lower score never replaces the best');
eq(r.lessons.dagesh.lastTest, 40, 'last score is kept');
eq(r.lessons.dagesh.attempts, 2, 'attempts counted');
recordResult(r, 'dagesh', 'challenge', STAR_THRESHOLD);
eq(r.lessons.dagesh.star, true, `${STAR_THRESHOLD}% earns a star`);
recordResult(r, 'dagesh', 'challenge', 10);
eq(r.lessons.dagesh.star, true, 'a star is never taken away');
eq(r.lessons.dagesh.bestChallenge, STAR_THRESHOLD, 'best challenge score kept');
const fresh = defaultSave();
recordResult(fresh, 'x', 'challenge', STAR_THRESHOLD - 1);
eq(fresh.lessons.x.star, false, `${STAR_THRESHOLD - 1}% does not earn a star`);
eq(fresh.lessons.x.completed, false, 'the challenge alone does not complete a lesson');
r.settings.theme = 'dark';
const wiped = resetProgress(r);
eq(wiped.lessons, {}, 'reset clears results');
eq(wiped.settings.theme, 'dark', 'reset keeps settings');

section('Review pool');
const rv = defaultSave();
noteAnswer(rv, 'dagesh', 'q1', false);
eq(Object.keys(rv.missed), ['dagesh/q1'], 'a wrong answer joins the pool');
noteAnswer(rv, 'dagesh', 'q1', true);
ok('dagesh/q1' in rv.missed, 'one right answer is not enough to leave');
noteAnswer(rv, 'dagesh', 'q1', true);
eq(Object.keys(rv.missed), [], 'two right answers leave the pool');
noteAnswer(rv, 'dagesh', 'q2', true);
eq(Object.keys(rv.missed), [], 'a right answer to an unmissed question changes nothing');
if (lessons.length) {
  const l = lessons[0].lesson;
  const someQ = allQuestions(l)[0].q;
  noteAnswer(rv, l.id, someQ.id, false);
  noteAnswer(rv, l.id, 'no-such-question', false);
  eq(reviewPool(rv, lessons.map((x) => x.lesson)), [`${l.id}/${someQ.id}`], 'pool ignores questions that no longer exist');
}

// --- build ----------------------------------------------------------------------------
section('Build');
try {
  execFileSync('python3', [join(ROOT, 'build.py'), '--check'], { stdio: 'pipe' });
  ok(true, 'index.html is up to date');
} catch (e) {
  ok(false, `index.html is out of date or the build fails: ${String(e.stderr || e.message).trim()}`);
}

console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
