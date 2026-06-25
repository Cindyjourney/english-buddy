// Grammar stages define the order and color of each learning stage
const GRAMMAR_STAGES = [
  { id: 'stage1', title: 'Word World',     icon: '🔤', color: '#ec4899', topics: ['nouns','verbs','adjectives','articles','pronouns'] },
  { id: 'stage2', title: 'Sentence World', icon: '🏗️', color: '#f97316', topics: ['subject_verb','be_verb','svo','plural_nouns'] },
  { id: 'stage3', title: 'Tense World',    icon: '⏰', color: '#8b5cf6', topics: ['simple_present','present_continuous','simple_past','simple_future','present_perfect','past_continuous','past_perfect','future_continuous'] },
  { id: 'stage4', title: 'Question World', icon: '❓', color: '#06b6d4', topics: ['yes_no_questions','wh_questions','negatives'] },
  { id: 'stage5', title: 'Power Words',    icon: '💪', color: '#10b981', topics: ['can_cannot','have_has','prepositions','comparatives'] },
];

// Each topic: explanation + 5 exercises
// Exercise types: choose (4-option MC), fill (type missing word), arrange (order words), sentence (which sentence is correct)
const GRAMMAR_TOPICS = {

  // ─── STAGE 1: WORD WORLD ─────────────────────────────────────────────────
  nouns: {
    id: 'nouns', title: 'Nouns', subtitle: 'Naming Words', icon: '📦', stage: 'stage1',
    explanation: {
      rule: 'A NOUN names a person, place, animal, or thing!',
      examples: ['cat 🐱', 'park 🌳', 'book 📚', 'teacher 👩‍🏫'],
      tip: 'Tip: If you can say "a ___" before it — it\'s probably a noun! a cat ✓, a park ✓',
    },
    exercises: [
      { type: 'choose', question: 'Which word is a NOUN?', options: ['run','big','cat','quickly'], answer: 2, feedback: 'CAT is a noun — it names an animal! 🐱' },
      { type: 'choose', question: 'Which word is a NOUN?', options: ['happy','elephant','jump','fast'], answer: 1, feedback: 'ELEPHANT is a noun — it names an animal! 🐘' },
      { type: 'fill', sentence: 'I see a ___ in the sky.', answer: 'cloud', hint: '☁️ white and fluffy', feedback: 'CLOUD is a noun — it names a thing! ☁️' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['dog','I','a','have'], correctOrder: [1,3,2,0], sentence: 'I have a dog', feedback: 'DOG is the noun here! 🐕' },
      { type: 'choose', question: 'Which sentence contains a NOUN?', options: ['Run very quickly!','She is a teacher.','Jump high now!','Very fast and big.'], answer: 1, feedback: 'TEACHER is a noun — it names a person! 👩‍🏫' },
    ],
  },

  verbs: {
    id: 'verbs', title: 'Verbs', subtitle: 'Action Words', icon: '⚡', stage: 'stage1',
    explanation: {
      rule: 'A VERB is an action word — it tells us what someone DOES!',
      examples: ['run 🏃', 'eat 🍽️', 'sleep 😴', 'jump 🦘', 'swim 🏊'],
      tip: 'Tip: Ask "What is happening?" — the answer is usually a verb!',
    },
    exercises: [
      { type: 'choose', question: 'Which word is a VERB (action word)?', options: ['cat','run','big','apple'], answer: 1, feedback: 'RUN is a verb — it\'s an action! 🏃' },
      { type: 'choose', question: 'Which word is a VERB?', options: ['happy','school','swim','book'], answer: 2, feedback: 'SWIM is a verb — fish and dolphins swim! 🏊' },
      { type: 'fill', sentence: 'The birds ___ in the sky.', answer: 'fly', hint: '🦅 birds move through the sky', feedback: 'FLY is a verb — it shows what the birds do! 🦅' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['eats','She','apple','an'], correctOrder: [1,0,3,2], sentence: 'She eats an apple', feedback: 'EATS is the verb — it tells us what she does! 🍎' },
      { type: 'choose', question: 'Which word is a VERB?', options: ['elephant','blue','dance','table'], answer: 2, feedback: 'DANCE is a verb — dancing is an action! 💃' },
    ],
  },

  adjectives: {
    id: 'adjectives', title: 'Adjectives', subtitle: 'Describing Words', icon: '🎨', stage: 'stage1',
    explanation: {
      rule: 'An ADJECTIVE describes a noun — it tells us WHAT something is like!',
      examples: ['big 🐘', 'red 🍎', 'happy 😊', 'cold 🧊', 'soft 🐑'],
      tip: 'Tip: Adjectives come BEFORE nouns: a BIG dog, a RED apple, a HAPPY girl!',
    },
    exercises: [
      { type: 'choose', question: 'Which word is an ADJECTIVE (describing word)?', options: ['run','apple','happy','school'], answer: 2, feedback: 'HAPPY is an adjective — it describes a feeling! 😊' },
      { type: 'choose', question: 'Which phrase is CORRECT?', options: ['a big elephant','a elephant big','elephant a big','big a elephant'], answer: 0, feedback: 'BIG comes BEFORE the noun — that\'s correct! 🐘' },
      { type: 'fill', sentence: 'The elephant is very ___.', answer: 'big', hint: '🐘 elephants are not small!', feedback: 'BIG is an adjective — it describes the elephant! 🐘' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['cat','a','have','I','small'], correctOrder: [3,2,1,4,0], sentence: 'I have a small cat', feedback: 'SMALL is the adjective — it describes the cat! 🐱' },
      { type: 'choose', question: 'Which word is an ADJECTIVE?', options: ['teacher','run','cold','park'], answer: 2, feedback: 'COLD is an adjective — it describes temperature! 🧊' },
    ],
  },

  articles: {
    id: 'articles', title: 'Articles', subtitle: 'a, an, the', icon: '🔑', stage: 'stage1',
    explanation: {
      rule: 'Use A before consonant sounds. Use AN before vowel sounds (a, e, i, o, u). Use THE for specific things.',
      examples: ['a cat 🐱', 'an apple 🍎', 'an elephant 🐘', 'the sun ☀️'],
      tip: 'Trick: Say it aloud! "a apple" sounds wrong — "an apple" sounds right! 🍎',
    },
    exercises: [
      { type: 'choose', question: 'Choose the correct article: "___ apple"', options: ['a','an','the','no article'], answer: 1, feedback: 'AN apple — "apple" starts with vowel A! 🍎' },
      { type: 'choose', question: 'Choose the correct article: "___ dog"', options: ['an','the','a','is'], answer: 2, feedback: 'A dog — "dog" starts with consonant D! 🐕' },
      { type: 'fill', sentence: 'I see ___ elephant.', answer: 'an', hint: '🐘 elephant starts with a vowel!', feedback: 'AN elephant — "elephant" starts with E! 🐘' },
      { type: 'choose', question: 'Choose the correct article: "___ orange"', options: ['a','the','an','and'], answer: 2, feedback: 'AN orange — "orange" starts with vowel O! 🍊' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['see','I','cat','a'], correctOrder: [1,0,3,2], sentence: 'I see a cat', feedback: 'A cat — "cat" starts with consonant C! 🐱' },
    ],
  },

  pronouns: {
    id: 'pronouns', title: 'Pronouns', subtitle: 'I, You, He, She...', icon: '👥', stage: 'stage1',
    explanation: {
      rule: 'Pronouns REPLACE nouns so we don\'t repeat the same word!',
      examples: ['I (me) 👤', 'You 👆', 'He (boy) 👦', 'She (girl) 👧', 'It (thing) 🎁', 'We 👫', 'They 👨‍👩‍👧‍👦'],
      tip: 'Tip: "Tom is tall. HE is tall." — HE replaces Tom!',
    },
    exercises: [
      { type: 'choose', question: 'Tom likes cats. ___ likes cats.', options: ['She','He','They','We'], answer: 1, feedback: 'HE replaces "Tom" — Tom is a boy! 👦' },
      { type: 'choose', question: 'Mary is my friend. ___ is kind.', options: ['He','It','She','We'], answer: 2, feedback: 'SHE replaces "Mary" — Mary is a girl! 👧' },
      { type: 'fill', sentence: 'I have a dog. ___ is cute.', answer: 'It', hint: '🐕 the dog is an animal', feedback: 'IT replaces "dog" — use IT for animals and things! 🐕' },
      { type: 'choose', question: 'Tom and Mary are friends. ___ play together.', options: ['He','She','It','They'], answer: 3, feedback: 'THEY replaces "Tom and Mary" — two people! 👫' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['is','She','tall','very'], correctOrder: [1,0,3,2], sentence: 'She is very tall', feedback: 'SHE is a pronoun for a girl! 👧' },
    ],
  },

  // ─── STAGE 2: SENTENCE WORLD ─────────────────────────────────────────────
  subject_verb: {
    id: 'subject_verb', title: 'Subject + Verb', subtitle: 'Who does what', icon: '🧱', stage: 'stage2',
    explanation: {
      rule: 'Every sentence needs a SUBJECT (who) + a VERB (what they do)!',
      examples: ['Birds fly. 🦅', 'Fish swim. 🐟', 'Dogs bark. 🐕', 'I run. 🏃'],
      tip: 'Tip: Find WHO is doing something (subject), then WHAT they do (verb)!',
    },
    exercises: [
      { type: 'choose', question: 'What is the SUBJECT of: "The cat sleeps."', options: ['sleeps','The','cat','The cat sleeps'], answer: 2, feedback: 'CAT is the subject — it\'s WHO is sleeping! 🐱' },
      { type: 'choose', question: 'What is the VERB of: "Birds fly."', options: ['Birds','fly','the','high'], answer: 1, feedback: 'FLY is the verb — it\'s WHAT the birds do! 🦅' },
      { type: 'fill', sentence: 'Dogs ___.', answer: 'bark', hint: '🐕 what sound do dogs make?', feedback: 'BARK is the verb — that\'s what dogs do! 🐕' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['jump','Frogs'], correctOrder: [1,0], sentence: 'Frogs jump', feedback: 'FROGS (subject) + JUMP (verb) = a complete sentence! 🐸' },
      { type: 'choose', question: 'Which is a complete sentence?', options: ['The big dog','Runs fast always','The dog runs.','Very big and'], answer: 2, feedback: '"The dog runs" has a subject AND a verb! ✅' },
    ],
  },

  be_verb: {
    id: 'be_verb', title: 'BE Verb', subtitle: 'am, is, are', icon: '🌟', stage: 'stage2',
    explanation: {
      rule: 'Use AM with I. Use IS with he, she, it. Use ARE with you, we, they.',
      examples: ['I AM happy 😊', 'She IS tall 📏', 'They ARE friends 👫', 'It IS cold 🧊'],
      tip: 'Memory trick: I AM — You ARE — He/She/It IS — We/They ARE',
    },
    exercises: [
      { type: 'choose', question: 'I ___ happy today!', options: ['is','are','am','be'], answer: 2, feedback: 'I AM — always use AM with I! 😊' },
      { type: 'choose', question: 'She ___ my friend.', options: ['am','are','be','is'], answer: 3, feedback: 'She IS — use IS with she, he, it! 👧' },
      { type: 'fill', sentence: 'They ___ students.', answer: 'are', hint: '👨‍👩‍👧‍👦 more than one person', feedback: 'They ARE — use ARE with they, we, you! 👨‍👩‍👧‍👦' },
      { type: 'choose', question: 'The cats ___ cute.', options: ['am','is','are','be'], answer: 2, feedback: 'The cats ARE — "cats" is plural, so use ARE! 🐱🐱' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['am','I','student','a'], correctOrder: [1,0,3,2], sentence: 'I am a student', feedback: 'I AM — perfect! 📚' },
    ],
  },

  svo: {
    id: 'svo', title: 'S + V + O', subtitle: 'Subject, Verb, Object', icon: '🏆', stage: 'stage2',
    explanation: {
      rule: 'Many sentences have THREE parts: Subject (who) + Verb (does) + Object (what)!',
      examples: ['I eat an apple. 🍎', 'She loves cats. 🐱', 'He kicks the ball. ⚽'],
      tip: '"Tom (S) kicks (V) the ball (O)" — Subject + Verb + Object!',
    },
    exercises: [
      { type: 'choose', question: 'What is the OBJECT in: "I eat an apple."', options: ['I','eat','apple','an'], answer: 2, feedback: 'APPLE is the object — it\'s WHAT I eat! 🍎' },
      { type: 'choose', question: 'What is the SUBJECT in: "She loves dogs."', options: ['loves','dogs','She','the'], answer: 2, feedback: 'SHE is the subject — she is doing the loving! 👧' },
      { type: 'fill', sentence: 'He kicks the ___.', answer: 'ball', hint: '⚽ we kick this in football', feedback: 'BALL is the object — it\'s what he kicks! ⚽' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['drinks','She','milk'], correctOrder: [1,0,2], sentence: 'She drinks milk', feedback: 'She (S) + drinks (V) + milk (O)! 🥛' },
      { type: 'choose', question: 'Which sentence has Subject + Verb + Object?', options: ['She runs.','He eats pizza.','Birds fly.','I am happy.'], answer: 1, feedback: '"He eats pizza" — He(S) eats(V) pizza(O)! 🍕' },
    ],
  },

  plural_nouns: {
    id: 'plural_nouns', title: 'Plural Nouns', subtitle: 'One → Many!', icon: '📚', stage: 'stage2',
    explanation: {
      rule: 'PLURAL means MORE THAN ONE! Add -S for most words, -ES for words ending in s/sh/ch/x/z.',
      examples: ['cat → cats 🐱🐱', 'box → boxes 📦📦', 'child → children 👧👦', 'fish → fish 🐟🐟'],
      tip: 'Add -ES for words ending in -s, -sh, -ch, -x, -z. Some words change completely!',
    },
    exercises: [
      { type: 'choose', question: 'What is the plural of "dog"?', options: ['dogies','dogs','dogi','doges'], answer: 1, feedback: 'DOGS — just add -S! 🐕🐕' },
      { type: 'choose', question: 'What is the plural of "box"?', options: ['boxs','boxi','boxes','boxies'], answer: 2, feedback: 'BOXES — add -ES because "box" ends in X! 📦📦' },
      { type: 'fill', sentence: 'I have two ___.', answer: 'cats', hint: '🐱🐱 more than one cat', feedback: 'CATS — add -S for the plural! 🐱🐱' },
      { type: 'choose', question: 'What is the plural of "child"?', options: ['childs','childes','childrens','children'], answer: 3, feedback: 'CHILDREN — this is a special plural! Remember it! 👧👦' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['three','have','I','books'], correctOrder: [2,1,0,3], sentence: 'I have three books', feedback: 'BOOKS is the plural of book! 📚📚📚' },
    ],
  },

  // ─── STAGE 3: TENSE WORLD ────────────────────────────────────────────────
  simple_present: {
    id: 'simple_present', title: 'Simple Present', subtitle: 'What I do every day', icon: '🌅', stage: 'stage3',
    explanation: {
      rule: 'Use Simple Present for things you do REGULARLY or things ALWAYS TRUE!',
      examples: ['I play soccer. ⚽', 'She eats breakfast. 🍳', 'The sun rises. ☀️'],
      tip: 'Add -S or -ES for he/she/it: I play → She PLAYS, I eat → He EATS',
    },
    exercises: [
      { type: 'choose', question: 'She ___ to school every day.', options: ['go','goes','going','went'], answer: 1, feedback: 'GOES — add -ES for she/he/it! 🏫' },
      { type: 'choose', question: 'I ___ my teeth every morning.', options: ['brushes','brushing','brush','brushed'], answer: 2, feedback: 'BRUSH — with "I", no -S! 🪥' },
      { type: 'fill', sentence: 'The dog ___ every day.', answer: 'runs', hint: '🐕 the dog does this regularly', feedback: 'RUNS — add -S for "the dog" (it)! 🐕' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['every','We','play','day'], correctOrder: [1,2,0,3], sentence: 'We play every day', feedback: 'PLAY — with "we", no -S! ⚽' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['She play tennis.','He goes to the park.','They runs fast.','I eats breakfast.'], answer: 1, feedback: '"He goes to the park" — GOES is correct for he/she/it! 🌳' },
    ],
  },

  present_continuous: {
    id: 'present_continuous', title: 'Present Continuous', subtitle: 'What I am doing NOW!', icon: '🏃', stage: 'stage3',
    explanation: {
      rule: 'Use Present Continuous for things happening RIGHT NOW! Formula: am/is/are + verb + -ING',
      examples: ['I am eating. 🍽️', 'She is running. 🏃', 'They are playing. ⚽'],
      tip: 'I AM eat-ING, She IS run-NING, They ARE play-ING',
    },
    exercises: [
      { type: 'choose', question: 'I ___ my homework now.', options: ['do','am doing','does','did'], answer: 1, feedback: 'AM DOING — "I am" + verb-ing for right now! 📝' },
      { type: 'choose', question: 'She ___ in the garden right now.', options: ['play','played','is playing','are playing'], answer: 2, feedback: 'IS PLAYING — "She is" + verb-ing! 🌸' },
      { type: 'fill', sentence: 'The birds are ___ in the sky.', answer: 'flying', hint: '🦅 fly + -ing = ?', feedback: 'FLYING — fly + ing! 🦅' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['sleeping','is','The','cat'], correctOrder: [2,3,1,0], sentence: 'The cat is sleeping', feedback: 'The cat IS SLEEPING — present continuous! 😴' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['They is playing.','He are running.','I am reading a book.','She am eating.'], answer: 2, feedback: '"I am reading a book" — I AM + verb-ING is correct! 📖' },
    ],
  },

  simple_past: {
    id: 'simple_past', title: 'Simple Past', subtitle: 'What happened before', icon: '📜', stage: 'stage3',
    explanation: {
      rule: 'Use Simple Past for things that ALREADY HAPPENED! Usually add -ED to the verb.',
      examples: ['I walked to school. 🚶', 'She jumped high. 🦘', 'He ate pizza. 🍕'],
      tip: 'Regular verbs: add -ED. Irregular verbs change! eat→ate, run→ran, go→went',
    },
    exercises: [
      { type: 'choose', question: 'Yesterday, I ___ to school.', options: ['walk','walking','walked','walks'], answer: 2, feedback: 'WALKED — add -ED for past tense! 🚶' },
      { type: 'choose', question: 'She ___ an apple yesterday.', options: ['eat','eats','eating','ate'], answer: 3, feedback: 'ATE — "eat" is irregular! eat → ate 🍎' },
      { type: 'fill', sentence: 'He ___ to the park last Sunday.', answer: 'went', hint: '🌳 go → ??? (irregular!)', feedback: 'WENT — "go" is irregular! go → went 🌳' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['yesterday','We','played','football'], correctOrder: [1,2,3,0], sentence: 'We played football yesterday', feedback: 'PLAYED — add -ED for regular past tense! ⚽' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['I runned fast.','She goed home.','They played chess.','He eated dinner.'], answer: 2, feedback: '"They played chess" — play + ed = played ♟️' },
    ],
  },

  simple_future: {
    id: 'simple_future', title: 'Simple Future', subtitle: 'What will happen!', icon: '🚀', stage: 'stage3',
    explanation: {
      rule: 'Use Simple Future for things that WILL HAPPEN! Formula: will + base verb',
      examples: ['I will go to school. 🏫', 'She will eat pizza. 🍕', 'We will play. ⚽'],
      tip: 'After "will", always use the BASE verb: I will GO (not goes), she will EAT (not eats)',
    },
    exercises: [
      { type: 'choose', question: 'Tomorrow, I ___ my friends.', options: ['see','will see','seeing','saw'], answer: 1, feedback: 'WILL SEE — use "will" for future! 👫' },
      { type: 'choose', question: 'She ___ to the park next week.', options: ['will goes','will go','will going','goes'], answer: 1, feedback: 'WILL GO — after "will", use base verb (go, not goes)! 🌳' },
      { type: 'fill', sentence: 'It ___ rain tomorrow.', answer: 'will', hint: '🌧️ the future helper word', feedback: 'WILL rain — use "will" for future events! 🌧️' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['visit','will','grandma','We'], correctOrder: [3,1,0,2], sentence: 'We will visit grandma', feedback: 'WE WILL VISIT — future tense! 👵' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['I will goes home.','She will eating lunch.','He will play football.','They will ran fast.'], answer: 2, feedback: '"He will play football" — will + play (base verb)! ⚽' },
    ],
  },

  present_perfect: {
    id: 'present_perfect', title: 'Present Perfect', subtitle: 'Have you ever...?', icon: '✨', stage: 'stage3',
    explanation: {
      rule: 'Use Present Perfect for past actions that CONNECT to now! Formula: have/has + past participle (verb-3)',
      examples: ['I have eaten lunch. 🍽️', 'She has finished homework. 📝', 'They have visited Paris. 🗼'],
      tip: 'I/You/We/They → HAVE. He/She/It → HAS. eat→eaten, finish→finished, go→gone',
    },
    exercises: [
      { type: 'choose', question: 'I ___ already eaten dinner.', options: ['have','has','had','am'], answer: 0, feedback: 'HAVE eaten — use HAVE with I! 🍽️' },
      { type: 'choose', question: 'She ___ finished her homework.', options: ['have','had','has','is'], answer: 2, feedback: 'HAS finished — use HAS with she/he/it! 📝' },
      { type: 'fill', sentence: 'They ___ never seen snow.', answer: 'have', hint: '❄️ they + present perfect', feedback: 'HAVE seen — use HAVE with they! ❄️' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['visited','has','She','Paris'], correctOrder: [2,1,0,3], sentence: 'She has visited Paris', feedback: 'She HAS VISITED — has + past participle! 🗼' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['He have eaten.','I has finished.','We have done it.','She have gone.'], answer: 2, feedback: '"We have done it" — HAVE with we! ✅' },
    ],
  },

  past_continuous: {
    id: 'past_continuous', title: 'Past Continuous', subtitle: 'What was happening then', icon: '🎬', stage: 'stage3',
    explanation: {
      rule: 'Use Past Continuous for actions IN PROGRESS at a moment in the past! Formula: was/were + verb-ing',
      examples: ['I was sleeping at 9pm. 😴', 'She was cooking dinner. 🍳', 'They were playing outside. ⚽'],
      tip: 'I/He/She/It → WAS + -ing. You/We/They → WERE + -ing.',
    },
    exercises: [
      { type: 'choose', question: 'At 8pm, I ___ watching TV.', options: ['is','am','was','were'], answer: 2, feedback: 'WAS watching — use WAS with I! 📺' },
      { type: 'choose', question: 'They ___ playing football at noon.', options: ['was','is','were','are'], answer: 2, feedback: 'WERE playing — use WERE with they! ⚽' },
      { type: 'fill', sentence: 'She was ___ when I called.', answer: 'sleeping', hint: '😴 sleep + -ing', feedback: 'SLEEPING — was + verb-ing! 😴' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['singing','was','The','bird'], correctOrder: [2,3,1,0], sentence: 'The bird was singing', feedback: 'The bird WAS SINGING — past continuous! 🐦' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['He were running.','I was dance.','We were eating lunch.','She was ate.'], answer: 2, feedback: '"We were eating lunch" — WERE + verb-ING! 🍽️' },
    ],
  },

  past_perfect: {
    id: 'past_perfect', title: 'Past Perfect', subtitle: 'Before the past!', icon: '⏪', stage: 'stage3',
    explanation: {
      rule: 'Use Past Perfect for something that happened BEFORE another past event! Formula: had + past participle',
      examples: ['She had left before I arrived. 🚪', 'He had eaten before we came. 🍽️', 'They had finished when it rained. ☔'],
      tip: 'HAD + verb-3 is the same for ALL subjects! (I/you/he/she/we/they → HAD)',
    },
    exercises: [
      { type: 'choose', question: 'She ___ already left when I arrived.', options: ['has','have','had','was'], answer: 2, feedback: 'HAD left — past perfect! Something finished before another past action! 🚪' },
      { type: 'choose', question: 'They ___ eaten before the movie started.', options: ['have','had','has','were'], answer: 1, feedback: 'HAD eaten — HAD works with ALL subjects! 🍿' },
      { type: 'fill', sentence: 'He had ___ the book before class.', answer: 'read', hint: '📖 read → read (irregular!)', feedback: 'HAD READ — past participle of "read"! 📖' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['finished','had','We','homework','our'], correctOrder: [2,1,0,4,3], sentence: 'We had finished our homework', feedback: 'We HAD FINISHED — had + past participle! ✅' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['He had went home.','She had goed.','I had eaten dinner.','They had runned.'], answer: 2, feedback: '"I had eaten dinner" — HAD + eaten (past participle of eat)! 🍽️' },
    ],
  },

  future_continuous: {
    id: 'future_continuous', title: 'Future Continuous', subtitle: 'Will be doing!', icon: '🔮', stage: 'stage3',
    explanation: {
      rule: 'Use Future Continuous for actions that WILL BE IN PROGRESS in the future! Formula: will be + verb-ing',
      examples: ['I will be studying tonight. 📚', 'She will be traveling tomorrow. ✈️', 'They will be sleeping at 10pm. 😴'],
      tip: 'will be + verb-ING is the same for ALL subjects! (I/she/they → will be + -ing)',
    },
    exercises: [
      { type: 'choose', question: 'This time tomorrow, I ___ flying to Tokyo.', options: ['will be','will is','am going','be will'], answer: 0, feedback: 'WILL BE flying — will be + verb-ing! ✈️' },
      { type: 'choose', question: 'At 9pm, she ___ watching the show.', options: ['will be','will is','is','will'], answer: 0, feedback: 'WILL BE watching — future continuous! 📺' },
      { type: 'fill', sentence: 'They will be ___ all day.', answer: 'studying', hint: '📚 study + -ing', feedback: 'STUDYING — will be + verb-ing! 📚' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['sleeping','be','He','will'], correctOrder: [2,3,1,0], sentence: 'He will be sleeping', feedback: 'He WILL BE SLEEPING — future continuous! 😴' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['She will being dance.','I will be running.','We will is eating.','He will be go.'], answer: 1, feedback: '"I will be running" — will be + verb-ING! 🏃' },
    ],
  },

  // ─── STAGE 4: QUESTION WORLD ─────────────────────────────────────────────
  yes_no_questions: {
    id: 'yes_no_questions', title: 'Yes/No Questions', subtitle: 'Can you? Are you?', icon: '✅', stage: 'stage4',
    explanation: {
      rule: 'Yes/No questions can be answered YES or NO. Start with am/is/are/do/does/can!',
      examples: ['Are you happy? Yes! 😊', 'Do you like cats? No! 🐱', 'Can you swim? Yes! 🏊'],
      tip: 'Flip the subject and verb! "You are happy." → "Are you happy?"',
    },
    exercises: [
      { type: 'choose', question: 'Change to a question: "She is tall."', options: ['She tall is?','Is she tall?','Tall is she?','Is tall she?'], answer: 1, feedback: '"Is she tall?" — swap IS and SHE! ✅' },
      { type: 'choose', question: 'Change to a question: "You like pizza."', options: ['Like you pizza?','You like pizza?','Do you like pizza?','Does you like pizza?'], answer: 2, feedback: '"Do you like pizza?" — add DO at the beginning! 🍕' },
      { type: 'fill', sentence: '___ you happy today?', answer: 'Are', hint: '😊 which be-verb goes with "you"?', feedback: 'ARE you happy? — use ARE with "you"! 😊' },
      { type: 'arrange', prompt: 'Build the question:', words: ['dog','Does','have','she','a'], correctOrder: [1,3,2,4,0], sentence: 'Does she have a dog', feedback: 'DOES she have a dog? — use DOES for he/she/it! 🐕' },
      { type: 'choose', question: 'Which is a correct Yes/No question?', options: ['You are student a?','Do he like sports?','Is she your friend?','Goes she school?'], answer: 2, feedback: '"Is she your friend?" — IS comes first, then SHE! ✅' },
    ],
  },

  wh_questions: {
    id: 'wh_questions', title: 'WH Questions', subtitle: 'What? Where? Who?', icon: '🔍', stage: 'stage4',
    explanation: {
      rule: 'WH questions ask for INFORMATION. They start with What, Where, Who, When, How, Why!',
      examples: ['What is this? 🔍', 'Where is the dog? 🐕', 'Who is she? 👧', 'When do you eat? 🍽️'],
      tip: 'What=thing, Where=place, Who=person, When=time, Why=reason, How=way',
    },
    exercises: [
      { type: 'choose', question: 'I want to know the NAME of an animal. I ask:', options: ['Where is the animal?','What is that animal?','When is the animal?','Why is the animal?'], answer: 1, feedback: 'WHAT — use "what" to ask about things and names! 🐘' },
      { type: 'choose', question: 'I want to know the PLACE. I ask:', options: ['What is the park?','Who is the park?','Where is the park?','How is the park?'], answer: 2, feedback: 'WHERE — use "where" to ask about places! 🌳' },
      { type: 'fill', sentence: '___ is your name?', answer: 'What', hint: '📝 asking for a name or thing', feedback: 'WHAT is your name? — "what" for names and things! 😊' },
      { type: 'choose', question: '___ is your best friend?', options: ['What','Where','Who','How'], answer: 2, feedback: 'WHO — use "who" to ask about a person! 👫' },
      { type: 'arrange', prompt: 'Build the question:', words: ['your','is','Where','school'], correctOrder: [2,1,0,3], sentence: 'Where is your school', feedback: 'WHERE is your school? — asking about a PLACE! 🏫' },
    ],
  },

  negatives: {
    id: 'negatives', title: 'Negative Sentences', subtitle: "I don't, She isn't", icon: '❌', stage: 'stage4',
    explanation: {
      rule: 'To make NEGATIVE sentences, add NOT! am not, is not (isn\'t), are not (aren\'t), do not (don\'t), does not (doesn\'t)',
      examples: ["I am not sad. 😊", "She isn't tall. 📏", "They don't like rain. 🌧️"],
      tip: "Shortcuts: is not = isn't, are not = aren't, do not = don't, does not = doesn't",
    },
    exercises: [
      { type: 'choose', question: 'Make negative: "I am happy."', options: ["I not happy.","I am not happy.","I not am happy.","Not I am happy."], answer: 1, feedback: 'I AM NOT happy — add NOT after AM! 😔' },
      { type: 'choose', question: 'Make negative: "She likes pizza."', options: ["She doesn't likes pizza.","She not like pizza.","She doesn't like pizza.","She isn't like pizza."], answer: 2, feedback: "She DOESN'T LIKE pizza — doesn't + base verb! 🍕" },
      { type: 'fill', sentence: "He ___ play football.", answer: "doesn't", hint: "❌ he + not + play", feedback: "He DOESN'T play — use doesn't for he/she/it! ⚽" },
      { type: 'arrange', prompt: 'Build the sentence:', words: ["don't","I","spiders","like"], correctOrder: [1,0,3,2], sentence: "I don't like spiders", feedback: "I DON'T like spiders — don't = do not! 🕷️" },
      { type: 'choose', question: 'Which negative sentence is CORRECT?', options: ["They isn't happy.","We doesn't play.","She don't run.","I am not hungry."], answer: 3, feedback: '"I am not hungry" — AM NOT is correct for I! 😊' },
    ],
  },

  // ─── STAGE 5: POWER WORDS ────────────────────────────────────────────────
  can_cannot: {
    id: 'can_cannot', title: 'Can / Cannot', subtitle: 'Ability words', icon: '🦸', stage: 'stage5',
    explanation: {
      rule: 'Use CAN to say what you are ABLE to do. Use CANNOT (can\'t) for things you are NOT able to do!',
      examples: ['I can swim! 🏊', 'Birds can fly! 🦅', "I can't fly. 😅", "Fish can't walk. 🐟"],
      tip: 'CAN + base verb (no -s!): She CAN swim (not "she can swims")',
    },
    exercises: [
      { type: 'choose', question: 'A bird ___ fly.', options: ['can','cans','is can','do can'], answer: 0, feedback: "CAN fly — birds have wings! CAN + base verb! 🦅" },
      { type: 'choose', question: "Fish ___ walk on land.", options: ["can","cans","can't","isn't"], answer: 2, feedback: "Fish CAN'T walk — they live in water! 🐟" },
      { type: 'fill', sentence: 'I ___ ride a bicycle!', answer: 'can', hint: '🚲 ability to do something', feedback: "I CAN ride — use CAN for ability! 🚲" },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['swim','She','can','fast'], correctOrder: [1,2,0,3], sentence: 'She can swim fast', feedback: "She CAN swim — CAN + base verb! 🏊" },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['He can swims.','She cans dance.','They can run fast.',"I can to fly."], answer: 2, feedback: '"They can run fast" — CAN + base verb (run, not runs)! 🏃' },
    ],
  },

  have_has: {
    id: 'have_has', title: 'Have / Has', subtitle: 'What I own', icon: '🎒', stage: 'stage5',
    explanation: {
      rule: 'Use HAVE with I, you, we, they. Use HAS with he, she, it!',
      examples: ['I have a dog. 🐕', 'She has a cat. 🐱', 'They have books. 📚', 'It has wings. 🦅'],
      tip: 'Same rule as IS/ARE: He/She/It → HAS. Everyone else → HAVE',
    },
    exercises: [
      { type: 'choose', question: 'She ___ a red bag.', options: ['have','has','haves','is'], answer: 1, feedback: 'She HAS — use HAS with she/he/it! 👜' },
      { type: 'choose', question: 'We ___ two cats.', options: ['has','haves','have','is'], answer: 2, feedback: 'We HAVE — use HAVE with I, you, we, they! 🐱🐱' },
      { type: 'fill', sentence: 'The dog ___ a long tail.', answer: 'has', hint: '🐕 the dog owns a tail', feedback: 'The dog HAS — use HAS for "the dog" (it)! 🐕' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['three','I','have','pencils'], correctOrder: [1,2,0,3], sentence: 'I have three pencils', feedback: 'I HAVE — use HAVE with I! ✏️✏️✏️' },
      { type: 'choose', question: 'Which sentence is CORRECT?', options: ['He have a bicycle.','She has long hair.','They has many toys.','I has a book.'], answer: 1, feedback: '"She has long hair" — HAS is correct for she! 👧' },
    ],
  },

  prepositions: {
    id: 'prepositions', title: 'Prepositions', subtitle: 'in, on, under...', icon: '📍', stage: 'stage5',
    explanation: {
      rule: 'Prepositions tell us WHERE something is or WHEN something happens!',
      examples: ['in the box 📦', 'on the table 🪑', 'under the bed 🛏️', 'next to me 👤'],
      tip: 'Think of a cat: IN the box, ON the box, UNDER the box, NEXT TO the box! 🐱📦',
    },
    exercises: [
      { type: 'choose', question: 'The apple is ___ the table.', options: ['in','on','under','next'], answer: 1, feedback: 'ON the table — the apple is on top! 🍎' },
      { type: 'choose', question: 'The cat is sleeping ___ the bed.', options: ['on','in','under','at'], answer: 2, feedback: 'UNDER the bed — the cat is below the bed! 🐱🛏️' },
      { type: 'fill', sentence: 'The fish is ___ the water.', answer: 'in', hint: '🐟 the fish is inside the water', feedback: 'IN the water — fish live inside water! 🐟' },
      { type: 'choose', question: 'The school is ___ the park.', options: ['in','under','next to','on'], answer: 2, feedback: 'NEXT TO the park — side by side! 🏫🌳' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['in','is','The','cat','box','the'], correctOrder: [2,3,1,0,5,4], sentence: 'The cat is in the box', feedback: 'The cat is IN the box — inside! 🐱📦' },
    ],
  },

  comparatives: {
    id: 'comparatives', title: 'Comparatives', subtitle: 'Bigger, Faster, Best!', icon: '📊', stage: 'stage5',
    explanation: {
      rule: 'Comparatives compare TWO things (-ER). Superlatives compare THREE or MORE (-EST)!',
      examples: ['big → bigger → the biggest 🐘', 'fast → faster → the fastest 🏃', 'tall → taller → the tallest 📏'],
      tip: 'Short words: add -ER/-EST. Long words: use more/most. big→bigger, beautiful→more beautiful',
    },
    exercises: [
      { type: 'choose', question: 'An elephant is ___ than a cat.', options: ['big','more big','bigger','biggest'], answer: 2, feedback: 'BIGGER — add -ER for comparatives! 🐘 > 🐱' },
      { type: 'choose', question: 'She is the ___ student in the class.', options: ['tall','taller','more tall','tallest'], answer: 3, feedback: 'TALLEST — add -EST for superlatives! 📏' },
      { type: 'fill', sentence: 'A cheetah is ___ than a lion.', answer: 'faster', hint: '🐆 speed comparison between two animals', feedback: 'FASTER — add -ER to compare two things! 🐆 > 🦁' },
      { type: 'choose', question: 'Mount Everest is the ___ mountain in the world.', options: ['high','higher','highest','more high'], answer: 2, feedback: 'HIGHEST — -EST for the most! 🏔️' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['faster','is','A','car','bicycle','than','a'], correctOrder: [2,3,1,0,5,6,4], sentence: 'A car is faster than a bicycle', feedback: 'FASTER THAN — comparing two things! 🚗 > 🚲' },
    ],
  },

};
