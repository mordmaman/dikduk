// Trop and pause. Rules checked against Gesenius' Hebrew Grammar (1910), §15
// (the accents) and §29 (the tone and the pause). Explanations and examples
// are original; example words, with their trop, were checked against the
// Masoretic text on Sefaria (Bereshit 1:6, 1:22, 29:6, 29:9; Shemot 24:7;
// Devarim 6:4, 6:5, 6:7; Yehoshua 1:17).

export default {
  id: 'trop-and-pause',
  order: 12,
  title: 'Trop and pause',
  hebrewTitle: 'טְעָמִים',
  summary: 'What the trop marks tell you, and how words change at a pause.',

  teach: [
    {
      id: 'more-than-a-tune',
      heading: 'More than a tune',
      body: [
        'The trop marks (טְעָמִים) above and below the words of Tanakh give the tune for reading aloud. They also do two jobs for grammar.',
        'First, most of them sit on the **stressed syllable**. In the Syllables lesson, the trop showed whether בָּאָה is BA-a or ba-A.',
        'Second, they **divide the verse** into phrases, as punctuation does in English.',
      ],
      examples: [
        { he: 'שְׁמַ֖ע יִשְׂרָאֵ֑ל', note: 'Devarim 6:4. Each mark sits on the stressed syllable: sh\'MA yis-ra-EL.' },
      ],
      callout: {
        kind: 'note',
        text: 'A few trop marks always sit at the very start or the very end of a word, wherever the stress falls. Those do not show the stress.',
      },
      check: [
        {
          id: 'chk-on-stress',
          type: 'truefalse',
          statement: 'Most trop marks sit on the stressed syllable of their word.',
          answer: true,
          explain: 'True. That is why the trop can tell you whether a word is milra or mil\'el.',
        },
      ],
    },
    {
      id: 'kings-servants',
      heading: 'Breaking marks and joining marks',
      body: [
        'Some trop marks make a break after their word, like a comma. They are called **kings** (מְלָכִים). Others join their word to the next one. They are called **servants** (מְשָׁרְתִים).',
        'In Bereshit 1:6, בֵּ֥ין מַ֖יִם לָמָֽיִם, "between water and water": the mark under בֵּין is a servant, so it runs on into מַיִם. The mark under מַיִם is a king, so there is a slight break before לָמָיִם.',
      ],
      examples: [
        { he: 'בֵּ֥ין מַ֖יִם לָמָֽיִם׃', note: 'Bereshit 1:6: a servant, then a king, then the end of the verse.' },
      ],
      check: [
        {
          id: 'chk-king',
          type: 'choice',
          prompt: 'What does a "king" trop mark do?',
          options: [
            { text: 'Makes a break after its word', correct: true },
            { text: 'Joins its word to the next' },
            { text: 'Shows that a letter is doubled' },
          ],
          explain: 'A king makes a break after its word, like a comma. A servant joins its word to the next.',
        },
      ],
    },
    {
      id: 'two-big-pauses',
      heading: 'The two biggest breaks',
      body: [
        'Every verse ends with silluq, the small upright line from the Meteg lesson, under the stressed syllable of the last word. After the word come the two dots of **sof pasuk** (סוֹף פָּסוּק, "end of verse").',
        'Most verses also have one main break in the middle, marked by **etnachta** (אֶתְנַחְתָּא, "resting"): a small wedge, like ^, under the stressed syllable.',
        'Etnachta and silluq are the two strongest kings. In the Shema the etnachta is under יִשְׂרָאֵל: the verse divides after "Hear, Israel".',
      ],
      examples: [
        { he: 'שְׁמַ֖ע יִשְׂרָאֵ֑ל', note: 'Devarim 6:4: etnachta under the stressed syllable of יִשְׂרָאֵל.' },
        { he: 'הַמָּ֑יִם', note: 'Bereshit 1:6: etnachta, the middle of the verse.' },
        { he: 'לָמָֽיִם׃', note: 'Bereshit 1:6: silluq and sof pasuk, the end of the verse.' },
      ],
      check: [
        {
          id: 'chk-middle-break',
          type: 'choice',
          prompt: 'Which mark shows the main break in the middle of a verse?',
          options: [
            { text: 'etnachta', correct: true },
            { text: 'silluq' },
            { text: 'meteg' },
          ],
          explain: 'Etnachta. Silluq marks the end of the verse, and a meteg is not a trop mark at all.',
        },
      ],
    },
    {
      id: 'pausal-forms',
      heading: 'Words change at a big break',
      body: [
        'At etnachta and silluq the reader pauses longest, and the word there is said with extra weight. Often one of its vowels changes. These are called **pausal forms** (צוּרוֹת הֶפְסֵק, "pause forms"). They come mostly at these two breaks, and only sometimes at a smaller king.',
        'The commonest change: the stressed vowel, if it is short, becomes long. Bereshit 1:6 has מַיִם three times. At a small break it keeps its patach: מַ֖יִם, MA-yim. At the two biggest breaks it has a kamatz: הַמָּ֑יִם at etnachta and לָמָֽיִם at silluq.',
        'So if a familiar word has an unexpected kamatz at etnachta or at the end of a verse, a pause is the likely reason.',
      ],
      examples: [
        { he: 'מַ֖יִם', note: 'Bereshit 1:6, at a small break: patach.', letters: [0] },
        { he: 'לָמָֽיִם׃', note: 'Bereshit 1:6, at silluq: kamatz.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-why-kamatz',
          type: 'choice',
          prompt: 'Why does לָמָֽיִם have a kamatz under the מ, where מַ֖יִם has a patach?',
          options: [
            { text: 'It is at silluq, a big break, so the short stressed vowel becomes long', correct: true },
            { text: 'The מ is doubled' },
            { text: 'It is a different word' },
          ],
          explain: 'It is a pausal form. מַיִם is stressed on its first syllable, MA-yim. At silluq that stressed patach is lengthened to a kamatz.',
        },
      ],
    },
    {
      id: 'full-vowel',
      heading: 'A full vowel for a sheva',
      body: [
        'Another change: where a word normally has a vocal sheva, a big break can give it a full vowel instead.',
        'The Shema shows it: בְּכָל־לְבָבְךָ וּבְכָל־נַפְשְׁךָ וּבְכָל־מְאֹדֶךָ, "with all your heart, and with all your soul, and with all your might" (Devarim 6:5). All three words end in ךָ, "your".',
        'In the first two, mid-verse, the letter before ךָ has a vocal sheva: l\'va-v\'CHA, naf-sh\'CHA. The third ends the verse, at silluq. There the letter before ךָ has a full vowel, a segol: m\'o-DE-cha.',
      ],
      examples: [
        { he: 'בְּכׇל־לְבָבְךָ֥ וּבְכׇל־נַפְשְׁךָ֖ וּבְכׇל־מְאֹדֶֽךָ׃', note: 'Devarim 6:5: a sheva before ךָ twice, then a segol at silluq.' },
      ],
      callout: {
        kind: 'note',
        text: 'Two things to know. Words with a י before the ending, like לְבָנֶיךָ, "your children", always say -e-cha, pause or not. And now and then a word takes the full vowel at a smaller king, as בְּבֵיתֶךָ, "in your house", does in Devarim 6:7.',
      },
      check: [
        {
          id: 'chk-meodecha',
          type: 'truefalse',
          statement: 'In מְאֹדֶךָ, the segol before ךָ is there because of the pause at the end of the verse.',
          answer: true,
          explain: 'True. Mid-verse the letter before ךָ has a vocal sheva, as in לְבָבְךָ and נַפְשְׁךָ. At silluq it has a full vowel: m\'o-DE-cha.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'choice-verse-end',
      type: 'choice',
      prompt: 'Which two marks end a verse?',
      options: [
        { text: 'silluq and sof pasuk', correct: true },
        { text: 'etnachta and silluq' },
        { text: 'meteg and makaf' },
      ],
      explain: 'Silluq, under the stressed syllable of the last word, and the two dots of sof pasuk after it.',
    },
    {
      id: 'tf-servant',
      type: 'truefalse',
      statement: 'A servant (joining) mark makes a break after its word.',
      answer: false,
      explain: 'False. A servant joins its word to the next. A king makes the break.',
    },
    {
      id: 'choice-where-pausal',
      type: 'choice',
      prompt: 'Where do pausal forms mostly appear?',
      options: [
        { text: 'At etnachta and silluq', correct: true },
        { text: 'Under any servant mark' },
        { text: 'Before a makaf' },
      ],
      explain: 'Mostly at the two biggest breaks, etnachta in the middle of the verse and silluq at the end.',
    },
    {
      id: 'choice-usual-form',
      type: 'choice',
      prompt: 'Bereshit 1:6 has הַמָּ֑יִם, with a kamatz, at etnachta. What is the usual form, away from a pause?',
      options: [
        { text: 'הַמַּיִם', correct: true },
        { text: 'הַמֵּיִם' },
        { text: 'הַמְּיִם' },
      ],
      explain: 'הַמַּיִם, with a patach, as in Bereshit 1:22. At the pause the stressed patach lengthens to a kamatz.',
    },
    {
      id: 'tf-only-tune',
      type: 'truefalse',
      statement: 'The trop marks only give the tune; they tell you nothing about grammar.',
      answer: false,
      explain: 'False. Most of them mark the stressed syllable, and together they divide the verse into phrases.',
    },
    {
      id: 'match-marks',
      type: 'match',
      prompt: 'Match each mark to what it does.',
      pairs: [
        { left: 'etnachta', right: 'the main break mid-verse' },
        { left: 'silluq', right: 'ends the verse, under the last word' },
        { left: 'sof pasuk', right: 'the two dots after the last word' },
        { left: 'a servant', right: 'joins its word to the next' },
      ],
      explain: 'Etnachta divides the verse, silluq and sof pasuk end it, and servants join words into phrases.',
    },
    {
      id: 'choice-shema-break',
      type: 'choice',
      prompt: 'In Devarim 6:4, where does the first half of the verse end?',
      he: 'שְׁמַ֖ע יִשְׂרָאֵ֑ל',
      options: [
        { text: 'After יִשְׂרָאֵל', correct: true },
        { text: 'After שְׁמַע' },
        { text: 'There is no break' },
      ],
      explain: 'After יִשְׂרָאֵל, which carries the etnachta.',
    },
    {
      id: 'tf-lengthen',
      type: 'truefalse',
      statement: 'At a big break, a short stressed vowel often becomes long.',
      answer: true,
      explain: 'True. מַיִם becomes מָיִם at etnachta and silluq.',
    },
    {
      id: 'choice-which-pausal',
      type: 'choice',
      prompt: 'Which of these words from Devarim 6:5 is the pausal form?',
      options: [
        { text: 'וּבְכָל־מְאֹדֶךָ', correct: true },
        { text: 'וּבְכָל־נַפְשְׁךָ' },
        { text: 'בְּכָל־לְבָבְךָ' },
      ],
      explain: 'וּבְכָל־מְאֹדֶךָ, at the end of the verse. The letter before ךָ has a full vowel, a segol, where mid-verse there is a vocal sheva.',
    },
  ],

  challenge: [
    {
      id: 'chal-nishma',
      type: 'choice',
      prompt: 'At Sinai the people say נַעֲשֶׂה וְנִשְׁמָע, with a kamatz under the מ (Shemot 24:7). In Yehoshua 1:17 the same word is כֵּן נִשְׁמַע, with a patach. Why the difference?',
      options: [
        { text: 'וְנִשְׁמָע ends the verse, at silluq, so its vowel is lengthened', correct: true },
        { text: 'The ו in front of it changes the vowel' },
        { text: 'They are two different verbs' },
      ],
      explain: 'It is a pausal form. נַעֲשֶׂה וְנִשְׁמָע ends its verse, so the stressed patach becomes a kamatz. In Yehoshua the word is mid-verse and keeps its patach.',
    },
    {
      id: 'chal-first-mayim',
      type: 'choice',
      prompt: 'In בֵּ֥ין מַ֖יִם לָמָֽיִם, the first מַיִם has a king mark under it. Why does it keep its patach?',
      options: [
        { text: 'Its mark is a smaller break, not etnachta or silluq', correct: true },
        { text: 'King marks always shorten a vowel' },
        { text: 'It is not a real word' },
      ],
      explain: 'Pausal forms belong mainly to the two biggest breaks. The mark under the first מַיִם makes only a small break, so here the word keeps its usual form.',
    },
    {
      id: 'chal-rashi',
      type: 'choice',
      prompt: 'In Bereshit 29, how can a reader tell that בָּאָה in verse 9 means "she came" and not "she is coming"?',
      options: [
        { text: 'Its trop mark is on the first syllable, BA-a', correct: true },
        { text: 'Its vowels are different from verse 6' },
        { text: 'It has a mappik in the ה' },
      ],
      explain: 'The letters and vowels are the same in both verses. Only the stress differs, and the trop marks show where it falls.',
    },
  ],
};
