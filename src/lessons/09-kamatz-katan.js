// Kamatz katan. Rules checked against Gesenius' Hebrew Grammar (1910), §8–9, §16.
// Explanations and examples are original;
// example words were checked against the Masoretic text on Sefaria (Bereshit
// 1:5, 2:1, 4:6, 43:16; Devarim 27:15; Yeshayahu 11:9; Zecharyah 2:14; Tehillim 117:1).
// Words are shown with the ordinary kamatz sign, as most siddurim print them,
// except where the kamatz katan sign itself is being shown.

export default {
  id: 'kamatz-katan',
  order: 9,
  title: 'Kamatz katan',
  hebrewTitle: 'קָמָץ קָטָן',
  summary: 'One sign, two sounds: when a kamatz is read a and when it is read o.',

  teach: [
    {
      id: 'one-sign',
      heading: 'One sign, two sounds',
      body: [
        'The kamatz sign stands for two different vowels. Usually it is the long a, **kamatz** (in full, kamatz gadol, "big kamatz"). Sometimes it is a short o, **kamatz katan** ("small kamatz").',
        'The Syllables lesson gives the test. A closed syllable without the stress must have a short vowel, so a kamatz there is short: o. In an open syllable, or a closed one that carries the stress, it is almost always long: a.',
      ],
      examples: [
        { he: 'שָׁלוֹם', note: 'sha-lom: open syllable, read a.', letters: [0] },
        { he: 'כָּל־גּוֹיִם', note: 'Tehillim 117:1, kol-go-yim: closed and unstressed, read o.', letters: [0] },
      ],
      callout: {
        kind: 'note',
        text: 'If you read with an Ashkenazi pronunciation, kamatz is already said o or aw, so the two often sound alike. The difference still matters for grammar: kamatz katan is a short vowel, which tells you its syllable is closed and unstressed.',
      },
      check: [
        {
          id: 'chk-closed-unstressed',
          type: 'choice',
          prompt: 'A kamatz in a closed syllable without the stress is read…',
          options: [
            { text: 'o', correct: true },
            { text: 'a' },
          ],
          keepOrder: true,
          explain: 'o. A closed unstressed syllable must have a short vowel, and the short vowel written with this sign is kamatz katan.',
        },
      ],
    },
    {
      id: 'spotting-closed',
      heading: 'Three signs that a kamatz is read o',
      body: [
        'Three things after a kamatz usually show that its syllable is closed, so it is read o:',
        'A **silent sheva**: קָדְשִׁי is kod-shi (Yeshayahu 11:9).',
        'A **dagesh forte** in the next letter, which closes this syllable and opens the next: רָנִּי is ron-ni (Zecharyah 2:14).',
        'A **makaf** after a short word like כָּל־: the word ends in a consonant, and the makaf takes away its stress.',
      ],
      examples: [
        { he: 'קָדְשִׁי', note: 'Silent sheva after it: kod-shi.', letters: [0] },
        { he: 'רָנִּי', note: 'Dagesh forte after it: ron-ni.', letters: [0] },
        { he: 'בְּכָל־הַר', note: 'Makaf after it: b\'chol-har.', letters: [1] },
      ],
      callout: [
        {
          kind: 'note',
          text: 'A dagesh forte only counts if the syllable is unstressed. לָמָּה, "why", is stressed on its first syllable (LA-ma), so its kamatz is a.',
        },
        {
          kind: 'note',
          text: 'Careful: a sheva after a kamatz may be vocal, as in וְאָמְרוּ, ve-a-m\'ru, and then the kamatz is a. A meteg beside the kamatz tells you it is a. Many newer siddurim print kamatz katan with a larger sign, as in קׇדְשִׁי, which settles it. Where there is neither, you need to know the word.',
        },
      ],
      check: [
        {
          id: 'chk-tap-kodshi',
          type: 'tap',
          prompt: 'Tap the letter whose kamatz is read o.',
          he: 'קָדְשִׁי',
          feature: 'kamatz',
          answer: [0],
          explain: 'The ק. The silent sheva under the ד closes its syllable, which is unstressed: kod-shi.',
        },
      ],
    },
    {
      id: 'when-a',
      heading: 'When the kamatz is a',
      body: [
        'In an **open** syllable a kamatz is almost always a: the ba of צְבָאָם, tz\'va-am.',
        'In a **closed syllable that carries the stress** it is a as well: the am at the end of צְבָאָם, and the first syllable of לָיְלָה, LAI-la, which is closed by its silent sheva but stressed.',
      ],
      examples: [
        { he: 'צְבָאָם', note: 'Bereshit 2:1: both kamatzes read a, one open, one stressed.', letters: [1, 2] },
        { he: 'לָיְלָה', note: 'Bereshit 1:5: closed but stressed, so a.', letters: [0] },
      ],
      callout: {
        kind: 'note',
        text: 'One exception to know: a kamatz just before a chataf kamatz is read o, even in an open syllable, as in בַּצָּהֳרָיִם, "at noon" (ba-tzo-ho-ra-yim, Bereshit 43:16).',
      },
      check: [
        {
          id: 'chk-laylah-why',
          type: 'choice',
          prompt: 'The first syllable of לָיְלָה is closed. Why is its kamatz still read a?',
          options: [
            { text: 'It carries the stress', correct: true },
            { text: 'A kamatz under ל is always a' },
            { text: 'The sheva under the י is vocal' },
          ],
          explain: 'LAI-la is mil\'el: the stress is on the first syllable, so its kamatz stays long.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-ranni',
      type: 'tap',
      prompt: 'Tap the letter whose kamatz is read o.',
      he: 'רָנִּי',
      feature: 'kamatz',
      answer: [0],
      explain: 'The ר. The dagesh forte in the נ closes its syllable: ron-ni.',
    },
    {
      id: 'tap-vechol',
      type: 'tap',
      prompt: 'Tap the letter whose kamatz is read o.',
      he: 'וְכָל־צְבָאָם',
      feature: 'kamatz',
      all: false,
      answer: [1],
      explain: 'The כ, before the makaf. The other two kamatzes are in an open syllable and a stressed one.',
    },
    {
      id: 'shalom-a',
      type: 'choice',
      prompt: 'How is the kamatz in שָׁלוֹם read?',
      options: [
        { text: 'a', correct: true },
        { text: 'o' },
      ],
      keepOrder: true,
      explain: 'a. sha- is an open syllable.',
    },
    {
      id: 'ranni-closed-why',
      type: 'choice',
      prompt: 'In רָנִּי, what shows that the first syllable is closed?',
      options: [
        { text: 'The dagesh forte in the נ', correct: true },
        { text: 'The chirik under the נ' },
        { text: 'Nothing: it is open' },
      ],
      explain: 'A doubled letter closes the syllable before it and opens the next: ron-ni.',
    },
    {
      id: 'tf-every-before-sheva',
      type: 'truefalse',
      statement: 'Every kamatz followed by a sheva is a kamatz katan.',
      answer: false,
      explain: 'False. If the sheva is vocal, the syllable is open and the kamatz is a, as in וְאָמְרוּ (ve-a-m\'ru).',
    },
    {
      id: 'bank-katan',
      type: 'wordbank',
      before: 'A kamatz read o is called kamatz ',
      after: '.',
      options: [
        { text: 'katan', correct: true },
        { text: 'gadol' },
      ],
      explain: 'Kamatz katan, "small kamatz". The long a is kamatz gadol.',
    },
    {
      id: 'match-reading',
      type: 'match',
      prompt: 'Match each word with how it is read.',
      pairs: [
        { left: 'קָדְשִׁי', right: 'kod-shi' },
        { left: 'רָנִּי', right: 'ron-ni' },
        { left: 'צְבָאָם', right: 'tz\'va-am' },
        { left: 'שָׁלוֹם', right: 'sha-lom' },
      ],
      explain: 'Closed and unstressed: o (kod-shi, ron-ni). Open or stressed: a (tz\'va-am, sha-lom).',
    },
  ],

  challenge: [
    {
      id: 'chal-lamah',
      type: 'choice',
      prompt: 'In לָמָּה (Bereshit 4:6) a dagesh forte follows the kamatz. How is the kamatz read?',
      options: [
        { text: 'a', correct: true },
        { text: 'o' },
      ],
      keepOrder: true,
      explain: 'a: LA-ma. The dagesh closes the syllable, but the syllable carries the stress, so the kamatz stays long.',
    },
    {
      id: 'chal-tap-bechol-har',
      type: 'tap',
      prompt: 'Tap every letter whose kamatz is read o.',
      he: 'בְּכָל־הַר קָדְשִׁי',
      feature: 'kamatz',
      answer: [1, 5],
      explain: 'The כ, closed and unstressed before the makaf, and the ק, closed by the silent sheva under the ד: b\'chol-har kod-shi (Yeshayahu 11:9).',
    },
    {
      id: 'chal-veamru',
      type: 'choice',
      prompt: 'In וְאָמְרוּ the kamatz comes before a sheva, yet it is read a. Why?',
      options: [
        { text: 'The sheva is vocal, so the kamatz is in an open syllable', correct: true },
        { text: 'A kamatz before ר is always a' },
        { text: 'It is a printing error' },
      ],
      explain: 'Here the signs alone cannot settle it; you need to know the word. In אָמְרוּ, "they said", the kamatz is a, so the sheva after it is vocal and a- is an open syllable: ve-a-m\'ru. A meteg, or a kamatz katan sign, settles it where your edition prints one.',
    },
    {
      id: 'chal-laylah-o',
      type: 'truefalse',
      statement: 'The first kamatz of לָיְלָה is read o because its syllable is closed.',
      answer: false,
      explain: 'False. The syllable is closed, but it carries the stress (LAI-la), so the kamatz is long: a.',
    },
  ],
};
