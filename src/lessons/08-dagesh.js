// Dagesh. Rules follow Weingreen §8 (with §5 on sheva). Explanations and
// examples are original; example words were checked against the Masoretic
// text and the siddur on Sefaria (Bereshit 1:2, 2:10, 5:1, 6:11; Shemot 20:2,
// 20:10; Devarim 6:5, 16:18; Yeshayahu 2:3; Kaddish; Lecha Dodi; birchot hamitzvot).

export default {
  id: 'dagesh',
  order: 8,
  title: 'Dagesh',
  hebrewTitle: 'דָּגֵשׁ',
  weingreen: '§8',
  summary: 'The dot inside a letter: when it makes the sound hard, and when it doubles the letter.',

  teach: [
    {
      id: 'dot-in-the-letter',
      heading: 'A dot inside the letter',
      body: [
        'You have read thousands of them: a dot sitting inside a letter. That dot is a **dagesh** (דָּגֵשׁ), and it does one of two jobs.',
        'In six particular letters it can make the sound **hard**. This is **dagesh lene** (דָּגֵשׁ קַל, the light dagesh).',
        'In almost any letter it can show that the letter is **doubled**, said twice over. This is **dagesh forte** (דָּגֵשׁ חָזָק, the strong dagesh).',
      ],
      examples: [
        { he: 'בָּרוּךְ', note: 'The opening of every berakha. The ב is hard, b not v: dagesh lene.', mark: 'dagesh' },
        { he: 'שַׁבָּת', note: 'Said shab-bat: the ב is doubled. Dagesh forte.', mark: 'dagesh' },
      ],
      callout: {
        kind: 'note',
        text: 'Not every dot is a dagesh. The dot in וּ is the vowel shuruk, and the dot above שׁ or שׂ only tells shin from sin.',
      },
      check: [
        {
          id: 'chk-tap-baruch',
          type: 'tap',
          prompt: 'Tap the letter that has a dagesh.',
          he: 'בָּרוּךְ',
          feature: 'dagesh',
          answer: [0],
          explain: 'The ב. The dot in the ו is the vowel shuruk, not a dagesh.',
        },
      ],
    },
    {
      id: 'begad-kefat',
      heading: 'The six letters: begad kefat',
      body: [
        'Six letters each have two sounds: soft without a dagesh, hard with one. They are ב ג ד כ פ ת, remembered as **begad kefat** (בְּגַד כְּפַת).',
        'Only these six can take a dagesh lene.',
      ],
      table: {
        headers: ['Letter', 'Without dagesh (soft)', 'With dagesh (hard)'],
        rows: [
          ['ב', 'v, as in *vine*', 'b, as in *boy*'],
          ['ג', 'a soft g, made further back', 'g, as in *go*'],
          ['ד', 'th, as in *this*', 'd, as in *day*'],
          ['כ', 'kh, as in *Bach*', 'k, as in *king*'],
          ['פ', 'f, as in *fall*', 'p, as in *pen*'],
          ['ת', 'th, as in *thin*', 't, as in *top*'],
        ],
      },
      callout: {
        kind: 'note',
        text: 'Most people today only hear the difference in ב, כ and פ. Some communities keep it in other letters too; many Ashkenazim, for example, say s for a ת without a dagesh.',
      },
      check: [
        {
          id: 'chk-shin-not-six',
          type: 'truefalse',
          statement: 'ש is one of the six begad kefat letters.',
          answer: false,
          explain: 'False. The six are ב ג ד כ פ ת. The dot on top of a שׁ only marks it as shin.',
        },
      ],
    },
    {
      id: 'lene-where',
      heading: 'Dagesh lene: a hard start',
      body: [
        'A begad kefat letter takes dagesh lene when it **begins a syllable** and **no vowel comes just before it**.',
        'That happens in two places. The first is the start of a word, as in תּוֹרָה or כִּי.',
        'The second is inside a word, straight after a **silent sheva**. A silent sheva closes the syllable before it, so the next letter starts afresh with no vowel before it.',
      ],
      examples: [
        { he: 'תּוֹרָה', note: 'The start of a word: nothing comes before the ת.', mark: 'dagesh' },
        { he: 'וְאָהַבְתָּ', note: 'From the Shema: ve-a-hav-ta. The sheva under the ב is silent, so the ת is hard.', mark: 'dagesh' },
        { he: 'מִשְׁפָּט', note: 'mish-pat: the פ follows the silent sheva under the שׁ.', mark: 'dagesh' },
      ],
      check: [
        {
          id: 'chk-mishpat-why',
          type: 'choice',
          prompt: 'Why does the פ in מִשְׁפָּט have a dagesh lene?',
          options: [
            { text: 'It begins a syllable straight after a silent sheva', correct: true },
            { text: 'It is doubled' },
            { text: 'It comes straight after a vowel' },
          ],
          explain: 'The silent sheva under the שׁ closes the first syllable, mish. The פ begins the next one with no vowel before it, so it takes dagesh lene.',
        },
      ],
    },
    {
      id: 'lene-not',
      heading: 'When the six letters stay soft',
      body: [
        'If a vowel comes just before a begad kefat letter, it has no dagesh lene and keeps its soft sound.',
        'Compare פְּנֵי with לִפְנֵי. In the first the פ starts the word, so it is hard: p\'nei. In the second the chirik under the ל comes just before it, so it is soft: lifnei.',
        'A **vocal sheva** counts as a vowel here. In בְּתוֹךְ the ת follows the vocal sheva under the ב, so it is soft.',
      ],
      examples: [
        { he: 'פְּנֵי', note: 'p\'nei: the פ starts the word.', mark: 'dagesh' },
        { he: 'לִפְנֵי', note: 'lifnei: a chirik just before the פ.', letters: [1] },
        { he: 'סֵפֶר', note: 'sefer: a tzere just before the פ.', letters: [1] },
        { he: 'בְּתוֹךְ', note: 'b\'tokh: a vocal sheva just before the ת.', letters: [1] },
      ],
      check: [
        {
          id: 'chk-lifnei-why',
          type: 'choice',
          prompt: 'Why is there no dagesh in the פ of לִפְנֵי?',
          options: [
            { text: 'A vowel, the chirik under the ל, comes just before it', correct: true },
            { text: 'פ never takes a dagesh in the middle of a word' },
            { text: 'The פ has a sheva under it' },
          ],
          explain: 'The chirik under the ל comes just before the פ, so the פ stays soft. In מִשְׁפָּט, by contrast, a silent sheva comes before the פ and it is hard.',
        },
        {
          id: 'chk-sefer-soft',
          type: 'truefalse',
          statement: 'The פ in סֵפֶר has no dagesh because a vowel comes just before it.',
          answer: true,
          explain: 'True. The tzere under the ס comes just before the פ, so it is soft: sefer.',
        },
      ],
    },
    {
      id: 'forte',
      heading: 'Dagesh forte: a doubled letter',
      body: [
        'A dagesh forte shows that the letter is doubled. שַׁבָּת is said shab-bat, and אַתָּה is at-tah.',
        'It can appear in any letter except the four gutturals א ה ח ע and the letter ר.',
        'A dagesh forte always comes **straight after a vowel**. That gives a quick test: a dagesh right after a vowel is forte; a dagesh with no vowel before it is lene.',
        'When one of the six begad kefat letters is doubled, it is hard as well: the ב of שַׁבָּת is b, not v.',
      ],
      examples: [
        { he: 'אַתָּה', note: 'at-tah: the ת is doubled, straight after the patach.', mark: 'dagesh' },
        { he: 'יִתְגַּדַּל', note: 'The opening of Kaddish has both kinds. The ג is lene, after the silent sheva under the ת. The ד is forte, after the patach.', mark: 'dagesh' },
      ],
      check: [
        {
          id: 'chk-yitgadal-forte',
          type: 'tap',
          prompt: 'Tap the letter with a dagesh forte.',
          he: 'יִתְגַּדַּל',
          feature: 'dagesh',
          all: false,
          answer: [3],
          explain: 'The ד: its dagesh comes straight after the patach under the ג, so the ד is doubled. The ג has a dagesh lene, after the silent sheva under the ת.',
        },
      ],
    },
    {
      id: 'why-double',
      heading: 'Why a letter doubles',
      body: [
        'Weingreen gives three reasons for a dagesh forte.',
        '**Compensative.** A letter has dropped out, and the next letter doubles to make up for it. The most common case is the נ of מִן, "from", which merges into the word after it: מִן + שָׁם gives מִשָּׁם, "from there".',
        '**Characteristic.** Some verb patterns double the middle letter of the root. In the piel pattern the root ק־ד־שׁ gives קִדְּשָׁנוּ, which you say in every berakha over a mitzvah.',
        '**Euphonic.** Now and then a letter is doubled simply because it sounds smoother.',
      ],
      examples: [
        { he: 'מִשָּׁם', note: 'מִן + שָׁם, "from there" (Bereshit 2:10).', mark: 'dagesh' },
        { he: 'מִצִּיּוֹן', note: 'מִן + צִיּוֹן, "from Zion", from the Torah service. The צ doubles for the lost נ.', letters: [1] },
        { he: 'קִדְּשָׁנוּ', note: 'Characteristic: the ד, the middle letter of the root, doubles.', mark: 'dagesh' },
      ],
      check: [
        {
          id: 'chk-predict-misham',
          type: 'predict',
          prompt: 'מִן joins the word after it. What do these make?',
          parts: ['מִן', 'שָׁם'],
          options: [
            { text: 'מִשָּׁם', correct: true },
            { text: 'מִנְשָׁם' },
            { text: 'מֵשָׁם' },
          ],
          explain: 'The נ of מִן drops out and the שׁ doubles to make up for it: מִשָּׁם. That is a compensative dagesh forte.',
        },
        {
          id: 'chk-kidshanu-why',
          type: 'choice',
          prompt: 'Why does the ד in קִדְּשָׁנוּ have a dagesh forte?',
          options: [
            { text: 'The verb pattern doubles the middle root letter (characteristic)', correct: true },
            { text: 'A נ has dropped out before it (compensative)' },
            { text: 'It begins the word' },
          ],
          explain: 'קִדְּשָׁנוּ is from the root ק־ד־שׁ in the piel pattern, which doubles the middle letter. Weingreen calls this a characteristic dagesh forte.',
        },
      ],
    },
    {
      id: 'cannot-double',
      heading: 'When a letter cannot double',
      body: [
        'The gutturals א ה ח ע and the letter ר never take a dagesh forte.',
        'When a word calls for one of them to be doubled, the vowel before it becomes longer instead. With מִן, the chirik becomes a tzere: מִן + אֶרֶץ gives מֵאֶרֶץ, as in מֵאֶרֶץ מִצְרַיִם.',
        'Lecha Dodi has both outcomes side by side in מֵרֹאשׁ מִקֶּדֶם. The ר cannot double, so the vowel lengthens. The ק can, so it doubles.',
      ],
      examples: [
        { he: 'מֵאֶרֶץ', note: 'Tzere under the מ: the א cannot double.', letters: [0] },
        { he: 'מֵרֹאשׁ מִקֶּדֶם', note: 'From Lecha Dodi: a lengthened vowel before the ר, a doubled ק.', mark: 'dagesh' },
      ],
      callout: {
        kind: 'tip',
        text: 'Find both jobs in one dot: מִבֵּית, "from the house of", as in מִבֵּית עֲבָדִים. The ב doubles for the lost נ, and as one of the six it is hard as well.',
      },
      check: [
        {
          id: 'chk-predict-meeretz',
          type: 'predict',
          prompt: 'What do these make?',
          parts: ['מִן', 'אֶרֶץ'],
          options: [
            { text: 'מֵאֶרֶץ', correct: true },
            { text: 'מִנְאֶרֶץ' },
            { text: 'מִאֶרֶץ' },
          ],
          explain: 'The נ drops out, but the א cannot double, so the chirik under the מ lengthens to tzere: מֵאֶרֶץ.',
        },
      ],
    },
  ],

  test: [
    {
      id: 'tap-atah',
      type: 'tap',
      prompt: 'Tap every letter with a dagesh.',
      he: 'אַתָּה',
      feature: 'dagesh',
      answer: [1],
      explain: 'Only the ת. It comes straight after the patach, so it is a dagesh forte: at-tah.',
    },
    {
      id: 'tap-kidshanu',
      type: 'tap',
      prompt: 'Tap every letter with a dagesh.',
      he: 'קִדְּשָׁנוּ',
      feature: 'dagesh',
      answer: [1],
      explain: 'Only the ד. The dot on the שׁ marks it as shin, and the dot in the final וּ is the vowel shuruk.',
    },
    {
      id: 'choice-ki',
      type: 'choice',
      prompt: 'In כִּי, the dagesh in the כ is a…',
      options: [
        { text: 'dagesh lene', correct: true },
        { text: 'dagesh forte' },
      ],
      keepOrder: true,
      explain: 'Dagesh lene. The כ begins the word with no vowel before it, so it is hard: ki, not khi.',
    },
    {
      id: 'choice-mikedem',
      type: 'choice',
      prompt: 'In מִקֶּדֶם, the dagesh in the ק is a…',
      options: [
        { text: 'dagesh lene' },
        { text: 'dagesh forte', correct: true },
      ],
      keepOrder: true,
      explain: 'Dagesh forte. It comes straight after the chirik, and ק is not one of the six letters, so it cannot be lene. It doubles for the lost נ of מִן.',
    },
    {
      id: 'tf-lene-any',
      type: 'truefalse',
      statement: 'A dagesh lene can appear in any letter.',
      answer: false,
      explain: 'False. Dagesh lene appears only in the six begad kefat letters: ב ג ד כ פ ת.',
    },
    {
      id: 'tf-resh',
      type: 'truefalse',
      statement: 'The letter ר never takes a dagesh forte.',
      answer: true,
      explain: 'True. Like the gutturals א ה ח ע, ר cannot be doubled.',
    },
    {
      id: 'bank-after-vowel',
      type: 'wordbank',
      before: 'A dagesh that comes straight after a vowel is a dagesh ',
      after: '.',
      options: [
        { text: 'forte', correct: true },
        { text: 'lene' },
      ],
      explain: 'Dagesh forte always follows a vowel. Dagesh lene never does.',
    },
    {
      id: 'match-four',
      type: 'match',
      prompt: 'Match each word with what is happening in its marked letter.',
      pairs: [
        { left: 'בָּרוּךְ', right: 'Hard: the ב begins the word' },
        { left: 'וְאָהַבְתָּ', right: 'Hard: the ת follows a silent sheva' },
        { left: 'לִפְנֵי', right: 'Soft: a vowel comes just before the פ' },
        { left: 'שַׁבָּת', right: 'Doubled: the ב follows a vowel' },
      ],
      explain: 'Begins the word or follows a silent sheva: dagesh lene. A vowel just before a begad kefat letter: soft, no dagesh lene. A dagesh straight after a vowel: dagesh forte.',
    },
    {
      id: 'predict-mitziyon',
      type: 'predict',
      prompt: 'What do these make?',
      parts: ['מִן', 'צִיּוֹן'],
      options: [
        { text: 'מִצִּיּוֹן', correct: true },
        { text: 'מֵצִיּוֹן' },
        { text: 'מִנְצִיּוֹן' },
      ],
      explain: 'The נ of מִן drops out and the צ doubles to make up for it: מִצִּיּוֹן, as in the Torah service.',
    },
    {
      id: 'breakdown-misham',
      type: 'breakdown',
      prompt: 'Tap where this word splits into its two parts.',
      he: 'מִשָּׁם',
      parts: [
        { he: 'מִ', label: 'from (מִן, its נ absorbed)' },
        { he: 'שָּׁם', label: 'there' },
      ],
      explain: 'מִן + שָׁם. The נ has gone, and the dagesh forte in the שׁ makes up for it.',
    },
    {
      id: 'choice-merosh',
      type: 'choice',
      prompt: 'מֵרֹאשׁ comes from מִן + רֹאשׁ. Why is there a tzere under the מ and no dagesh in the ר?',
      options: [
        { text: 'The ר cannot be doubled, so the vowel before it lengthens instead', correct: true },
        { text: 'The ר follows a vowel, so it stays soft' },
        { text: 'מִן always becomes מֵ before any letter' },
      ],
      explain: 'The נ of מִן would normally double the next letter, but ר cannot double. The chirik lengthens to tzere instead.',
    },
  ],

  challenge: [
    {
      id: 'chal-yitgadal-lene',
      type: 'tap',
      prompt: 'Tap the letter with a dagesh lene.',
      he: 'יִתְגַּדַּל',
      feature: 'dagesh',
      all: false,
      answer: [2],
      explain: 'The ג. The sheva under the ת is silent (yit-), so the ג begins a new syllable with no vowel before it. The ד follows a vowel, so its dagesh is forte.',
    },
    {
      id: 'chal-mitziyon-tap',
      type: 'tap',
      prompt: 'Tap the letter whose dagesh makes up for the lost נ of מִן.',
      he: 'מִצִּיּוֹן',
      feature: 'dagesh',
      all: false,
      answer: [1],
      explain: 'The צ. The dagesh in the י is part of the word צִיּוֹן itself.',
    },
    {
      id: 'chal-tetze-torah',
      type: 'choice',
      prompt: 'In כִּי מִצִּיּוֹן תֵּצֵא תוֹרָה, the ת of תוֹרָה has no dagesh. Why?',
      options: [
        { text: 'The word before ends in a vowel and is read closely together with it', correct: true },
        { text: 'A ת never has a dagesh at the start of a word' },
        { text: 'The ת has been doubled' },
      ],
      explain: 'A begad kefat letter at the start of a word usually has dagesh lene. But when the word before it ends in a vowel and the two are read as a close pair, that vowel counts as coming just before, and the letter stays soft. On its own the word is תּוֹרָה.',
    },
    {
      id: 'chal-predict-merosh',
      type: 'predict',
      prompt: 'What do these make?',
      parts: ['מִן', 'רֹאשׁ'],
      options: [
        { text: 'מֵרֹאשׁ', correct: true },
        { text: 'מִרֹּאשׁ' },
        { text: 'מִנְרֹאשׁ' },
      ],
      explain: 'ר cannot double, so the chirik under the מ lengthens to tzere: מֵרֹאשׁ, as in Lecha Dodi.',
    },
    {
      id: 'chal-mibeit-both',
      type: 'truefalse',
      statement: 'In מִבֵּית, the dagesh in the ב does both jobs: the ב is doubled and it is hard.',
      answer: true,
      explain: 'True. It doubles to make up for the lost נ of מִן, and because ב is one of the six letters, a doubled ב is also hard.',
    },
    {
      id: 'chal-which-forte',
      type: 'choice',
      prompt: 'Which of these has a dagesh forte?',
      options: [
        { text: 'מִקֶּדֶם', correct: true },
        { text: 'פְּנֵי' },
        { text: 'תּוֹרָה' },
        { text: 'סֵפֶר' },
      ],
      explain: 'מִקֶּדֶם: the dagesh in the ק follows the chirik, so it is forte. פְּנֵי and תּוֹרָה have a dagesh lene at the start of the word, and סֵפֶר has no dagesh.',
    },
  ],
};
