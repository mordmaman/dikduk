// Trop and pause. Rules checked against Gesenius' Hebrew Grammar (1910), §15
// (the accents) and §29 (the tone and the pause). Explanations and examples
// are original; example words, with their trop, were checked against the
// Masoretic text on Sefaria (Bereshit 1:6, 1:22, 29:6, 29:9; Shemot 24:7;
// Devarim 6:4, 6:7; Yehoshua 1:17).

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
      heading: 'Pausing marks and joining marks',
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
        'Every verse ends with **silluq**, the small upright line from the Meteg lesson, under the stressed syllable of the last word. After the word come the two dots of **sof pasuk** (סוֹף פָּסוּק, "end of verse").',
        'Most verses also have one main break in the middle, marked by **etnachta** (אֶתְנַחְתָּא, "resting"): a small wedge, like ^, under the stressed syllable.',
        'In the Shema the etnachta is under יִשְׂרָאֵל: the verse divides after "Hear, Israel".',
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
      heading: 'Words change at a break',
      body: [
        'At etnachta and silluq the reader pauses, and the word there is said with extra weight. Often one of its vowels changes. These are called **pausal forms** (from הֶפְסֵק, "pause").',
        'The commonest change: a short vowel becomes long. Bereshit 1:6 has the same word both ways: מַ֖יִם, with a patach, in the middle of a phrase, and הַמָּ֑יִם and לָמָֽיִם, with a kamatz, at the two big breaks.',
        'So if a familiar word has an unexpected kamatz at the end of a verse, look for a pause before anything else.',
      ],
      examples: [
        { he: 'מַ֖יִם', note: 'Bereshit 1:6, mid-phrase: patach.', letters: [0] },
        { he: 'לָמָֽיִם׃', note: 'Bereshit 1:6, at silluq: kamatz.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-why-kamatz',
          type: 'choice',
          prompt: 'Why does לָמָֽיִם have a kamatz under the מ, where מַ֖יִם has a patach?',
          options: [
            { text: 'It is at silluq, a pause, so the short vowel becomes long', correct: true },
            { text: 'The מ is doubled' },
            { text: 'It is a different word' },
          ],
          explain: 'It is a pausal form. At silluq the stressed vowel of the word is lengthened: the patach becomes a kamatz.',
        },
      ],
    },
    {
      id: 'vowel-returns',
      heading: 'A vowel comes back',
      body: [
        'Another change: where a word normally has a vocal sheva, a pause can bring a full vowel back.',
        'The Shema shows it in one phrase: וּבְשׇׁכְבְּךָ וּבְקוּמֶךָ, "when you lie down and when you get up" (Devarim 6:7). The ending "you" is usually -\'cha, with a sheva before it, as in וּבְשׇׁכְבְּךָ, u-v\'shoch-b\'cha. At the end of the verse it becomes -e-cha: וּבְקוּמֶךָ, u-v\'ku-me-cha.',
      ],
      examples: [
        { he: 'וּֽבְשׇׁכְבְּךָ֖ וּבְקוּמֶֽךָ׃', note: 'Devarim 6:7: -b\'cha mid-verse, then -me-cha at silluq.' },
      ],
      check: [
        {
          id: 'chk-shema-segol',
          type: 'truefalse',
          statement: 'In וּבְקוּמֶךָ, the segol before the ending is there because of the pause at the end of the verse.',
          answer: true,
          explain: 'True. Mid-verse the ending is -\'cha with a sheva before it, as in וּבְשׇׁכְבְּךָ. At silluq a full vowel comes back: -e-cha.',
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
      prompt: 'Where do pausal forms usually appear?',
      options: [
        { text: 'At etnachta and silluq', correct: true },
        { text: 'Under any servant mark' },
        { text: 'Before a makaf' },
      ],
      explain: 'At the two biggest breaks, etnachta in the middle of the verse and silluq at the end.',
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
      explain: 'הַמַּיִם, with a patach, as in Bereshit 1:22. At the pause the patach lengthens to a kamatz.',
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
        { left: 'silluq', right: 'the stressed syllable of the last word' },
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
      statement: 'At a pause, a short vowel often becomes long.',
      answer: true,
      explain: 'True. מַיִם becomes מָיִם at etnachta and silluq.',
    },
    {
      id: 'choice-which-pausal',
      type: 'choice',
      prompt: 'Which of these two words from Devarim 6:7 is the pausal form?',
      options: [
        { text: 'וּבְקוּמֶךָ', correct: true },
        { text: 'וּבְשׇׁכְבְּךָ' },
      ],
      keepOrder: true,
      explain: 'וּבְקוּמֶךָ, at the end of the verse. Its ending has a full vowel, -e-cha, where mid-verse there is a sheva, -\'cha.',
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
      explain: 'It is a pausal form. נַעֲשֶׂה וְנִשְׁמָע ends its verse, so the patach becomes a kamatz. In Yehoshua the word is mid-verse and keeps its patach.',
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
      explain: 'Pausal forms belong mainly to the two biggest breaks. The mark under the first מַיִם makes only a small break, so the word keeps its usual form.',
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
