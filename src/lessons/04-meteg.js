// Meteg. Explanations and examples are original; example
// words were checked against the Masoretic text on Sefaria (Bereshit 1:5, 3:6;
// Devarim 6:4; Tehillim 96:11).

export default {
  id: 'meteg',
  order: 4,
  title: 'Meteg',
  hebrewTitle: 'מֶתֶג',
  summary: 'The small upright line beside a vowel: pause here.',

  teach: [
    {
      id: 'what-meteg',
      heading: 'A line that says "pause"',
      body: [
        'Some vowels have a short upright line beside them, under the letter. This is a **meteg** (מֶתֶג, "bridle"): it reins the reader in.',
        'A meteg tells you to pause on that vowel and give it a little weight, a lighter stress than the main one. It often sits a syllable or two before the main stress of the word.',
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
      heading: 'A meteg keeps the syllable open',
      body: [
        'Because you pause on the vowel, the syllable stays open. So a sheva straight after it begins the next syllable, and is **vocal**, even after a short vowel.',
        'Tehillim 96:11, which we say in Kabbalat Shabbat, has the two cases next to each other. יִשְׂמְחוּ has no meteg: yis-m\'chu, with a silent sheva. יִֽרְעַם has a meteg under the י: yi-r\'am, with a vocal sheva.',
      ],
      examples: [
        { he: 'יִשְׂמְחוּ', note: 'No meteg: yis-m\'chu. The first sheva is silent.', mark: 'sheva' },
        { he: 'יִֽרְעַם', note: 'Meteg: yi-r\'am. The sheva is vocal.', mark: 'meteg' },
      ],
      callout: {
        kind: 'note',
        text: 'The same goes for a kamatz with a meteg: the syllable is open, so the kamatz is read a. That matters for kamatz katan, in a later lesson.',
      },
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
          explain: 'Vocal. The meteg makes you pause on the chirik, so the first syllable is open and the sheva starts the next one: yi-r\'am.',
        },
      ],
    },
    {
      id: 'silluq',
      heading: 'The same line at the end of a verse',
      body: [
        'The same upright line also appears under the stressed syllable of the last word in every verse of Tanakh, just before the two dots of sof pasuk. There it is a cantillation mark called **silluq**, marking the end of the verse.',
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
        { text: 'Pause on this vowel', correct: true },
        { text: 'This letter is doubled' },
        { text: 'This letter is silent' },
      ],
      explain: 'A meteg marks a pause, a light secondary stress, on the vowel beside it.',
    },
    {
      id: 'tf-sheva-after-meteg',
      type: 'truefalse',
      statement: 'A sheva straight after a vowel with a meteg is vocal.',
      answer: true,
      explain: 'True. The pause keeps the syllable open, so the sheva begins the next one.',
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
        { left: 'הָֽאִשָּׁה', right: 'ha-ish-shah' },
      ],
      explain: 'Where there is a meteg before a sheva, the sheva is vocal: va-y\'hi, yi-r\'am. Without one, after a short vowel, it is silent: yis-m\'chu.',
    },
    {
      id: 'bank-silluq',
      type: 'wordbank',
      before: 'At the end of a verse, the same upright line is called ',
      after: '.',
      options: [
        { text: 'silluq', correct: true },
        { text: 'makaf' },
        { text: 'dagesh' },
      ],
      explain: 'Silluq: it marks the stressed syllable of the verse\'s last word.',
    },
  ],

  challenge: [
    {
      id: 'chal-pair',
      type: 'choice',
      prompt: 'Tehillim 96:11 has יִשְׂמְחוּ and יִֽרְעַם side by side. Why is the first sheva silent and the second vocal?',
      options: [
        { text: 'The meteg in יִֽרְעַם keeps its first syllable open', correct: true },
        { text: 'A sheva under ר is always vocal' },
        { text: 'They are not: both are silent' },
      ],
      explain: 'Both follow a short chirik. In יִֽרְעַם the meteg makes you pause on the chirik, which leaves the syllable open, so the sheva is vocal.',
    },
    {
      id: 'chal-tap-vayehi-erev',
      type: 'tap',
      prompt: 'Tap the letter with a vocal sheva.',
      he: 'וַֽיְהִי־עֶרֶב',
      feature: 'sheva',
      answer: [1],
      explain: 'The י. It follows the patach with a meteg, so its sheva is vocal: va-y\'hi.',
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
