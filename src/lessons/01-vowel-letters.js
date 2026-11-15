// Vowel letters. Rules checked against Gesenius' Hebrew Grammar (1910), §7–8.
// Explanations and examples are original;
// example words were checked against the Masoretic text and the siddur on
// Sefaria (Bereshit 1:1, 1:5, 5:1, 12:2; Shemot 20:2; Devarim 27:15, 33:4).

export default {
  id: 'vowel-letters',
  order: 1,
  title: 'Vowel letters',
  hebrewTitle: 'אִמּוֹת הַקְּרִיאָה',
  summary: 'How ה, ו and י show vowels, and how to tell when they are consonants.',

  teach: [
    {
      id: 'reading-key',
      heading: 'Before you start: the vowel names',
      body: [
        'These lessons call each vowel point by its name. Here they are, written on the letter א so you can see each sign.',
      ],
      table: {
        headers: ['Name', 'Sign', 'Sound'],
        rows: [
          ['kamatz', 'אָ', 'a (sometimes o: lesson 9)'],
          ['patach', 'אַ', 'a'],
          ['tzere', 'אֵ', 'e'],
          ['segol', 'אֶ', 'e'],
          ['chirik', 'אִ', 'i'],
          ['cholam', 'אֹ or וֹ', 'o'],
          ['shuruk', 'וּ', 'u'],
          ['kubutz', 'אֻ', 'u'],
          ['sheva', 'אְ', 'a quick e, or nothing (lesson 3)'],
        ],
      },
      callout: [
        {
          kind: 'note',
          text: 'How the spellings work. Hyphens split a word into the parts you say: ba-ruch. An apostrophe stands for a quick, half-swallowed e: sh\'ma. Capitals show the part said most strongly: sha-LOM (lesson 2 explains this). A silent ה is left out: תּוֹרָה is to-ra.',
        },
        {
          kind: 'note',
          text: 'If you read with an Ashkenazi pronunciation, some sounds differ: kamatz is said o or aw, tzere often ei, and a ת without a dot in it s. The pronunciations in these lessons follow Sephardi and modern Israeli Hebrew. The grammar is the same either way.',
        },
      ],
      check: [
        {
          id: 'chk-name-tzere',
          type: 'choice',
          prompt: 'What is the vowel under the א in אֵ called?',
          options: [
            { text: 'tzere', correct: true },
            { text: 'segol' },
            { text: 'patach' },
          ],
          explain: 'Tzere: two dots side by side. Segol has three dots, and patach is a short line.',
        },
      ],
    },
    {
      id: 'consonants-only',
      heading: 'An alphabet of consonants',
      body: [
        'Every letter of the Hebrew alphabet is a consonant: a sound like b, m or sh, not a vowel like a, e or o. The vowel points you read were added many centuries after the text was written, and a Sefer Torah is still written without them.',
        'Long before the points, three letters were pressed into service to show the main vowels: **ה**, **ו** and **י**. These are the **vowel letters**, in Hebrew אִמּוֹת הַקְּרִיאָה, "mothers of reading". (א sometimes does the same job, as in לֹא, but it is not one of the main three.)',
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
          explain: 'The ו, with the cholam written on it (o), and the final ה, which is silent after the kamatz (a).',
        },
      ],
    },
    {
      id: 'which-vowel',
      heading: 'Which vowels they show',
      body: [
        'Each vowel letter shows a particular group of sounds.',
        'A final ה is silent: you hear only the vowel before it. It is different from a ה with a dot in it at the end of a word (a **mappik**, מַפִּיק, הּ), which is sounded.',
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
        'A ו or י with a vowel or a sheva of its own is a consonant. In יוֹם the י is a consonant, y, with the ו after it showing o. In וְאָמְרוּ the first ו is a consonant, v, with its own sheva, and the last ו is a vowel letter, u.',
        'A ה at the start or in the middle of a word is a consonant.',
      ],
      examples: [
        { he: 'יוֹם', note: 'yom: the י is a consonant, the ו a vowel letter (Bereshit 1:5).', mark: 'vowel-letter' },
        { he: 'וְאָמְרוּ', note: 've-a-m\'ru: only the last ו is a vowel letter (Devarim 27:15).', mark: 'vowel-letter' },
        { he: 'בְּמִצְוֹתָיו', note: 'b\'mitz-vo-tav: neither ו is a vowel letter here.', letters: [3, 6] },
      ],
      callout: {
        kind: 'note',
        text: 'One case to watch: a ו with the cholam dot over it can also be a consonant, v, followed by o. In בְּמִצְוֹתָיו, said in every berakha over a mitzvah, the first ו is v: b\'mitz-vo-tav. The ending ־ָיו is said -av: the י is silent and the last ו is v.',
      },
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
        'In a pointed text the vowel is there either way. A Sefer Torah has no points, so the scribe must spell each word exactly as it is written there, with or without its vowel letter.',
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
      explain: 'The י after the chirik. The א is silent here too, but it is not one of the three vowel letters.',
    },
    {
      id: 'which-three',
      type: 'choice',
      prompt: 'Which three letters are the main vowel letters?',
      options: [
        { text: 'ה ו י', correct: true },
        { text: 'א ה ע' },
        { text: 'ב כ פ' },
      ],
      explain: 'ה, ו and י, the "mothers of reading". א sometimes does the same job, but it is not one of the three.',
    },
    {
      id: 'tf-vav-own-vowel',
      type: 'truefalse',
      statement: 'A ו with a vowel or a sheva under it, as in וְ, is a consonant.',
      answer: true,
      explain: 'True. A vowel letter has no point under or over it of its own. This ו has a sheva, so it is said v.',
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
