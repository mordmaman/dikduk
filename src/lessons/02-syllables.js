// Syllables and stress. Rules checked against Gesenius' Hebrew Grammar (1910), §26, §29.
// Explanations and examples are original; example
// words were checked against the Masoretic text and the siddur on Sefaria
// (Bereshit 1:5, 29:6, 29:9 with Rashi; Shemot 34:6; Devarim 27:15, 33:4).

export default {
  id: 'syllables',
  order: 2,
  title: 'Syllables and stress',
  hebrewTitle: 'הֲבָרוֹת',
  summary: 'Open and closed syllables, long and short vowels, and which syllable carries the stress.',

  teach: [
    {
      id: 'open-closed',
      heading: 'Open and closed syllables',
      body: [
        'Almost every Hebrew syllable begins with a consonant. (The everyday exception is וּ, "and", which can be a syllable on its own, as in וּבְכָל in the Shema.) What matters is how a syllable ends.',
        'A syllable that ends in a vowel is **open**. A syllable that ends in a consonant is **closed**.',
        'In שָׁלוֹם the first syllable, sha, ends in a vowel, so it is open. The second, lom, ends in the ם, so it is closed.',
        'A ו, י or ה that only carries a vowel, like the ו in לוֹם or the final ה of תּוֹרָה, does not close a syllable. What you hear is the vowel.',
      ],
      examples: [
        { he: 'שָׁלוֹם', note: 'sha-lom: open, then closed.' },
        { he: 'אָמֵן', note: 'a-men: open, then closed.' },
        { he: 'תּוֹרָה', note: 'to-rah: both open. The final ה is silent.' },
      ],
      check: [
        {
          id: 'chk-split-amen',
          type: 'breakdown',
          prompt: 'Tap where the syllables divide.',
          he: 'אָמֵן',
          parts: [
            { he: 'אָ', label: 'open' },
            { he: 'מֵן', label: 'closed' },
          ],
          explain: 'a | men. The first syllable ends in a vowel, so it is open; the second ends in the נ, so it is closed.',
        },
      ],
    },
    {
      id: 'long-short',
      heading: 'Long and short vowels',
      body: [
        'The vowels come in pairs: one long and one short for each sound. (In Ashkenazi pronunciation the long kamatz is said o or aw, but it is still the long partner of patach.)',
        'As a rule an open syllable has a long vowel and a closed syllable a short one. The stress can bend that rule, but one part of it almost never bends: **a closed syllable without the stress has a short vowel**.',
        'The sign alone does not always show the length: a chirik without a י, or a kubutz, is sometimes a long vowel written without its vowel letter.',
      ],
      table: {
        headers: ['Sound', 'Long', 'Short'],
        rows: [
          ['a', 'kamatz אָ', 'patach אַ'],
          ['e', 'tzere אֵ', 'segol אֶ'],
          ['i', 'chirik with yod אִי', 'chirik אִ'],
          ['o', 'cholam אֹ or אוֹ', 'kamatz katan (looks like kamatz)'],
          ['u', 'shuruk אוּ', 'kubutz אֻ'],
        ],
      },
      examples: [
        { he: 'מֶלֶךְ', note: 'ME-lech: the second syllable is closed and unstressed, so its vowel is short.', letters: [1] },
        { he: 'שָׁלוֹם', note: 'sha-LOM: the last syllable is closed but stressed, so it can keep a long vowel.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'This rule is how you tell kamatz katan, an o sound, from kamatz. That comes in a later lesson.',
      },
      check: [
        {
          id: 'chk-closed-unstressed',
          type: 'truefalse',
          statement: 'A closed syllable without the stress almost always has a short vowel.',
          answer: true,
          explain: 'True. This is the firm part of the rule; the few exceptions come up in the kamatz katan lesson.',
        },
        {
          id: 'chk-which-long',
          type: 'choice',
          prompt: 'Which of these is a long vowel?',
          options: [
            { text: 'tzere', correct: true },
            { text: 'patach' },
            { text: 'segol' },
            { text: 'kubutz' },
          ],
          explain: 'Tzere is the long e. Patach, segol and kubutz are short.',
        },
      ],
    },
    {
      id: 'stress',
      heading: 'Milra and mil\'el',
      body: [
        'Most Hebrew words are stressed on the last syllable. This is called **milra** (מִלְּרַע, "from below").',
        'Some are stressed on the second-to-last syllable. This is **mil\'el** (מִלְּעֵיל, "from above").',
        'The stress never falls further back than the second-to-last syllable.',
        'A large family of mil\'el words has two short vowels in a row, often two segols: מֶלֶךְ, עֶרֶב, חֶסֶד, אֶרֶץ.',
      ],
      examples: [
        { he: 'אָמֵן', note: 'a-MEN: milra.' },
        { he: 'לָיְלָה', note: 'LAI-lah: mil\'el (Bereshit 1:5).' },
        { he: 'עֶרֶב', note: 'E-rev: mil\'el.' },
      ],
      check: [
        {
          id: 'chk-erev-stress',
          type: 'choice',
          prompt: 'Where is the stress in עֶרֶב?',
          options: [
            { text: 'On the first syllable: mil\'el', correct: true },
            { text: 'On the last syllable: milra' },
          ],
          keepOrder: true,
          explain: 'E-rev. Like מֶלֶךְ and חֶסֶד, it is stressed on the second-to-last syllable.',
        },
      ],
    },
    {
      id: 'stress-meaning',
      heading: 'Stress can change the meaning',
      body: [
        'Two words can share every letter and vowel and differ only in the stress.',
        'In Bereshit 29 Rachel is described twice with the same word, בָּאָה. In verse 6 the cantillation puts the stress on the last syllable, ba-AH: she *is coming*. In verse 9 it falls on the first, BA-ah: she *came*.',
        'Rashi points out exactly this difference.',
      ],
      examples: [
        { he: 'בָּאָה', note: 'Bereshit 29:6, ba-AH: she is coming.' },
        { he: 'בָּאָה', note: 'Bereshit 29:9, BA-ah: she came.' },
      ],
      check: [
        {
          id: 'chk-three-back',
          type: 'truefalse',
          statement: 'The stress in a Hebrew word can fall three syllables from the end.',
          answer: false,
          explain: 'False. It falls on the last syllable (milra) or the one before it (mil\'el), never further back.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'split-shalom',
      type: 'breakdown',
      prompt: 'Tap where the syllables divide.',
      he: 'שָׁלוֹם',
      parts: [
        { he: 'שָׁ', label: 'open' },
        { he: 'לוֹם', label: 'closed' },
      ],
      explain: 'sha | lom. The ו carries the cholam; the syllable is closed by the ם.',
    },
    {
      id: 'split-melech',
      type: 'breakdown',
      prompt: 'Tap where the syllables divide.',
      he: 'מֶלֶךְ',
      parts: [
        { he: 'מֶ', label: 'open, stressed' },
        { he: 'לֶךְ', label: 'closed' },
      ],
      explain: 'me | lech. The first syllable is open; the second is closed by the ךְ.',
    },
    {
      id: 'torah-first-open',
      type: 'choice',
      prompt: 'Is the first syllable of תּוֹרָה open or closed?',
      options: [
        { text: 'Open', correct: true },
        { text: 'Closed' },
      ],
      keepOrder: true,
      explain: 'Open. to- ends in the vowel cholam; the ו only carries that vowel.',
    },
    {
      id: 'which-short',
      type: 'choice',
      prompt: 'Which of these is a short vowel?',
      options: [
        { text: 'patach', correct: true },
        { text: 'kamatz' },
        { text: 'tzere' },
        { text: 'cholam' },
      ],
      explain: 'Patach is the short a. Kamatz, tzere and cholam are long.',
    },
    {
      id: 'torah-final-he',
      type: 'truefalse',
      statement: 'The final ה of תּוֹרָה closes the last syllable.',
      answer: false,
      explain: 'False. The ה is silent; the syllable ends in the vowel kamatz, so it is open.',
    },
    {
      id: 'match-stress',
      type: 'match',
      prompt: 'Match each word with how it is said. Capitals mark the stress.',
      pairs: [
        { left: 'שָׁלוֹם', right: 'sha-LOM' },
        { left: 'מֶלֶךְ', right: 'ME-lech' },
        { left: 'לָיְלָה', right: 'LAI-lah' },
        { left: 'אָמֵן', right: 'a-MEN' },
      ],
      explain: 'שָׁלוֹם and אָמֵן are milra; מֶלֶךְ and לָיְלָה are mil\'el.',
    },
    {
      id: 'bank-milra',
      type: 'wordbank',
      before: 'A word stressed on its last syllable is called ',
      after: '.',
      options: [
        { text: 'milra', correct: true },
        { text: 'mil\'el' },
      ],
      explain: 'Milra, "from below": the stress is on the last syllable.',
    },
    {
      id: 'melech-short-why',
      type: 'choice',
      prompt: 'In מֶלֶךְ, why must the second syllable have a short vowel?',
      options: [
        { text: 'It is closed and unstressed', correct: true },
        { text: 'It is open' },
        { text: 'It carries the stress' },
      ],
      explain: 'lech is closed (by the ךְ) and the stress is on me-, so its vowel must be short.',
    },
    {
      id: 'tap-erev-close',
      type: 'tap',
      prompt: 'Tap the letter that closes the last syllable.',
      he: 'עֶרֶב',
      answer: [2],
      explain: 'The ב. The last syllable, rev, ends in it.',
    },
  ],

  challenge: [
    {
      id: 'chal-baah',
      type: 'choice',
      prompt: 'In Bereshit 29:9, בָּאָה is stressed on the first syllable. What does that tell you?',
      options: [
        { text: 'It means "she came", in the past', correct: true },
        { text: 'It means "she is coming"' },
        { text: 'Nothing: stress never changes the meaning' },
      ],
      explain: 'BA-ah is the past, "she came". In verse 6 the stress is on the last syllable, ba-AH, "she is coming". Rashi notes the difference.',
    },
    {
      id: 'chal-shalom-long',
      type: 'choice',
      prompt: 'The last syllable of שָׁלוֹם is closed. Why can it still have a long vowel?',
      options: [
        { text: 'It carries the stress', correct: true },
        { text: 'The ו closes it instead of the ם' },
        { text: 'Closed syllables always have long vowels' },
      ],
      explain: 'Only a closed syllable without the stress must have a short vowel. lom is stressed, so it can keep the long cholam.',
    },
    {
      id: 'chal-split-laylah',
      type: 'breakdown',
      prompt: 'Tap where the syllables divide.',
      he: 'לָיְלָה',
      parts: [
        { he: 'לָיְ', label: 'closed, stressed' },
        { he: 'לָה', label: 'open' },
      ],
      explain: 'lai | lah. The sheva under the י is silent and closes the first syllable. The next lesson explains how to tell.',
    },
    {
      id: 'chal-open-short',
      type: 'truefalse',
      statement: 'A stressed open syllable can have a short vowel, as the first syllable of מֶלֶךְ does.',
      answer: true,
      explain: 'True. me- is open and has a short segol, which the stress allows.',
    },
  ],
};
