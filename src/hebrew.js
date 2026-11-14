// Hebrew text analysis. Pure functions, no DOM, so tests/check.js can use them.
//
// A "letter" is one consonant plus the combining marks that follow it
// (vowels, dagesh, shin/sin dot, meteg, cantillation). Letter positions count
// consonants only, starting at 0, across the whole string. Spaces, makaf and
// punctuation are not letters.

const HEB_CONSONANT = /^[א-ת]$/;
// Combining marks that attach to the preceding consonant.
// Excludes makaf (05BE), paseq (05C0), sof pasuq (05C3), nun hafukha (05C6).
const HEB_POINT = /^[֑-ׇֽֿׁׂׅׄ]$/;
const HEB_WORD_BREAK = /^[\s־׀׃.,;:!?()"'\-]$/;

const VOWEL_NAMES = {
  'ְ': 'sheva',
  'ֱ': 'chataf-segol',
  'ֲ': 'chataf-patach',
  'ֳ': 'chataf-kamatz',
  'ִ': 'chirik',
  'ֵ': 'tzere',
  'ֶ': 'segol',
  'ַ': 'patach',
  'ָ': 'kamatz',
  'ֹ': 'cholam',
  'ֺ': 'cholam',
  'ֻ': 'kubutz',
  'ׇ': 'kamatz-katan',
};

export const HEB_DOT = 'ּ';

// Split text into tokens: { kind: 'letter', base, text, marks, index, word, lastInWord }
// or { kind: 'other', text }. Joining every token's text gives back the input.
export function splitHebrew(text) {
  const tokens = [];
  let letterIndex = 0;
  let wordIndex = 0;
  let current = null; // the letter currently collecting marks
  for (const ch of text) {
    // Presentation forms (e.g. U+FB35) decompose to base + marks for analysis.
    const decomposed = ch.normalize('NFD');
    const base = decomposed[0];
    if (HEB_CONSONANT.test(base)) {
      current = {
        kind: 'letter',
        base,
        text: ch,
        marks: [...decomposed.slice(1)],
        index: letterIndex++,
        word: wordIndex,
        lastInWord: false,
      };
      tokens.push(current);
    } else if (HEB_POINT.test(ch) && current) {
      current.text += ch;
      current.marks.push(ch);
    } else {
      current = null;
      const prev = tokens[tokens.length - 1];
      if (HEB_WORD_BREAK.test(ch) && prev && prev.kind === 'letter') wordIndex++;
      if (prev && prev.kind === 'other') prev.text += ch;
      else tokens.push({ kind: 'other', text: ch });
    }
  }
  const letters = tokens.filter((t) => t.kind === 'letter');
  letters.forEach((l, i) => {
    const next = letters[i + 1];
    l.lastInWord = !next || next.word !== l.word;
  });
  return tokens;
}

export function lettersOf(text) {
  return splitHebrew(text).filter((t) => t.kind === 'letter');
}

// Names of the features a letter carries. The dot U+05BC is classified as:
//   shuruk  - in a vav that has no other vowel (וּ)
//   mappik  - in a he that ends its word (הּ)
//   dagesh  - everywhere else
export function featuresOf(letter) {
  const f = new Set();
  const hasVowel = letter.marks.some((m) => VOWEL_NAMES[m] && m !== 'ְ');
  for (const m of letter.marks) {
    if (VOWEL_NAMES[m]) f.add(VOWEL_NAMES[m]);
    if (m === 'ׁ') f.add('shin-dot');
    if (m === 'ׂ') f.add('sin-dot');
    if (m === 'ֽ') f.add('meteg');
    if (m === 'ֿ') f.add('rafeh');
  }
  if (letter.marks.includes(HEB_DOT)) {
    if (letter.base === 'ו' && !hasVowel && !letter.marks.includes('ְ')) f.add('shuruk');
    else if (letter.base === 'ה' && letter.lastInWord) f.add('mappik');
    else f.add('dagesh');
  }
  return f;
}

export function hasFeature(letter, feature) {
  return featuresOf(letter).has(feature);
}

// Positions of every letter in text carrying a feature, e.g. 'dagesh'.
export function positionsWith(text, feature) {
  return lettersOf(text)
    .filter((l) => hasFeature(l, feature))
    .map((l) => l.index);
}

// Strip every combining mark, leaving consonants and separators.
export function consonantsOnly(text) {
  return splitHebrew(text)
    .map((t) => (t.kind === 'letter' ? t.base : t.text))
    .join('');
}

// Gap positions for a word split into parts. Gap g sits between letter g and
// letter g+1. ['הַ', 'מֶּלֶךְ'] gives [0].
export function gapsForParts(parts) {
  const gaps = [];
  let count = 0;
  for (let i = 0; i < parts.length - 1; i++) {
    count += lettersOf(parts[i]).length;
    gaps.push(count - 1);
  }
  return gaps;
}

export const FEATURE_NAMES = [
  'dagesh', 'shuruk', 'mappik', 'sheva', 'shin-dot', 'sin-dot', 'meteg', 'rafeh',
  ...new Set(Object.values(VOWEL_NAMES)),
];
