// Rafeh. Rules checked against Gesenius' Hebrew Grammar (1910), §14, §20.
// Explanations and examples are original; example
// words were checked against the Masoretic text on Sefaria (Bereshit 1:3, 2:1;
// Tehillim 117:1).

export default {
  id: 'rafeh',
  order: 6,
  title: 'Rafeh',
  hebrewTitle: 'רָפֶה',
  summary: 'The line for a missing dot, and letters that lose their doubling.',

  teach: [
    {
      id: 'what-rafeh',
      heading: 'A line for a missing dot',
      body: [
        'The **rafeh** (רָפֶה, "soft") is a short horizontal line over a letter. It is the opposite of a dot: it shows that the letter has no dagesh, or, for a final ה, no mappik.',
        'In careful manuscripts it sits over every begad kefat letter that has no dagesh. Most siddurim and printed Tanakhs leave it out.',
        'This lesson is about the case that matters most for reading: a letter you would expect to have a dagesh forte, but which has none. Your siddur will not print a rafeh line there, so you notice the missing dot yourself.',
      ],
      examples: [
        { he: 'בֿ', note: 'The rafeh sign: the short line above the ב.' },
      ],
      check: [
        {
          id: 'chk-what-it-shows',
          type: 'truefalse',
          statement: 'Rafeh shows that a letter has no dot: no dagesh, or for a final ה, no mappik.',
          answer: true,
          explain: 'True. It is the opposite of a dagesh, and of a mappik.',
        },
      ],
    },
    {
      id: 'dropped-doubling',
      heading: 'A doubling that is dropped',
      body: [
        'In Hallel we say הַֽלְלוּ, ha-l\'lu. This verb pattern doubles the middle letter of the root, like the ד of קִדְּשָׁנוּ, so you might expect a dagesh in the first ל. It has none.',
        'Its sheva still behaves as if the ל were doubled: it stays vocal, and the meteg marks it.',
        'This happens most often in a letter with a sheva, especially י, ל, מ and נ.',
      ],
      examples: [
        { he: 'הַֽלְלוּ', note: 'Tehillim 117:1: no dagesh in the first ל.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-halelu-vocal',
          type: 'truefalse',
          statement: 'The first ל of הַֽלְלוּ has lost its dagesh, but its sheva is still vocal.',
          answer: true,
          explain: 'True: ha-l\'lu. A letter that loses its doubling keeps a vocal sheva.',
        },
      ],
    },
    {
      id: 'vaychulu',
      heading: 'Why the כ of וַיְכֻלּוּ is soft',
      body: [
        'Words that start with וַ, "and he…", usually have a dagesh in the letter after it, as in וַיֹּאמֶר, "and he said" (Bereshit 1:3).',
        'In Kiddush, in וַיְכֻלּוּ, that dagesh in the י is missing. But the sheva under the י stays vocal, so a vowel sound comes just before the כ, and the כ stays soft: va-y\'chulu, with kh.',
        'The same explains וַֽיְהִי, va-y\'hi, from the Meteg lesson: its י has lost its doubling too, so its sheva stays vocal.',
      ],
      examples: [
        { he: 'וַיֹּאמֶר', note: 'Bereshit 1:3: the usual dagesh in the י.', letters: [1] },
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
        { text: 'A letter with no dot: no dagesh or mappik', correct: true },
        { text: 'A doubled letter' },
        { text: 'A pause on a vowel' },
      ],
      explain: 'Rafeh, "soft", is the opposite of a dot: it marks a letter without a dagesh, or a final ה without a mappik.',
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
      id: 'bank-sheva-stays',
      type: 'wordbank',
      before: 'When a letter loses its doubling, its sheva stays ',
      after: '.',
      options: [
        { text: 'vocal', correct: true },
        { text: 'silent' },
      ],
      explain: 'Vocal, as it would be under a doubled letter: ha-l\'lu, va-y\'chulu.',
    },
    {
      id: 'tap-vaychulu',
      type: 'tap',
      prompt: 'Tap the letter whose doubling has been dropped.',
      he: 'וַיְכֻלּוּ',
      feature: 'sheva',
      all: false,
      answer: [1],
      explain: 'The י. After וַ, "and he…", it is usually doubled, as in וַיֹּאמֶר, but here it is single, with a vocal sheva.',
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
