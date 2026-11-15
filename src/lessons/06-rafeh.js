// Rafeh. Explanations and examples are original; example
// words were checked against the Masoretic text on Sefaria (Bereshit 2:1;
// Tehillim 117:1).

export default {
  id: 'rafeh',
  order: 6,
  title: 'Rafeh',
  hebrewTitle: 'רָפֶה',
  summary: 'When a letter that should be doubled is not.',

  teach: [
    {
      id: 'what-rafeh',
      heading: 'A line for a missing dagesh',
      body: [
        'In the Dagesh lesson, a letter was sometimes doubled just to sound smoother. The reverse also happens: a letter that the pattern of the word says should be doubled is left single, again for smoother speech.',
        'The sign for this is **rafeh** (רָפֶה, "soft"): a short horizontal line over the letter. In older manuscripts the same line also marks a begad kefat letter without its dagesh, or a final ה without its mappik.',
        'Most siddurim and printed Tanakhs leave the line out. You simply see no dagesh where you might expect one.',
      ],
      examples: [
        { he: 'בֿ', note: 'The rafeh sign: the short line above the ב.' },
      ],
      check: [
        {
          id: 'chk-what-it-shows',
          type: 'truefalse',
          statement: 'Rafeh shows that a letter you would expect to be doubled is not.',
          answer: true,
          explain: 'True. It is the opposite of a dagesh forte.',
        },
      ],
    },
    {
      id: 'dropped-doubling',
      heading: 'Where you meet it',
      body: [
        'The doubling is dropped most often in a letter that has a sheva, especially י, ל, מ and נ. The sheva stays vocal, as it would under a doubled letter.',
        'In Hallel, הַֽלְלוּ: the verb pattern doubles the middle letter, like the ד of קִדְּשָׁנוּ, so you might expect a dagesh in the first ל. It has none. The meteg keeps its sheva vocal: ha-l\'lu.',
        'In Kiddush, וַיְכֻלּוּ: this verb form normally doubles the י after וַ. Here the doubling is dropped, but the sheva under the י stays vocal. That is why the כ after it is soft: va-y\'chulu, with kh.',
      ],
      examples: [
        { he: 'הַֽלְלוּ', note: 'Tehillim 117:1: no dagesh in the first ל.', letters: [1] },
        { he: 'וַיְכֻלּוּ', note: 'Bereshit 2:1, in Kiddush: no dagesh in the י.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-vaychulu',
          type: 'choice',
          prompt: 'Why is it va-y\'chulu, with a soft כ, and not vay-kulu?',
          options: [
            { text: 'The י lost its doubling but kept a vocal sheva, so a vowel sound comes just before the כ', correct: true },
            { text: 'כ is never hard after a י' },
            { text: 'It is a printing error' },
          ],
          explain: 'A begad kefat letter after a vocal sheva has no dagesh lene. The sheva under the י is vocal because the י was originally doubled.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'what-marks',
      type: 'choice',
      prompt: 'What does a rafeh mark?',
      options: [
        { text: 'A letter whose expected doubling has been dropped', correct: true },
        { text: 'A doubled letter' },
        { text: 'A pause on a vowel' },
      ],
      explain: 'Rafeh, "soft", marks a letter left single where the pattern would double it.',
    },
    {
      id: 'tf-printed',
      type: 'truefalse',
      statement: 'Most siddurim print the rafeh line.',
      answer: false,
      explain: 'False. Most leave it out, and you see only the missing dagesh.',
    },
    {
      id: 'halelu-sheva',
      type: 'choice',
      prompt: 'In הַֽלְלוּ, the sheva under the first ל is…',
      options: [
        { text: 'vocal', correct: true },
        { text: 'silent' },
      ],
      keepOrder: true,
      explain: 'Vocal: ha-l\'lu. The meteg shows it, and a sheva under a letter that has lost its doubling stays vocal.',
    },
    {
      id: 'bank-opposite',
      type: 'wordbank',
      before: 'Rafeh is the opposite of a dagesh ',
      after: ' added for smoother sound.',
      options: [
        { text: 'forte', correct: true },
        { text: 'lene' },
      ],
      explain: 'A euphonic dagesh forte doubles a letter for smoother sound; rafeh marks a doubling dropped for the same reason.',
    },
    {
      id: 'tap-vaychulu',
      type: 'tap',
      prompt: 'Tap the letter whose doubling has been dropped.',
      he: 'וַיְכֻלּוּ',
      feature: 'sheva',
      all: false,
      answer: [1],
      explain: 'The י. This verb form usually doubles it (וַיְּ), but here it is single, with a vocal sheva.',
    },
  ],

  challenge: [
    {
      id: 'chal-halelu-letter',
      type: 'choice',
      prompt: 'Which letter of הַֽלְלוּ would have a dagesh forte if its doubling were kept?',
      options: [
        { text: 'The first ל', correct: true },
        { text: 'The ה' },
        { text: 'The second ל' },
      ],
      explain: 'The first ל, the middle letter of the root, which this verb pattern doubles.',
    },
    {
      id: 'chal-kaf-soft',
      type: 'truefalse',
      statement: 'In וַיְכֻלּוּ the כ has no dagesh lene because a vocal sheva comes just before it.',
      answer: true,
      explain: 'True. A vocal sheva counts as a vowel sound, so the begad kefat letter after it stays soft.',
    },
  ],
};
