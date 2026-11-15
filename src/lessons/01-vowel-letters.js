// Vowel letters. Follows Weingreen §1. Explanations and examples are original;
// example words were checked against the Masoretic text and the siddur on
// Sefaria (Bereshit 1:1, 1:5, 5:1, 12:2; Shemot 20:2; Devarim 27:15, 33:4).

export default {
  id: 'vowel-letters',
  order: 1,
  title: 'Vowel letters',
  hebrewTitle: 'אִמּוֹת הַקְּרִיאָה',
  weingreen: '§1',
  summary: 'How ה, ו and י show vowels, and how to tell when they are consonants.',

  teach: [
    {
      id: 'consonants-only',
      heading: 'An alphabet of consonants',
      body: [
        'Every letter of the Hebrew alphabet is a consonant. The vowel points you read were added many centuries after the text was written, and a Sefer Torah is still written without them.',
        'Long before the points, three letters were pressed into service to show the main vowels: **ה**, **ו** and **י**. These are the **vowel letters**, in Hebrew אִמּוֹת הַקְּרִיאָה, "mothers of reading".',
        'In a pointed text the vowel letter sits alongside the vowel sign. The letter itself is not sounded as a consonant.',
      ],
      examples: [
        { he: 'תּוֹרָה', note: 'The ו shows o; the final ה shows a.', mark: 'vowel-letter' },
        { he: 'בְּרֵאשִׁית', note: 'The י shows i (Bereshit 1:1).', mark: 'vowel-letter' },
        { he: 'בָּרוּךְ', note: 'The ו shows u.', mark: 'vowel-letter' },
      ],
      check: [
        {
          id: 'chk-tap-torah',
          type: 'tap',
          prompt: 'Tap every vowel letter.',
          he: 'תּוֹרָה',
          feature: 'vowel-letter',
          answer: [1, 3],
          explain: 'The ו, which carries the cholam (o), and the final ה, which is silent after the kamatz (a).',
        },
      ],
    },
    {
      id: 'which-vowel',
      heading: 'Which vowels they show',
      body: [
        'Each vowel letter shows a particular group of sounds.',
        'A final ה is silent: you hear only the vowel before it. It is different from a ה with a dot in it at the end of a word (mappik, הּ), which is sounded.',
      ],
      table: {
        headers: ['Letter', 'Shows', 'With the points', 'Example'],
        rows: [
          ['ו', 'o or u', 'cholam וֹ, shuruk וּ', 'שָׁלוֹם, בָּרוּךְ'],
          ['י', 'i or e', 'after chirik, tzere or segol', 'בְּרֵאשִׁית, מִבֵּית'],
          ['ה', 'a vowel at the end of a word', 'after kamatz, segol, tzere or cholam', 'תּוֹרָה, בְּרָכָה'],
        ],
      },
      check: [
        {
          id: 'chk-final-he',
          type: 'truefalse',
          statement: 'The final ה of בְּרָכָה is sounded as an h.',
          answer: false,
          explain: 'False. It is a vowel letter and is silent. You hear only the kamatz before it.',
        },
      ],
    },
    {
      id: 'still-consonants',
      heading: 'When they are consonants',
      body: [
        'ה, ו and י are also ordinary consonants: h, v and y. The points tell you which job a letter is doing.',
        'A ו or י with a vowel of its own is a consonant. In יוֹם the י is a consonant, y, with the ו after it showing o. In וְאָמְרוּ the first ו is a consonant, v, with its own sheva, and the last ו is a vowel letter, u.',
        'A ה at the start or in the middle of a word is a consonant.',
      ],
      examples: [
        { he: 'יוֹם', note: 'yom: the י is a consonant, the ו a vowel letter (Bereshit 1:5).', mark: 'vowel-letter' },
        { he: 'וְאָמְרוּ', note: 've-a-m\'ru: only the last ו is a vowel letter (Devarim 27:15).', mark: 'vowel-letter' },
      ],
      check: [
        {
          id: 'chk-tap-amru',
          type: 'tap',
          prompt: 'Tap the vowel letter.',
          he: 'וְאָמְרוּ',
          feature: 'vowel-letter',
          answer: [4],
          explain: 'The last ו, a shuruk. The first ו has its own sheva, so it is a consonant.',
        },
      ],
    },
    {
      id: 'full-defective',
      heading: 'Full and defective spelling',
      body: [
        'The same vowel can be written with its vowel letter or without it. Spelling with the letter is called **full** (כְּתִיב מָלֵא); spelling without it is **defective** (כְּתִיב חָסֵר).',
        'Bereshit 5:1 has both in one word. In תּוֹלְדֹת the first o is written with a ו and the second has only the cholam dot.',
        'In a pointed text the vowel is there either way. In a Sefer Torah, which has no points, the spelling is fixed letter by letter.',
      ],
      examples: [
        { he: 'תּוֹלְדֹת', note: 'Full, then defective: both are cholam.', letters: [1, 3] },
      ],
      check: [
        {
          id: 'chk-toldot-second',
          type: 'choice',
          prompt: 'In תּוֹלְדֹת, how is the second o written?',
          options: [
            { text: 'With a cholam dot only, no ו', correct: true },
            { text: 'With a ו' },
            { text: 'With a ה' },
          ],
          explain: 'The second o is defective: just the cholam dot over the ד. The first o is full, written with a ו.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-shalom',
      type: 'tap',
      prompt: 'Tap the vowel letter.',
      he: 'שָׁלוֹם',
      feature: 'vowel-letter',
      answer: [2],
      explain: 'The ו, which carries the cholam: sha-lom.',
    },
    {
      id: 'tap-bereishit',
      type: 'tap',
      prompt: 'Tap the vowel letter.',
      he: 'בְּרֵאשִׁית',
      feature: 'vowel-letter',
      answer: [4],
      explain: 'The י after the chirik. The א is also silent here, but it is not one of the three vowel letters; silent letters like it come in a later lesson.',
    },
    {
      id: 'which-three',
      type: 'choice',
      prompt: 'Which three letters serve as vowel letters?',
      options: [
        { text: 'ה ו י', correct: true },
        { text: 'א ה ע' },
        { text: 'ב כ פ' },
      ],
      explain: 'ה, ו and י.',
    },
    {
      id: 'tf-vav-own-vowel',
      type: 'truefalse',
      statement: 'A ו with a vowel of its own, as in וְ, is a consonant.',
      answer: true,
      explain: 'True. A vowel letter carries no vowel of its own; a ו with its own vowel is sounded as v.',
    },
    {
      id: 'baruch-vav',
      type: 'choice',
      prompt: 'What does the ו in בָּרוּךְ show?',
      options: [
        { text: 'u (shuruk)', correct: true },
        { text: 'o (cholam)' },
        { text: 'v (a consonant)' },
      ],
      explain: 'The dot inside the ו makes it a shuruk, u: ba-ruch.',
    },
    {
      id: 'bank-final-he',
      type: 'wordbank',
      before: 'The final ה of בְּרָכָה is ',
      after: '.',
      options: [
        { text: 'silent', correct: true },
        { text: 'sounded as h' },
      ],
      explain: 'Silent. It only marks the vowel at the end of the word.',
    },
    {
      id: 'match-vowel-letters',
      type: 'match',
      prompt: 'Match each word with what its vowel letter shows.',
      pairs: [
        { left: 'שָׁלוֹם', right: 'A ו showing o' },
        { left: 'בָּרוּךְ', right: 'A ו showing u' },
        { left: 'בְּרֵאשִׁית', right: 'A י showing i' },
        { left: 'בְּרָכָה', right: 'A silent ה at the end' },
      ],
      explain: 'Cholam and shuruk use ו; chirik, tzere and segol can be followed by י; a vowel at the end of a word can be followed by ה.',
    },
    {
      id: 'tap-yom',
      type: 'tap',
      prompt: 'Tap the vowel letter.',
      he: 'יוֹם',
      feature: 'vowel-letter',
      answer: [1],
      explain: 'The ו, showing o. The י starts the word as a consonant, y.',
    },
  ],

  challenge: [
    {
      id: 'chal-tap-mibeit',
      type: 'tap',
      prompt: 'Tap the vowel letter.',
      he: 'מִבֵּית',
      feature: 'vowel-letter',
      answer: [2],
      explain: 'The י after the tzere (Shemot 20:2).',
    },
    {
      id: 'chal-torah-scroll',
      type: 'choice',
      prompt: 'In a Sefer Torah, how is the second o of תּוֹלְדֹת shown?',
      options: [
        { text: 'It is not shown at all: there is no ו and no point', correct: true },
        { text: 'By a cholam dot' },
        { text: 'By a ו' },
      ],
      explain: 'A Sefer Torah has no points, and this o is spelled defectively, without a ו. The reader has to know it.',
    },
    {
      id: 'chal-mappik',
      type: 'truefalse',
      statement: 'A ה with a dot in it at the end of a word (הּ) is a silent vowel letter, like the ה of תּוֹרָה.',
      answer: false,
      explain: 'False. The dot, mappik, shows that the ה is sounded as a consonant. Without the dot, a final ה is a silent vowel letter.',
    },
    {
      id: 'chal-tap-amru',
      type: 'tap',
      prompt: 'Tap every vowel letter.',
      he: 'וְאָמְרוּ אָמֵן',
      feature: 'vowel-letter',
      answer: [4],
      explain: 'Only the last ו of וְאָמְרוּ. אָמֵן has no vowel letter: its vowels are shown by points alone.',
    },
  ],
};
