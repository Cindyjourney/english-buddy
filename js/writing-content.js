const WRITING_STAGES = [
  { id: 'ws1', title: 'Word Magic',      icon: '🌱', color: '#f97316', topics: ['strong_verbs','colorful_adj','sensory_details','joining_words'] },
  { id: 'ws2', title: 'Great Sentences', icon: '🌿', color: '#10b981', topics: ['expand_sentence','sentence_variety','punctuation_power'] },
  { id: 'ws3', title: 'Build Paragraphs',icon: '🌳', color: '#8b5cf6', topics: ['topic_sentence','support_details','concluding_sentence','full_paragraph'] },
  { id: 'ws4', title: 'Writing Types',   icon: '📖', color: '#06b6d4', topics: ['story_writing','descriptive_writing','opinion_writing'] },
  { id: 'ws5', title: 'My Articles',     icon: '🏆', color: '#fbbf24', topics: ['my_animal_story','my_dream_day'] },
];

const WRITING_TOPICS = {

  // ─── STAGE 1: WORD MAGIC ─────────────────────────────────────────────────
  strong_verbs: {
    id: 'strong_verbs', title: 'Strong Verbs', subtitle: 'Make actions VIVID!', icon: '⚡', stage: 'ws1',
    explanation: {
      rule: 'STRONG verbs make your writing come alive! Replace boring verbs with powerful, specific ones.',
      examples: ['walked → stomped / tiptoed / rushed 🏃', 'said → whispered / shouted / mumbled 💬', 'ate → gobbled / nibbled / devoured 🍽️'],
      tip: 'Tip: One strong verb can replace "walked slowly" with just "trudged" — more powerful!',
    },
    exercises: [
      { type: 'choose', question: 'Which verb is STRONGER and more vivid?', options: ['The dog went fast.','The dog zoomed past!','The dog moved.','The dog did running.'], answer: 1, feedback: 'ZOOMED — much more exciting than "went fast"! 🐕💨' },
      { type: 'choose', question: 'Replace "said" with a stronger verb: She ___ the secret.', options: ['said','talked','whispered','spoke'], answer: 2, feedback: 'WHISPERED — it tells us HOW she said it! 🤫' },
      { type: 'fill', sentence: 'The hungry lion ___ the meat in seconds.', answer: 'devoured', hint: '🦁 eating quickly and completely (stronger than "ate")', feedback: 'DEVOURED — much stronger than "ate"! 🦁' },
      { type: 'arrange', prompt: 'Build this vivid sentence:', words: ['The','across','sprinted','field','she','the'], correctOrder: [0,4,2,1,3,5], sentence: 'The she sprinted across the field', feedback: 'SPRINTED — so much better than "ran"! 🏃‍♀️' },
      { type: 'write', prompt: 'Rewrite this boring sentence using STRONG verbs:\n"The boy walked to school and ate his lunch."', guides: ['Replace "walked" with a stronger verb (marched? rushed? stomped?)','Replace "ate" with a stronger verb (gobbled? devoured? nibbled?)','Add one more detail to make it vivid!'], model: 'The boy marched eagerly to school and devoured his lunch in three bites.', minWords: 10, feedback: 'Amazing! Your verbs made the sentence come alive! ⚡' },
    ],
  },

  colorful_adj: {
    id: 'colorful_adj', title: 'Colorful Adjectives', subtitle: 'Paint with words!', icon: '🎨', stage: 'ws1',
    explanation: {
      rule: 'Use 2-3 ADJECTIVES to create a vivid picture! Stack them before the noun for extra detail.',
      examples: ['a dog → a fluffy, golden, playful dog 🐕', 'a house → a tall, old, mysterious house 🏚️', 'the sky → the vast, starry, purple sky 🌌'],
      tip: 'Order matters! Usually: Opinion + Size + Age + Color + Material + Noun. "a beautiful small old red wooden box"',
    },
    exercises: [
      { type: 'choose', question: 'Which description paints the BEST picture?', options: ['a cat','a cat that is nice','a sleek, silver, graceful cat','the cat moved'], answer: 2, feedback: 'SLEEK, SILVER, GRACEFUL — three adjectives create a vivid image! 🐱' },
      { type: 'fill', sentence: 'She wore a ___, ___ dress to the party.', answer: 'long red', hint: '👗 two adjectives describing the dress (size + color)', feedback: 'Adding adjectives like LONG RED makes the dress come alive! 👗' },
      { type: 'choose', question: 'Add adjectives: "We walked through a ___ forest."', options: ['dark and big','big','dark, ancient, misty','very forest'], answer: 2, feedback: 'DARK, ANCIENT, MISTY — three adjectives create atmosphere! 🌲' },
      { type: 'arrange', prompt: 'Build this descriptive sentence:', words: ['enormous','spotted','The','leaped','giraffe','gracefully'], correctOrder: [2,0,1,3,4,5], sentence: 'The enormous spotted giraffe leaped gracefully', feedback: 'ENORMOUS SPOTTED — stacked adjectives create a vivid image! 🦒' },
      { type: 'write', prompt: 'Describe YOUR bedroom using at least 6 adjectives!', guides: ['Think of: size, color, how it feels (cozy? messy? bright?)','Describe: the walls, bed, objects, light','Start with: "My bedroom is..."'], model: 'My bedroom is a cozy, small, blue room. My soft, fluffy bed sits in the corner. Bright, colorful posters cover the smooth white walls. It is my favorite, peaceful place!', minWords: 25, feedback: 'Wonderful description! Your adjectives painted a perfect picture! 🎨' },
    ],
  },

  sensory_details: {
    id: 'sensory_details', title: 'Sensory Details', subtitle: 'Use all 5 senses!', icon: '🌟', stage: 'ws1',
    explanation: {
      rule: 'Great writing uses all 5 SENSES: what you SEE 👁️, HEAR 👂, SMELL 👃, TASTE 👅, and TOUCH ✋!',
      examples: ['See: The golden sun melted into the purple horizon.', 'Hear: Thunder rumbled like a giant drum.', 'Smell: The warm bread filled the kitchen with a sweet aroma.'],
      tip: 'Tip: Pick 2-3 senses for each scene. Too many can feel overwhelming — choose the most important!',
    },
    exercises: [
      { type: 'choose', question: 'Which sentence uses a sense of HEARING?', options: ['The flower was red.','Waves crashed and hissed on the shore.','The cake was sweet.','She felt warm.'], answer: 1, feedback: 'CRASHED AND HISSED — that\'s what the waves sound like! 🌊' },
      { type: 'choose', question: 'Which sentence uses TOUCH/FEELING?', options: ['The dog barked loudly.','The soup smelled amazing.','The rough, cold stone wall scratched her fingers.','She saw a rainbow.'], answer: 2, feedback: 'ROUGH, COLD, SCRATCHED — those are touch sensations! ✋' },
      { type: 'fill', sentence: 'The forest smelled of ___ pine and ___ earth.', answer: 'fresh wet', hint: '🌲 two smell adjectives for a forest', feedback: 'FRESH pine and WET earth — the reader can almost smell it! 🌲' },
      { type: 'arrange', prompt: 'Build this sensory sentence:', words: ['golden','The','sizzled','butter','pan','in the'], correctOrder: [1,0,2,3,4,5], sentence: 'The golden butter sizzled in the pan', feedback: 'SIZZLED — a sound that brings the kitchen to life! 🍳' },
      { type: 'write', prompt: 'Write 3-4 sentences about a MEAL you love using at least 3 different senses!', guides: ['SIGHT: What does it look like? (golden, steaming, colorful...)','SMELL: What does it smell like? (sweet, spicy, savory...)','TASTE: What does it taste like? (rich, tangy, sweet...)','SOUND: Does it make any sound? (sizzling, crunchy...)'], model: 'My favorite meal is dumplings. They look like little white pillows, plump and glossy. They smell of garlic and ginger, warm and inviting. When I bite into one, the savory juice bursts into my mouth. The soft skin melts on my tongue — absolutely perfect!', minWords: 30, feedback: 'Incredible! Your senses made us taste and smell the food! 🌟' },
    ],
  },

  joining_words: {
    id: 'joining_words', title: 'Joining Words', subtitle: 'Connect your ideas!', icon: '🔗', stage: 'ws1',
    explanation: {
      rule: 'Joining words (conjunctions) connect ideas: AND (add), BUT (contrast), SO (result), BECAUSE (reason), ALTHOUGH (surprise)',
      examples: ['I love cats AND I love dogs. 🐱🐕', "I wanted ice cream BUT it was closed. 😢", 'It rained SO we stayed inside. 🌧️', 'I studied hard BECAUSE I wanted an A. 📚'],
      tip: 'BECAUSE is the most powerful — it always answers the question "why?" and makes your writing more convincing!',
    },
    exercises: [
      { type: 'choose', question: 'Choose the best joining word: "I was tired ___ I went to bed early."', options: ['and','but','so','although'], answer: 2, feedback: 'SO — it shows the RESULT of being tired! 😴' },
      { type: 'choose', question: '"She practiced every day ___ she was already the best player."', options: ['so','although','because','and'], answer: 1, feedback: 'ALTHOUGH — it shows a surprise contrast! 🎾' },
      { type: 'fill', sentence: 'I love reading ___ books take me to amazing worlds.', answer: 'because', hint: '📚 what word shows the reason why?', feedback: 'BECAUSE gives the reason — the most powerful joining word! 📚' },
      { type: 'arrange', prompt: 'Build the sentence:', words: ['raining','we','Although','went','was','it','outside'], correctOrder: [2,5,0,1,3,4,6], sentence: 'Although it was raining we went outside', feedback: 'ALTHOUGH shows a surprising contrast! 🌧️' },
      { type: 'write', prompt: 'Write 4 sentences — each one using a DIFFERENT joining word: and, but, so, because.', guides: ['Sentence 1: use AND to connect two things you like','Sentence 2: use BUT to show a contrast','Sentence 3: use SO to show a result','Sentence 4: use BECAUSE to give a reason'], model: 'I love painting AND I love music. I wanted to go outside BUT it was raining. The rain stopped SO we went for a walk. I love rainy days BECAUSE everything smells so fresh afterwards.', minWords: 25, feedback: 'Perfect! You connected your ideas like a real writer! 🔗' },
    ],
  },

  // ─── STAGE 2: GREAT SENTENCES ────────────────────────────────────────────
  expand_sentence: {
    id: 'expand_sentence', title: 'Expand Sentences', subtitle: 'Grow simple → powerful!', icon: '🌱→🌳', stage: 'ws2',
    explanation: {
      rule: 'Start with a simple sentence, then ADD details: WHO, WHAT, WHEN, WHERE, HOW, WHY!',
      examples: ['Simple: The bird sang.', 'Better: The tiny yellow bird sang sweetly.', 'Best: Early each morning, the tiny yellow bird sang sweetly outside my window.'],
      tip: 'Add ONE detail at a time. Ask yourself: When? Where? How? Why? — each answer makes your sentence richer!',
    },
    exercises: [
      { type: 'choose', question: 'Which is the MOST expanded sentence?', options: ['The dog ran.','The dog ran fast.','The excited puppy raced joyfully through the park.','The dog ran in the park.'], answer: 2, feedback: 'EXCITED PUPPY RACED JOYFULLY — adjectives, strong verb, location, manner! 🐕' },
      { type: 'fill', sentence: 'The old cat slept ___ on the warm, sunny windowsill.', answer: 'peacefully', hint: '😴 an adverb describing HOW the cat slept', feedback: 'PEACEFULLY — an adverb that shows us HOW! 🐱' },
      { type: 'choose', question: 'Expand: "She cried." — Which adds the MOST detail?', options: ['She cried a lot.','She cried really hard.','She sobbed quietly in the dark corner of her room.','She was crying.'], answer: 2, feedback: 'SOBBED QUIETLY IN THE DARK CORNER — strong verb + how + where! 💧' },
      { type: 'arrange', prompt: 'Build this expanded sentence:', words: ['slowly','the','foggy','A','through','ship','sailed','harbor'], correctOrder: [3,0,2,5,4,7,1,6], sentence: 'A ship slowly sailed through the foggy harbor', feedback: 'So much better than "A ship sailed through the harbor"! ⛵' },
      { type: 'write', prompt: 'Expand each simple sentence by adding at least 3 details:\n1. "The boy ate."\n2. "The wind blew."', guides: ['For each sentence, ask: WHO (more detail)? HOW? WHERE? WHEN? WHY?','Use at least one strong verb','Add at least two adjectives or adverbs'], model: '1. The ravenous boy gulped down three bowls of steaming noodles in five minutes.\n2. A fierce, icy wind howled through the empty streets, rattling every window.', minWords: 20, feedback: 'Wow! You turned simple sentences into vivid stories! 🌳' },
    ],
  },

  sentence_variety: {
    id: 'sentence_variety', title: 'Sentence Variety', subtitle: 'Mix it up!', icon: '🎭', stage: 'ws2',
    explanation: {
      rule: 'Great writers mix SHORT punchy sentences with LONG flowing ones. This creates RHYTHM and keeps readers interested!',
      examples: ['Too same: "The dog ran. The cat ran. The bird flew. The fish swam."', 'Better: "The dog raced after the cat. Birds scattered into the sky. Then — silence."'],
      tip: 'Tip: After 2-3 long sentences, use a short one for IMPACT. One word can be a sentence. Seriously.',
    },
    exercises: [
      { type: 'choose', question: 'Which paragraph has BETTER sentence variety?', options: ['She ran. He ran. They ran. We ran.','She sprinted ahead. He chased close behind, his heart pounding. We watched. Then she fell.','She ran very fast and he ran fast too and they all ran together.','Running was happening. Running happened more. More running occurred.'], answer: 1, feedback: 'Mix of long and short sentences creates perfect rhythm! 🎵' },
      { type: 'choose', question: 'Which short sentence adds the most IMPACT?', options: ['It was bad.','Things were not good at all.','Disaster.','A bad thing happened.'], answer: 2, feedback: 'One word — "Disaster." — creates maximum impact! 💥' },
      { type: 'fill', sentence: 'She opened the mysterious box. Inside was something ___. Something ancient.', answer: 'unexpected', hint: '📦 one word that creates suspense and surprise', feedback: 'UNEXPECTED — then "Something ancient." Short sentences create suspense! 📦' },
      { type: 'arrange', prompt: 'Arrange for best rhythm (long, long, short):', words: ['I waited.','Stars glittered above like scattered diamonds.','The night was cold and silent.'], correctOrder: [1,2,0], sentence: 'Stars glittered above like scattered diamonds. The night was cold and silent. I waited.', feedback: 'Long, Long, SHORT — the short ending creates perfect impact! 🌟' },
      { type: 'write', prompt: 'Write a 4-sentence paragraph mixing SHORT and LONG sentences. Topic: A surprise!', guides: ['Sentence 1: LONG — set the scene with details','Sentence 2: LONG — build the moment','Sentence 3: SHORT — 2-4 words for impact','Sentence 4: LONG — explain the surprise'], model: 'I was walking home from school, kicking autumn leaves, when I noticed our front door was open. Music was playing softly inside, and colorful balloons floated in the hallway. Surprise party. All my friends jumped out from behind the sofa, laughing and cheering, and my heart nearly burst with happiness.', minWords: 30, feedback: 'Your rhythm is incredible — short sentences pack a punch! 🎭' },
    ],
  },

  punctuation_power: {
    id: 'punctuation_power', title: 'Punctuation Power', subtitle: '! ? , — make it expressive!', icon: '❗', stage: 'ws2',
    explanation: {
      rule: 'Punctuation gives your writing VOICE and EMOTION! Use it to control how readers hear your words.',
      examples: ['"Stop." (calm)', '"Stop!" (urgent)', '"Stop?" (confused)', '"Stop — and listen carefully." (dramatic pause)'],
      tip: 'The comma (,) is like a small breath. The dash (—) is like a dramatic pause. Use them to control your reader\'s speed!',
    },
    exercises: [
      { type: 'choose', question: 'Which punctuation shows SURPRISE and EXCITEMENT?', options: ['The dragon flew.','The dragon flew?','The dragon flew!','The dragon flew,'], answer: 2, feedback: '! (exclamation mark) shows excitement and energy! 🐉' },
      { type: 'choose', question: 'Add a comma: "I bought apples ___ bananas and oranges."', options: ['I bought apples, bananas and oranges.','I bought apples bananas, and oranges.','I bought apples bananas and oranges.','I bought apples, bananas, and oranges.'], answer: 3, feedback: 'Commas separate items in a list: apples, bananas, and oranges! 🍎🍌🍊' },
      { type: 'fill', sentence: 'She opened the door ___ and gasped.', answer: '—', hint: '— a dramatic pause symbol (longer than comma)', feedback: '"— and gasped" — the dash creates a dramatic pause before the surprise! 😮' },
      { type: 'choose', question: 'Which uses punctuation BEST for drama?', options: ['It was a monster.','It was a monster!','It was a monster — a huge, terrifying monster.','It was a monster?'], answer: 2, feedback: '"It was a monster — a huge, terrifying monster." The dash adds dramatic emphasis! 👾' },
      { type: 'write', prompt: 'Write 4 sentences using FOUR different punctuation marks: period (.), exclamation (!), question (?), and dash (—).', guides: ['Sentence 1: End with a period — a calm statement','Sentence 2: End with an exclamation mark — show excitement!','Sentence 3: End with a question mark — ask something?','Sentence 4: Use a dash — for a dramatic pause'], model: 'The old lighthouse stood at the edge of the cliff. The storm was coming! Would we make it back in time? I grabbed my coat — and ran.', minWords: 20, feedback: 'Perfect punctuation mastery! Your writing has real voice! ❗' },
    ],
  },

  // ─── STAGE 3: BUILD PARAGRAPHS ───────────────────────────────────────────
  topic_sentence: {
    id: 'topic_sentence', title: 'Topic Sentence', subtitle: 'Your paragraph\'s main idea', icon: '🎯', stage: 'ws3',
    explanation: {
      rule: 'The TOPIC SENTENCE is the FIRST sentence of a paragraph. It tells the reader: "This paragraph is about ___."',
      examples: ['Dogs make the best pets. (topic: why dogs are great)', 'My school has many fun activities. (topic: school activities)', 'The ocean is full of amazing creatures. (topic: ocean life)'],
      tip: 'A great topic sentence is not too broad ("Animals are nice") or too narrow ("My dog Max barked Tuesday"). Find the middle!',
    },
    exercises: [
      { type: 'choose', question: 'Which is the BEST topic sentence for a paragraph about healthy food?', options: ['Food exists.','I ate lunch today.','Eating healthy food gives you energy and keeps you strong.','Some food is healthy.'], answer: 2, feedback: 'EATING HEALTHY FOOD GIVES YOU ENERGY — it clearly states what the paragraph will discuss! 🥗' },
      { type: 'choose', question: 'Which topic sentence is TOO BROAD (too general)?', options: ['Soccer is my favorite sport because it builds teamwork.','Things exist in the world.','Our school library has over 5,000 books.','Morning exercise helps me focus all day.'], answer: 1, feedback: '"Things exist in the world" is way too broad — a paragraph can\'t cover everything! 🌍' },
      { type: 'fill', sentence: 'Topic sentence for a paragraph about dolphins: "Dolphins are ___ of the most intelligent animals in the ocean."', answer: 'some', hint: '🐬 complete this topic sentence about dolphins', feedback: 'SOME — "Dolphins are some of the most intelligent animals in the ocean." Perfect topic sentence! 🐬' },
      { type: 'arrange', prompt: 'Which sentence is BEST as a topic sentence? Order from BEST to WORST:', words: ['Space exploration has changed our understanding of the universe.','Space.','Rockets go up.','Space is big and has things in it.'], correctOrder: [0,3,2,1], sentence: 'Space exploration has changed our understanding of the universe.', feedback: 'The first one is best — specific, interesting, and tells us what the paragraph is about! 🚀' },
      { type: 'write', prompt: 'Write a TOPIC SENTENCE for EACH of these paragraph topics:\n1. Your favorite season\n2. Why reading is important\n3. Your dream vacation', guides: ['Each topic sentence should clearly state the MAIN IDEA','It should not be too broad or too narrow','It should make the reader want to keep reading!'], model: '1. Summer is my favorite season because it brings sunshine, freedom, and endless adventures.\n2. Reading opens doors to worlds that don\'t exist and ideas that can change your life.\n3. My dream vacation would be a week in Japan, exploring ancient temples and modern cities.', minWords: 25, feedback: 'Excellent topic sentences! You\'ve mastered the art of the opening! 🎯' },
    ],
  },

  support_details: {
    id: 'support_details', title: 'Supporting Details', subtitle: 'Prove your main idea!', icon: '🏗️', stage: 'ws3',
    explanation: {
      rule: 'After the topic sentence, add 2-3 DETAIL sentences that PROVE or EXPLAIN the main idea with: examples, facts, reasons, or stories!',
      examples: ['Topic: Dogs make great pets.', 'Detail 1: They are loyal and always happy to see you.', 'Detail 2: Dogs can be trained to do helpful tasks.', 'Detail 3: Playing with dogs reduces stress and loneliness.'],
      tip: 'Each detail sentence should DIRECTLY support the topic sentence. If it doesn\'t connect — remove it!',
    },
    exercises: [
      { type: 'choose', question: 'Topic: "Soccer builds teamwork." Which detail does NOT belong?', options: ['Players must communicate to plan their moves.','Soccer fields are usually green.','Goals can only be scored by working together.','Learning to pass requires trusting your teammates.'], answer: 1, feedback: '"Soccer fields are green" doesn\'t support "soccer builds teamwork" — remove it! 🌱' },
      { type: 'choose', question: 'Which is the STRONGEST supporting detail for "Reading improves your vocabulary"?', options: ['Books have pages.','Reading is fun.','Every book introduces new words that stick in your memory.','Some people read every day.'], answer: 2, feedback: '"Books introduce new words that stick in your memory" — this directly supports the topic! 📚' },
      { type: 'fill', sentence: 'Topic: School is important.\nDetail: It teaches us not only ___ skills but also how to work with others.', answer: 'academic', hint: '🏫 what kind of skills does school teach? (school-related skills)', feedback: 'ACADEMIC skills — "It teaches us not only academic skills but also how to work with others." Great detail! 🏫' },
      { type: 'arrange', prompt: 'Order: Topic sentence FIRST, then details:', words: ['Cats make excellent indoor pets.','They do not need to be taken for walks.','Cats clean themselves, so bathing is rarely needed.','They are quiet and do not disturb neighbors.'], correctOrder: [0,1,3,2], sentence: 'Cats make excellent indoor pets.', feedback: 'Topic sentence first, then three supporting details that all connect! 🐱' },
      { type: 'write', prompt: 'Topic sentence: "My favorite season is [choose one] because it brings special joys."\n\nWrite 3 DETAIL sentences that each give a different reason or example!', guides: ['Detail 1: Give a specific activity or event from that season','Detail 2: Describe something sensory (what it looks/feels/smells like)','Detail 3: Give a personal memory or feeling'], model: 'My favorite season is autumn because it brings special joys. First, the trees turn brilliant shades of red, orange, and gold, creating a magical landscape. Second, the crisp cool air smells of fallen leaves and wood smoke. I also love Halloween, when the whole neighborhood comes alive with costumes and laughter.', minWords: 35, feedback: 'Three strong details that all support your topic — perfect paragraph building! 🏗️' },
    ],
  },

  concluding_sentence: {
    id: 'concluding_sentence', title: 'Concluding Sentence', subtitle: 'Wrap it up with style!', icon: '🎀', stage: 'ws3',
    explanation: {
      rule: 'The CONCLUDING SENTENCE ends your paragraph! It can: restate the main idea in NEW words, give a final thought, or leave the reader thinking.',
      examples: ['Topic: Dogs are great pets. → Conclusion: "Truly, a dog is not just a pet — it is a loyal friend for life."', 'Topic: Reading helps you. → Conclusion: "So pick up a book today — your brain will thank you!"'],
      tip: 'NEVER start your conclusion with "In conclusion" or "To summarize" — that\'s boring! Try "Truly...", "Clearly...", "Without doubt...", or a question that makes the reader think.',
    },
    exercises: [
      { type: 'choose', question: 'Which is the BEST concluding sentence for a paragraph about healthy eating?', options: ['Eating healthy is good.','In conclusion, healthy food is important.','So the next time you choose a snack, remember: every bite is a step toward a stronger, happier you!','Healthy food: very healthy.'], answer: 2, feedback: '"Every bite is a step toward a stronger, happier you!" — memorable and inspiring! 🥗' },
      { type: 'choose', question: 'Which word/phrase is BEST to start a conclusion?', options: ['In conclusion,','To summarize,','Clearly,','The end.'], answer: 2, feedback: '"Clearly" — much more elegant than "In conclusion" or "To summarize"! ✨' },
      { type: 'fill', sentence: 'Topic was: why exercise is important.\nConclusion: ___ exercise is not just good for your body — it is the key to a happier mind too.', answer: 'Clearly', hint: '✨ start with a word that signals you are wrapping up', feedback: '"Clearly, exercise is not just good for your body — it is the key to a happier mind too." Perfect conclusion! 💪' },
      { type: 'arrange', prompt: 'Order from topic sentence to conclusion:', words: ['Without doubt, the ocean is one of Earth\'s greatest treasures.','The ocean covers 71% of our planet\'s surface.','The ocean is the most important ecosystem on Earth.','It provides food, oxygen, and regulates our climate.'], correctOrder: [2,1,3,0], sentence: 'The ocean is the most important ecosystem on Earth.', feedback: 'Topic → Details → Conclusion: "Without doubt..." — a satisfying paragraph ending! 🌊' },
      { type: 'write', prompt: 'Write a CONCLUDING SENTENCE for each paragraph topic:\n1. Why music is important\n2. The benefits of outdoor play\n3. Why we should protect animals', guides: ['Restate the main idea in DIFFERENT words','Try starting with: Truly / Clearly / Without doubt / So...','Or end with a question that makes readers think!','Do NOT use "In conclusion"'], model: '1. Truly, music is not just entertainment — it is a language that connects every human heart.\n2. So put down the screens and step outside — your body and your imagination are waiting!\n3. After all, a world without animals would be a silent, grey, and lonely place — and that is a world none of us should want.', minWords: 25, feedback: 'Brilliant conclusions! They leave readers with something to think about! 🎀' },
    ],
  },

  full_paragraph: {
    id: 'full_paragraph', title: 'Full Paragraph', subtitle: 'Put it all together!', icon: '📄', stage: 'ws3',
    explanation: {
      rule: 'A COMPLETE PARAGRAPH has 5 parts:\n① Topic Sentence → ② Detail 1 → ③ Detail 2 → ④ Detail 3 → ⑤ Concluding Sentence',
      examples: ['① Dogs make the best pets. ② They are loyal and loving. ③ They protect your home. ④ Playing with dogs reduces stress. ⑤ Truly, a dog is a friend for life.'],
      tip: 'Aim for 5-7 sentences. Not too short (underdeveloped) and not too long (unfocused). Quality over quantity!',
    },
    exercises: [
      { type: 'choose', question: 'A paragraph MUST have:', options: ['At least 10 sentences','A topic sentence, details, and a conclusion','Only a topic sentence','Exactly 5 sentences'], answer: 1, feedback: 'Topic sentence + supporting details + concluding sentence = complete paragraph! 📄' },
      { type: 'arrange', prompt: 'Order these sentences to make a perfect paragraph:', words: ['Firstly, swimming is great for your whole body without hurting your joints.','Swimming is one of the healthiest exercises you can do.','Finally, it also reduces stress and improves sleep quality.','Without doubt, everyone should try to swim regularly.','Additionally, it builds strength, endurance, and flexibility at the same time.'], correctOrder: [1,0,4,2,3], sentence: 'Swimming is one of the healthiest exercises you can do.', feedback: 'Topic → 3 Details → Conclusion: a perfect 5-sentence paragraph! 🏊' },
      { type: 'fill', sentence: 'A good paragraph starts with a ___ sentence that tells the reader the main idea.', answer: 'topic', hint: '🎯 what is the name for the first sentence of a paragraph?', feedback: 'TOPIC sentence — it sets up everything that follows! 🎯' },
      { type: 'choose', question: 'Which paragraph is BEST structured?', options: ['My cat is funny. He does funny things. He is really funny. He makes me laugh because he is funny.','I love pizza! It tastes amazing and everyone loves it too. Pizza is great.','Books are magical windows to other worlds. They build vocabulary and imagination. They teach empathy by showing different lives. They can take you anywhere, even to places that don\'t exist. Truly, books are the greatest adventure.','Reading. Is. Good. Very good. The best.'], answer: 3, feedback: 'Topic + 3 rich details + memorable conclusion — a perfectly structured paragraph! 📚' },
      { type: 'write', prompt: 'Write a COMPLETE 5-sentence paragraph on ONE of these topics:\n• My favorite animal\n• Why I love [a hobby]\n• The best place I have ever been', guides: ['Sentence 1: TOPIC SENTENCE — state your main idea clearly','Sentence 2-4: THREE DETAIL sentences (give examples, reasons, facts)','Sentence 5: CONCLUDING SENTENCE — restate in new words or leave a final thought','Aim for 60-80 words total!'], model: 'The cheetah is the most breathtaking animal in the world. It can accelerate from zero to 70 miles per hour in just three seconds — faster than most sports cars. Its spotted coat is perfectly designed for camouflage in the golden grass. Unlike other big cats, the cheetah cannot roar; instead, it purrs like a giant housecat. Truly, the cheetah is proof that nature\'s engineering is beyond anything humans have created.', minWords: 50, feedback: 'You wrote a COMPLETE paragraph! Topic, details, conclusion — you\'re a real writer now! 📄' },
    ],
  },

  // ─── STAGE 4: WRITING TYPES ──────────────────────────────────────────────
  story_writing: {
    id: 'story_writing', title: 'Story Writing', subtitle: 'Beginning → Middle → End', icon: '📖', stage: 'ws4',
    explanation: {
      rule: 'Every story has three parts: BEGINNING (introduce characters + setting), MIDDLE (problem/adventure), END (solution/lesson/feeling)',
      examples: ['Beginning: "One stormy night, Mia found a glowing door in her garden."', 'Middle: "She stepped through and discovered a land where animals could talk."', 'End: "She returned home with one precious gift: the ability to listen."'],
      tip: 'The MIDDLE is the most important part — something must CHANGE or HAPPEN. No problem = no story!',
    },
    exercises: [
      { type: 'choose', question: 'Which is the BEST story beginning? (Hook the reader!)', options: ['Once upon a time there was a boy.','A boy named Tom went somewhere.','The day Tom opened the strange letter, his whole world cracked open.','This story is about a boy called Tom.'], answer: 2, feedback: '"The day Tom opened the strange letter, his whole world cracked open." — Instant curiosity! 🔥' },
      { type: 'choose', question: 'Which part of a story has the PROBLEM or ADVENTURE?', options: ['Beginning','Middle','End','Title'], answer: 1, feedback: 'The MIDDLE has the problem, conflict, or adventure — the most exciting part! 🎢' },
      { type: 'fill', sentence: 'A great story ending should make the reader feel ___ about what happened.', answer: 'something', hint: '💭 stories should leave readers with an emotion or thought', feedback: 'SOMETHING — a great ending leaves readers feeling happy, surprised, moved, or thoughtful! 💭' },
      { type: 'arrange', prompt: 'Order the story parts (Beginning → Middle → End):', words: ['She smiled, holding the tiny dragon egg close to her heart.','Deep in the mountain, Maya discovered a hidden cave full of glittering gems.','After weeks of searching, she finally found what she had come for.'], correctOrder: [1,2,0], sentence: 'Deep in the mountain, Maya discovered a hidden cave full of glittering gems.', feedback: 'Beginning sets the scene, Middle shows the journey, End gives the resolution! 📖' },
      { type: 'write', prompt: 'Write a SHORT story with a clear Beginning, Middle, and End.\nChoose your hero: a young inventor / a lost dragon / a brave girl in a storm', guides: ['BEGINNING (1-2 sentences): Introduce your character and setting with a hook!','MIDDLE (2-3 sentences): What problem or adventure do they face?','END (1-2 sentences): How is it resolved? What do they learn or feel?','Target: 60-100 words total'], model: 'The young inventor Leo had one hour to save his town from flooding before the storm hit. He rushed to his workshop and built a water-diverting machine from old pipes and bicycle parts. With ten minutes to spare, he flipped the switch — and the water changed course, flowing safely into the river. As the sun broke through the clouds, the townsfolk cheered. Leo had learned that necessity truly is the mother of invention.', minWords: 50, feedback: 'What a story! Clear Beginning, exciting Middle, satisfying End — you\'re a real storyteller! 📖' },
    ],
  },

  descriptive_writing: {
    id: 'descriptive_writing', title: 'Descriptive Writing', subtitle: 'Paint a picture with words!', icon: '🎨', stage: 'ws4',
    explanation: {
      rule: 'Descriptive writing makes a PLACE, PERSON, or THING come alive using sensory details, specific adjectives, and powerful comparisons!',
      examples: ['Simile: "The fog rolled in like a grey blanket."', 'Metaphor: "The city was a humming beehive of activity."', 'Personification: "The old house groaned and sighed in the wind."'],
      tip: 'Use FIGURATIVE LANGUAGE to make descriptions unforgettable: similes (like/as), metaphors (is/was), personification (giving objects human qualities)!',
    },
    exercises: [
      { type: 'choose', question: 'Which uses a SIMILE to describe the moon?', options: ['The moon was bright.','The moon glowed like a silver coin in the dark sky.','The moon is a satellite.','The big round moon.'], answer: 1, feedback: '"Like a silver coin" — a simile using LIKE to make a vivid comparison! 🌕' },
      { type: 'choose', question: 'Which uses PERSONIFICATION?', options: ['The wind blew hard.','The trees were very tall.','The hungry waves devoured the sandcastle.','It was a stormy night.'], answer: 2, feedback: '"Hungry waves devoured" — waves can\'t be hungry! That\'s personification! 🌊' },
      { type: 'fill', sentence: 'The old forest was as dark and silent ___ a sleeping giant.', answer: 'as', hint: '🌲 complete the simile comparing the forest to a sleeping giant', feedback: '"As dark and silent AS a sleeping giant" — a perfect simile! 🌲' },
      { type: 'arrange', prompt: 'Build this descriptive sentence with personification:', words: ['danced','The','playfully','through','fireflies','the','darkness'], correctOrder: [1,0,2,3,4,5,6], sentence: 'The fireflies danced playfully through the darkness', feedback: '"Danced" — fireflies don\'t actually dance, but it creates a beautiful image! ✨' },
      { type: 'write', prompt: 'Write a DESCRIPTIVE paragraph (5-7 sentences) about ONE of these:\n• Your bedroom at night\n• A rainy day outside your window\n• Your school cafeteria at lunchtime', guides: ['Use at least 2 SENSES (see, hear, smell, touch, taste)','Use at least 1 SIMILE (like/as comparison)','Use at least 1 PERSONIFICATION (object doing a human thing)','Use powerful adjectives and strong verbs!','Target: 60-90 words'], model: 'At night, my bedroom becomes a different world. The darkness wraps around me like a warm blanket, and the only sound is the gentle hum of the ceiling fan, spinning patiently like a slow propeller. Moonlight creeps through the curtain, painting silver stripes across my floor. My books line the shelves like sleeping friends, waiting for morning. In the stillness, I feel safe — like a small boat anchored in a quiet harbor.', minWords: 55, feedback: 'Your description is SO vivid — I can picture it perfectly! 🎨' },
    ],
  },

  opinion_writing: {
    id: 'opinion_writing', title: 'Opinion Writing', subtitle: 'Share what YOU think!', icon: '💬', stage: 'ws4',
    explanation: {
      rule: 'Opinion writing shares your VIEW with REASONS and EVIDENCE. Structure: State Opinion → Give 3 Reasons → Conclusion',
      examples: ['Opinion: "I believe all schools should have a garden."', 'Reason 1: Gardens teach students about science and nature.', 'Reason 2: Growing food builds responsibility.', 'Reason 3: Gardens reduce stress and improve mental health.', 'Conclusion: "For these reasons, every school garden is an investment in children\'s futures."'],
      tip: 'Use persuasive language: "I strongly believe...", "Without doubt...", "The evidence clearly shows...", "Anyone who thinks about it can see..."',
    },
    exercises: [
      { type: 'choose', question: 'Which is a CLEAR opinion statement?', options: ['Homework exists.','Some people do homework.','I strongly believe that homework should be limited to 30 minutes per night.','Homework: yes or no?'], answer: 2, feedback: '"I strongly believe that homework should be limited to 30 minutes" — clear, specific, and strong! 💬' },
      { type: 'choose', question: 'Which is the STRONGEST reason for "Schools should have more art classes"?', options: ['Art is nice.','I like art.','Research shows that art education improves problem-solving skills and emotional intelligence.','Some schools have art.'], answer: 2, feedback: 'A reason with EVIDENCE ("research shows") is always the strongest! 📊' },
      { type: 'fill', sentence: 'In my opinion, all children should learn to ___ because it opens the door to every other subject.', answer: 'read', hint: '📚 what skill is the foundation of all learning?', feedback: '"All children should learn to READ because..." — opinion + reason! 📚' },
      { type: 'arrange', prompt: 'Order this opinion paragraph correctly:', words: ['First, exercise releases endorphins that improve mood and focus.','I believe that daily exercise should be required in all schools.','For these reasons, active students are better, happier learners.','Additionally, regular exercise builds healthy habits that last a lifetime.'], correctOrder: [1,0,3,2], sentence: 'I believe that daily exercise should be required in all schools.', feedback: 'Opinion → Reason 1 → Reason 2 → Conclusion: perfect opinion structure! 💬' },
      { type: 'write', prompt: 'Write an OPINION paragraph (5-7 sentences) on ONE topic:\n• Should kids have smartphones?\n• Is it better to have one best friend or many friends?\n• Should PE class be every day?', guides: ['Sentence 1: STATE your opinion clearly ("I strongly believe that...")','Sentence 2-4: Give THREE different reasons or examples','Each reason should explain WHY you think that','Sentence 5: Concluding sentence that reinforces your opinion','Use persuasive words: clearly, without doubt, evidence shows...'], model: 'I strongly believe that children should not have smartphones until they are at least 13 years old. First, research shows that excessive screen time harms children\'s sleep and concentration. Second, social media can lead to anxiety and comparison at an age when confidence is still developing. Third, childhood is precious — it should be spent exploring, playing, and building real friendships, not scrolling. Without doubt, protecting children from smartphones is protecting their wellbeing.', minWords: 55, feedback: 'Powerful opinion writing! You stated, supported, and concluded brilliantly! 💬' },
    ],
  },

  // ─── STAGE 5: MY ARTICLES ────────────────────────────────────────────────
  my_animal_story: {
    id: 'my_animal_story', title: 'My Animal Story', subtitle: 'Write a full 400-word story!', icon: '🦁', stage: 'ws5',
    explanation: {
      rule: 'You are ready to write a FULL 400-word narrative story! Use everything you have learned: strong verbs, sensory details, descriptive language, and clear structure.',
      examples: ['Your story should have:', '• A gripping opening line', '• A character with a clear goal or problem', '• Vivid descriptions using 5 senses', '• A satisfying ending with a lesson or feeling'],
      tip: 'Plan before you write! Spend 2 minutes thinking: WHO is your character? WHERE are they? WHAT happens? HOW does it end?',
    },
    exercises: [
      { type: 'choose', question: 'A 400-word story should have:', options: ['Only description, no plot','A beginning, exciting middle with a problem, and a satisfying ending','Just a list of events','Only dialogue'], answer: 1, feedback: 'Beginning + Middle (with a problem/adventure) + End = a complete story! 📖' },
      { type: 'fill', sentence: 'To write 400 words, you need about ___ good paragraphs of 5-6 sentences each.', answer: 'five', hint: '🔢 400 words ÷ 80 words per paragraph = ?', feedback: 'FIVE paragraphs of ~80 words each = approximately 400 words! 📝' },
      { type: 'write', prompt: '📝 PART 1: Write your OPENING (80-100 words)\n\nChoose your animal hero:\n🦁 A young lion who wants to prove herself\n🐬 A dolphin separated from its pod\n🦅 An eagle learning to fly for the first time\n\nWrite your opening paragraph: introduce the character, setting, and hint at the problem!', guides: ['Start with a HOOK — action, dialogue, or surprising detail','Tell us WHO (character + a personality detail)','Tell us WHERE (describe the setting with 2-3 sensory details)','End with a HINT of the problem to come'], model: 'The morning Zara first opened her golden eyes, she knew she was different. While her sisters pounced on leaves and chased butterflies, the young lioness sat at the edge of the savanna, staring at the distant mountains. The acacia trees shimmered in the heat, and the dry grass whispered with the scent of dust and freedom. Something was calling to her — something beyond the pride\'s territory, beyond everything she knew. She had to find out what.', minWords: 70, feedback: 'What an opening! I\'m desperate to know what happens next! 🦁' },
      { type: 'write', prompt: '📝 PART 2: Write the MIDDLE (160-180 words)\n\nThis is the most exciting part! Your character faces a problem or goes on an adventure.\n\nWrite TWO paragraphs:\n• Paragraph 1: The problem/adventure begins\n• Paragraph 2: The darkest moment (things get worse before they get better)', guides: ['Use STRONG VERBS for action: sprinted, crashed, scrambled, whispered','Add at least 2 SENSORY DETAILS in each paragraph','Build TENSION — make us worried for your character','End paragraph 2 at the lowest point — things seem hopeless!'], model: 'Zara followed the mountains for three days, hunting alone for the first time. On the first night, she caught a small hare and felt a surge of pride. On the second, rain came, and she sheltered in a shallow cave, shivering as lightning split the sky. Then on the third morning, she found the valley — green and impossibly lush, filled with zebras and wildebeest as far as she could see. It was paradise.\n\nBut as she stepped forward, a deep rumble shook the ground. Three adult male lions emerged from the treeline, their eyes fixed on her with cold, territorial stares. She was a young female, alone, trespassing. Her legs trembled. She was too far from home to run, and too small to fight. For the first time in her life, Zara was truly afraid.', minWords: 120, feedback: 'Incredible tension! The reader is on the edge of their seat! 📖' },
      { type: 'write', prompt: '📝 PART 3: Write the ENDING (100-120 words)\n\nResolve the problem and end with meaning. Write TWO paragraphs:\n• Paragraph 1: How does your character overcome the challenge?\n• Paragraph 2: The ending — how have they changed? What did they learn?', guides: ['The solution should feel EARNED — not too easy, not impossible','Show how your character has GROWN or CHANGED','Use at least one memorable final line','End on an EMOTION — joy, peace, pride, hope, wonder'], model: 'Zara did not run. She lifted her head, took a slow breath of mountain air, and then she did something unexpected — she sat down. She was not challenging them. She was asking permission. For a long moment, the three males stared. Then the eldest flicked his tail, turned, and walked away. The others followed. It was enough.\n\nZara stayed in the valley for a week, learning to hunt in new terrain, growing stronger with every sunrise. When she finally returned home, padding across the golden savanna, she walked differently. Her pride noticed too. The young lioness who had left searching for something had come back knowing exactly who she was — and that was more than enough.', minWords: 80, feedback: '🏆 YOU DID IT! A complete 400-word story with a beautiful ending! You are a real writer!' },
    ],
  },

  my_dream_day: {
    id: 'my_dream_day', title: 'My Opinion Article', subtitle: 'Write a 400-word opinion piece!', icon: '✍️', stage: 'ws5',
    explanation: {
      rule: 'A 400-word OPINION ARTICLE has 5 paragraphs: ① Hook + Opinion → ② Reason 1 → ③ Reason 2 → ④ Reason 3 → ⑤ Strong Conclusion',
      examples: ['This is the "5-paragraph essay" — the most important writing structure in English!', 'Use it for: school essays, debates, persuasive letters, book reviews, and more.', 'Master this structure and you can write about ANYTHING!'],
      tip: 'Make your FIRST sentence unforgettable. And your LAST sentence even better. Readers remember the beginning and the end.',
    },
    exercises: [
      { type: 'choose', question: 'How many paragraphs does a 5-paragraph opinion essay have?', options: ['3','4','5','6'], answer: 2, feedback: '5 paragraphs: Introduction + 3 Body Paragraphs (reasons) + Conclusion! 📝' },
      { type: 'arrange', prompt: 'Order the 5 paragraphs of an opinion essay:', words: ['Paragraph with Reason 3 + evidence','Strong conclusion that restates opinion in new words','Attention-grabbing hook + clear opinion statement','Paragraph with Reason 1 + evidence','Paragraph with Reason 2 + evidence'], correctOrder: [2,3,4,0,1], sentence: 'Attention-grabbing hook + clear opinion statement', feedback: 'Introduction → Reason 1 → Reason 2 → Reason 3 → Conclusion: the 5-paragraph essay! 📋' },
      { type: 'write', prompt: '📝 INTRO + REASON 1 (80-100 words)\n\nChoose your opinion topic:\n🐾 Should every family have a pet?\n📱 Should children under 12 have mobile phones?\n🌱 Should all schools grow their own food?\n\nWrite your INTRODUCTION paragraph (hook + clear opinion) and FIRST BODY paragraph (reason 1 + example)', guides: ['INTRO: Start with a surprising fact or question, then clearly state your opinion','REASON 1 paragraph: Start with "First of all..." or "To begin with..."','Give your BEST reason first!','Support it with a specific example, fact, or personal experience'], model: 'Imagine a world where every child grows up with a furry, loyal friend who never judges, always listens, and greets you like a hero every single day. I strongly believe that every family should consider having a pet, because the benefits to children\'s wellbeing are simply too great to ignore.\n\nFirst of all, pets teach children responsibility in a way nothing else can. When a child feeds, walks, and cares for an animal, they learn that another living being depends on them — and this builds maturity, empathy, and discipline that lasts a lifetime.', minWords: 80, feedback: 'What a hook! And your first reason is clear and well-supported! 💬' },
      { type: 'write', prompt: '📝 REASONS 2 & 3 (160-180 words)\n\nWrite your TWO MIDDLE body paragraphs:\n• Paragraph for Reason 2 (start with "Furthermore..." or "In addition...")\n• Paragraph for Reason 3 (start with "Finally..." or "Most importantly...")', guides: ['Each paragraph = topic sentence (reason) + 2-3 supporting details','Use transition words to start each paragraph','Make each reason DIFFERENT from the others','Use evidence: research shows / studies suggest / for example / personally...','Aim for 80-90 words per paragraph'], model: 'Furthermore, pets have a remarkable effect on children\'s mental health. Research shows that stroking an animal reduces cortisol — the stress hormone — within minutes. Children who grow up with pets tend to have lower anxiety, higher self-esteem, and better social skills. When a child is sad, a pet simply sits beside them, offering warmth without words.\n\nMost importantly, caring for an animal builds compassion that extends beyond the home. Children who love and respect animals grow into adults who love and respect other people. They learn that all living creatures have feelings — a lesson more valuable than any textbook could teach.', minWords: 120, feedback: 'Two powerful reasons with real evidence — this is persuasive writing at its best! 🌟' },
      { type: 'write', prompt: '📝 CONCLUSION (80-100 words)\n\nWrite your CONCLUSION paragraph — the most memorable part!\n\n• Restate your opinion in completely NEW words\n• Briefly reference your 3 reasons (without just listing them)\n• End with an UNFORGETTABLE final sentence — a call to action, a question, a powerful image', guides: ['DO NOT start with "In conclusion" — try "Ultimately..." or "When all is said and done..."','Restate your OPINION in different, more powerful language','End with your most memorable sentence — make it linger in the reader\'s mind','Target: 80-100 words'], model: 'When all is said and done, a pet is far more than a cute addition to a household — it is a teacher, a therapist, and a best friend rolled into one extraordinary creature. The responsibility, the comfort, and the compassion that animals awaken in children are gifts that no toy or screen can replicate. So if you are wondering whether your family is ready for a pet, perhaps the better question is: can your children afford to grow up without one?', minWords: 65, feedback: '🏆 MASTERPIECE! You have written a complete 400-word opinion article! You are a TRUE writer now!' },
    ],
  },

};
