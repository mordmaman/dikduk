// Makaf. Rules checked against Gesenius' Hebrew Grammar (1910), §9, §16.
// Explanations and examples are original; example
// words were checked against the Masoretic text on Sefaria (Bereshit 1:2, 1:5,
// 2:1, 2:10; Devarim 6:5, 16:18; Zecharyah 2:14; Tehillim 117:1).

export default {
  id: 'makaf',
  order: 8,
  title: 'Makaf',
  hebrewTitle: 'מַקָּף',
  summary: 'The short line that joins words, and what it does to their vowels.',

  teach: [
    {
      id: 'what-makaf',
      heading: 'Words joined into one',
      body: [
        'A **makaf** (מַקָּף) is a short line at the top of the letters, joining two or more short words that belong closely together.',
        'The joined words are read as a single unit with **one main stress**, on the last word. The words before the makaf give up their own stress.',
      ],
      examples: [
        { he: 'עַל־פְּנֵי', note: 'Bereshit 1:2: "over the face of".' },
        { he: 'בַּת־צִיּוֹן', note: 'Zecharyah 2:14, the haftarah of Shabbat Chanukah: "daughter of Zion".' },
      ],
      check: [
        {
          id: 'chk-one-stress',
          type: 'truefalse',
          statement: 'In a group joined by makaf, only the last word keeps its stress.',
          answer: true,
          explain: 'True. The group is read as one word, stressed on its last part.',
        },
      ],
    },
    {
      id: 'vowel-shortens',
      heading: 'Losing the stress can shorten the vowel',
      body: [
        'Remember the firm rule from the Syllables lesson: a closed syllable without the stress almost always has a short vowel.',
        'A short closed word that loses its stress before a makaf normally follows that rule. On its own, אֵת has a tzere, as in the Shema. Joined by makaf in אֶת־הַגָּן, it is unstressed, so the tzere becomes a segol.',
      ],
      examples: [
        { he: 'אֵת', note: 'On its own: tzere (Devarim 6:5).', letters: [0] },
        { he: 'אֶת־הַגָּן', note: 'Joined: segol (Bereshit 2:10).', letters: [0] },
      ],
      check: [
        {
          id: 'chk-predict-et',
          type: 'predict',
          prompt: 'Joined by makaf, what do these become?',
          parts: ['אֵת', 'הַגָּן'],
          options: [
            { text: 'אֶת־הַגָּן', correct: true },
            { text: 'אֵת־הַגָּן' },
            { text: 'אַת־הַגָּן' },
          ],
          explain: 'אֵת loses its stress and is a closed syllable, so its vowel must be short: the tzere becomes a segol.',
        },
      ],
    },
    {
      id: 'kol',
      heading: 'The most common case: כָּל',
      body: [
        'One of the commonest words before a makaf is כָּל, "all". Written with an ordinary kamatz, it is read **kol**, not kal.',
        'The reason is the same rule. Before the makaf it is closed and unstressed, so its vowel must be short, and the short o sound is written with the kamatz sign. This is kamatz katan, the subject of the next lesson.',
        'In Kiddush on Friday night: וְכָל־צְבָאָם, v\'chol-tz\'va-am.',
      ],
      examples: [
        { he: 'וְכָל־צְבָאָם', note: 'Bereshit 2:1, in Kiddush: v\'chol.', letters: [1] },
        { he: 'וְכׇל־צְבָאָם', note: 'The same words with the kamatz katan sign some editions use.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-kol',
          type: 'choice',
          prompt: 'How is כָּל read in כָּל־גּוֹיִם (Tehillim 117:1)?',
          options: [
            { text: 'kol', correct: true },
            { text: 'kal' },
          ],
          keepOrder: true,
          explain: 'kol. Before the makaf it is closed and unstressed, so its kamatz is the short o, kamatz katan.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'what-is-makaf',
      type: 'choice',
      prompt: 'What is a makaf?',
      options: [
        { text: 'A short line that joins words to be read as one', correct: true },
        { text: 'A line under a vowel that marks a pause' },
        { text: 'A dot that doubles a letter' },
      ],
      explain: 'A makaf joins words into a single unit with one main stress.',
    },
    {
      id: 'et-segol-why',
      type: 'choice',
      prompt: 'In אֶת־הַגָּן, why does אֶת have a segol and not a tzere?',
      options: [
        { text: 'Joined by makaf it loses its stress, and a closed unstressed syllable needs a short vowel', correct: true },
        { text: 'The ה after it changes the vowel' },
        { text: 'This word is always written with a segol' },
      ],
      explain: 'On its own it is אֵת, with a tzere. Before the makaf it is unstressed, so the vowel shortens to segol.',
    },
    {
      id: 'tf-keeps-stress',
      type: 'truefalse',
      statement: 'A word before a makaf keeps its own stress.',
      answer: false,
      explain: 'False. It gives up its stress; the group is stressed on its last word.',
    },
    {
      id: 'bank-et',
      type: 'wordbank',
      before: 'Joined by makaf, אֵת becomes אֶת־: its tzere becomes a ',
      after: '.',
      options: [
        { text: 'segol', correct: true },
        { text: 'patach' },
        { text: 'chirik' },
      ],
      explain: 'Segol, the short partner of tzere. The word lost its stress, so its vowel shortened.',
    },
    {
      id: 'stress-of-group',
      type: 'choice',
      prompt: 'In וְכָל־צְבָאָם, which word carries the main stress?',
      options: [
        { text: 'צְבָאָם', correct: true },
        { text: 'וְכָל' },
      ],
      keepOrder: true,
      explain: 'צְבָאָם, the last word of the group. וְכָל gives up its stress, which is why its kamatz is short: v\'chol.',
    },
    {
      id: 'kol-in-kiddush',
      type: 'choice',
      prompt: 'How is the first word of וְכָל־צְבָאָם read in Kiddush?',
      options: [
        { text: 'v\'chol', correct: true },
        { text: 'v\'chal' },
        { text: 'v\'kol' },
      ],
      explain: 'v\'chol: the kamatz is the short o before the makaf, and the כ is soft after the vocal sheva of the ו.',
    },
  ],

  challenge: [
    {
      id: 'chal-tap-kol',
      type: 'tap',
      prompt: 'Tap the letter whose kamatz is read o.',
      he: 'וְכָל־צְבָאָם',
      feature: 'kamatz',
      all: false,
      answer: [1],
      explain: 'The כ. Its syllable is closed and unstressed before the makaf. The other two kamatzes are in an open syllable (va) and a stressed one (am), so they are read a.',
    },
    {
      id: 'chal-why-different',
      type: 'choice',
      prompt: 'Why is the kamatz in כָּל־ read o, while the last kamatz of צְבָאָם is read a?',
      options: [
        { text: 'כָּל־ is closed and unstressed; the last syllable of צְבָאָם is closed but stressed', correct: true },
        { text: 'A kamatz under כ is always o' },
        { text: 'The makaf changes every vowel after it' },
      ],
      explain: 'Only a closed syllable without the stress must be short. The last syllable of צְבָאָם carries the stress of the whole group, so its kamatz stays long.',
    },
    {
      id: 'chal-al-penei',
      type: 'truefalse',
      statement: 'עַל־פְּנֵי is read with one main stress, on פְּנֵי.',
      answer: true,
      explain: 'True. עַל gives up its stress to the last word of the group.',
    },
  ],
};
