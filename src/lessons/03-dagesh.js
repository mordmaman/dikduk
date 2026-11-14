// PLACEHOLDER. This file only exists to exercise the engine and will be replaced
// in full by the proofed Dagesh lesson. Its Hebrew is limited to four words,
// as supplied for testing: בָּרוּךְ, תּוֹרָה, שַׁבָּת, הַמֶּלֶךְ. Nothing here is
// teaching content; the explanations restate only the facts supplied with them.

export default {
  id: 'dagesh',
  order: 3,
  title: 'Dagesh',
  weingreen: '§8',
  summary: 'Placeholder lesson for testing the engine. The real Dagesh lesson replaces it.',
  placeholder: true,

  teach: [
    {
      id: 'placeholder-words',
      heading: 'Placeholder: four words',
      body: [
        'This is a **placeholder** screen. It shows how a teaching screen looks: a short paragraph or two, then large examples.',
        'Each example below underlines the letter that carries a dagesh.',
      ],
      examples: [
        { he: 'בָּרוּךְ', note: 'Dagesh lene in the ב', mark: 'dagesh' },
        { he: 'תּוֹרָה', note: 'Dagesh lene in the ת', mark: 'dagesh' },
        { he: 'שַׁבָּת', note: 'Dagesh forte in the ב', mark: 'dagesh' },
        { he: 'הַמֶּלֶךְ', note: 'Dagesh forte in the מ', mark: 'dagesh' },
      ],
      callout: { kind: 'note', text: 'Placeholder callout. The real lesson can use a note or a tip here.' },
      check: [
        {
          id: 'chk-forte-mem',
          type: 'choice',
          prompt: 'Placeholder check: which word has a dagesh forte in the מ?',
          options: [
            { text: 'הַמֶּלֶךְ', correct: true },
            { text: 'בָּרוּךְ' },
            { text: 'תּוֹרָה' },
            { text: 'שַׁבָּת' },
          ],
          explain: 'Placeholder: הַמֶּלֶךְ has a dagesh forte in the מ.',
        },
      ],
    },
    {
      id: 'placeholder-table',
      heading: 'Placeholder: a table',
      body: ['A teaching screen can also carry a table. Hebrew inside a table cell, such as שַׁבָּת, is set right to left automatically.'],
      table: {
        headers: ['Word', 'Letter with the dagesh', 'Kind'],
        rows: [
          ['בָּרוּךְ', 'ב', 'Dagesh lene'],
          ['תּוֹרָה', 'ת', 'Dagesh lene'],
          ['שַׁבָּת', 'ב', 'Dagesh forte'],
          ['הַמֶּלֶךְ', 'מ', 'Dagesh forte'],
        ],
      },
      check: [
        {
          id: 'chk-torah-lene',
          type: 'truefalse',
          statement: 'Placeholder check: תּוֹרָה has a dagesh lene in the ת.',
          answer: true,
          explain: 'Placeholder: true. תּוֹרָה has a dagesh lene in the ת.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-baruch',
      type: 'tap',
      prompt: 'Placeholder: tap every letter with a dagesh.',
      he: 'בָּרוּךְ',
      feature: 'dagesh',
      answer: [0],
      explain: 'Placeholder: the ב has a dagesh lene.',
    },
    {
      id: 'tap-shabbat',
      type: 'tap',
      prompt: 'Placeholder: tap every letter with a dagesh.',
      he: 'שַׁבָּת',
      feature: 'dagesh',
      answer: [1],
      explain: 'Placeholder: the ב has a dagesh forte.',
    },
    {
      id: 'choice-shabbat',
      type: 'choice',
      prompt: 'Placeholder: in שַׁבָּת, the dagesh in the ב is a…',
      options: [
        { text: 'Dagesh lene' },
        { text: 'Dagesh forte', correct: true },
      ],
      keepOrder: true,
      explain: 'Placeholder: שַׁבָּת has a dagesh forte in the ב.',
    },
    {
      id: 'tf-baruch',
      type: 'truefalse',
      statement: 'Placeholder: בָּרוּךְ has a dagesh forte in the ב.',
      answer: false,
      explain: 'Placeholder: false. בָּרוּךְ has a dagesh lene in the ב.',
    },
    {
      id: 'bank-melech',
      type: 'wordbank',
      before: 'Placeholder: the dagesh in the מ of הַמֶּלֶךְ is a dagesh ',
      after: '.',
      options: [
        { text: 'lene' },
        { text: 'forte', correct: true },
      ],
      explain: 'Placeholder: הַמֶּלֶךְ has a dagesh forte in the מ.',
    },
    {
      id: 'match-four',
      type: 'match',
      prompt: 'Placeholder: match each word with its dagesh.',
      pairs: [
        { left: 'בָּרוּךְ', right: 'Dagesh lene in the ב' },
        { left: 'תּוֹרָה', right: 'Dagesh lene in the ת' },
        { left: 'שַׁבָּת', right: 'Dagesh forte in the ב' },
        { left: 'הַמֶּלֶךְ', right: 'Dagesh forte in the מ' },
      ],
      explain: 'Placeholder: these are the four facts supplied with the test words.',
    },
    {
      id: 'predict-layout',
      type: 'predict',
      prompt: 'Placeholder: tests the layout of a predict question only.',
      parts: ['הַ', 'מֶּלֶךְ'],
      options: [
        { text: 'הַמֶּלֶךְ', correct: true },
        { text: 'שַׁבָּת' },
        { text: 'בָּרוּךְ' },
      ],
      explain: 'Placeholder: the two parts shown are simply the two halves of הַמֶּלֶךְ. This is a layout test, not a grammar claim.',
    },
    {
      id: 'breakdown-layout',
      type: 'breakdown',
      prompt: 'Placeholder: tap where this word splits.',
      he: 'הַמֶּלֶךְ',
      parts: [
        { he: 'הַ', label: 'first part' },
        { he: 'מֶּלֶךְ', label: 'second part' },
      ],
      explain: 'Placeholder: a layout test. The split falls after the first letter.',
    },
  ],

  challenge: [
    {
      id: 'chal-tap-two',
      type: 'tap',
      prompt: 'Placeholder: tap every letter with a dagesh in these two words.',
      he: 'בָּרוּךְ תּוֹרָה',
      feature: 'dagesh',
      answer: [0, 4],
      explain: 'Placeholder: the ב of בָּרוּךְ and the ת of תּוֹרָה.',
    },
    {
      id: 'chal-which-lene',
      type: 'choice',
      prompt: 'Placeholder: which of these has a dagesh lene?',
      options: [
        { text: 'בָּרוּךְ', correct: true },
        { text: 'שַׁבָּת' },
        { text: 'הַמֶּלֶךְ' },
      ],
      explain: 'Placeholder: בָּרוּךְ has a dagesh lene in the ב.',
    },
  ],
};
