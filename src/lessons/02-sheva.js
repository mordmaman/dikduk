// Sheva. Rules follow Weingreen §5 (with the meteg note from §3). Explanations
// and examples are original; example words were checked against the Masoretic
// text and the siddur on Sefaria (Bereshit 1:5, 12:2; Shemot 12:2, 12:28, 19:3,
// 34:6; Devarim 6:4, 16:18, 27:15; Shoftim 9:15; Tehillim 96:11; Kaddish;
// birchot hamitzvot).

export default {
  id: 'sheva',
  order: 2,
  title: 'Sheva',
  hebrewTitle: 'שְׁוָא',
  weingreen: '§5',
  summary: 'The two dots under a letter: when they are sounded and when they are silent.',

  teach: [
    {
      id: 'what-is-sheva',
      heading: 'Two dots, two kinds',
      body: [
        'The two dots under a letter are a **sheva** (שְׁוָא). They mark a letter that has no full vowel of its own.',
        'A sheva is either **vocal** or **silent**. A vocal sheva is heard as a quick, half-swallowed e, and it begins a syllable. A silent sheva is not heard at all; it closes a syllable.',
        'Compare שְׁמַע, said sh\'ma, with יִשְׂרָאֵל, said yis-ra-el. The two words that open the Shema have one of each.',
      ],
      examples: [
        { he: 'שְׁמַע', note: 'sh\'ma: a vocal sheva.', mark: 'sheva' },
        { he: 'יִשְׂרָאֵל', note: 'yis-ra-el: a silent sheva closes yis.', mark: 'sheva' },
      ],
      check: [
        {
          id: 'chk-yisrael-silent',
          type: 'choice',
          prompt: 'In יִשְׂרָאֵל, the sheva under the שׂ is…',
          options: [
            { text: 'silent', correct: true },
            { text: 'vocal' },
          ],
          keepOrder: true,
          explain: 'Silent. It closes the first syllable, yis, and is not heard.',
        },
      ],
    },
    {
      id: 'start-middle-end',
      heading: 'Start, middle and end',
      body: [
        'At the **start of a word**, a sheva is always vocal: בְּרָכָה is b\'ra-chah.',
        'In the **middle of a word**, a sheva that closes a syllable is silent: מִשְׁפָּט is mish-pat.',
        'Under the **last letter** of a word, a sheva is silent. It is mostly written in a final ךְ, as in מֶלֶךְ.',
      ],
      examples: [
        { he: 'בְּרָכָה', note: 'b\'ra-chah: vocal at the start (Bereshit 12:2).', mark: 'sheva' },
        { he: 'מִשְׁפָּט', note: 'mish-pat: silent in the middle.', mark: 'sheva' },
        { he: 'מֶלֶךְ', note: 'me-lech: silent under the last letter.', mark: 'sheva' },
      ],
      check: [
        {
          id: 'chk-tap-bracha',
          type: 'tap',
          prompt: 'Tap the letter with a vocal sheva.',
          he: 'בְּרָכָה',
          feature: 'sheva',
          answer: [0],
          explain: 'The ב. A sheva under the first letter of a word is always vocal.',
        },
      ],
    },
    {
      id: 'long-short-before',
      heading: 'Look at the vowel before it',
      body: [
        'In the middle of a word, the vowel just before the sheva usually decides. After a **short** vowel the sheva is silent. After a **long** vowel it is vocal.',
        'Two words that end in אָמֵן show it side by side. In Kaddish we say וְאִמְרוּ, ve-im-ru: a short chirik, so the sheva is silent. In the Torah the people answer וְאָמְרוּ, ve-a-m\'ru: a long kamatz, so the sheva is vocal.',
      ],
      examples: [
        { he: 'וְאִמְרוּ', note: 'Kaddish: ve-im-ru. Short chirik, silent sheva.', letters: [2] },
        { he: 'וְאָמְרוּ', note: 'Devarim 27:15: ve-a-m\'ru. Long kamatz, vocal sheva.', letters: [2] },
      ],
      check: [
        {
          id: 'chk-amru-why',
          type: 'choice',
          prompt: 'Why is the sheva under the מ in וְאָמְרוּ vocal?',
          options: [
            { text: 'It follows a long vowel, the kamatz', correct: true },
            { text: 'It is at the start of the word' },
            { text: 'It is under the last letter' },
          ],
          explain: 'After a long vowel, a sheva in the middle of a word is vocal: ve-a-m\'ru. After the short chirik in וְאִמְרוּ it is silent: ve-im-ru.',
        },
      ],
    },
    {
      id: 'two-and-doubled',
      heading: 'Two shevas, and a doubled letter',
      body: [
        'When two shevas stand together in the middle of a word, the first is silent and the second is vocal. The first closes one syllable; the second opens the next. יִשְׂמְחוּ, from Tehillim 96 in Kabbalat Shabbat, is yis-m\'chu.',
        'A sheva under a letter with a dagesh forte, a dot that doubles the letter, is vocal. The doubled letter closes one syllable and starts the next, so its sheva is sounded: קִדְּשָׁנוּ is kid-d\'sha-nu.',
      ],
      examples: [
        { he: 'יִשְׂמְחוּ', note: 'yis-m\'chu: silent, then vocal.', mark: 'sheva' },
        { he: 'קִדְּשָׁנוּ', note: 'kid-d\'sha-nu: vocal under the doubled ד.', mark: 'sheva' },
      ],
      callout: {
        kind: 'note',
        text: 'A small upright line beside a vowel, the meteg, tells you to pause on that vowel. When it comes before a sheva, the sheva is vocal even after a short vowel: וַֽיְהִי is va-y\'hi (Bereshit 1:5).',
      },
      check: [
        {
          id: 'chk-tap-yismechu',
          type: 'tap',
          prompt: 'Tap the letter with the silent sheva.',
          he: 'יִשְׂמְחוּ',
          feature: 'sheva',
          all: false,
          answer: [1],
          explain: 'The שׂ. Of two shevas side by side, the first is silent. The sheva under the מ is vocal.',
        },
      ],
    },
    {
      id: 'composite',
      heading: 'The gutturals and the composite sheva',
      body: [
        'The gutturals א ה ח ע do not take a plain vocal sheva. Instead they take a sheva joined to a short vowel, called a **chataf** ("hurried") vowel, or a composite sheva.',
        'There are three: **chataf patach** as in אֲשֶׁר, **chataf segol** as in אֱמֶת, and **chataf kamatz** as in חֳדָשִׁים (Shemot 12:2).',
      ],
      examples: [
        { he: 'אֲשֶׁר', note: 'Chataf patach.', mark: 'chataf-patach' },
        { he: 'אֱמֶת', note: 'Chataf segol.', mark: 'chataf-segol' },
        { he: 'חֳדָשִׁים', note: 'Chataf kamatz.', mark: 'chataf-kamatz' },
      ],
      check: [
        {
          id: 'chk-asher-chataf',
          type: 'choice',
          prompt: 'Which vowel is under the א of אֲשֶׁר?',
          options: [
            { text: 'chataf patach', correct: true },
            { text: 'chataf segol' },
            { text: 'kamatz' },
          ],
          explain: 'Chataf patach: a sheva with a patach beside it.',
        },
      ],
    },
    {
      id: 'no-two-at-start',
      heading: 'No word starts with two vocal shevas',
      body: [
        'A word cannot open with two vocal shevas in a row. When a prefix with a sheva, such as לְ ("to"), meets a word that starts with a vocal sheva, the first sheva turns into a chirik: לְ + בְּנֵי gives לִבְנֵי, as in Shemot 19:3. (The ב also loses its dagesh, since a vowel now comes before it.)',
        'Before a composite sheva, the prefix takes the matching short vowel instead: כְּ + אֲשֶׁר gives כַּאֲשֶׁר.',
      ],
      examples: [
        { he: 'לִבְנֵי', note: 'לְ + בְּנֵי: the first sheva becomes a chirik.', letters: [0] },
        { he: 'כַּאֲשֶׁר', note: 'כְּ + אֲשֶׁר: patach to match the chataf patach.', letters: [0] },
      ],
      check: [
        {
          id: 'chk-predict-livnei',
          type: 'predict',
          prompt: 'What do these make?',
          parts: ['לְ', 'בְּנֵי'],
          options: [
            { text: 'לִבְנֵי', correct: true },
            { text: 'לְבְנֵי' },
            { text: 'לֵבְנֵי' },
          ],
          explain: 'Two vocal shevas cannot start a word, so the sheva of לְ becomes a chirik: לִבְנֵי.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-amru-vocal',
      type: 'tap',
      prompt: 'Tap every letter with a vocal sheva.',
      he: 'וְאָמְרוּ',
      feature: 'sheva',
      answer: [0, 2],
      explain: 'Both. The ו has a sheva at the start of the word, and the מ has one after the long kamatz.',
    },
    {
      id: 'tap-imru-silent',
      type: 'tap',
      prompt: 'Tap the letter with the silent sheva.',
      he: 'וְאִמְרוּ',
      feature: 'sheva',
      all: false,
      answer: [2],
      explain: 'The מ. It follows the short chirik and closes the syllable im.',
    },
    {
      id: 'first-letter-sheva',
      type: 'choice',
      prompt: 'A sheva under the first letter of a word is…',
      options: [
        { text: 'always vocal', correct: true },
        { text: 'always silent' },
        { text: 'vocal or silent, depending on the next letter' },
      ],
      keepOrder: true,
      explain: 'Always vocal: it begins the first syllable.',
    },
    {
      id: 'mishpat-silent',
      type: 'choice',
      prompt: 'In מִשְׁפָּט, the sheva under the שׁ is…',
      options: [
        { text: 'silent', correct: true },
        { text: 'vocal' },
      ],
      keepOrder: true,
      explain: 'Silent. It follows the short chirik and closes the syllable mish.',
    },
    {
      id: 'tf-two-shevas',
      type: 'truefalse',
      statement: 'When two shevas stand together in the middle of a word, the first is vocal and the second silent.',
      answer: false,
      explain: 'False. It is the other way round: the first is silent and the second vocal, as in יִשְׂמְחוּ.',
    },
    {
      id: 'tf-doubled',
      type: 'truefalse',
      statement: 'A sheva under a letter with a dagesh forte is vocal.',
      answer: true,
      explain: 'True. The doubled letter both closes one syllable and starts the next, so its sheva is sounded, as in קִדְּשָׁנוּ.',
    },
    {
      id: 'bank-emet',
      type: 'wordbank',
      before: 'The composite sheva under the א of אֱמֶת is chataf ',
      after: '.',
      options: [
        { text: 'segol', correct: true },
        { text: 'patach' },
        { text: 'kamatz' },
      ],
      explain: 'Chataf segol: a sheva with a segol beside it.',
    },
    {
      id: 'match-kinds',
      type: 'match',
      prompt: 'Match each word with what its sheva is doing.',
      pairs: [
        { left: 'שְׁמַע', right: 'Vocal: at the start of the word' },
        { left: 'מִשְׁפָּט', right: 'Silent: closes a syllable' },
        { left: 'קִדְּשָׁנוּ', right: 'Vocal: under a doubled letter' },
        { left: 'מֶלֶךְ', right: 'Silent: under the last letter' },
      ],
      explain: 'Start of a word or under a doubled letter: vocal. Closing a syllable or under the last letter: silent.',
    },
    {
      id: 'predict-kaasher',
      type: 'predict',
      prompt: 'What do these make?',
      parts: ['כְּ', 'אֲשֶׁר'],
      options: [
        { text: 'כַּאֲשֶׁר', correct: true },
        { text: 'כְּאֲשֶׁר' },
        { text: 'כִּאֲשֶׁר' },
      ],
      explain: 'Before the chataf patach, the sheva of כְּ becomes the matching short vowel, patach: כַּאֲשֶׁר.',
    },
    {
      id: 'split-yismechu',
      type: 'breakdown',
      prompt: 'Tap where the syllables divide. (A vocal sheva belongs with the letters after it.)',
      he: 'יִשְׂמְחוּ',
      parts: [
        { he: 'יִשְׂ', label: 'closed by a silent sheva' },
        { he: 'מְחוּ', label: 'opens with a vocal sheva' },
      ],
      explain: 'yis | m\'chu. The silent sheva under the שׂ ends the first syllable; the vocal sheva under the מ begins the second.',
    },
  ],

  challenge: [
    {
      id: 'chal-tap-imru-amen',
      type: 'tap',
      prompt: 'Tap every letter with a vocal sheva.',
      he: 'וְאִמְרוּ אָמֵן',
      feature: 'sheva',
      all: false,
      answer: [0],
      explain: 'Only the ו, at the start of וְאִמְרוּ. The sheva under the מ follows a short chirik, so it is silent.',
    },
    {
      id: 'chal-vayehi-meteg',
      type: 'choice',
      prompt: 'In וַֽיְהִי the sheva follows a short patach, yet it is vocal: va-y\'hi. Why?',
      options: [
        { text: 'The meteg beside the patach marks a pause, so the sheva is sounded', correct: true },
        { text: 'A sheva after a patach is always vocal' },
        { text: 'A י can never have a silent sheva' },
      ],
      explain: 'The meteg tells the reader to pause on the patach, which leaves the syllable open, so the sheva that follows starts a new syllable and is vocal.',
    },
    {
      id: 'chal-predict-beemet',
      type: 'predict',
      prompt: 'What do these make?',
      parts: ['בְּ', 'אֱמֶת'],
      options: [
        { text: 'בֶּאֱמֶת', correct: true },
        { text: 'בְּאֱמֶת' },
        { text: 'בִּאֱמֶת' },
      ],
      explain: 'Before the chataf segol, the sheva of בְּ becomes a segol: בֶּאֱמֶת, "truly" (Shoftim 9:15).',
    },
    {
      id: 'chal-livnei-why',
      type: 'choice',
      prompt: 'Why does לְ become לִ in לִבְנֵי?',
      options: [
        { text: 'A word cannot start with two vocal shevas', correct: true },
        { text: 'לְ always becomes לִ before a ב' },
        { text: 'The ב has a dagesh' },
      ],
      explain: 'בְּנֵי starts with a vocal sheva, and לְ adds a second. Two cannot stand together at the start, so the first becomes a chirik.',
    },
    {
      id: 'chal-yisrael-tf',
      type: 'truefalse',
      statement: 'The sheva in יִשְׂרָאֵל is vocal because it is in the middle of the word.',
      answer: false,
      explain: 'False. Being in the middle is not enough: it follows the short chirik and closes the syllable yis, so it is silent.',
    },
  ],
};
