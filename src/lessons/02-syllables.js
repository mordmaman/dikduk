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
      heading: 'Syllables: open and closed',
      body: [
        'A **syllable** (הֲבָרָה) is one beat of a word. שָׁלוֹם has two beats, sha and lom. Each beat has one vowel.',
        'A syllable that ends in a vowel is **open** (הֲבָרָה פְּתוּחָה). A syllable that ends in a consonant is **closed** (הֲבָרָה סְגוּרָה).',
        'In שָׁלוֹם, sha ends in a vowel, so it is open; lom ends in the ם, so it is closed.',
        'A ו, י or ה that only carries a vowel, like the ו in לוֹם or the final ה of תּוֹרָה, does not close a syllable. What you hear is the vowel.',
      ],
      examples: [
        { he: 'שָׁלוֹם', note: 'sha-lom: open, then closed.' },
        { he: 'אָמֵן', note: 'a-men: open, then closed.' },
        { he: 'תּוֹרָה', note: 'to-ra: both open. The final ה is silent.' },
      ],
      callout: {
        kind: 'note',
        text: 'A syllable starts with a consonant, so in אָמֵן the מ begins the second beat: a-men. The one everyday exception is וּ, "and", which can be a syllable on its own, as in וּבְכָל in the Shema.',
      },
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
      id: 'stress',
      heading: 'Stress: milra and mil\'el',
      body: [
        'In every word one syllable is said a little more strongly than the rest: sha-LOM, not SHA-lom. That syllable carries the **stress**. In these lessons, capitals show it.',
        'Most Hebrew words are stressed on the last syllable. This is called **milra** (מִלְּרַע, "from below").',
        'Some are stressed on the second-to-last syllable. This is **mil\'el** (מִלְּעֵיל, "from above"). The names are Aramaic: "below" means towards the end of the word, "above" towards the start.',
        'The stress never falls further back than the second-to-last syllable. Many mil\'el words have two segols in a row: מֶלֶךְ, עֶרֶב, חֶסֶד, אֶרֶץ.',
      ],
      examples: [
        { he: 'אָמֵן', note: 'a-MEN: milra.' },
        { he: 'לָיְלָה', note: 'LAI-la: mil\'el (Bereshit 1:5).' },
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
        {
          id: 'chk-three-back',
          type: 'truefalse',
          statement: 'The stress in a Hebrew word can fall three syllables from the end.',
          answer: false,
          explain: 'False. It falls on the last syllable (milra) or the one before it (mil\'el), never further back.',
        },
      ],
    },
    {
      id: 'stress-meaning',
      heading: 'Stress can change the meaning',
      body: [
        'Two words can share every letter and vowel and differ only in the stress.',
        'In Bereshit 29 Rachel is described twice with the same word, בָּאָה. In verse 6 the trop (טְעָמִים, the reading marks) puts the stress on the last syllable, ba-A: she *is coming*. In verse 9 it falls on the first, BA-a: she *came*.',
        'Rashi points out exactly this difference.',
      ],
      examples: [
        { he: 'בָּאָה', note: 'Bereshit 29:6, ba-A: she is coming.' },
        { he: 'בָּאָה', note: 'Bereshit 29:9, BA-a: she came.' },
      ],
      check: [
        {
          id: 'chk-baah-what',
          type: 'choice',
          prompt: 'The two בָּאָה in Bereshit 29 have the same letters and vowels. What tells them apart?',
          options: [
            { text: 'Which syllable carries the stress', correct: true },
            { text: 'Whether the final ה is sounded' },
            { text: 'Nothing: they mean the same' },
          ],
          explain: 'Only the stress. BA-a, stressed on the first syllable, is "she came"; ba-A, stressed on the last, is "she is coming".',
        },
      ],
    },
    {
      id: 'long-short',
      heading: 'Long and short vowels',
      body: [
        'Grammar sorts the vowels into pairs, one **long** and one **short** for each sound. In most pronunciations today the two in a pair sound the same, so think of long and short as labels. The rules in the next lessons depend on them.',
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
      callout: [
        {
          kind: 'note',
          text: 'The sign alone does not always show the length: a chirik without a י, or a kubutz, is sometimes a long vowel written without its vowel letter.',
        },
        {
          kind: 'note',
          text: 'In Ashkenazi pronunciation the long kamatz is said o or aw, but it is still the long partner of patach.',
        },
      ],
      check: [
        {
          id: 'chk-which-long',
          type: 'choice',
          prompt: 'Which of these is a long vowel?',
          options: [
            { text: 'tzere', correct: true },
            { text: 'patach' },
            { text: 'segol' },
          ],
          explain: 'Tzere is the long e. Patach and segol are short.',
        },
      ],
    },
    {
      id: 'which-syllables',
      heading: 'Which syllables have which',
      body: [
        'As a rule, an open syllable has a long vowel and a closed syllable a short one.',
        'The stress can bend that rule. But one part of it almost never bends: **a closed syllable without the stress has a short vowel**.',
      ],
      examples: [
        { he: 'מֶלֶךְ', note: 'ME-lech: the second syllable is closed and unstressed, so its vowel is short.', letters: [1] },
        { he: 'שָׁלוֹם', note: 'sha-LOM: the last syllable is closed but stressed, so it can keep a long vowel.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'This rule is how you tell kamatz katan, a short o, from kamatz. Lesson 9 shows how.',
      },
      check: [
        {
          id: 'chk-closed-unstressed',
          type: 'truefalse',
          statement: 'A closed syllable without the stress almost always has a short vowel.',
          answer: true,
          explain: 'True. This is the firm part of the rule. The few exceptions are rare; you can leave them for now.',
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
        { left: 'לָיְלָה', right: 'LAI-la' },
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
      explain: 'BA-a is the past, "she came". In verse 6 the stress is on the last syllable, ba-A, "she is coming". Rashi notes the difference.',
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
      explain: 'lai | la. The sheva under the י is silent and closes the first syllable. The next lesson explains how to tell.',
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
