const GRAMMAR_STAGES = [
  { id: 'tg1', title: 'Academic Vocabulary', icon: '📖', color: '#3b82f6', topics: ['awl_core','word_roots','context_clues','synonym_replace','word_forms'] },
  { id: 'tg2', title: 'Complex Sentences',   icon: '🏗️', color: '#8b5cf6', topics: ['noun_clauses','adjective_clauses','adverb_clauses','participle_phrases','inversion'] },
  { id: 'tg3', title: 'Academic Grammar',    icon: '⚙️', color: '#06b6d4', topics: ['academic_passive','subjunctive','modal_nuance','tense_precision','subject_verb_agree'] },
  { id: 'tg4', title: 'Discourse Markers',   icon: '🔗', color: '#10b981', topics: ['cause_effect','concession_contrast','exemplification','summary_emphasis','reference_chains'] },
  { id: 'tg5', title: 'TOEFL Grammar Traps', icon: '⚠️', color: '#f59e0b', topics: ['sv_agreement_traps','parallel_structure','dangling_modifiers','redundancy','logical_predicate'] },
];

const GRAMMAR_TOPICS = {

  // ─── STAGE 1: ACADEMIC VOCABULARY ────────────────────────────────────────
  awl_core: {
    id: 'awl_core', title: 'AWL Core Words', subtitle: 'Academic Word List essentials', icon: '📚', stage: 'tg1',
    explanation: {
      rule: 'The Academic Word List (AWL) contains words that appear across all academic disciplines. Mastering these is essential for TOEFL reading and writing.',
      examples: ['analyze → to examine in detail', 'concept → an abstract idea', 'significant → important and meaningful', 'approach → a method or way of dealing with something'],
      tip: 'Learn words in FAMILIES: analyze / analysis / analytical / analytically. One root = four exam-ready forms.',
    },
    exercises: [
      { type: 'choose', question: 'The researchers sought to ___ the relationship between sleep and memory.', options: ['analyze','make','do','put'], answer: 0, feedback: 'ANALYZE — to examine systematically. Common in TOEFL: "analyze data / results / patterns."' },
      { type: 'choose', question: 'The ___ of natural selection was proposed by Charles Darwin.', options: ['thing','idea','concept','thought'], answer: 2, feedback: 'CONCEPT — an abstract principle or idea. Academic writing prefers "concept" over "idea."' },
      { type: 'fill', sentence: 'The study produced ___ evidence that exercise improves cognitive function.', answer: 'significant', hint: 'Important / meaningful — not just "big"', feedback: 'SIGNIFICANT — means statistically or meaningfully important. Key word in academic arguments.' },
      { type: 'sentence-improve', question: 'Which revision uses more academic vocabulary?', original: 'The scientists used a new way to look at the problem.', options: ['The scientists tried a new way to look at the problem.', 'The scientists employed a novel approach to examine the problem.', 'The scientists used a new way to see the problem better.', 'A new way to look at the problem was used by scientists.'], answer: 1, feedback: 'EMPLOYED (used) + NOVEL (new) + APPROACH (way) + EXAMINE (look at) — all AWL upgrades.' },
      { type: 'passage-vocab', passage: 'Urban planners must [BLANK] data from multiple sources before making infrastructure decisions that will affect millions of residents for decades.', question: 'The word in [BLANK] means:', options: ['ignore','integrate','duplicate','separate'], answer: 1, feedback: 'INTEGRATE — to combine different elements into a whole. Essential AWL verb for academic writing.' },
    ],
  },

  word_roots: {
    id: 'word_roots', title: 'Roots & Affixes', subtitle: 'Decode unknown words', icon: '🌱', stage: 'tg1',
    explanation: {
      rule: 'Latin and Greek roots let you decode 60% of academic vocabulary. Learn the root, decode the word.',
      examples: ['bene- (good): benefit, benevolent, beneficiary', 'cred- (believe): credible, credentials, incredible', 'spec- (see): inspect, spectacle, perspective', 'trans- (across): transfer, transform, transparent'],
      tip: 'On TOEFL, if you see an unfamiliar word, look for a root you know. "Circumnavigate" = circum (around) + navigate = to sail around.',
    },
    exercises: [
      { type: 'choose', question: 'The root "dict" means "to say/speak." Which word means "an official order"?', options: ['dictator','predict','edict','dictionary'], answer: 2, feedback: 'EDICT — e (out) + dict (speak) = an official proclamation spoken out. "Predict" = pre + dict = say before.' },
      { type: 'choose', question: 'The prefix "sub-" means "under/below." What does "subterranean" mean?', options: ['above ground','underground','beside the earth','within the earth'], answer: 1, feedback: 'SUBTERRANEAN — sub (under) + terra (earth) = underground. The root "terra" also appears in terrain, territory.' },
      { type: 'fill', sentence: 'The prefix "micro-" means small, so a ___ organism is one too small to see without a lens.', answer: 'microscopic', hint: 'micro + scop (to see) + -ic', feedback: 'MICROSCOPIC — micro (small) + scope (see). Contrast: macroscopic (large scale).' },
      { type: 'sentence-improve', question: 'Which sentence correctly uses a word derived from "port" (to carry)?', options: ['The journalist reported the findings.', 'The company exported goods to twelve countries.', 'The athlete performed well yesterday.', 'The teacher supported her students.'], answer: 1, feedback: 'EXPORTED — ex (out) + port (carry) = carried out. Other "port" words: import, transport, portable.' },
      { type: 'passage-vocab', passage: 'The philosopher argued that true knowledge requires [BLANK] — a willingness to accept that one\'s current beliefs may be incomplete or incorrect.', question: 'Based on the context, [BLANK] most likely means:', options: ['arrogance','humility','confidence','certainty'], answer: 1, feedback: 'HUMILITY — the context clue "willingness to accept that one\'s beliefs may be incomplete" defines the word.' },
    ],
  },

  context_clues: {
    id: 'context_clues', title: 'Context Clues', subtitle: 'Guess meaning from context', icon: '🔍', stage: 'tg1',
    explanation: {
      rule: 'On TOEFL, you can infer word meaning from 4 types of context clues: Definition, Synonym, Antonym/Contrast, and Example.',
      examples: ['Definition: "Photosynthesis — the process by which plants convert sunlight to energy — is essential."', 'Contrast: "Unlike the arid Sahara, the Amazon receives abundant rainfall."', 'Example: "Legumes, such as lentils, chickpeas, and soybeans, are high in protein."'],
      tip: 'Signal words: Definition clues → is, are, refers to, means. Contrast clues → unlike, however, while, whereas. Example clues → such as, for example, including.',
    },
    exercises: [
      { type: 'choose', question: '"The region was so arid that farmers could not grow crops without irrigation." ARID means:', options: ['fertile','mountainous','dry','cold'], answer: 2, feedback: 'DRY — context clue: "farmers could not grow crops without irrigation" implies the land lacks water.' },
      { type: 'choose', question: '"Unlike her gregarious sister who loved parties, Maria was reserved and preferred staying home." GREGARIOUS means:', options: ['intelligent','sociable','creative','cautious'], answer: 1, feedback: 'SOCIABLE — contrast clue: "unlike... reserved and preferred staying home" shows gregarious = the opposite.' },
      { type: 'fill', sentence: 'Pathogens, such as bacteria, viruses, and fungi, can cause disease. PATHOGENS are disease-causing ___.', answer: 'organisms', hint: 'The examples (bacteria, viruses, fungi) tell you what category pathogens belong to', feedback: 'ORGANISMS — the examples are all living microorganisms. Example clues list specific cases of the word.' },
      { type: 'sentence-improve', question: 'Which sentence contains the clearest context clue for the underlined word?', options: ['"The data was anomalous."', '"The anomalous result — one that deviated sharply from all other measurements — alarmed the team."', '"She noticed the anomalous reading on the machine."', '"Results were anomalous and unexpected."'], answer: 1, feedback: 'The DEFINITION clue "one that deviated sharply from all other measurements" defines anomalous = unusual/irregular.' },
      { type: 'passage-vocab', passage: 'The settlement was deemed [BLANK]: records showed it had been continuously inhabited for over 9,000 years, making it one of the world\'s oldest cities.', question: '[BLANK] most likely means:', options: ['modern','ancient','abandoned','thriving'], answer: 1, feedback: 'ANCIENT — the context clue "inhabited for over 9,000 years" and "one of the world\'s oldest cities" define the word.' },
    ],
  },

  synonym_replace: {
    id: 'synonym_replace', title: 'Academic Synonyms', subtitle: 'Upgrade your vocabulary', icon: '⬆️', stage: 'tg1',
    explanation: {
      rule: 'TOEFL rewards precise academic vocabulary. Replace common words with their academic equivalents in writing and recognize paraphrases in reading.',
      examples: ['show → demonstrate / illustrate / reveal', 'use → utilize / employ / apply', 'important → significant / crucial / pivotal', 'change → alter / modify / transform'],
      tip: 'In TOEFL reading, correct answers often PARAPHRASE the passage. The answer won\'t use the same words — it\'ll use synonyms.',
    },
    exercises: [
      { type: 'choose', question: 'Which is the most academic replacement for "The study SHOWED that..."?', options: ['proved that','demonstrated that','made it clear that','let people see that'], answer: 1, feedback: 'DEMONSTRATED — academic standard. "Proved" is too absolute for scientific writing; "demonstrated" shows evidence without overclaiming.' },
      { type: 'choose', question: 'Academic replacement for "We USED several methods":',  options: ['employed several methods','did several methods','worked with several methods','tried several methods'], answer: 0, feedback: 'EMPLOYED — in academic writing, "employed" or "utilized" replaces "used" in methodology descriptions.' },
      { type: 'fill', sentence: 'The new policy will significantly ___ the way schools handle student assessment. (replace "change")', answer: 'alter', hint: 'An academic synonym for "change" — also: modify, transform', feedback: 'ALTER — academic synonym for change. Also acceptable: modify, transform, reshape.' },
      { type: 'sentence-improve', question: 'Which sentence is written at the highest academic register?', options: ['It is important to remember that climate change is a big problem.', 'Climate change is really important and affects many things.', 'The implications of climate change are significant and far-reaching.', 'Climate change matters a lot and we should care about it.'], answer: 2, feedback: '"IMPLICATIONS... SIGNIFICANT... FAR-REACHING" — all academic register. Avoid "really," "big," "a lot" in academic writing.' },
      { type: 'passage-vocab', passage: 'Economists have long [BLANK] that free trade benefits all participating nations, though recent evidence suggests the reality is considerably more nuanced.', question: '[BLANK] is closest in meaning to:', options: ['denied','contended','forgotten','required'], answer: 1, feedback: 'CONTENDED — means argued/maintained a position. Common in TOEFL: "researchers contend that..."' },
    ],
  },

  word_forms: {
    id: 'word_forms', title: 'Word Forms', subtitle: 'Noun / Verb / Adj / Adverb', icon: '🔄', stage: 'tg1',
    explanation: {
      rule: 'Academic English requires exact word FORM: noun, verb, adjective, or adverb. Wrong form = grammar error even if you know the word.',
      examples: ['analyze (verb) / analysis (noun) / analytical (adj) / analytically (adv)', 'define (verb) / definition (noun) / definitive (adj)', 'vary (verb) / variation (noun) / various (adj) / variously (adv)'],
      tip: 'Noun slots: the ___, a ___, of ___. Verb slots: subject + ___. Adjective slots: ___ + noun. Adverb slots: modifies verb or adjective.',
    },
    exercises: [
      { type: 'choose', question: 'The ___ of the experiment confirmed the hypothesis. (analyze)', options: ['analyze','analysis','analytical','analyzing'], answer: 1, feedback: 'ANALYSIS — noun form. After "the" you need a noun. analyze(v) → analysis(n) → analytical(adj).' },
      { type: 'choose', question: 'The results were ___ affected by the temperature change. (significant)', options: ['significance','significant','signify','significantly'], answer: 3, feedback: 'SIGNIFICANTLY — adverb modifying the verb "affected." Adjectives modify nouns; adverbs modify verbs.' },
      { type: 'fill', sentence: 'The committee made a ___ decision to postpone the vote. (define → adjective)', answer: 'definitive', hint: 'define → definition → ??? (adjective meaning clear and final)', feedback: 'DEFINITIVE — adjective form of "define." Not "definite" (which means certain) — "definitive" means conclusive.' },
      { type: 'sentence-improve', question: 'Which sentence uses the correct word form in all positions?', options: ['The vary in results was significance.', 'The variation in results was significant.', 'The various in results were significantly.', 'The variably results showed significance.'], answer: 1, feedback: '"The VARIATION (noun) in results was SIGNIFICANT (adjective)" — correct forms in correct slots.' },
      { type: 'passage-vocab', passage: 'The [BLANK] of urban heat islands — where cities are warmer than surrounding rural areas — has become more pronounced as global temperatures rise.', question: 'The word in [BLANK] must be a:', options: ['verb','adjective','noun','adverb'], answer: 2, feedback: 'NOUN — "The ___ of urban heat islands" requires a noun (subject of the sentence). The answer is "phenomenon."' },
    ],
  },

  // ─── STAGE 2: COMPLEX SENTENCES ──────────────────────────────────────────
  noun_clauses: {
    id: 'noun_clauses', title: 'Noun Clauses', subtitle: 'Clauses that act as nouns', icon: '📦', stage: 'tg2',
    explanation: {
      rule: 'A noun clause is a dependent clause that functions as a noun — as subject, object, or complement. They begin with: that, what, whether, how, why, who, when.',
      examples: ['Subject: "That the earth is round is well established."', 'Object: "Scientists discovered that the compound was unstable."', 'Complement: "The problem is whether funding will continue."'],
      tip: 'TOEFL frequently tests noun clauses after verbs like: claim, argue, suggest, demonstrate, find, show, believe, know.',
    },
    exercises: [
      { type: 'choose', question: 'Choose the correct noun clause: "The study demonstrated ___ exercise reduces inflammation."', options: ['what','that','which','when'], answer: 1, feedback: 'THAT — introduces a noun clause as the object of "demonstrated." No comma before "that" in this structure.' },
      { type: 'choose', question: 'Which sentence contains a noun clause used as the SUBJECT?', options: ['"She knows the answer."', '"What the researchers discovered surprised everyone."', '"The man who called was a professor."', '"She left because she was tired."'], answer: 1, feedback: '"WHAT THE RESEARCHERS DISCOVERED" is a noun clause acting as the subject of the verb "surprised."' },
      { type: 'fill', sentence: 'Economists debate ___ free trade ultimately benefits or harms developing nations.', answer: 'whether', hint: 'Used when there are two possible outcomes (yes/no debate)', feedback: 'WHETHER — introduces a noun clause expressing a binary question or doubt.' },
      { type: 'sentence-improve', question: 'Which sentence correctly embeds a noun clause?', options: ['"She argued, that pollution was rising."', '"She argued that pollution levels were rising."', '"She argued which pollution was rising."', '"She argued pollution that was rising."'], answer: 1, feedback: '"She argued THAT pollution levels were rising" — no comma before "that" in an object noun clause.' },
      { type: 'passage-vocab', passage: 'Archaeologists have long debated [BLANK] the Stonehenge monument served a primarily religious or astronomical purpose.', question: '[BLANK] should be:', options: ['that','what','whether','which'], answer: 2, feedback: 'WHETHER — because the clause presents two alternatives (religious OR astronomical).' },
    ],
  },

  adjective_clauses: {
    id: 'adjective_clauses', title: 'Adjective Clauses', subtitle: 'Relative clauses: who, which, that', icon: '🎯', stage: 'tg2',
    explanation: {
      rule: 'Adjective clauses modify nouns. RESTRICTIVE clauses (no commas) limit meaning. NON-RESTRICTIVE clauses (with commas) add information.',
      examples: ['Restrictive: "The study that was published last year is influential." (specific study)', 'Non-restrictive: "The study, which was published last year, is influential." (any study, extra info)'],
      tip: 'TOEFL tip: Use "that" only in restrictive clauses. Use "which" in non-restrictive clauses (with commas). "Who" refers to people; "which/that" to things.',
    },
    exercises: [
      { type: 'choose', question: '"The scientists ___ conducted the experiment published their findings." (referring to specific scientists)', options: ['which','who','whom','whose'], answer: 1, feedback: 'WHO — refers to people. "Which" is for things/animals. In restrictive clauses, no commas needed.' },
      { type: 'choose', question: 'Which correctly uses a NON-RESTRICTIVE clause?', options: ['"The theory that Darwin proposed changed biology."', '"The theory, which Darwin proposed, changed biology."', '"The theory which Darwin proposed, changed biology."', '"The theory, that Darwin proposed, changed biology."'], answer: 1, feedback: 'NON-RESTRICTIVE: commas around the clause, using "which" not "that." Removes the clause = sentence still makes sense.' },
      { type: 'fill', sentence: 'The data ___ was collected over five years showed a clear trend.', answer: 'that', hint: 'Restrictive clause — limits which data. No commas = use "that."', feedback: 'THAT — restrictive clause, no commas. "Which" would require commas: "The data, which was collected over five years, showed..."' },
      { type: 'sentence-improve', question: 'Which sentence is grammatically correct?', options: ['"Climate change, that threatens biodiversity, is accelerating."', '"Climate change, which threatens biodiversity, is accelerating."', '"Climate change which, threatens biodiversity, is accelerating."', '"Climate change that, threatens biodiversity, is accelerating."'], answer: 1, feedback: '"Climate change, WHICH threatens biodiversity, is accelerating." — non-restrictive, so "which" + commas.' },
      { type: 'passage-vocab', passage: 'The Amazon rainforest, [BLANK] spans nine countries, produces approximately 20% of the world\'s oxygen.', question: '[BLANK] should be:', options: ['that','who','which','whose'], answer: 2, feedback: 'WHICH — non-restrictive clause (note the commas). "That" cannot be used in non-restrictive clauses.' },
    ],
  },

  adverb_clauses: {
    id: 'adverb_clauses', title: 'Adverb Clauses', subtitle: 'Because, although, when, if...', icon: '🌿', stage: 'tg2',
    explanation: {
      rule: 'Adverb clauses modify verbs, adjectives, or entire sentences. They show TIME, CAUSE, CONTRAST, CONDITION, and PURPOSE.',
      examples: ['Cause: "Because temperatures rose, the glaciers melted rapidly."', 'Contrast: "Although the experiment failed, the data was valuable."', 'Condition: "If funding is secured, the project will begin in March."'],
      tip: 'When the adverb clause comes FIRST, use a comma. When it comes SECOND, no comma needed. "Although X, Y" vs "Y although X."',
    },
    exercises: [
      { type: 'choose', question: '___ the drug showed promise in lab tests, clinical trials produced mixed results.', options: ['Because','So that','Although','Since'], answer: 2, feedback: 'ALTHOUGH — introduces a contrast clause. Lab tests were positive, but clinical trials were mixed.' },
      { type: 'choose', question: 'Correct punctuation: "___ the population grew, resources became scarce."', options: ['"As the population grew resources became scarce."', '"As the population grew, resources became scarce."', '"Resources became scarce, as the population grew."', '"Resources became scarce as, the population grew."'], answer: 1, feedback: 'Comma AFTER the introductory adverb clause: "As [clause], [main clause]." No comma when main clause comes first.' },
      { type: 'fill', sentence: 'The policy was revised ___ feedback from stakeholders revealed several implementation flaws.', answer: 'after', hint: 'Time relationship: the revision happened following the feedback', feedback: 'AFTER — time adverb clause. "After [event], [result]" or "[result] after [event]."' },
      { type: 'sentence-improve', question: 'Which sentence uses an adverb clause correctly?', options: ['"The results were inconclusive, because the sample size was too small."', '"The results were inconclusive because the sample size was too small."', '"Because the sample size was too small the results were inconclusive."', '"The results because the sample size was too small were inconclusive."'], answer: 1, feedback: 'No comma before "because" when it follows the main clause. Comma only when "because clause" comes first.' },
      { type: 'passage-vocab', passage: '[BLANK] deforestation continues at its current rate, scientists estimate that 40% of Amazonian species could face extinction within fifty years.', question: '[BLANK] should be:', options: ['Although','Unless','Because','So that'], answer: 1, feedback: 'UNLESS — "Unless [bad thing continues], [bad outcome]" — a conditional warning. "If deforestation does NOT stop..."' },
    ],
  },

  participle_phrases: {
    id: 'participle_phrases', title: 'Participle Phrases', subtitle: 'Reduced clauses for concision', icon: '✂️', stage: 'tg2',
    explanation: {
      rule: 'Participle phrases REDUCE adjective or adverb clauses for a more concise academic style. Present participles (-ing) show active or simultaneous actions; past participles (-ed) show passive or completed actions.',
      examples: ['Full: "The data that was collected over five years showed a trend." → Reduced: "The data collected over five years showed a trend."', 'Full: "Because it faced budget cuts, the department merged." → Reduced: "Facing budget cuts, the department merged."'],
      tip: 'The participial phrase\'s implied subject MUST match the sentence subject. "Walking down the street, the rain began" is WRONG — the rain did not walk.',
    },
    exercises: [
      { type: 'choose', question: 'Reduce: "The study which was conducted in 2020 found..."', options: ['"The study conducting in 2020 found..."', '"The study conducted in 2020 found..."', '"The study being conducted in 2020 found..."', '"The study having been conducted in 2020 found..."'], answer: 1, feedback: 'CONDUCTED — past participle reduces a passive relative clause. "which was conducted" → "conducted."' },
      { type: 'choose', question: 'Which sentence has a DANGLING participle (wrong implied subject)?', options: ['"Walking to the lab, the researcher noticed the equipment malfunction."', '"Having reviewed the data, the team revised their conclusions."', '"Sitting in the library, the experiment produced unexpected results."', '"Designed for efficiency, the new system reduced costs."'], answer: 2, feedback: '"Sitting in the library, the EXPERIMENT..." — the experiment cannot sit. The human researcher was sitting, not the experiment.' },
      { type: 'fill', sentence: 'Funded by three governments, the project ___ international cooperation for its success.', answer: 'required', hint: 'The main clause continues after the participial phrase — what did the project require?', feedback: 'The participial phrase "Funded by three governments" modifies "the project." Main clause = "the project required..."' },
      { type: 'sentence-improve', question: 'Which sentence most effectively uses a participle phrase?', options: ['"The compound, which was discovered by accident, revolutionized medicine."', '"The compound discovered by accident revolutionized medicine."', '"The compound that had been discovered by accident then revolutionized medicine."', '"There was a compound and it was discovered by accident and it revolutionized medicine."'], answer: 1, feedback: '"The compound DISCOVERED BY ACCIDENT revolutionized medicine" — most concise. Participle phrases make writing tighter.' },
      { type: 'passage-vocab', passage: '[BLANK] in multiple peer-reviewed journals, the findings are now considered a cornerstone of modern neuroscience.', question: '[BLANK] is:', options: ['Publishing','Published','Having published','To publish'], answer: 1, feedback: 'PUBLISHED — past participle (passive): the findings were published (by others). "Publishing" would mean the findings published themselves.' },
    ],
  },

  inversion: {
    id: 'inversion', title: 'Inversion', subtitle: 'Formal emphasis structures', icon: '🔀', stage: 'tg2',
    explanation: {
      rule: 'Inversion places the auxiliary verb before the subject for EMPHASIS or after negative adverbials. Common in formal academic and TOEFL writing.',
      examples: ['Negative adverbial: "Never before has such data been collected."', 'Conditional: "Should the hypothesis prove correct, the theory must be revised." (= If the hypothesis should prove...)', '"Not only did the treatment reduce pain, but it also accelerated healing."'],
      tip: '"Not only... but also," "Rarely," "Seldom," "Never," "Hardly," "No sooner" — when these begin a clause, invert the subject and auxiliary.',
    },
    exercises: [
      { type: 'choose', question: '"___ has a species adapted so rapidly to environmental change."', options: ['"Never before a species has..."', '"Never before has a species..."', '"Never a species before has..."', '"Before never has a species..."'], answer: 1, feedback: '"NEVER BEFORE HAS a species..." — negative adverbial "Never before" triggers subject-auxiliary inversion.' },
      { type: 'choose', question: 'Formal conditional: "If the results are replicated, the theory will be confirmed." → Inverted form:', options: ['"Should the results be replicated, the theory will be confirmed."', '"Were the results replicated, the theory will be confirmed."', '"Had the results been replicated, the theory will have been confirmed."', '"If should the results be replicated..."'], answer: 0, feedback: '"SHOULD the results be replicated" = present/future conditional inversion. "Were" = hypothetical; "Had" = past perfect.' },
      { type: 'fill', sentence: 'Not only ___ the drug reduce inflammation, but it also showed antiviral properties.', answer: 'did', hint: '"Not only did/does/has [subject] [base verb]..."', feedback: 'NOT ONLY DID the drug reduce... — "Not only" triggers auxiliary inversion. Auxiliary (did) + subject (the drug).' },
      { type: 'sentence-improve', question: 'Which sentence uses inversion correctly for emphasis?', options: ['"Rarely scientists have observed this phenomenon."', '"Rarely have scientists observed this phenomenon."', '"Scientists have rarely observed this phenomenon."', '"Scientists rarely have observed this phenomenon."'], answer: 1, feedback: '"Rarely HAVE SCIENTISTS observed..." — auxiliary "have" moves before subject "scientists" after "Rarely."' },
      { type: 'passage-vocab', passage: '[BLANK] the research team analyzed the samples did they realize the contamination was systematic rather than random.', question: '[BLANK] should be:', options: ['When','Only when','Although','Because'], answer: 1, feedback: '"ONLY WHEN... did they realize" — "Only when" is a negative adverbial that triggers inversion in the main clause.' },
    ],
  },

  // ─── STAGE 3: ACADEMIC GRAMMAR ────────────────────────────────────────────
  academic_passive: {
    id: 'academic_passive', title: 'Academic Passive Voice', subtitle: 'When and how to use passive', icon: '⚗️', stage: 'tg3',
    explanation: {
      rule: 'Academic writing uses passive voice to: (1) focus on the action/result, not the doer; (2) maintain objectivity; (3) describe procedures and findings.',
      examples: ['Active: "We conducted three trials." → Passive: "Three trials were conducted."', '"The samples were analyzed using spectrometry."', '"It has been argued that climate policy requires global coordination."'],
      tip: 'Use passive when: the actor is unknown, unimportant, or obvious. Use active for clearer, stronger statements. Avoid passive with weak "to be" + past participle chains.',
    },
    exercises: [
      { type: 'choose', question: 'Which passive correctly describes a research procedure?', options: ['"We analyzed the samples."', '"The samples were analyzed using gas chromatography."', '"Somebody analyzed the samples."', '"Analysis was being done on the samples."'], answer: 1, feedback: '"The samples WERE ANALYZED using gas chromatography" — passive focuses on what was done (the procedure), not who did it.' },
      { type: 'choose', question: '"It ___ widely accepted that biodiversity loss poses a greater threat than previously recognized."', options: ['is','has been','was','will be'], answer: 1, feedback: 'HAS BEEN — present perfect passive "it has been argued/shown/accepted" is standard for established views in academic writing.' },
      { type: 'fill', sentence: 'The theory ___ originally proposed by Mendel but later refined by subsequent geneticists.', answer: 'was', hint: 'Simple past passive — single completed past action', feedback: 'WAS proposed — simple past passive. "Has been" would imply ongoing relevance to the present.' },
      { type: 'sentence-improve', question: 'Which sentence uses passive voice most appropriately for academic writing?', options: ['"People have argued that the policy failed."', '"It has been argued that the policy failed to address systemic inequality."', '"The policy, it was argued by some people, failed."', '"Arguing has been done that the policy failed."'], answer: 1, feedback: '"IT HAS BEEN ARGUED THAT..." — standard academic passive for reporting others\' views without attribution.' },
      { type: 'passage-vocab', passage: 'The ancient manuscripts [BLANK] in a controlled environment to prevent further deterioration of the fragile papyrus.', question: 'The passive construction [BLANK] should be:', options: ['are storing','are being stored','have stored','were store'], answer: 1, feedback: '"ARE BEING STORED" — present continuous passive = action in progress right now. Formation: am/is/are + being + past participle.' },
    ],
  },

  subjunctive: {
    id: 'subjunctive', title: 'Subjunctive Mood', subtitle: 'Hypothetical and formal demands', icon: '🌀', stage: 'tg3',
    explanation: {
      rule: 'The subjunctive expresses hypothetical, wished-for, or formally demanded states. In academic writing it appears after "suggest/recommend/require/insist + that" and in "if" conditionals.',
      examples: ['Formal demand: "The committee recommends that the trial BE conducted again." (not "is")', 'Hypothetical: "If the data WERE more comprehensive, the conclusions would be stronger."', '"It is essential that every participant SIGN the consent form." (not "signs")'],
      tip: 'After "suggest, recommend, require, insist, demand, propose + that" → use BASE VERB (no -s, no -ed). "It is crucial/essential/important + that" → same rule.',
    },
    exercises: [
      { type: 'choose', question: '"The board recommends that the proposal ___ reviewed by an independent panel."', options: ['is','was','be','being'], answer: 2, feedback: 'BE — subjunctive after "recommends that." Use base verb form with no auxiliary: recommend that X be done.' },
      { type: 'choose', question: '"If the temperature ___ to rise by 2°C, many coastal cities would face flooding."', options: ['is','was','were','will be'], answer: 2, feedback: 'WERE — hypothetical/unreal condition. "If + were" signals the condition is contrary to fact or unlikely.' },
      { type: 'fill', sentence: 'It is imperative that each researcher ___ their findings before the deadline. (submit)', answer: 'submit', hint: 'After "it is imperative/essential that..." → base verb, no -s', feedback: 'SUBMIT — not "submits." After "it is imperative/essential/crucial that," use the base verb (subjunctive).' },
      { type: 'sentence-improve', question: 'Which sentence correctly uses the subjunctive?', options: ['"The policy requires that all citizens registers to vote."', '"The policy requires that all citizens register to vote."', '"The policy requires that all citizens registered to vote."', '"The policy requires that all citizens are registering to vote."'], answer: 1, feedback: '"Requires that all citizens REGISTER" — base verb, no -s. Not "registers" or "registered."' },
      { type: 'passage-vocab', passage: 'The ethics committee insisted that the study [BLANK] redesigned to include a control group before any human trials could begin.', question: '[BLANK] should be:', options: ['is','was','be','being'], answer: 2, feedback: 'BE — subjunctive after "insisted that." insist/require/recommend + that + subject + BASE VERB.' },
    ],
  },

  modal_nuance: {
    id: 'modal_nuance', title: 'Modal Nuances', subtitle: 'Certainty, obligation, permission', icon: '🎛️', stage: 'tg3',
    explanation: {
      rule: 'Modals express different degrees of certainty and obligation. Choosing the right modal signals academic precision.',
      examples: ['Certainty: must (90%+) > should (70%) > may (50%) > might/could (30%)', 'Obligation: must > should > ought to > could', '"The anomaly may suggest a flaw in the methodology." (not "must" — too certain)'],
      tip: 'In academic writing, avoid absolute statements. Use "may," "might," "could" to hedge claims. Use "must" only for logical necessity, not social obligation in formal writing.',
    },
    exercises: [
      { type: 'choose', question: 'Academic hedging: "These preliminary findings ___ indicate a correlation between diet and cognition."', options: ['must','will','may','shall'], answer: 2, feedback: 'MAY — appropriate hedging for preliminary findings. "Must" would overclaim; "may" shows probability without certainty.' },
      { type: 'choose', question: '"Given the evidence, we conclude that the compound ___ be toxic at high doses."', options: ['might','must','could','should'], answer: 1, feedback: 'MUST — logical deduction from strong evidence. "Must be" = the only logical conclusion, not just a possibility.' },
      { type: 'fill', sentence: 'The study is limited by its small sample size, which ___ affect the generalizability of the results.', answer: 'could', hint: 'Possible limitation — not certain, but possible', feedback: 'COULD — expresses a real possibility of a problem without claiming it definitely affects results.' },
      { type: 'sentence-improve', question: 'Which sentence uses modal verbs with appropriate academic precision?', options: ['"The results will definitely prove our hypothesis."', '"The results might possibly suggest support for our hypothesis."', '"The results appear to support our hypothesis and may warrant further investigation."', '"The results must maybe indicate something important."'], answer: 2, feedback: '"Appear to support" (hedged claim) + "may warrant" (possibility) = academic precision. Avoid "definitely" and "must maybe."' },
      { type: 'passage-vocab', passage: 'The unusual readings [BLANK] indicate instrument error, or they [BLANK] reflect a genuine but previously undetected phenomenon.', question: 'The best modal pair is:', options: ['will / shall','must / might','could / could','shall / will'], answer: 2, feedback: 'COULD / COULD — both explanations are equally possible. Using the same modal for parallel alternatives shows balanced academic hedging.' },
    ],
  },

  tense_precision: {
    id: 'tense_precision', title: 'Tense Precision', subtitle: 'Academic tense conventions', icon: '📅', stage: 'tg3',
    explanation: {
      rule: 'Academic writing follows tense conventions: Present simple for general truths and describing findings. Past simple for completed research. Present perfect for linking past research to now.',
      examples: ['General truth: "Water boils at 100°C." (present simple)', 'Completed study: "Smith (2019) found that..."  (past simple)', '"Research HAS SHOWN that exercise improves mood." (present perfect — ongoing relevance)', 'Methodology: "Samples WERE collected from three sites." (past simple)'],
      tip: 'Literature review = past simple (Smith found...) OR present perfect (Studies have shown...). Describing tables/figures = present simple (Figure 1 shows...).',
    },
    exercises: [
      { type: 'choose', question: 'Describing a graph: "Figure 3 ___ a steady increase in global temperatures from 1960 to 2020."', options: ['showed','has shown','shows','had shown'], answer: 2, feedback: 'SHOWS — present simple for describing figures, charts, and tables in academic writing.' },
      { type: 'choose', question: 'Citing past research: "Brown and Lee (2018) ___ that caffeine enhances short-term memory."', options: ['find','have found','found','are finding'], answer: 2, feedback: 'FOUND — past simple for reporting a specific study\'s findings at a specific time.' },
      { type: 'fill', sentence: 'Over the past decade, researchers ___ increasingly focused on the role of gut microbiota in mental health. (focus)', answer: 'have become', hint: 'Action starting in the past and continuing to present — present perfect', feedback: 'HAVE BECOME — present perfect for a trend that started in the past and continues now.' },
      { type: 'sentence-improve', question: 'Which tense sequence is most appropriate for an academic literature review?', options: ['"Researchers find that X. Newton discovered this. Studies are showing Y."', '"Newton discovered that X (1687). Since then, researchers have consistently confirmed this relationship, and recent studies show its applications in modern physics."', '"Newton has discovered X. Researchers found this. Studies show Y."', '"Newton discovers X. Researchers had found this. Studies showed Y."'], answer: 1, feedback: 'Past simple (discovered) for historical fact + present perfect (have confirmed) for ongoing relevance + present (show) for current state.' },
      { type: 'passage-vocab', passage: 'Although Darwin [BLANK] the theory of natural selection in 1859, biologists [BLANK] still debating its precise mechanisms in extreme environments.', question: 'Best tense pair:', options: ['proposed / are','has proposed / were','proposes / are','proposed / are'], answer: 3, feedback: '"Darwin PROPOSED" (past, specific date) + "biologists ARE still debating" (present continuous, ongoing process).' },
    ],
  },

  subject_verb_agree: {
    id: 'subject_verb_agree', title: 'Subject-Verb Agreement', subtitle: 'Tricky agreement patterns', icon: '⚖️', stage: 'tg3',
    explanation: {
      rule: 'The verb must agree with the TRUE subject, not the nearest noun. Identify the subject, ignore prepositional phrases, and match singular/plural correctly.',
      examples: ['Tricky: "The quality of the water samples was poor." (subject = quality, not samples)', '"Either the director or the managers are responsible." (verb agrees with nearer subject)', '"The data suggests..." (data = Latin plural, but treated as singular in modern academic use)'],
      tip: 'Collective nouns (committee, team, government, data) are typically SINGULAR in academic writing. "The data shows" is now standard.',
    },
    exercises: [
      { type: 'choose', question: '"The number of endangered species ___ increasing each year."', options: ['are','were','is','have been'], answer: 2, feedback: '"The NUMBER of..." uses singular verb. Compare: "A NUMBER of species ARE..." (= several). "The number" → singular.' },
      { type: 'choose', question: '"Neither the hypothesis nor the experimental results ___ this claim."', options: ['supports','support','is supporting','has supported'], answer: 1, feedback: 'SUPPORT — with "neither...nor," the verb agrees with the NEARER subject ("results" = plural). "Neither A nor B" → B determines agreement.' },
      { type: 'fill', sentence: 'The committee ___ reached a unanimous decision regarding the proposed changes.', answer: 'has', hint: 'Committee = collective noun → singular in academic writing', feedback: 'HAS — collective nouns like committee, team, government take singular verbs in academic English.' },
      { type: 'sentence-improve', question: 'Which sentence has correct subject-verb agreement throughout?', options: ['"The findings of the study was published in Nature."', '"A variety of methods were used to collect the data."', '"Each of the participants were given a questionnaire."', '"The data are inconclusive and requires further testing."'], answer: 1, feedback: '"A VARIETY OF methods WERE used" — the subject "a variety of [plural noun]" takes a plural verb.' },
      { type: 'passage-vocab', passage: 'The series of experiments [BLANK] conducted over eighteen months [BLANK] yielded unexpected results that challenged established models.', question: 'Both blanks should contain:', options: ['were / have','was / has','were / was','was / were'], answer: 0, feedback: '"The series... WERE conducted" (series = plural here) "HAVE yielded" (present perfect for results still relevant). The prep phrase "over eighteen months" is not the subject.' },
    ],
  },

  // ─── STAGE 4: DISCOURSE MARKERS ──────────────────────────────────────────
  cause_effect: {
    id: 'cause_effect', title: 'Cause & Effect', subtitle: 'therefore, consequently, thus...', icon: '⚡', stage: 'tg4',
    explanation: {
      rule: 'Cause-effect markers link reasons to outcomes. Different markers suit different grammatical positions.',
      examples: ['Conjunction: "Temperatures rose, causing glaciers to melt."', 'Adverbial: "Temperatures rose. Consequently, glaciers melted."', 'Preposition: "Due to rising temperatures, glaciers melted."', '"As a result / Therefore / Thus / Hence" — begin new sentence or follow semicolon.'],
      tip: 'Sentence connectors (therefore, consequently) need a semicolon or period before them. "Because" and "since" are conjunctions — they connect clauses directly.',
    },
    exercises: [
      { type: 'choose', question: '"The pipeline burst; ___, thousands of liters of oil were released."', options: ['because','although','consequently','unless'], answer: 2, feedback: 'CONSEQUENTLY — used after semicolon to show result. "Because" is a conjunction, not a sentence connector.' },
      { type: 'choose', question: 'Which is punctuated correctly?', options: ['"The budget was cut therefore the project was cancelled."', '"The budget was cut; therefore, the project was cancelled."', '"The budget was cut, therefore, the project was cancelled."', '"The budget was cut therefore, the project was cancelled."'], answer: 1, feedback: 'Semicolon before "therefore" + comma after: "The budget was cut; therefore, the project was cancelled."' },
      { type: 'fill', sentence: '___ to increased urbanization, many natural habitats are being permanently destroyed.', answer: 'Due', hint: '"___ to [noun/noun phrase]" introduces a cause', feedback: 'DUE TO — preposition introducing a cause. Followed by a noun phrase, not a full clause. "Because of" is equivalent.' },
      { type: 'sentence-improve', question: 'Which sentence uses a cause-effect marker correctly?', options: ['"The ice caps are melting. Because rising CO₂ levels."', '"Rising CO₂ levels. Therefore the ice caps are melting."', '"Rising CO₂ levels have contributed to accelerated polar ice cap melting."', '"The ice caps are melting, therefore, because of CO₂."'], answer: 2, feedback: '"CONTRIBUTED TO" is a verb phrase that intrinsically expresses causation — precise and natural in academic writing.' },
      { type: 'passage-vocab', passage: 'The introduction of an invasive species fundamentally altered the ecosystem; [BLANK], several native species populations declined by more than 60%.', question: '[BLANK] should be:', options: ['however','although','as a result','in contrast'], answer: 2, feedback: 'AS A RESULT — after a semicolon, introducing the consequence. "However/although" would introduce contrast, not result.' },
    ],
  },

  concession_contrast: {
    id: 'concession_contrast', title: 'Concession & Contrast', subtitle: 'however, although, despite...', icon: '⚖️', stage: 'tg4',
    explanation: {
      rule: 'Concession acknowledges the opposing view before presenting your own. Contrast simply shows two different things. Both are essential for academic argument.',
      examples: ['Concession conjunction: "Although the study had limitations, its findings are significant."', 'Concession adverbial: "The results were positive. However, the sample size was insufficient."', '"Despite significant funding, the project failed to meet its targets."'],
      tip: '"Although/Even though/While/Whereas" — conjunctions (no semicolon needed). "However/Nevertheless/Nonetheless" — sentence connectors (use semicolon or period before).',
    },
    exercises: [
      { type: 'choose', question: '"___ the challenges, the research team completed the project on schedule."', options: ['Although','Despite','However','Nevertheless'], answer: 1, feedback: 'DESPITE — preposition followed by a NOUN PHRASE ("the challenges"). "Although" needs a full clause.' },
      { type: 'choose', question: '"The treatment was effective in young patients; ___, it showed limited efficacy in the elderly."', options: ['although','despite','however','because'], answer: 2, feedback: 'HOWEVER — sentence connector after semicolon, introducing contrast. "Although" is a conjunction and cannot follow a semicolon.' },
      { type: 'fill', sentence: '___ the two cities have similar populations, their economic structures differ significantly.', answer: 'Although', hint: 'Followed by a full clause — use a conjunction, not a preposition', feedback: 'ALTHOUGH (or While/Whereas) — conjunction connecting two clauses showing contrast.' },
      { type: 'sentence-improve', question: 'Which sentence correctly expresses academic concession?', options: ['"The study had limitations. But it was still useful."', '"Despite of the limitations, the study provided valuable insights."', '"Although the study had limitations, it provided valuable insights into consumer behavior."', '"The study had limitations, however, it was still useful."'], answer: 2, feedback: '"Despite OF" is wrong — use "despite" alone. Option 4 uses comma before "however" which is wrong. Option 2 is correct.' },
      { type: 'passage-vocab', passage: 'The new drug demonstrated promising results in phase one trials; [BLANK], regulators emphasized that larger-scale testing is necessary before any approval can be considered.', question: '[BLANK] should be:', options: ['therefore','as a result','nevertheless','furthermore'], answer: 2, feedback: 'NEVERTHELESS — despite the promising results (concession), more testing is required. Shows contrast with what was just said.' },
    ],
  },

  exemplification: {
    id: 'exemplification', title: 'Exemplification & Addition', subtitle: 'for example, furthermore, in addition...', icon: '📋', stage: 'tg4',
    explanation: {
      rule: 'Use exemplification markers to illustrate, and addition markers to build arguments. Precision in marker choice strengthens academic writing.',
      examples: ['"For example / For instance / such as" — introduce examples', '"Furthermore / Moreover / In addition / Additionally" — add a new, equally important point', '"In particular / Specifically / Notably" — draw attention to a specific aspect'],
      tip: '"Such as" and "including" are prepositions — followed by noun phrases, no comma after them. "For example" and "for instance" are often set off by commas.',
    },
    exercises: [
      { type: 'choose', question: 'Several factors contributed to the decline, ___ habitat destruction, pollution, and invasive species.', options: ['for example','such as','furthermore','in addition'], answer: 1, feedback: 'SUCH AS — preposition introducing a list of examples. No comma before "such as." "For example" is for a sentence, not a list mid-clause.' },
      { type: 'choose', question: '"The new policy reduces costs. ___, it improves workplace safety standards."', options: ['For example','Such as','Furthermore','Including'], answer: 2, feedback: 'FURTHERMORE — adds a separate, additional benefit. "For example" would mean the second sentence is an example of cost reduction, which it is not.' },
      { type: 'fill', sentence: 'The researcher identified several weaknesses in the methodology. ___, the control group was too small.', answer: 'Specifically', hint: 'Introduces a specific detail or example from a general statement', feedback: 'SPECIFICALLY (or In particular) — signals you are now detailing one specific aspect from the general statement before.' },
      { type: 'sentence-improve', question: 'Which uses exemplification markers most accurately?', options: ['"Pollution has many forms. For example air, water, and soil."', '"Pollution takes many forms, such as air pollution, water contamination, and soil degradation."', '"Pollution is bad. Furthermore, for example, it causes disease."', '"Pollution, for example, is bad in many ways."'], answer: 1, feedback: '"Pollution takes many forms, SUCH AS air pollution, water contamination, and soil degradation" — "such as" mid-clause, no comma before it.' },
      { type: 'passage-vocab', passage: 'Urbanization has produced numerous environmental challenges. [BLANK], cities generate significantly more heat than rural areas — a phenomenon known as the urban heat island effect.', question: '[BLANK] should be:', options: ['Furthermore','For instance','In addition','Nevertheless'], answer: 1, feedback: 'FOR INSTANCE — introduces a specific example of the general claim "numerous environmental challenges." Comma after "For instance."' },
    ],
  },

  summary_emphasis: {
    id: 'summary_emphasis', title: 'Summary & Emphasis', subtitle: 'in conclusion, notably, above all...', icon: '🎯', stage: 'tg4',
    explanation: {
      rule: 'Concluding markers summarize or signal importance. Emphasis markers highlight the most important point.',
      examples: ['"In conclusion / To summarize / Overall / In sum" — signal the end of an argument', '"Notably / Importantly / Crucially / Above all / Most significantly" — highlight key points', '"In other words / That is to say" — restate or clarify a point'],
      tip: 'TOEFL Writing: Avoid starting your conclusion with "In conclusion." Instead use "Overall," "Ultimately," or "Taken together, these points suggest..."',
    },
    exercises: [
      { type: 'choose', question: '"___, the evidence suggests that the policy has failed to achieve its primary objectives."', options: ['For example','Nevertheless','Overall','Furthermore'], answer: 2, feedback: 'OVERALL — summary marker that signals a concluding statement. Natural in academic conclusions without sounding mechanical.' },
      { type: 'choose', question: '"___, the discovery of penicillin transformed modern medicine more than any other single event."', options: ['In addition','For instance','Crucially','Nevertheless'], answer: 2, feedback: 'CRUCIALLY — emphasis marker. Signals this is the most important point being made.' },
      { type: 'fill', sentence: 'The data is consistent and the sample size is large. ___ ___ ___, the findings are reliable.', answer: 'In other words', hint: 'Three words that restate what was just said more simply', feedback: 'IN OTHER WORDS — restatement marker. Signals you are restating the previous point more clearly or simply.' },
      { type: 'sentence-improve', question: 'Which conclusion sentence is most academic?', options: ['"In conclusion, I have shown that X is important."', '"To sum it all up, X is really very important."', '"Taken together, these findings underscore the need for a fundamental revision of current policy."', '"So, basically, the evidence shows X is important."'], answer: 2, feedback: '"Taken together, these findings UNDERSCORE the need for..." — academic verb "underscore" + no first-person = formal academic register.' },
      { type: 'passage-vocab', passage: 'Despite centuries of debate, one point is beyond dispute: [BLANK], the development of agriculture was the single most transformative event in human history.', question: '[BLANK] should be:', options: ['However','For example','Arguably','Furthermore'], answer: 2, feedback: 'ARGUABLY — emphasis marker that hedges a strong claim. Common in TOEFL writing: "arguably the most important / significant / influential."' },
    ],
  },

  reference_chains: {
    id: 'reference_chains', title: 'Reference & Cohesion', subtitle: 'this, such, the former, the latter', icon: '🔗', stage: 'tg4',
    explanation: {
      rule: 'Cohesive devices link sentences and ideas: pronouns (it, they, this, these), demonstratives (this phenomenon, such factors), and reference phrases (the former, the latter, the above).',
      examples: ['"Deforestation accelerates climate change. This process..." (this = deforestation)', '"The former refers to X; the latter, to Y." (former = first mentioned; latter = last mentioned)', '"Such factors include..." (such = the factors just described)'],
      tip: '"This" and "these" must always have a clear antecedent. Avoid vague "this shows that..." — write "This finding shows that..." Specify what "this" refers to.',
    },
    exercises: [
      { type: 'choose', question: '"Researchers found a correlation between stress and illness. ___ relationship deserves further study."', options: ['A','This','Any','That there'], answer: 1, feedback: 'THIS — demonstrative adjective referring back to "a correlation between stress and illness." Clear, specific reference.' },
      { type: 'choose', question: '"The study examined two theories: behaviorism and cognitivism. The ___ focuses on mental processes, while the ___ emphasizes observable behavior."', options: ['former / latter','latter / former','first / next','latter / earlier'], answer: 1, feedback: 'LATTER (cognitivism, the last one mentioned) focuses on mental processes; FORMER (behaviorism, the first) emphasizes observable behavior.' },
      { type: 'fill', sentence: 'The experiment revealed unexpected results. ___ findings suggest that the original hypothesis must be revised.', answer: 'These', hint: 'Plural demonstrative pointing back to "results"', feedback: 'THESE — plural demonstrative referring to plural "results/findings." "This" would also work: "This finding suggests..."' },
      { type: 'sentence-improve', question: 'Which sentence demonstrates the best cohesive reference?', options: ['"It was interesting and showed something important."', '"This result confirms what we thought."', '"This anomalous result confirms the theoretical prediction and warrants replication."', '"These things we studied showed stuff."'], answer: 2, feedback: '"This ANOMALOUS RESULT" — specifies exactly what "this" refers to. Never leave "this/these" without a noun following it in formal writing.' },
      { type: 'passage-vocab', passage: 'The study identified two key risk factors: genetic predisposition and environmental exposure. [BLANK] can be mitigated through lifestyle interventions, whereas [BLANK] cannot currently be altered.', question: 'Best pair for [BLANK] / [BLANK]:', options: ['This / that','The former / the latter','It / they','Such / these'], answer: 1, feedback: 'THE FORMER (genetic predisposition, mentioned first) / THE LATTER (environmental exposure, mentioned last). Clear, formal reference.' },
    ],
  },

  // ─── STAGE 5: TOEFL GRAMMAR TRAPS ────────────────────────────────────────
  sv_agreement_traps: {
    id: 'sv_agreement_traps', title: 'Agreement Traps', subtitle: 'Don\'t be fooled by distance', icon: '🪤', stage: 'tg5',
    explanation: {
      rule: 'TOEFL tests agreement when words intervene between subject and verb. The verb must agree with the TRUE subject regardless of what appears nearby.',
      examples: ['"The impact of greenhouse gases on polar ecosystems IS severe." (subject = impact)', '"A range of methods WERE used." (a range of = several)', '"One of the studies SHOWS..." (subject = one, not studies)'],
      tip: '"One of the + plural noun" → singular verb. "A number of + plural noun" → plural verb. "The number of + plural noun" → singular verb.',
    },
    exercises: [
      { type: 'sentence-improve', question: 'Choose the sentence with correct subject-verb agreement:', original: 'The effect of rising temperatures on Arctic species are significant.', options: ['The effect of rising temperatures on Arctic species are significant.', 'The effect of rising temperatures on Arctic species is significant.', 'The effects of rising temperatures on Arctic species is significant.', 'Rising temperatures effect on Arctic species are significant.'], answer: 1, feedback: 'SUBJECT = "the effect" (singular) → IS. The prepositional phrase "of rising temperatures on Arctic species" is not the subject.' },
      { type: 'choose', question: '"One of the most pressing issues facing modern cities ___ traffic congestion."', options: ['are','were','is','have been'], answer: 2, feedback: 'IS — "one of + plural noun" → subject is "one" (singular). Never be distracted by the plural noun in the prepositional phrase.' },
      { type: 'fill', sentence: 'Neither the scientists nor the funding agency ___ willing to accept the results. (be)', answer: 'was', hint: '"Neither...nor" — verb agrees with nearer subject "the funding agency" (singular)', feedback: 'WAS — "neither X nor Y" → verb agrees with Y (nearer subject). Funding agency = singular → was.' },
      { type: 'sentence-improve', question: 'Identify the correct sentence:', original: 'The data collected from three separate studies suggest different conclusions.', options: ['The data collected from three separate studies suggest different conclusions.', 'The data collected from three separate studies suggests different conclusions.', 'The data, collected from three separate studies, suggest different conclusions.', 'The data that was collected from three separate studies suggest different conclusions.'], answer: 1, feedback: '"DATA suggests" — data is treated as singular in modern academic English. The participial phrase "collected from three studies" is not the subject.' },
      { type: 'passage-vocab', passage: 'A series of experiments conducted across multiple institutions [BLANK] revealed a consistent pattern in the neural responses of participants.', question: '[BLANK] should be (or is already correct as):', options: ['has','have','had','were'], answer: 0, feedback: '"A SERIES... HAS revealed" — "a series of" is a singular expression, like "a collection of" or "a group of."' },
    ],
  },

  parallel_structure: {
    id: 'parallel_structure', title: 'Parallel Structure', subtitle: 'Matching grammatical forms', icon: '⚡', stage: 'tg5',
    explanation: {
      rule: 'Items in a series or joined by "and/or/but" must be in the SAME grammatical form. Mixing forms is a common TOEFL error target.',
      examples: ['Wrong: "The study aimed to identify, measure, and the analysis of..."', 'Right: "The study aimed to identify, measure, and analyze..."', 'Wrong: "She was intelligent, creative, and had ambition."', 'Right: "She was intelligent, creative, and ambitious."'],
      tip: 'Check parallelism with correlative conjunctions: "both X and Y," "either X or Y," "not only X but also Y," "neither X nor Y." Both X and Y must be the same grammatical form.',
    },
    exercises: [
      { type: 'sentence-improve', question: 'Identify the sentence with correct parallel structure:', original: 'The researchers collected data, analyzed the results, and a report was written.', options: ['The researchers collected data, analyzed the results, and a report was written.', 'The researchers collected data, analyzed the results, and wrote a report.', 'The researchers collected data, analyzing the results, and wrote a report.', 'The researchers were collecting data, analyzed results, and report writing.'], answer: 1, feedback: '"Collected, analyzed, and WROTE" — all three are past tense verbs in parallel structure.' },
      { type: 'choose', question: '"Not only ___ the experiment fail to support the hypothesis, but it also raised new questions."', options: ['has','did','was','were'], answer: 1, feedback: 'DID — "Not only did..." triggers inversion AND requires parallel structure: "Not only did X..., but it also Y..."' },
      { type: 'fill', sentence: 'The new policy aims to reduce costs, improve efficiency, and ___ workplace safety. (enhance)', answer: 'enhance', hint: 'Third item in the list — must match "reduce" and "improve" (base verb form)', feedback: 'ENHANCE — all three must be base verbs: reduce, improve, and enhance. Adding "to" before enhance would also be acceptable.' },
      { type: 'sentence-improve', question: 'Which sentence has correct parallel structure?', original: 'The CEO described the merger as beneficial for shareholders, employees, and for strengthening the brand.', options: ['The CEO described the merger as beneficial for shareholders, employees, and for strengthening the brand.', 'The CEO described the merger as beneficial for shareholders, employees, and the brand.', 'The CEO described the merger as beneficial for shareholders, for employees, and strengthening the brand.', 'The CEO described it as beneficial for shareholders, for employees, and for strengthening the brand.'], answer: 1, feedback: '"Beneficial for shareholders, employees, and THE BRAND" — parallel noun phrases after "for." Option 3 mixes nouns and gerund.' },
      { type: 'passage-vocab', passage: 'The program was praised for its innovation, its inclusivity, and [BLANK].', question: '[BLANK] should be:', options: ['it was effective','effectiveness','its effectiveness','being effective'], answer: 2, feedback: '"Its EFFECTIVENESS" — parallel noun phrases: "its innovation, its inclusivity, and its effectiveness." Must match the structure of the first two items.' },
    ],
  },

  dangling_modifiers: {
    id: 'dangling_modifiers', title: 'Dangling Modifiers', subtitle: 'Make sure the subject matches', icon: '🪝', stage: 'tg5',
    explanation: {
      rule: 'A modifier (phrase or clause at the start of a sentence) must logically modify the SUBJECT of the main clause. If it doesn\'t, it "dangles."',
      examples: ['Wrong: "Having analyzed the data, the results were surprising." (The results didn\'t analyze data!)', 'Right: "Having analyzed the data, the researchers found surprising results."', 'Wrong: "Driving down the road, a deer appeared." (The deer wasn\'t driving!)', 'Right: "Driving down the road, I saw a deer appear."'],
      tip: 'After reading an opening modifier, ask: "Who is doing this?" The answer must be the subject of the main clause.',
    },
    exercises: [
      { type: 'sentence-improve', question: 'Fix the dangling modifier:', original: 'After reading the report, several concerns were raised.', options: ['After reading the report, several concerns were raised.', 'After the report was read, several concerns were raised.', 'After reading the report, the committee raised several concerns.', 'Several concerns, after reading the report, were raised.'], answer: 2, feedback: '"After reading the report, THE COMMITTEE raised several concerns." The committee read the report — so the committee must be the subject.' },
      { type: 'choose', question: 'Which sentence does NOT have a dangling modifier?', options: ['"Exhausted by the journey, the hotel room felt wonderful."', '"Having completed the survey, the data was entered into the database."', '"Trained as an engineer, she approached the problem methodically."', '"Written in haste, the reader could detect several errors."'], answer: 2, feedback: '"Trained as an engineer, SHE approached the problem" — SHE was trained. The subject matches the modifier.' },
      { type: 'fill', sentence: 'To qualify for the scholarship, ___ must demonstrate both financial need and academic excellence.', answer: 'applicants', hint: 'Who must qualify? The subject of "must demonstrate" should be the one who qualifies.', feedback: 'APPLICANTS — infinitive phrase "To qualify for the scholarship" implies someone who wants to qualify → that person (applicants) must be the subject.' },
      { type: 'sentence-improve', question: 'Which revision correctly fixes the dangling modifier?', original: 'By studying the migration patterns, the ecosystem was better understood.', options: ['By studying the migration patterns, the ecosystem was better understood.', 'By studying the migration patterns, researchers better understood the ecosystem.', 'The ecosystem, by studying the migration patterns, was better understood.', 'Migration patterns, by being studied, better understood the ecosystem.'], answer: 1, feedback: '"By studying..., RESEARCHERS better understood the ecosystem." Researchers did the studying — so they must be the subject.' },
      { type: 'passage-vocab', passage: '[BLANK] extensive fieldwork in the Amazon Basin, the research team published a landmark study on previously undocumented species.', question: '[BLANK] should be:', options: ['After conducting','Having been conducted','The fieldwork of conducting','Conducted after'], answer: 0, feedback: '"After CONDUCTING extensive fieldwork, THE RESEARCH TEAM published..." — the research team conducted the fieldwork, so they are the correct subject.' },
    ],
  },

  redundancy: {
    id: 'redundancy', title: 'Redundancy & Wordiness', subtitle: 'Say more with less', icon: '✂️', stage: 'tg5',
    explanation: {
      rule: 'Academic writing is PRECISE and CONCISE. TOEFL tests the ability to identify unnecessary repetition and wordy phrases.',
      examples: ['Redundant: "the end result" (results are by definition at the end)', '"advance planning" (planning is by definition done in advance)', '"completely eliminate" (eliminate already means completely remove)', 'Wordy: "due to the fact that" → "because"', '"in the event that" → "if"'],
      tip: 'Common redundancies: "past history," "unexpected surprise," "new innovation," "currently existing," "revert back," "very unique," "consensus of opinion."',
    },
    exercises: [
      { type: 'sentence-improve', question: 'Identify the REDUNDANT sentence:', original: 'The scientists made a new, novel discovery that had never been discovered before.', options: ['The scientists made a new, novel discovery that had never been discovered before.', 'The scientists made a novel discovery.', 'The scientists discovered something entirely new and novel.', 'A novel and new discovery was made by the scientists.'], answer: 1, feedback: '"The scientists made a NOVEL DISCOVERY." "New" and "novel" mean the same thing; "had never been discovered before" restates "discovery."' },
      { type: 'choose', question: 'Which phrase is REDUNDANT?', options: ['"final conclusion"','unexpected result','significant finding','novel approach'], answer: 0, feedback: '"FINAL CONCLUSION" — conclusions are by definition final. This is redundancy. Compare: "significant finding" is not redundant.' },
      { type: 'fill', sentence: 'Replace "due to the fact that" with a single word: "The experiment was abandoned ___ the equipment failed."', answer: 'because', hint: 'A single conjunction meaning the same thing', feedback: 'BECAUSE — always prefer "because" over "due to the fact that" in academic writing.' },
      { type: 'sentence-improve', question: 'Which sentence is most concise without losing meaning?', original: 'It is absolutely essential and necessary that all participants must give their consent.', options: ['It is absolutely essential and necessary that all participants must give their consent.', 'All participants must give their consent.', 'It is necessary for all participants to give their consent in all cases.', 'All participants must necessarily and essentially give their mandatory consent.'], answer: 1, feedback: '"All participants must give their consent" — removes "absolutely essential and necessary" (redundant trio) and "must... must" repetition.' },
      { type: 'passage-vocab', passage: 'The committee reached a final [BLANK] after weeks of debate, agreeing that the proposal should be tabled until further research was available.', question: 'The word [BLANK] makes this phrase redundant. It is:', options: ['decision','consensus','conclusion','result'], answer: 1, feedback: '"Final CONSENSUS" — consensus already means final agreement. "Consensus of opinion" is similarly redundant.' },
    ],
  },

  logical_predicate: {
    id: 'logical_predicate', title: 'Logical Predicates', subtitle: 'Faulty predication & comparisons', icon: '🧠', stage: 'tg5',
    explanation: {
      rule: 'Faulty predication occurs when the subject and predicate don\'t logically match. Illogical comparisons compare incomparable things.',
      examples: ['Faulty: "The purpose of the study was examined carefully." (Purposes are not examined; the study is.)', 'Better: "The study\'s purpose was stated clearly."', 'Illogical comparison: "The population of China is larger than India." (Comparing population to country!)', 'Correct: "The population of China is larger than THAT OF India."'],
      tip: 'Check comparisons: you must compare like to like. Use "that of" (singular) or "those of" (plural) to avoid comparing unlike things.',
    },
    exercises: [
      { type: 'sentence-improve', question: 'Fix the faulty predication:', original: 'The reason for the policy\'s failure was because funding was cut.', options: ['The reason for the policy\'s failure was because funding was cut.', 'The reason for the policy\'s failure was that funding was cut.', 'The reason for the policy\'s failure was due to funding was cut.', 'The policy failed reason was because funding was cut.'], answer: 1, feedback: '"The reason... WAS THAT funding was cut." "The reason was because" is faulty — reasons are not "because"; they are "that." Never use "reason is because."' },
      { type: 'choose', question: '"The GDP of Germany is larger than ___."', options: ['"...France."', '"...that of France."', '"...France\'s one."', '"...Frances\' GDP."'], answer: 1, feedback: '"THAT OF France" — you must compare Germany\'s GDP to France\'s GDP, not to France (the country). "That of" refers back to "GDP."' },
      { type: 'fill', sentence: 'The temperatures in the Arctic are now significantly higher than ___ recorded in the 1950s.', answer: 'those', hint: 'Referring back to plural "temperatures" — use "those of" to compare like with like', feedback: 'THOSE — "higher than THOSE recorded in the 1950s." "Those" refers back to "temperatures" to ensure a valid comparison.' },
      { type: 'sentence-improve', question: 'Which sentence avoids faulty predication?', options: ['"The function of the amygdala controls fear responses."', '"The amygdala\'s function is because it controls fear responses."', '"The amygdala controls fear responses and other emotional reactions."', '"The reason why the amygdala is important is because it controls fear."'], answer: 2, feedback: '"The amygdala CONTROLS fear responses" — direct, logical subject-verb-object. Avoids the faulty "function controls" construction.' },
      { type: 'passage-vocab', passage: 'The life expectancy in Japan is significantly higher than [BLANK] in most other developed nations, a difference attributed to diet and healthcare quality.', question: '[BLANK] should be:', options: ['it','that','those','them'], answer: 1, feedback: '"Higher than THAT in most other developed nations" — "that" refers back to singular "life expectancy." Compare life expectancy to life expectancy, not to nations.' },
    ],
  },

};
