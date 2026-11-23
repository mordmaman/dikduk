// Meteg. Rules checked against Gesenius' Hebrew Grammar (1910), §15–16.
// Explanations and examples are original; example
// words were checked against the Masoretic text on Sefaria (Bereshit 1:5, 1:29, 3:6;
// Devarim 6:4; Tehillim 96:11).

export default {
  id: 'meteg',
  order: 4,
  title: 'Meteg',
  hebrewTitle: 'מֶתֶג',
  summary: 'The small upright line beside a vowel: linger here.',

  teach: [
    {
      id: 'what-meteg',
      heading: 'A line that says "linger"',
      body: [
        'Some vowels have a short upright line beside them, under the letter. This is a **meteg** (מֶתֶג, "bridle"): like a bridle on a horse, it holds the reader back.',
        'A meteg tells you not to rush that vowel: give it a little weight, a lighter stress than the main one. It often sits a syllable or two before the main stress of the word.',
      ],
      examples: [
        { he: 'הָֽאִשָּׁה', note: 'Bereshit 3:6: a meteg under the ה. Linger on ha-.', mark: 'meteg' },
        { he: 'וַֽיְהִי', note: 'Bereshit 1:5: a meteg under the ו.', mark: 'meteg' },
      ],
      check: [
        {
          id: 'chk-tap-haishah',
          type: 'tap',
          prompt: 'Tap the letter with a meteg.',
          he: 'הָֽאִשָּׁה',
          feature: 'meteg',
          answer: [0],
          explain: 'The ה. The meteg is the small upright line beside its kamatz.',
        },
      ],
    },
    {
      id: 'meteg-sheva',
      heading: 'A meteg before a sheva',
      body: [
        'A sheva straight after a vowel with a meteg is usually **vocal**, even after a short vowel. The meteg is the editors\' way of telling you so.',
        'Tehillim 96:11, which we say in Kabbalat Shabbat, has the two cases next to each other. יִשְׂמְחוּ has no meteg: yis-m\'chu, with a silent sheva. יִֽרְעַם has a meteg under the י: yi-r\'am, with a vocal sheva.',
      ],
      examples: [
        { he: 'יִשְׂמְחוּ', note: 'No meteg: yis-m\'chu. The first sheva is silent.', mark: 'sheva' },
        { he: 'יִֽרְעַם', note: 'Meteg: yi-r\'am. The sheva is vocal.', mark: 'meteg' },
        { he: 'יִֽהְיֶה', note: 'yih-ye: a meteg, yet a silent sheva.', mark: 'meteg' },
      ],
      callout: [
        {
          kind: 'note',
          text: 'It is a strong hint, not a law. The common word יִֽהְיֶה, "will be", has a meteg and a silent sheva: yih-ye (Bereshit 1:29).',
        },
        {
          kind: 'note',
          text: 'A meteg beside a kamatz is likewise a hint that it is read a, not o. That matters for kamatz katan, in lesson 9.',
        },
      ],
      check: [
        {
          id: 'chk-yiram-sheva',
          type: 'choice',
          prompt: 'In יִֽרְעַם, the sheva under the ר is…',
          options: [
            { text: 'vocal', correct: true },
            { text: 'silent' },
          ],
          keepOrder: true,
          explain: 'Vocal: yi-r\'am. The meteg on the chirik marks it.',
        },
      ],
    },
    {
      id: 'silluq',
      heading: 'The same line at the end of a verse',
      body: [
        'The same upright line also appears under the stressed syllable of the last word in every verse of Tanakh, just before the two dots that end a verse (sof pasuk, "end of verse"). There it is one of the trop marks (טְעָמִים), called **silluq** (סִלּוּק), marking the end of the verse.',
        'The Shema ends this way: in אֶחָֽד the line under the ח is a silluq.',
      ],
      examples: [
        { he: 'אֶחָֽד', note: 'Devarim 6:4: silluq on the stressed syllable.', mark: 'meteg' },
      ],
      check: [
        {
          id: 'chk-silluq',
          type: 'truefalse',
          statement: 'Meteg and silluq look the same; silluq is the one under the last stressed syllable of a verse.',
          answer: true,
          explain: 'True. It is the same small upright line. At the end of a verse it is read as silluq.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-yiram',
      type: 'tap',
      prompt: 'Tap the letter with a meteg.',
      he: 'יִֽרְעַם',
      feature: 'meteg',
      answer: [0],
      explain: 'The י. The meteg sits beside its chirik.',
    },
    {
      id: 'what-it-says',
      type: 'choice',
      prompt: 'What does a meteg tell the reader?',
      options: [
        { text: 'Do not rush this vowel: give it a lighter stress', correct: true },
        { text: 'This letter is doubled' },
        { text: 'This letter is silent' },
      ],
      explain: 'A meteg marks a lighter stress on the vowel beside it, not the main stress of the word.',
    },
    {
      id: 'tf-sheva-after-meteg',
      type: 'truefalse',
      statement: 'A sheva straight after a vowel with a meteg is usually vocal.',
      answer: true,
      explain: 'True. It is a strong hint, though not a law: יִֽהְיֶה has a meteg and a silent sheva.',
    },
    {
      id: 'yismechu-silent',
      type: 'choice',
      prompt: 'יִשְׂמְחוּ has no meteg. The sheva under the שׂ is…',
      options: [
        { text: 'silent', correct: true },
        { text: 'vocal' },
      ],
      keepOrder: true,
      explain: 'Silent. After the short chirik, with no meteg, it closes the syllable: yis-m\'chu.',
    },
    {
      id: 'match-read',
      type: 'match',
      prompt: 'Match each word with how it is read.',
      pairs: [
        { left: 'וַֽיְהִי', right: 'va-y\'hi' },
        { left: 'יִֽרְעַם', right: 'yi-r\'am' },
        { left: 'יִשְׂמְחוּ', right: 'yis-m\'chu' },
        { left: 'הָֽאִשָּׁה', right: 'ha-ish-sha' },
      ],
      explain: 'Where there is a meteg before a sheva, the sheva is usually vocal: va-y\'hi, yi-r\'am. Without one, after a short vowel, it is usually silent: yis-m\'chu.',
    },
    {
      id: 'bank-silluq',
      type: 'wordbank',
      before: 'At the end of a verse, the same upright line is called ',
      after: '.',
      options: [
        { text: 'silluq', correct: true },
        { text: 'meteg' },
        { text: 'dagesh' },
      ],
      explain: 'Silluq. Elsewhere in a word the line is a meteg; under the stressed syllable of the last word of a verse it is a silluq.',
    },
  ],

  challenge: [
    {
      id: 'chal-pair',
      type: 'choice',
      prompt: 'Tehillim 96:11 has יִשְׂמְחוּ and יִֽרְעַם side by side. Why is the first sheva silent and the second vocal?',
      options: [
        { text: 'The meteg in יִֽרְעַם marks its sheva as vocal', correct: true },
        { text: 'A sheva under ר is always vocal' },
        { text: 'They are not: both are silent' },
      ],
      explain: 'Both follow a short chirik. In יִֽרְעַם the meteg tells you the sheva is read: yi-r\'am. Without one, יִשְׂמְחוּ is yis-m\'chu.',
    },
    {
      id: 'chal-tap-vayehi-erev',
      type: 'tap',
      prompt: 'Tap the letter with a vocal sheva.',
      he: 'וַֽיְהִי־עֶרֶב',
      feature: 'sheva',
      answer: [1],
      explain: 'The י: va-y\'hi. The meteg beside the patach marks its sheva as vocal.',
    },
    {
      id: 'chal-looks-different',
      type: 'truefalse',
      statement: 'Meteg and silluq are written with different-looking marks.',
      answer: false,
      explain: 'False. They are the same small upright line; its position at the end of a verse makes it a silluq.',
    },
  ],
};
