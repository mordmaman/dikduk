// Ketiv and keri. Rules checked against Gesenius' Hebrew Grammar (1910), §17.
// Explanations and examples are original; example words were checked against
// the Masoretic text on Sefaria (Bereshit 3:20, 8:17, 24:16, 30:18;
// Tehillim 122:3; Ruth 3:5). The mixed form הַוְצֵא (Bereshit 8:17) shows how
// printed editions combine the written letters with the vowels of the reading
// (§17a); Sefaria prints the two separately. Jerusalem's extra chirik is
// described, not shown: neither Hebrew font can place it between the ל and ם.

export default {
  id: 'ketiv-keri',
  order: 13,
  title: 'Ketiv and keri',
  hebrewTitle: 'כְּתִיב וּקְרִי',
  summary: 'Words that are read differently from the way they are written.',

  teach: [
    {
      id: 'written-and-read',
      heading: 'Written one way, read another',
      body: [
        'The letters of a Sefer Torah are fixed, letter by letter (the Vowel letters lesson). But in some places the tradition reads a word differently from the way it is written.',
        'What is written is the **ketiv** (כְּתִיב, "written"). What is read is the **keri** (קְרִי, "read"). When the Torah is read in shul, the reader says the keri.',
        'Tanakh has many of these. Most are small: one letter is different, or two letters are the other way round.',
      ],
      examples: [
        { he: 'הוצא', note: 'Bereshit 8:17, as written: the ketiv.' },
        { he: 'הַיְצֵא', note: 'As read: the keri, hai-TZE, "bring out".' },
      ],
      check: [
        {
          id: 'chk-reader-says',
          type: 'truefalse',
          statement: 'When the Torah is read in shul, the reader says the ketiv.',
          answer: false,
          explain: 'False. The reader says the keri, the reading. The ketiv is what is written.',
        },
      ],
    },
    {
      id: 'on-the-page',
      heading: 'How your Chumash shows it',
      body: [
        'A printed Chumash keeps the written letters in the text, so you can see the ketiv. Usually it gives them the vowels of the keri, marks the word with a small circle, and prints the keri\'s letters in the margin or a footnote.',
        'So if a word in the text looks wrongly pointed, look in the margin. In Bereshit 8:17 the text has the letters הוצא with the vowels of הַיְצֵא.',
        'Some editions, like the text on Sefaria, print the two side by side instead: the ketiv in round brackets and the keri in square brackets.',
        'A Sefer Torah has none of this help: no vowels, no circle, no note. The reader must know the keri.',
      ],
      examples: [
        { he: 'הַוְצֵא', note: 'Bereshit 8:17 as many Chumashim print it: the letters הוצא with the vowels of הַיְצֵא. Read hai-TZE.' },
      ],
      check: [
        {
          id: 'chk-where-keri',
          type: 'choice',
          prompt: 'In a printed Chumash, where do you usually find the letters of the keri?',
          options: [
            { text: 'In the margin or a footnote', correct: true },
            { text: 'In the text, in place of the ketiv' },
            { text: 'Nowhere: you have to know it' },
          ],
          explain: 'In the margin or a footnote. The text keeps the written letters, usually with the vowels of the reading.',
        },
      ],
    },
    {
      id: 'always-read',
      heading: 'Words that are always read differently',
      body: [
        'A few common words are read differently every time, so editions do not add a note. They simply give the written letters the vowels of the reading.',
        'In the Torah, the word for "she" is usually written with the letters הוא, but read hi, as if it had a י. Your Chumash points it הִוא: כִּי הִוא הָיְתָה אֵם כָּל־חָי (Bereshit 3:20).',
        'And יִשָּׂשכָר is read yis-sa-CHAR: the second ש has no point and is not said.',
      ],
      examples: [
        { he: 'הִוא', note: 'Bereshit 3:20: read hi.', letters: [1] },
        { he: 'יִשָּׂשכָר', note: 'Bereshit 30:18: read yis-sa-CHAR.', letters: [2] },
      ],
      callout: {
        kind: 'note',
        text: 'Two more you know. Jerusalem is written ירושלם, with no י before the ם, but read ye-ru-sha-LA-yim; many editions add a small extra chirik before the ם to show it. And the Name, ה׳, is never read as it is written.',
      },
      check: [
        {
          id: 'chk-tap-yissachar',
          type: 'tap',
          prompt: 'Tap the letter that is written but not said.',
          he: 'יִשָּׂשכָר',
          answer: [2],
          explain: 'The second ש. It has no point of its own, and the name is read yis-sa-CHAR.',
        },
      ],
    },
    {
      id: 'read-not-written',
      heading: 'Read but not written',
      body: [
        'Rarely, a word is read that is not written at all. Then the text shows only its vowels, with no letters, and a note gives the word.',
        'Megillat Ruth, read on Shavuot, has one. In Ruth 3:5 Ruth says כֹּל אֲשֶׁר־תֹּאמְרִי אֶעֱשֶׂה, "all that you say I will do", and the reader adds אֵלַי, "to me", which is not written.',
        'The opposite also happens, more rarely still: a word is written but not read, and is left without vowels.',
      ],
      examples: [
        { he: 'כֹּל אֲשֶׁר־תֹּאמְרִי אֶעֱשֶׂה', note: 'Ruth 3:5, the written words. In your Chumash there is a small gap after תֹּאמְרִי with only the vowels of אֵלַי.' },
      ],
      check: [
        {
          id: 'chk-ruth-letters',
          type: 'truefalse',
          statement: 'In Ruth 3:5 the letters of אֵלַי are written in the text.',
          answer: false,
          explain: 'False. Only its vowels are printed. The reader says the word from the note.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'choice-keri',
      type: 'choice',
      prompt: 'What is the keri?',
      options: [
        { text: 'The way a word is read', correct: true },
        { text: 'The way a word is written' },
        { text: 'A trop mark' },
      ],
      explain: 'The keri (קְרִי) is what is read. The ketiv (כְּתִיב) is what is written.',
    },
    {
      id: 'match-ketiv-keri',
      type: 'match',
      prompt: 'Match each item to its meaning.',
      pairs: [
        { left: 'ketiv', right: 'what is written' },
        { left: 'keri', right: 'what is read' },
        { left: 'הִוא in the Torah', right: 'read hi' },
        { left: 'יִשָּׂשכָר', right: 'read yis-sa-CHAR' },
      ],
      explain: 'Ketiv is written, keri is read. הִוא and יִשָּׂשכָר are read differently every time they appear.',
    },
    {
      id: 'tf-hu',
      type: 'truefalse',
      statement: 'In the Torah, the word for "she", written with the letters הוא, is read hu.',
      answer: false,
      explain: 'False. It means "she" and is read hi. The chirik under the ה in הִוא is the vowel of the reading.',
    },
    {
      id: 'choice-chirik',
      type: 'choice',
      prompt: 'Why does הִוא have a chirik under the ה?',
      options: [
        { text: 'It carries the vowel of the reading, hi', correct: true },
        { text: 'It is a printing error' },
        { text: 'It is a pausal form' },
      ],
      explain: 'The written letters are given the vowels of the keri, so you can read hi straight off the page.',
    },
    {
      id: 'tf-sefer-torah',
      type: 'truefalse',
      statement: 'In a Sefer Torah, the keri is written in the margin.',
      answer: false,
      explain: 'False. A Sefer Torah has only the written letters: no vowels and no notes. The reader has to know the keri.',
    },
    {
      id: 'choice-jerusalem',
      type: 'choice',
      prompt: 'Jerusalem is written ירושלם, with no י before the ם. How is it read?',
      options: [
        { text: 'ye-ru-sha-LA-yim', correct: true },
        { text: 'ye-ru-sha-LEM' },
        { text: 'ye-ru-sha-LIM' },
      ],
      explain: 'ye-ru-sha-LA-yim. The written letters have no י before the ם; many editions add a small chirik to show the reading.',
    },
    {
      id: 'tf-wrong-pointing',
      type: 'truefalse',
      statement: 'If a word in a Chumash looks wrongly pointed, it may be a ketiv given the vowels of its keri.',
      answer: true,
      explain: 'True. Check the margin or the footnotes for the letters of the reading.',
    },
    {
      id: 'choice-ruth',
      type: 'choice',
      prompt: 'In Ruth 3:5 the reader says אֵלַי, which is not in the text. What kind of case is this?',
      options: [
        { text: 'Read but not written', correct: true },
        { text: 'Written but not read' },
        { text: 'A pausal form' },
      ],
      explain: 'Read but not written. The word is said, but its letters are not in the text.',
    },
  ],

  challenge: [
    {
      id: 'chal-hotze',
      type: 'choice',
      prompt: 'Bereshit 8:17 is written הוצא and read הַיְצֵא. Which letter changes in the reading?',
      options: [
        { text: 'The ו is read as a י', correct: true },
        { text: 'The ה is read as an א' },
        { text: 'Nothing changes' },
      ],
      explain: 'The written ו is read as a י: hai-TZE. The other letters are the same.',
    },
    {
      id: 'chal-naarah',
      type: 'choice',
      prompt: 'In Bereshit 24:16 Rivka is called וְהַנַּעֲרָ, written with no final ה. How is it read?',
      options: [
        { text: 'v\'han-na-a-RA, "and the girl"', correct: true },
        { text: 'v\'han-NA-ar, "and the boy"' },
        { text: 'v\'han-na-a-RACH' },
      ],
      explain: 'v\'han-na-a-RA. In the Torah, the word for "girl" is usually written נער, without its ה, but read נַעֲרָה. The vowels of the reading show it: a kamatz under the ר.',
    },
    {
      id: 'chal-issachar',
      type: 'choice',
      prompt: 'Why is the second ש of יִשָּׂשכָר left without a point?',
      options: [
        { text: 'That ש is written but never said: the name is always read yis-sa-CHAR', correct: true },
        { text: 'It has lost its dagesh' },
        { text: 'It is a vowel letter' },
      ],
      explain: 'It is one of the words that are always read differently. One ש is written but not said, so it gets no point.',
    },
  ],
};
