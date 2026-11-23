// Silent letters. Rules checked against Gesenius' Hebrew Grammar (1910), §23,
// with §7–8 for the vowel letters. Explanations and examples are original;
// example words were checked against the Masoretic text on Sefaria
// (Bereshit 1:1, 1:3, 1:22, 2:2, 4:2; Shemot 12:2, 16:8).

export default {
  id: 'silent-letters',
  order: 10,
  title: 'Silent letters',
  hebrewTitle: 'אוֹתִיּוֹת נָחוֹת',
  summary: 'Letters that are written but not said, above all the silent א.',

  teach: [
    {
      id: 'written-not-said',
      heading: 'Letters you do not say',
      body: [
        'Some letters are written but not said. You have met two already: the final ה of תּוֹרָה, and the י in the ending ־ָיו, said -av.',
        'Grammar calls such a letter **resting** (נָח): it is there on the page, but it makes no sound of its own.',
        'The letter that rests most often is א. You read past it every day: בְּרֵאשִׁית בָּרָא has two, and neither is said.',
      ],
      examples: [
        { he: 'בְּרֵאשִׁית בָּרָא', note: 'Bereshit 1:1: b\'re-shit ba-ra. Neither א is said.', letters: [2, 8] },
        { he: 'רֹאשׁ', note: 'Shemot 12:2, as in Rosh Chodesh: rosh.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-tap-bereishit-bara',
          type: 'tap',
          prompt: 'Tap every א that is not said.',
          he: 'בְּרֵאשִׁית בָּרָא',
          answer: [2, 8],
          explain: 'Both of them. In b\'re-shit and ba-ra you go straight from the vowel to the next letter, or to the end of the word, without sounding the א.',
        },
      ],
    },
    {
      id: 'when-silent',
      heading: 'When is an א silent?',
      body: [
        'Look under and over the א. **An א with no vowel and no sheva of its own is silent.** The vowel you say belongs to the letter before it.',
        'An א with a vowel or a chataf of its own is a real consonant. It starts its syllable, even if you hardly hear it: אָמֵן is a-men, and אֱמֶת is e-met.',
      ],
      examples: [
        { he: 'צֹאן', note: 'Bereshit 4:2: tzon. The cholam belongs to the צ; the א has nothing of its own.', letters: [1] },
        { he: 'אָמֵן', note: 'a-men: the א has a kamatz, so it starts the word.', letters: [0] },
      ],
      check: [
        {
          id: 'chk-which-sounded',
          type: 'choice',
          prompt: 'Which א is a consonant, not a silent letter?',
          options: [
            { text: 'The א of אָמֵן', correct: true },
            { text: 'The א of צֹאן' },
            { text: 'The א of בָּרָא' },
          ],
          explain: 'The א of אָמֵן has its own vowel, a kamatz, so it starts the syllable a-. In צֹאן and בָּרָא the א has no vowel of its own and is silent.',
        },
      ],
    },
    {
      id: 'read-through',
      heading: 'Read straight through it',
      body: [
        'A silent א does not close a syllable. Read on as if it were not there: בָּרָא is ba-ra, two open syllables, and רֹאשׁ is one syllable, rosh, closed by the ש.',
        'The same goes for a silent א in the middle of a word. In רִאשׁוֹן, "first" (Shemot 12:2), you say ri-shon.',
        'A word from Kiddush shows it clearly. מְלַאכְתּוֹ, "his work", is m\'lach-to: the א is silent, and the syllable is closed by the כ.',
      ],
      examples: [
        { he: 'רִאשׁוֹן', note: 'Shemot 12:2: ri-shon.', letters: [1] },
        { he: 'מְלַאכְתּוֹ', note: 'Bereshit 2:2, in Kiddush: m\'lach-to.', letters: [2] },
      ],
      check: [
        {
          id: 'chk-split-bara',
          type: 'breakdown',
          prompt: 'Tap where the syllables divide.',
          he: 'בָּרָא',
          parts: [
            { he: 'בָּ', label: 'open' },
            { he: 'רָא', label: 'open' },
          ],
          explain: 'ba | ra. The silent א does not close the second syllable, so both are open.',
        },
      ],
    },
    {
      id: 'falls-silent',
      heading: 'When an א falls silent',
      body: [
        'Sometimes an א that would be sounded falls silent when a prefix is added, and the vowel before it changes to make up for it.',
        'You met the commonest case in the Sheva lesson. By the rule there, לְ + אֱמֹר, "to say", would give לֶאֱמֹר. Instead it is לֵאמֹר, le-mor: the א loses its chataf and falls silent, and the prefix takes a tzere.',
        'לֵאמֹר, "saying", comes hundreds of times in Tanakh, often just before someone speaks, as in Bereshit 1:22. The same silent א, after a cholam, is in וַיֹּאמֶר, "and he said".',
      ],
      examples: [
        { he: 'לֵאמֹר', note: 'Bereshit 1:22: le-mor.', letters: [1] },
        { he: 'וַיֹּאמֶר', note: 'Bereshit 1:3: va-yo-mer.', letters: [2] },
      ],
      callout: {
        kind: 'note',
        text: 'Not every word does this. לֶאֱכֹל, "to eat" (Shemot 16:8), keeps its א sounded, with a chataf: le-e-chol.',
      },
      check: [
        {
          id: 'chk-predict-leimor',
          type: 'predict',
          prompt: 'Which form is used in Tanakh?',
          parts: ['לְ', 'אֱמֹר'],
          options: [
            { text: 'לֵאמֹר', correct: true },
            { text: 'לֶאֱמֹר' },
            { text: 'לְאֱמֹר' },
          ],
          explain: 'לֵאמֹר. The Sheva lesson\'s rule would give לֶאֱמֹר, but this word goes one step further: the א falls silent and the prefix takes a tzere.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-tzon',
      type: 'tap',
      prompt: 'Tap the silent letter.',
      he: 'צֹאן',
      answer: [1],
      explain: 'The א. It has no vowel or sheva of its own; the cholam belongs to the צ: tzon.',
    },
    {
      id: 'tf-aleph-with-vowel',
      type: 'truefalse',
      statement: 'An א with a vowel under it is silent.',
      answer: false,
      explain: 'False. An א with its own vowel, like the א of אָמֵן, starts its syllable. Only an א with no vowel and no sheva of its own is silent.',
    },
    {
      id: 'tap-vayomer',
      type: 'tap',
      prompt: 'Tap the silent letter.',
      he: 'וַיֹּאמֶר',
      answer: [2],
      explain: 'The א. The cholam belongs to the י, so you read straight on to the מ: va-yo-mer.',
    },
    {
      id: 'choice-rosh-syllables',
      type: 'choice',
      prompt: 'How many syllables does רֹאשׁ have?',
      options: [
        { text: 'One: rosh', correct: true },
        { text: 'Two: ro-esh' },
      ],
      keepOrder: true,
      explain: 'One. The א is silent and does not start a new syllable, so you read ro straight into the ש.',
    },
    {
      id: 'match-say',
      type: 'match',
      prompt: 'Match each word to how it is said.',
      pairs: [
        { left: 'בָּרָא', right: 'ba-ra' },
        { left: 'רִאשׁוֹן', right: 'ri-shon' },
        { left: 'לֵאמֹר', right: 'le-mor' },
        { left: 'אֱמֶת', right: 'e-met' },
      ],
      explain: 'In the first three the א is silent. In אֱמֶת it has a chataf of its own, so it starts the word.',
    },
    {
      id: 'tf-closes',
      type: 'truefalse',
      statement: 'A silent א closes the syllable before it.',
      answer: false,
      explain: 'False. You read straight through a silent א. In בָּרָא both syllables are open: ba-ra.',
    },
    {
      id: 'choice-sounded',
      type: 'choice',
      prompt: 'In which word is the א sounded as a consonant?',
      options: [
        { text: 'אֱמֶת', correct: true },
        { text: 'צֹאן' },
        { text: 'רֹאשׁ' },
      ],
      explain: 'אֱמֶת. Its א has a chataf segol, so it starts the word: e-met. In צֹאן and רֹאשׁ the א has nothing of its own.',
    },
    {
      id: 'bank-leimor',
      type: 'wordbank',
      before: 'In לֵאמֹר the prefix has a ',
      after: ', because the א after it has fallen silent.',
      options: [
        { text: 'tzere', correct: true },
        { text: 'segol' },
        { text: 'sheva' },
      ],
      explain: 'Tzere. With the א sounded it would be לֶאֱמֹר; once the א falls silent, the prefix takes a tzere instead: le-mor.',
    },
    {
      id: 'split-rishon',
      type: 'breakdown',
      prompt: 'Tap where the syllables divide.',
      he: 'רִאשׁוֹן',
      parts: [
        { he: 'רִא', label: 'open' },
        { he: 'שׁוֹן', label: 'closed' },
      ],
      explain: 'ri | shon. The silent א goes with the first syllable but is not said, so ri- stays open.',
    },
  ],

  challenge: [
    {
      id: 'chal-melachto',
      type: 'choice',
      prompt: 'How is מְלַאכְתּוֹ, "his work", from Kiddush, said?',
      options: [
        { text: 'm\'lach-to', correct: true },
        { text: 'm\'la-ach-to' },
        { text: 'm\'la-a-che-to' },
      ],
      explain: 'm\'lach-to. The א has no vowel of its own, so it is silent; the כ has a silent sheva and closes the syllable lach.',
    },
    {
      id: 'chal-leechol',
      type: 'choice',
      prompt: 'Why is לֶאֱכֹל said le-e-chol, but לֵאמֹר is said le-mor?',
      options: [
        { text: 'The א of לֶאֱכֹל keeps its chataf, so it is sounded; in לֵאמֹר it has fallen silent', correct: true },
        { text: 'לֵאמֹר has no א' },
        { text: 'The prefixes are different words' },
      ],
      explain: 'Both start with the prefix לְ before an א. In לֶאֱכֹל the א keeps its chataf segol and is sounded. In לֵאמֹר it has lost it and rests, and the prefix takes a tzere instead.',
    },
    {
      id: 'chal-tap-rosh-chodashim',
      type: 'tap',
      prompt: 'Tap every letter that is written but not said.',
      he: 'רֹאשׁ חֳדָשִׁים',
      answer: [1, 6],
      explain: 'The א of רֹאשׁ rests, and the י of ־ִים is a vowel letter: it only shows the i (the Vowel letters lesson). The ח has a chataf of its own, so it is sounded.',
    },
  ],
};
