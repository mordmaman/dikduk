// The gutturals. Rules checked against Gesenius' Hebrew Grammar (1910), §22
// (with §6 for the letters and §10 for the chataf vowels). Explanations and
// examples are original; example words were checked against the Masoretic
// text on Sefaria (Bereshit 1:2, 1:11, 3:5, 6:9, 8:20, 13:6, 25:26; Shemot 2:6,
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
        'א ה ח ע are said in the throat. You met them in the Sheva lesson as the gutturals (אוֹתִיּוֹת הַגָּרוֹן, "throat letters").',
        'You have also met three of their habits. They take a chataf instead of a vocal sheva (the Sheva lesson). They are not doubled with a dagesh forte (the Dagesh lesson). And א often falls silent (the Silent letters lesson).',
        'This lesson adds three more: a patach said before its letter, a chataf where other letters have a silent sheva, and a liking for the a sound.',
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
        'Say נֹחַ, Noah. You say NO-ach: the a sound comes *before* the ח, even though the patach is written under it.',
        'This is a **stolen patach** (פַּתַח גְּנוּבָה). It comes only under the last letter of a word. That letter is a ח, a ע, or a ה with a mappik. And the vowel before it is not a.',
        'It slips in a short a, so that the throat letter can be heard clearly. You say it in רוּחַ, RU-ach, and in מִזְבֵּחַ, miz-BE-ach.',
      ],
      examples: [
        { he: 'נֹחַ', note: 'Bereshit 6:9: NO-ach.', letters: [1] },
        { he: 'רוּחַ', note: 'Bereshit 1:2: RU-ach.', letters: [2] },
        { he: 'מִזְבֵּחַ', note: 'Bereshit 8:20: miz-BE-ach.', letters: [3] },
      ],
      callout: {
        kind: 'note',
        text: 'The stolen a is a quick glide into the throat letter, not a full syllable of its own. RU-ach shows the order of the sounds, but רוּחַ is still one beat, stressed on ru.',
      },
      check: [
        {
          id: 'chk-say-ruach',
          type: 'choice',
          prompt: 'How is רוּחַ said?',
          options: [
            { text: 'RU-ach', correct: true },
            { text: 'ru-CHA' },
            { text: 'ruch' },
          ],
          explain: 'RU-ach. The patach under the final ח is stolen: it is said before the ח, straight after the u.',
        },
      ],
    },
    {
      id: 'stolen-or-not',
      heading: 'Stolen or ordinary?',
      body: [
        'Only a patach under the last letter of a word can be stolen, and only when the vowel before it is not a.',
        'In Ashrei we say פּוֹתֵחַ אֶת־יָדֶךָ וּמַשְׂבִּיעַ לְכָל־חַי רָצוֹן. The patach at the end of פּוֹתֵחַ (po-TE-ach) and of וּמַשְׂבִּיעַ (u-mas-BI-a) is stolen. In חַי it is an ordinary vowel, said after the ח: chai.',
        'Compare שְׁמַע in the Shema: there the patach is under the מ, and the ע has no vowel at all: sh\'MA.',
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
        'Then the chataf usually matches the vowel just before it. יַעֲקֹב has a patach, then a chataf patach: ya-a-KOV. נַעֲשֶׂה, "we will do", is na-a-SE.',
        'The chataf is said quickly, but it is still its own syllable: ya-a-KOV.',
      ],
      examples: [
        { he: 'יַעֲקֹב', note: 'Bereshit 25:26: ya-a-KOV.', letters: [1] },
        { he: 'נַעֲשֶׂה וְנִשְׁמָע', note: 'Shemot 24:7: na-a-SE v\'nish-MA.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'Not always: יַחְדָּו, "together" (Bereshit 13:6), keeps a plain silent sheva under the ח: yach-DAV.',
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
          explain: 'Chataf patach. A chataf that stands where another letter would have a silent sheva usually echoes the vowel before it: ya-a-KOV.',
        },
      ],
    },
    {
      id: 'like-a',
      heading: 'Throat letters like the a sound',
      body: [
        'Many words have two segols in a row, like מֶלֶךְ (the Syllables lesson). When the last letter is a ח or a ע, the second segol becomes a patach: פֶּסַח is PE-sach, and זֶבַח, "offering", is ZE-vach.',
        'A guttural in the middle often turns both segols into patach: נַעַר, "a boy" (Shemot 2:6), is NA-ar.',
        'A guttural at the start does not do this: אֶרֶץ, עֶרֶב and חֶסֶד keep their segols.',
      ],
      examples: [
        { he: 'זֶבַח־פֶּסַח', note: 'Shemot 12:27: ZE-vach PE-sach.', letters: [2, 5] },
        { he: 'נַעַר', note: 'Shemot 2:6: NA-ar.', letters: [1] },
      ],
      callout: {
        kind: 'note',
        text: 'A final א does not count: it is silent, so דֶּשֶׁא, "grass" (Bereshit 1:11), keeps its two segols. And some words keep them anyway: לֶחֶם, "bread", has a ח in the middle but two segols.',
      },
      check: [
        {
          id: 'chk-why-pesach',
          type: 'choice',
          prompt: 'Why is it פֶּסַח and not פֶּסֶח?',
          options: [
            { text: 'The last letter, ח, is a guttural, and pulls the vowel before it towards a', correct: true },
            { text: 'The word is stressed on the last syllable' },
            { text: 'Because of the dagesh in the פ' },
          ],
          explain: 'In a two-segol word like מֶלֶךְ, a final ח or ע turns the second segol into a patach. The stress stays on the first syllable: PE-sach.',
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
      explain: 'The ח. It is the last letter, after a shuruk, so its patach is said first: v\'RU-ach.',
    },
    {
      id: 'choice-noach',
      type: 'choice',
      prompt: 'How is נֹחַ said?',
      options: [
        { text: 'NO-ach', correct: true },
        { text: 'no-CHA' },
        { text: 'noch' },
      ],
      explain: 'NO-ach. The patach under the final ח is stolen: you say it before the ח.',
    },
    {
      id: 'tf-stolen-start',
      type: 'truefalse',
      statement: 'A stolen patach can come under the first letter of a word.',
      answer: false,
      explain: 'False. A stolen patach only comes under the last letter of a word: a ח, a ע, or a ה with a mappik.',
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
      explain: 'יֹדֵעַ, "knows" (Bereshit 3:5): yo-DE-a. The ע is the last letter, after a tzere. In חַי the patach is under the first letter, and in שְׁמַע it is under the מ, not the ע.',
    },
    {
      id: 'match-say',
      type: 'match',
      prompt: 'Match each word to how it is said.',
      pairs: [
        { left: 'יַעֲקֹב', right: 'ya-a-KOV' },
        { left: 'מִזְבֵּחַ', right: 'miz-BE-ach' },
        { left: 'נַעַר', right: 'NA-ar' },
        { left: 'פֶּסַח', right: 'PE-sach' },
      ],
      explain: 'יַעֲקֹב has a chataf that echoes the patach before it. מִזְבֵּחַ ends in a stolen patach. נַעַר and פֶּסַח take a patach because of their gutturals.',
    },
    {
      id: 'bank-echo',
      type: 'wordbank',
      before: 'A chataf that stands where another letter would have a silent sheva usually matches ',
      after: '.',
      options: [
        { text: 'the vowel before it', correct: true },
        { text: 'the vowel after it' },
        { text: 'the last vowel of the word' },
      ],
      explain: 'The vowel before it: a patach, then a chataf patach, in יַעֲקֹב and נַעֲשֶׂה.',
    },
    {
      id: 'tap-gutturals',
      type: 'tap',
      prompt: 'Tap every one of the four guttural letters (א ה ח ע), even one that is silent here.',
      he: 'נַעֲשֶׂה וְנִשְׁמָע',
      answer: [1, 3, 8],
      explain: 'Both ע letters and the ה. The final ה of נַעֲשֶׂה is a silent vowel letter here, but it is still one of the four guttural letters.',
    },
    {
      id: 'tf-double',
      type: 'truefalse',
      statement: 'A guttural can take a dagesh forte.',
      answer: false,
      explain: 'False. Gutturals are not doubled (the Dagesh lesson). The vowel before them often lengthens instead.',
    },
    {
      id: 'tf-never-silent-sheva',
      type: 'truefalse',
      statement: 'A guttural in the middle of a word never has a plain silent sheva.',
      answer: false,
      explain: 'False. It often takes a chataf instead, but some keep a plain silent sheva, as in יַחְדָּו, yach-DAV.',
    },
  ],

  challenge: [
    {
      id: 'chal-lisboa',
      type: 'choice',
      prompt: 'Shemot 16:8 has לִשְׂבֹּעַ, "to be satisfied". How is it said?',
      options: [
        { text: 'lis-BO-a', correct: true },
        { text: 'lis-BA' },
        { text: 'lis-BO' },
      ],
      explain: 'lis-BO-a. The ע is the last letter and comes after a cholam, so its patach is stolen and said before it.',
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
      id: 'chal-middle-always',
      type: 'truefalse',
      statement: 'A guttural in the middle of a two-segol word always turns the segols into patach.',
      answer: false,
      explain: 'False. Often, not always: לֶחֶם keeps both segols though its ח is in the middle, while נַעַר has two patachs. The rule tells you what to expect; the vowels on the page tell you what is there.',
    },
    {
      id: 'chal-deshe',
      type: 'choice',
      prompt: 'דֶּשֶׁא (Bereshit 1:11) ends in a guttural letter, yet keeps two segols. Why?',
      options: [
        { text: 'Its final א is silent, so it does not pull the vowel towards a', correct: true },
        { text: 'א is not a guttural' },
        { text: 'It is a pausal form' },
      ],
      explain: 'Only a final ח or ע turns the second segol into a patach. A final א is silent (the Silent letters lesson), so דֶּשֶׁא keeps its segols.',
    },
  ],
};
