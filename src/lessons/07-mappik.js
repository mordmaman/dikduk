// Mappik. Rules checked against Gesenius' Hebrew Grammar (1910), §14.
// Explanations and examples are original; example
// words were checked against the Masoretic text and the siddur on Sefaria
// (Bereshit 2:23, 3:6; Bamidbar 19:2; Tehillim 131:1; Kaddish).

export default {
  id: 'mappik',
  order: 7,
  title: 'Mappik',
  hebrewTitle: 'מַפִּיק',
  summary: 'The dot in a final ה that makes it sounded.',

  teach: [
    {
      id: 'silent-or-sounded',
      heading: 'A ה you can hear',
      body: [
        'A ה at the end of a word is usually a silent vowel letter, as in תּוֹרָה or אִשָּׁה.',
        'When a final ה has a dot in it, it is a real consonant and is sounded: h. That dot is a **mappik** (מַפִּיק, "bringing out"): it brings the ה out to be heard.',
        'In Bamidbar 19:2 the red heifer is one with no blemish, אֵין־בָּהּ מוּם: bah, with the h sounded.',
      ],
      examples: [
        { he: 'אִשָּׁה', note: 'Bereshit 2:23: the ה is silent.' },
        { he: 'בָּהּ', note: 'Bamidbar 19:2: mappik, the ה is sounded.', mark: 'mappik' },
      ],
      check: [
        {
          id: 'chk-tap-bah',
          type: 'tap',
          prompt: 'Tap the letter with a mappik.',
          he: 'בָּהּ',
          feature: 'mappik',
          answer: [1],
          explain: 'The ה. The dot in the ב is a dagesh; the dot in the final ה is a mappik.',
        },
      ],
    },
    {
      id: 'her',
      heading: 'Usually it means "her"',
      body: [
        'Most of the time a mappik marks the ending that means "her", or "its" when the thing is feminine in Hebrew, like אֶרֶץ.',
        'Bereshit 3:6 has two in a row: לְאִישָׁהּ עִמָּהּ, "to her husband with her". Compare אִשָּׁה, "a woman", with its silent ה.',
        'The Aramaic of Kaddish uses the same mark for "his": שְׁמֵהּ, sh\'meh, "his name".',
      ],
      examples: [
        { he: 'לְאִישָׁהּ', note: 'to her husband', mark: 'mappik' },
        { he: 'עִמָּהּ', note: 'with her', mark: 'mappik' },
        { he: 'שְׁמֵהּ', note: 'Kaddish: his name', mark: 'mappik' },
        { he: 'לֹא־גָבַהּ לִבִּי', note: 'Tehillim 131:1: "my heart is not proud". See the note.', mark: 'mappik' },
      ],
      callout: {
        kind: 'note',
        text: 'A mappik also comes where a sounded ה is part of the word itself, not an ending: in גָבַהּ, "proud", the ה belongs to the root.',
      },
      check: [
        {
          id: 'chk-imah',
          type: 'choice',
          prompt: 'What does the mappik in עִמָּהּ show?',
          options: [
            { text: 'The ה is sounded: im-mah, "with her"', correct: true },
            { text: 'The ה is doubled' },
            { text: 'The ה is silent' },
          ],
          explain: 'A mappik makes the final ה a sounded consonant. Here it is the ending "her".',
        },
      ],
    },
    {
      id: 'not-dagesh',
      heading: 'A mappik is not a dagesh',
      body: [
        'A mappik looks exactly like a dagesh, but it does a different job. It does not harden or double the letter; it only says the ה is sounded.',
        'Since ה is a guttural and cannot be doubled, a dot in a final ה is always a mappik.',
      ],
      check: [
        {
          id: 'chk-not-doubled',
          type: 'truefalse',
          statement: 'A mappik doubles the ה.',
          answer: false,
          explain: 'False. ה cannot be doubled. The mappik only shows that the ה is sounded.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-imah',
      type: 'tap',
      prompt: 'Tap the letter with a mappik.',
      he: 'עִמָּהּ',
      feature: 'mappik',
      answer: [2],
      explain: 'The final ה. The dot in the מ is a dagesh forte.',
    },
    {
      id: 'tap-ein-bah',
      type: 'tap',
      prompt: 'Tap the letter with a mappik.',
      he: 'אֵין־בָּהּ',
      feature: 'mappik',
      answer: [4],
      explain: 'The final ה of בָּהּ: a dot in a final ה is a mappik. The dot in the ב is a dagesh.',
    },
    {
      id: 'which-sounded',
      type: 'choice',
      prompt: 'Which word ends in a sounded ה?',
      options: [
        { text: 'לְאִישָׁהּ', correct: true },
        { text: 'אִשָּׁה' },
        { text: 'תּוֹרָה' },
        { text: 'בְּרָכָה' },
      ],
      explain: 'לְאִישָׁהּ has a mappik in its final ה. In the others the final ה is a silent vowel letter.',
    },
    {
      id: 'tf-ishah',
      type: 'truefalse',
      statement: 'The final ה of אִשָּׁה is sounded.',
      answer: false,
      explain: 'False. It has no mappik, so it is a silent vowel letter.',
    },
    {
      id: 'bank-mappik',
      type: 'wordbank',
      before: 'A dot in a ה at the end of a word is called a ',
      after: '.',
      options: [
        { text: 'mappik', correct: true },
        { text: 'dagesh' },
        { text: 'meteg' },
      ],
      explain: 'Mappik: it brings out the sound of the ה.',
    },
    {
      id: 'match-meaning',
      type: 'match',
      prompt: 'Match each word with its meaning.',
      pairs: [
        { left: 'אִשָּׁה', right: 'a woman' },
        { left: 'לְאִישָׁהּ', right: 'to her husband' },
        { left: 'עִמָּהּ', right: 'with her' },
        { left: 'שְׁמֵהּ', right: 'his name (Aramaic)' },
      ],
      explain: 'The three words with a mappik end in "her" or, in Aramaic, "his".',
    },
  ],

  challenge: [
    {
      id: 'chal-tap-two',
      type: 'tap',
      prompt: 'Tap every letter with a mappik.',
      he: 'גַּם־לְאִישָׁהּ עִמָּהּ',
      feature: 'mappik',
      answer: [6, 9],
      explain: 'The final ה of לְאִישָׁהּ and the final ה of עִמָּהּ (Bereshit 3:6).',
    },
    {
      id: 'chal-why-never-dagesh',
      type: 'choice',
      prompt: 'Why can a dot in a final ה never be a dagesh forte?',
      options: [
        { text: 'ה is a guttural and cannot be doubled', correct: true },
        { text: 'A dagesh never comes at the end of a word' },
        { text: 'Only begad kefat letters take a dot' },
      ],
      explain: 'The gutturals א ה ח ע cannot be doubled, so a dot in a ה can only be a mappik.',
    },
    {
      id: 'chal-kaddish',
      type: 'choice',
      prompt: 'In Kaddish, שְׁמֵהּ ends with a mappik. How is it said?',
      options: [
        { text: 'sh\'meh, with the h sounded', correct: true },
        { text: 'sh\'me, with a silent ה' },
      ],
      keepOrder: true,
      explain: 'The mappik makes the ה sounded: sh\'meh, "his name".',
    },
  ],
};
