// The gutturals. Rules checked against Gesenius' Hebrew Grammar (1910), §22
// (with §6 for the letters and §10 for the chataf vowels). Explanations and
// examples are original; example words were checked against the Masoretic
// text on Sefaria (Bereshit 1:2, 3:5, 6:9, 8:20, 13:6, 25:26; Shemot 2:6,
// 12:27, 16:8, 24:7; Devarim 6:4; Tehillim 145:16).

export default {
  id: 'gutturals',
  order: 11,
  title: 'The gutturals',
  hebrewTitle: 'אוֹתִיּוֹת הַגָּרוֹן',
  summary: 'The four throat letters and their habits, including the stolen patach.',

  teach: [
    {
      id: 'throat-letters',
      heading: 'Four throat letters',
      body: [
        'א ה ח ע are said in the throat. Grammar calls them the **gutturals** (אוֹתִיּוֹת הַגָּרוֹן, "throat letters").',
        'You have met three of their habits already. They take a chataf instead of a vocal sheva (the Sheva lesson). They are not doubled with a dagesh forte (the Dagesh lesson). And א often falls silent (the Silent letters lesson).',
        'This lesson adds two more: a patach that is said before its letter, and a liking for the a sound.',
      ],
      callout: {
        kind: 'note',
        text: 'ר is not a guttural, but it shares one of their habits: it is not doubled either.',
      },
      check: [
        {
          id: 'chk-not-guttural',
          type: 'choice',
          prompt: 'Which of these is not one of the four gutturals?',
          options: [
            { text: 'ר', correct: true },
            { text: 'ע' },
            { text: 'ח' },
          ],
          explain: 'ר. It shares the gutturals\' dislike of doubling, but the four gutturals are א ה ח ע.',
        },
      ],
    },
    {
      id: 'stolen-patach',
      heading: 'The stolen patach',
      body: [
        'Say נֹחַ, Noah. You say No-ach: the a sound comes *before* the ח, even though the patach is written under it.',
        'This is a **stolen patach** (פַּתַח גְּנוּבָה). It comes under a ח, a ע, or a ה with a mappik, at the very end of a word, when the vowel before it is not a. It slips in a short a, so that the throat letter can be heard clearly.',
        'You say it in רוּחַ, ru-ach, and in מִזְבֵּחַ, miz-be-ach.',
      ],
      examples: [
        { he: 'נֹחַ', note: 'Bereshit 6:9: No-ach.', letters: [1] },
        { he: 'רוּחַ', note: 'Bereshit 1:2: ru-ach.', letters: [2] },
        { he: 'מִזְבֵּחַ', note: 'Bereshit 8:20: miz-be-ach.', letters: [3] },
      ],
      check: [
        {
          id: 'chk-say-ruach',
          type: 'choice',
          prompt: 'How is רוּחַ said?',
          options: [
            { text: 'ru-ach', correct: true },
            { text: 'ru-cha' },
            { text: 'ruch' },
          ],
          explain: 'ru-ach. The patach under the final ח is stolen: it is said before the ח, after the u.',
        },
      ],
    },
    {
      id: 'stolen-or-not',
      heading: 'Stolen or ordinary?',
      body: [
        'Only a patach under the last letter of a word can be stolen, and only when the vowel before it is not a.',
        'In Ashrei we say פּוֹתֵחַ אֶת־יָדֶךָ וּמַשְׂבִּיעַ לְכָל־חַי רָצוֹן. The patach at the end of פּוֹתֵחַ (po-te-ach) and of וּמַשְׂבִּיעַ (u-mas-bi-a) is stolen. In חַי it is an ordinary vowel, said after the ח: chai.',
        'Compare שְׁמַע in the Shema: there the patach is under the מ, and the ע has no vowel at all: sh\'ma.',
      ],
      examples: [
        { he: 'פּוֹתֵחַ אֶת־יָדֶךָ וּמַשְׂבִּיעַ לְכָל־חַי רָצוֹן', note: 'Tehillim 145:16, in Ashrei.', letters: [3, 14] },
      ],
      check: [
        {
          id: 'chk-tap-ashrei',
          type: 'tap',
          prompt: 'Tap the letters with a stolen patach.',
          he: 'פּוֹתֵחַ אֶת־יָדֶךָ וּמַשְׂבִּיעַ לְכָל־חַי רָצוֹן',
          feature: 'patach',
          all: false,
          answer: [3, 14],
          explain: 'The ח of פּוֹתֵחַ and the ע of וּמַשְׂבִּיעַ: each is the last letter, after a vowel that is not a. The patach under the ח of חַי is ordinary, because it is not on the last letter.',
        },
      ],
    },
    {
      id: 'chataf-echo',
      heading: 'A chataf that echoes',
      body: [
        'In the Sheva lesson, a guttural took a chataf where another letter would have a vocal sheva. In the middle of a word, a guttural often takes a chataf where another letter would have a *silent* sheva, too.',
        'Then the chataf usually matches the vowel just before it. יַעֲקֹב has a patach, then a chataf patach: ya-a-kov. נַעֲשֶׂה, "we will do", is na-a-se.',
        'The chataf is said quickly, so the two a sounds run together.',
      ],
      examples: [
        { he: 'יַעֲקֹב', note: 'Bereshit 25:26: ya-a-kov.', letters: [1] },
        { he: 'נַעֲשֶׂה וְנִשְׁמָע', note: 'Shemot 24:7: na-a-se v\'nish-ma.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'Not always: יַחְדָּו, "together" (Bereshit 13:6), keeps a plain silent sheva under the ח: yach-dav.',
      },
      check: [
        {
          id: 'chk-bank-yaakov',
          type: 'wordbank',
          before: 'The ע of יַעֲקֹב has a chataf ',
          after: ', matching the patach under the י.',
          options: [
            { text: 'patach', correct: true },
            { text: 'segol' },
            { text: 'kamatz' },
          ],
          explain: 'Chataf patach. A chataf in the middle of a word usually echoes the vowel before it: ya-a-kov.',
        },
      ],
    },
    {
      id: 'like-a',
      heading: 'Throat letters like the a sound',
      body: [
        'Many words have two segols in a row, like מֶלֶךְ and חֶסֶד. When the last letter is a guttural, the second vowel is a patach instead: פֶּסַח is PE-sach, and זֶבַח, "offering", is ZE-vach.',
        'A guttural in the middle often does the same: נַעַר, "a boy" (Shemot 2:6), has two patachs: NA-ar.',
        'In general, gutturals pull the vowels next to them towards a. Later lessons on nouns and verbs will show more of this.',
      ],
      examples: [
        { he: 'זֶבַח־פֶּסַח', note: 'Shemot 12:27: ze-vach pe-sach.', letters: [2, 5] },
        { he: 'נַעַר', note: 'Shemot 2:6: na-ar.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'Not every word follows it: לֶחֶם, "bread", keeps its two segols even with the ח in the middle.',
      },
      check: [
        {
          id: 'chk-why-pesach',
          type: 'choice',
          prompt: 'Why is it פֶּסַח and not פֶּסֶח?',
          options: [
            { text: 'The last letter, ח, is a guttural, and gutturals pull the vowel towards a', correct: true },
            { text: 'The word is stressed on the last syllable' },
            { text: 'Because of the dagesh in the פ' },
          ],
          explain: 'The ח is a guttural. Before a final guttural, the second vowel of such a word is a patach. The stress stays on the first syllable: PE-sach.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-veruach',
      type: 'tap',
      prompt: 'Tap the letter with a stolen patach.',
      he: 'וְרוּחַ',
      feature: 'patach',
      answer: [3],
      explain: 'The ח. It is the last letter, after a shuruk, so its patach is said first: v\'ru-ach.',
    },
    {
      id: 'choice-noach',
      type: 'choice',
      prompt: 'How is נֹחַ said?',
      options: [
        { text: 'No-ach', correct: true },
        { text: 'No-cha' },
        { text: 'Noch' },
      ],
      explain: 'No-ach. The patach under the final ח is stolen: you say it before the ח.',
    },
    {
      id: 'tf-stolen-start',
      type: 'truefalse',
      statement: 'A stolen patach can come under the first letter of a word.',
      answer: false,
      explain: 'False. A stolen patach only comes under the last letter of a word, under ח, ע or a ה with a mappik.',
    },
    {
      id: 'choice-which-stolen',
      type: 'choice',
      prompt: 'In which word is the patach stolen?',
      options: [
        { text: 'יֹדֵעַ', correct: true },
        { text: 'חַי' },
        { text: 'שְׁמַע' },
      ],
      explain: 'יֹדֵעַ, "knows" (Bereshit 3:5): yo-de-a. In חַי the patach is under the first letter, and in שְׁמַע it is under the מ, not the ע.',
    },
    {
      id: 'match-say',
      type: 'match',
      prompt: 'Match each word to how it is said.',
      pairs: [
        { left: 'יַעֲקֹב', right: 'ya-a-kov' },
        { left: 'מִזְבֵּחַ', right: 'miz-be-ach' },
        { left: 'נַעַר', right: 'na-ar' },
        { left: 'פֶּסַח', right: 'pe-sach' },
      ],
      explain: 'יַעֲקֹב has a chataf that echoes the patach before it. מִזְבֵּחַ ends in a stolen patach. נַעַר and פֶּסַח take patach because of their gutturals.',
    },
    {
      id: 'bank-echo',
      type: 'wordbank',
      before: 'A chataf in the middle of a word usually matches ',
      after: '.',
      options: [
        { text: 'the vowel before it', correct: true },
        { text: 'the vowel after it' },
        { text: 'the last vowel of the word' },
      ],
      explain: 'The vowel before it: a patach then a chataf patach in יַעֲקֹב and נַעֲשֶׂה.',
    },
    {
      id: 'tap-gutturals',
      type: 'tap',
      prompt: 'Tap every guttural.',
      he: 'נַעֲשֶׂה וְנִשְׁמָע',
      answer: [1, 3, 8],
      explain: 'Both ע letters and the ה. The four gutturals are א ה ח ע.',
    },
    {
      id: 'tf-double',
      type: 'truefalse',
      statement: 'A guttural can take a dagesh forte.',
      answer: false,
      explain: 'False. Gutturals are not doubled (the Dagesh lesson). The vowel before them often lengthens instead.',
    },
    {
      id: 'tf-every-chataf',
      type: 'truefalse',
      statement: 'Every guttural in the middle of a word takes a chataf.',
      answer: false,
      explain: 'False. Many do, but some keep a plain silent sheva, as in יַחְדָּו, yach-dav.',
    },
  ],

  challenge: [
    {
      id: 'chal-lisboa',
      type: 'choice',
      prompt: 'Shemot 16:8 has לִשְׂבֹּעַ, "to be satisfied". How is it said?',
      options: [
        { text: 'lis-bo-a', correct: true },
        { text: 'lis-b\'a' },
        { text: 'lis-bo' },
      ],
      explain: 'lis-bo-a. The ע is the last letter and comes after a cholam, so its patach is stolen and said before it.',
    },
    {
      id: 'chal-chai',
      type: 'choice',
      prompt: 'Why is the patach of חַי not a stolen patach?',
      options: [
        { text: 'It is under the first letter, so it is said after the ח as usual', correct: true },
        { text: 'חַי has no guttural' },
        { text: 'A stolen patach only comes under ע' },
      ],
      explain: 'A stolen patach only comes under the last letter of a word. In חַי the ח is the first letter, and its patach is its ordinary vowel: chai.',
    },
    {
      id: 'chal-lechem',
      type: 'choice',
      prompt: 'Many words with a guttural take a patach where you would expect a segol, like פֶּסַח and נַעַר. Which of these keeps its two segols anyway?',
      options: [
        { text: 'לֶחֶם', correct: true },
        { text: 'זֶבַח' },
        { text: 'נַעַר' },
      ],
      explain: 'לֶחֶם, "bread". Its ח is in the middle, and here the segols stay. זֶבַח and נַעַר both have a patach.',
    },
  ],
};
