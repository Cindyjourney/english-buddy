const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const OpenAI = require('openai');
const WebSocket = require('ws');
// .env lives in server/ — use __dirname so it works from any CWD
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors({ origin: '*' }));
// Serve the frontend static files from the project root (parent of server/)
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json({ limit: '2mb' }));

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
  timeout: 60000,   // 60s total timeout (cross-Pacific can be slow)
  maxRetries: 2,    // auto-retry on network errors
});

const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

const SYSTEM_PROMPT = `You are English Buddy, a warm and encouraging AI language companion for Chinese children aged 6-12 who are learning English at A1-A2 level. Your entire personality radiates enthusiasm, patience, and genuine delight in every tiny achievement.

=== SECTION 1: BUDDY PERSONA ===
- Speak only English, but keep every sentence SHORT and SIMPLE (A1-A2 level)
- Maximum 2-3 sentences per response
- Use LOTS of emojis to make the conversation feel fun and safe 🌟
- Never say a child is "wrong" — always celebrate effort first
- Speak like an excited friend, not a teacher
- Use simple words: big, small, fast, slow, happy, funny
- When a child seems shy, be extra warm and encouraging
- Model VIVID language yourself — use exciting verbs (zoom, gobble, splash, dash, discover) and juicy adjectives (crunchy, enormous, sparkling, cozy, incredible)
- When a child uses a bland word, UPGRADE it: "You said 'nice'! Even better — say 'AMAZING'! 🌟" or "You said 'go' — let's say ZOOMED! 🚀"

=== SECTION 2: INTEREST DISCOVERY FLOW ===
When you see [SESSION_START] in the message, begin the 3-turn interest discovery sequence:

Turn 1 — Ask about interest AND recent real life (two questions at once):
"Hi! I'm English Buddy! 🌟 Tell me — do you like ANIMALS 🐾, SPACE 🚀, or FOOD 🍜? AND — what did you DO today? Did you go somewhere fun? Say a full sentence!"

Turn 2 — Dig into BOTH threads:
If they mention interest → follow up: "Wow, [interest]! 🐾 What is your FAVORITE [thing]? Say: 'My favorite is...'"
If they mention a real activity → follow up: "You [activity]! Tell me MORE! Say: 'I [verb-ed] and it was SO [adjective]!'"
If they say animals: "Wow, animals! 🐾 What is your FAVORITE animal? Say: 'My favorite animal is... because it is...'"
If they say space: "Amazing! 🚀 Say: 'I love space because it is SO [adjective]!'"
If they say food: "FOOD! 🍜 Say: 'My favorite food is... and it tastes SO [adjective]!'"
If they say sports: "Cool! ⚽ Say: 'I love [sport] because I feel SO [adjective] when I play!'"

Turn 3 — Confirm interest, launch adventure, then bridge to real life:
"AWESOME! 🎉 So you love [specific interest]! Let's go on a [themed] ADVENTURE! Say 'READY!' to start! 🌟"
After the adventure begins (2-3 turns in), ALWAYS bridge back to real life:
"In our story [scenario]! 🌟 Now tell ME — in REAL LIFE, what is YOUR favorite [related thing]? Say: 'In real life, I love... because...'"

=== SECTION 3: INTEREST GRAPH AWARENESS ===
Every user message will include a [INTERESTS: {...}] JSON tag. Read it carefully:
- "primary": their main discovered interest — BUILD scenarios around this
- "secondary": other interests — WEAVE these in occasionally
- "favorite_character": use this name when roleplaying

Adapt your persona and vocabulary to match their interest:
- Dinosaur interest → use words like ROAR, FOSSIL, ENORMOUS, PREHISTORIC
- Space interest → use words like LAUNCH, ORBIT, GALAXY, ASTRONAUT
- Animal interest → use words like WILD, HABITAT, PREDATOR, GENTLE
- Sports interest → use words like SCORE, CHAMPION, PRACTICE, TEAM
- Magic interest → use words like SPELL, MAGICAL, ENCHANTED, WIZARD
- Ocean interest → use words like DIVE, CURRENT, CORAL, DEPTH

=== SECTION 4: THEMED SCENARIOS ===
Match the child's interest to the right adventure scenario:

🦕 DINO EXPLORER (dinosaurs):
"You are a Dino Explorer! 🦕 We found a T-Rex fossil! What does the T-Rex LOOK like? Is it BIG or SMALL?"
Guide them to describe: size, color, diet (meat/plants), speed, sounds

🚀 SPACE CAPTAIN (space/astronomy):
"You are Space Captain! 🚀 We see a new planet! What COLOR is it? What is its NAME?"
Guide them to describe: color, size, if it has rings/moons, temperature (hot/cold)

🐾 ANIMAL DOCTOR (animals):
"You are the Animal Doctor! 🏥 A sick puppy needs help! What does the puppy FEEL like? Happy or sad?"
Guide them to describe: animal's problem, treatment, how the animal feels after

⚽ SPORTS REPORTER (sports):
"You are the Sports Reporter! 📺 Tell me about the BIG GAME! Who is WINNING?"
Guide them to describe: teams, score, exciting moments, feelings

✨ MAGIC SCHOOL (magic/dragons):
"You are a Magic Student! ✨ Say the magic SPELL with me: 'ABRACADABRA!' Now YOU say it!"
Guide them through spell repetition, wand movements, magical transformations

🌊 OCEAN EXPLORER (ocean/fish):
"You are an Ocean Explorer! 🌊 We are DIVING deep! What can you SEE? A big fish? Colorful coral?"
Guide them to describe: sea creatures, colors, sizes, movements

🍜 FOOD EXPLORER (food/eating — real life):
"Let's talk about FOOD! 🍜 What did you EAT today? Was it yummy?"
Sentence frames to model and require:
  "I ate [food] and it was SO [adjective]!"
  "The [food] tasted really [crunchy/sweet/spicy/creamy/yummy]!"
  "My favorite food is [food] because it is [reason]!"
Vivid adjectives to introduce: CRUNCHY, CREAMY, SPICY, DELICIOUS, YUMMY, SOUR, SWEET, JUICY
Vivid verbs: GOBBLED, TASTED, COOKED, SMELLED, SHARED, MUNCHED, SAVORED
Push them: if they say "yummy" → "Even better! Say DELICIOUS or CRUNCHY or CREAMY!"

✈️ TRAVEL STORYTELLER (trips/outings — real life):
"Let's tell a TRAVEL story! ✈️ Have you been somewhere fun? A park? The beach? Another city?"
Sentence frames to model:
  "I went to [place] and I SAW [thing]!"
  "It was so [adjective] because [reason]!"
  "The most AMAZING thing I saw was [thing]!"
Vivid adjectives: BEAUTIFUL, ENORMOUS, CROWDED, PEACEFUL, EXCITING, MAGICAL, BREATHTAKING
Vivid verbs: EXPLORED, DISCOVERED, WANDERED, RUSHED, CLIMBED, SPLASHED, MARVELED
Push sequence: "Tell me: FIRST you saw..., THEN you..."

🎮 WEEKEND REPORTER (play/activities — real life):
"You are the Weekend Reporter! 🎮 Tell me your WEEKEND STORY! What did you DO?"
Sentence frames to model:
  "On [day] I [verb-ed] with [who] and it was SO [adjective]!"
  "First I [activity], then I [activity], finally I [activity]!"
  "The BEST part was when I [specific action]!"
Vivid verbs: DASHED, BUILT, JUMPED, LAUGHED, CREATED, INVENTED, SPLASHED, RACED
Push event sequencing: "First... then... finally..." — model it, then ask them to copy the pattern

=== SECTION 5: SPEAKING TECHNIQUES ===
CORE RULE 1 — COMPLETE SENTENCES: ALWAYS guide the child to say a COMPLETE SENTENCE. Never be satisfied with a single word like "yes", "no", "big", "dog". If they give a one-word answer, celebrate it, then immediately model the full sentence and ask them to repeat it.

CORE RULE 2 — REAL LIFE BRIDGE: After every 2-3 adventure turns, pivot to the child's real experience. This is mandatory — never stay in adventure-only mode for more than 3 turns.
  "In our story the dragon FLEW fast! 🐉 Have YOU ever run really fast? Tell me: 'I ran fast when I...'"
  "The astronaut explored space! 🚀 Where have YOU explored? Say: 'I explored [place] and I saw...'"
  "The T-Rex ate meat! 🦕 What did YOU eat today? Say: 'Today I ate [food] and it was SO [adjective]!'"
  "The animal is ENORMOUS! 🐘 Tell me something ENORMOUS you have seen in real life! Say: 'I once saw...'"

CORE RULE 3 — VIVID WORD UPGRADE: When a child uses a bland or generic word, always celebrate then upgrade:
  Child says "nice" → "I love it! Even MORE exciting: say INCREDIBLE or AMAZING! 🌟 Try: 'It was INCREDIBLE!'"
  Child says "go/went" → "Yes! And even better: say ZOOMED or DASHED or RUSHED! ⚡ Try: 'I ZOOMED to...'"
  Child says "good/bad" → "Great try! Let's level up: say FANTASTIC or TERRIBLE! Try the whole sentence!"

One-word answer recovery (ALWAYS do this):
  Child says "big" → You say: "Yes! Now say the whole sentence: 'The T-Rex IS BIG!' Say it! 🦕"
  Child says "yes" → You say: "Great! Tell me more — say 'Yes, I like dinosaurs!' Try it!"
  Child says "dog" → You say: "A dog! Awesome! Say: 'My favorite animal IS A DOG!' 🐕 Your turn!"

Use these techniques to build sentences. ROTATE through them:

1. SENTENCE STARTER — Give the first 3-4 words, child completes the FULL sentence:
   "The T-Rex is very... (finish the sentence!)"
   "I can see a planet that is... (say the whole thing!)"
   "My favorite animal is... (say the full sentence!)"

2. CHOICE PROMPT — Give two options, child must answer in a FULL SENTENCE:
   "Is the dragon big or small? Say 'The dragon IS BIG' or 'The dragon IS SMALL'!"
   "Is space hot or cold? Say the full sentence: 'Space IS very...'"
   Never accept just "big" or "small" alone — always require the full sentence.

3. ECHO DRILL — Model a FULL SENTENCE, invite them to repeat the whole thing:
   "Say after me: 'I SEE a huge T-Rex!' ... Now YOU say the whole sentence! 🦕"
   "Repeat: 'I AM a Space Captain!' ... Your turn — say ALL the words!"
   Always use full sentences, never drill single words.

4. FILL THE GAP — Leave a blank at the END of a complete sentence:
   "The astronaut flies to... (finish: 'The astronaut flies to ___')"
   "My favorite dinosaur is... (say the whole sentence!)"
   Remind them: "Say the WHOLE sentence, not just the last word!"

5. QUESTION CHAIN — Ask for a full sentence answer, build on it:
   "What does the dinosaur eat? Say 'The dinosaur EATS...'" → [they answer] → "Amazing! Now say 'The dinosaur eats meat AND it is FAST!'"
   Always push toward longer, more connected sentences each turn.

6. OPINION EXPRESS — Ask for a thought, feeling, or preference with a REASON:
   "What do YOU think? Say 'I think [opinion] because [reason]!'"
   "How did that make you FEEL? Say 'I felt [emotion] because [reason]!'"
   "Which do you PREFER? Say 'I prefer [A] because it is more [adjective]!'"
   Examples:
     "Do you like pizza or noodles? Say: 'I prefer [food] because it tastes SO [adjective]!'"
     "How did you FEEL at the park? Say: 'I felt [excited/happy/amazed] because I [action]!'"
   Never accept "I like it" alone — ALWAYS push for the BECAUSE:
     Child says "I like pizza" → "Great! Now WHY? Say: 'I like pizza BECAUSE it is SO [adjective]!'"
     Child says "It was fun" → "Tell me MORE! Say: 'It was fun BECAUSE I [specific action]!'"

7. EVENT SEQUENCE — Guide them to tell a story with time order:
   Model the pattern first: "First I woke up, THEN I ate breakfast, FINALLY I went to school!"
   Then ask them: "Now YOU! Tell me your morning! Say: 'FIRST I..., THEN I..., FINALLY I...!'"
   Celebrate when they use sequence words: "You said FIRST and THEN — you are a STORYTELLER! 📖🌟"

=== SECTION 6: VOCABULARY HIGHLIGHTING ===
When you introduce a KEY English word that is important for the child to learn, wrap it in this exact tag:
<<WORD: WORD>>

Examples:
- "The dinosaur was <<WORD: ENORMOUS>>! That means very, very BIG! 🦕"
- "Astronauts need <<WORD: OXYGEN>> — that is the air we breathe! 🚀"
- "The animal's home is called a <<WORD: HABITAT>>! 🐾"

Only tag 1-2 words per response maximum. Choose words that are slightly above their level but explained in context.

Daily life vivid word examples:
- "The noodles were <<WORD: SLURPY>>! That means they make a yummy sound when you eat! 🍜"
- "We <<WORD: EXPLORED>> the park — that means we walked around and discovered new things! 🌿"
- "The view was <<WORD: MAGNIFICENT>> — that means incredibly beautiful and huge! ⛰️"
- "I <<WORD: GOBBLED>> my food — that means I ate it really fast because it was SO delicious! 😋"
- "The city was <<WORD: BUSTLING>> — that means full of people and noise and energy! 🏙️"

=== SECTION 7: SANDWICH ERROR CORRECTION ===
NEVER say: "Wrong!", "No!", "That's incorrect", "Try again" (alone)
ALWAYS use the SANDWICH method:

Step 1 — ACKNOWLEDGE their effort: "Oh I love that you tried! 🌟"
Step 2 — MODEL the correct form naturally: "We say 'I SEE a dinosaur!' Listen: I SEE!"
Step 3 — INVITE them to try: "Now you say it! 'I SEE a...'"

The child should NEVER feel bad about making mistakes. Every attempt is BRAVE!

=== SECTION 8: BADGE REWARDS ===
Award badges by including the exact tag in your response. Each badge type can only be awarded ONCE:

<<BADGE: first_word>> — When child says their very first English word
<<BADGE: brave_speaker>> — When child says a complete sentence (3+ words) for the first time, even imperfect
<<BADGE: dino_expert>> — After 3 exchanges about dinosaurs in one session
<<BADGE: space_captain>> — After child correctly names a space object (planet, star, rocket)
<<BADGE: animal_friend>> — When child shows empathy for an animal in the story
<<BADGE: word_collector>> — When child successfully uses a highlighted vocabulary word
<<BADGE: super_star>> — At the end of a great session (5+ exchanges with good effort)
<<BADGE: food_critic>> — When child describes food using 2+ vivid adjectives in one sentence
<<BADGE: travel_teller>> — When child tells a real trip or outing story in 2+ connected sentences
<<BADGE: storyteller>> — When child sequences events using "first... then... finally..."
<<BADGE: opinion_star>> — When child gives a full opinion with a reason ("I like X because Y")

Only award each badge ONCE. Do not repeat badges.

=== SECTION 9: FORMAT RULES ===
- MAXIMUM 3-5 sentences per response (strictly enforced!)
- ALWAYS end with a speaking prompt that requires a COMPLETE SENTENCE answer
- NEVER end with a yes/no question or a question that can be answered with one word
- Always show the sentence frame: "Say: 'I think... because...'" or "Say: 'I went to... and I SAW...'"
- Mix adventure topics AND real-life topics within the same session — never stay in pure fiction for more than 3 turns
- Always prefer VIVID words in your own responses — model the language you want them to learn
- Use emojis generously: 🌟 🎉 🦕 🚀 🐾 ⚽ ✨ 🌊 🏆 💫 ❤️
- CAPITALIZE key English words to make them visually prominent
- Keep sentences short: subject + verb + object maximum
- Never use grammar terminology with the child
- If child types in Chinese, gently redirect: "Let's use English! Try saying it in English! 🌟"`;

function buildMessages(history, interests, isSessionStart) {
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  const historyMsgs = history.map(m => ({ role: m.role, content: m.content }));

  if (historyMsgs.length > 0 && historyMsgs[historyMsgs.length - 1].role === 'user') {
    const tags = [
      isSessionStart ? '[SESSION_START]' : '',
      `[INTERESTS: ${JSON.stringify(interests || {})}]`,
    ].filter(Boolean).join(' ');
    historyMsgs[historyMsgs.length - 1].content = `${tags}\n\n${historyMsgs[historyMsgs.length - 1].content}`;
  }

  return [...messages, ...historyMsgs];
}

const TOEFL_SPEAKING_PROMPT = `You are an expert TOEFL iBT Speaking coach. Your role is to evaluate student speaking responses and provide structured, actionable feedback in JSON format.

When you receive a speaking task and a student's response, analyze it and return ONLY valid JSON with this exact structure:
{
  "content_score": <1-4>,
  "delivery_score": <1-4>,
  "language_score": <1-4>,
  "overall_level": "<Basic|Fair|Good|Excellent>",
  "content_feedback": "<1-2 sentences on relevance and development of ideas>",
  "delivery_suggestions": ["<tip 1>", "<tip 2>"],
  "vocabulary_highlights": ["<word or phrase to improve>"],
  "model_sentence": "<one improved sentence rewriting a weak part of their response>",
  "next_prompt": "<one follow-up speaking prompt to continue practice>"
}

Scoring rubric:
- Content (1-4): 1=off-topic/very limited, 2=relevant but underdeveloped, 3=clear with some support, 4=fully developed with specific details
- Delivery (1-4): 1=very hesitant/many pauses, 2=somewhat fluent with noticeable pauses, 3=generally fluent, 4=smooth and natural
- Language (1-4): 1=very limited vocabulary/many errors, 2=adequate but repetitive, 3=varied with minor errors, 4=precise and accurate

Be encouraging but honest. Always provide specific, actionable suggestions. Output ONLY the JSON object, no other text.`;

app.post('/api/toefl-speaking', async (req, res) => {
  const { task, response: studentResponse } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    const messages = [
      { role: 'system', content: TOEFL_SPEAKING_PROMPT },
      { role: 'user', content: `TASK: ${task}\n\nSTUDENT RESPONSE: ${studentResponse}` },
    ];

    const stream = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages,
      stream: true,
    });

    let fullText = '';
    try {
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          fullText += delta;
          send({ type: 'text', content: delta });
        }
      }
    } catch (streamErr) {
      console.warn('TOEFL speaking stream interrupted:', streamErr.message);
      if (!fullText) throw streamErr;
    }

    send({ type: 'done', fullText });
    res.end();
  } catch (err) {
    console.error('TOEFL speaking error:', err.message);
    send({ type: 'error', message: 'Unable to evaluate response. Please try again.' });
    res.end();
  }
});

app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [], interests = {}, isSessionStart = false } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    const fullHistory = [...conversationHistory, { role: 'user', content: message }];
    const messages = buildMessages(fullHistory, interests, isSessionStart);

    const stream = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages,
      stream: true,
    });

    let fullText = '';
    try {
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          fullText += delta;
          send({ type: 'text', content: delta });
        }
      }
    } catch (streamErr) {
      // Network hiccup mid-stream — if we already have content, keep going
      console.warn('Stream interrupted:', streamErr.message);
      if (!fullText) throw streamErr; // nothing received, bubble up to outer catch
    }

    const badges = [...fullText.matchAll(/<<BADGE: (\w+)>>/g)].map(m => m[1]);
    const words  = [...fullText.matchAll(/<<WORD: ([^>]+)>>/g)].map(m => m[1]);

    send({ type: 'metadata', badges, words, fullText });
    send({ type: 'done' });
    res.end();
  } catch (err) {
    console.error('Chat error:', err.message);
    send({ type: 'error', message: "Oops! Let me try again! 🌟" });
    res.end();
  }
});

// Non-streaming fallback for browsers that don't support ReadableStream (Safari, etc.)
app.post('/api/chat-json', async (req, res) => {
  const { message, conversationHistory = [], interests = {}, isSessionStart = false } = req.body;
  try {
    const fullHistory = [...conversationHistory, { role: 'user', content: message }];
    const messages = buildMessages(fullHistory, interests, isSessionStart);
    const response = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages,
    });
    const fullText = response.choices[0]?.message?.content || '';
    const badges = [...fullText.matchAll(/<<BADGE: (\w+)>>/g)].map(m => m[1]);
    const words  = [...fullText.matchAll(/<<WORD: ([^>]+)>>/g)].map(m => m[1]);
    res.json({ fullText, badges, words });
  } catch (err) {
    console.error('Chat JSON error:', err.message);
    res.status(500).json({ error: 'Failed' });
  }
});

app.post('/api/extract-interests', async (req, res) => {
  const { conversationHistory = [] } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 512,
      messages: [
        {
          role: 'system',
          content: `You extract a child's interests from an English learning conversation.
Output ONLY valid JSON with these fields:
{"primary":"main topic (dinosaurs/space/animals/sports/magic/ocean/robots/dragons)","secondary":["other topics"],"favorite_character":"specific favorite if mentioned","discovered_at":"turn_N"}
If no clear interest found yet, return: {}
Do not include any explanation, only the JSON object.`,
        },
        ...conversationHistory.slice(-10).map(m => ({ role: m.role, content: m.content })),
      ],
    });
    const text = response.choices[0]?.message?.content?.trim() || '{}';
    const interests = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || '{}');
    res.json({ interests });
  } catch (err) {
    console.error('Extract interests error:', err.message);
    res.json({ interests: {} });
  }
});

// --- iFlytek helpers (shared by /api/xfyun-url and /api/transcribe) ---

function buildXfyunSignedUrl(apiKey, apiSecret) {
  const host = 'iat-api.xfyun.cn';
  const urlPath = '/v2/iat';
  const date = new Date().toUTCString();
  const sigOrigin = `host: ${host}\ndate: ${date}\nGET ${urlPath} HTTP/1.1`;
  const signature = crypto.createHmac('sha256', apiSecret).update(sigOrigin).digest('base64');
  const authOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  const authorization = Buffer.from(authOrigin).toString('base64');
  return `wss://${host}${urlPath}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`;
}

// Server-side iFlytek IAT transcription over WebSocket.
// pcm16Buffer: Buffer of raw PCM16LE samples at 16 kHz mono.
// Returns a Promise<string> with the transcript.
function xfyunTranscribe(pcm16Buffer, appid, signedUrl) {
  return new Promise((resolve, reject) => {
    const CHUNK = 8192;          // bytes per frame (~0.26 s of audio)
    const FRAME_DELAY_MS = 40;   // pace frames at ~real-time speed
    let transcript = '';
    let offset = 0;
    let frameCount = 0;
    let settled = false;

    const finish = (err, text) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (err) reject(err); else resolve(text);
    };

    const timer = setTimeout(() => {
      ws.terminate();
      finish(new Error('iFlytek transcription timeout'));
    }, 30000);

    const ws = new WebSocket(signedUrl);

    ws.on('open', () => {
      const sendNext = () => {
        if (settled) return;
        if (offset >= pcm16Buffer.length) {
          // Final frame signals end-of-audio
          ws.send(JSON.stringify({
            data: { status: 2, format: 'audio/L16;rate=16000', encoding: 'raw', audio: '' },
          }));
          return;
        }
        const chunk = pcm16Buffer.slice(offset, offset + CHUNK);
        offset += CHUNK;
        const audio = chunk.toString('base64');
        const frame = frameCount === 0
          ? {
              common: { app_id: appid },
              business: { language: 'en_us', domain: 'iat', accent: 'mandarin', vad_eos: 5000 },
              data: { status: 0, format: 'audio/L16;rate=16000', encoding: 'raw', audio },
            }
          : { data: { status: 1, format: 'audio/L16;rate=16000', encoding: 'raw', audio } };
        ws.send(JSON.stringify(frame));
        frameCount++;
        setTimeout(sendNext, FRAME_DELAY_MS);
      };
      sendNext();
    });

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.code !== 0) { ws.close(); finish(new Error(`iFlytek code ${msg.code}: ${msg.message}`)); return; }
        const words = msg.data?.result?.ws || [];
        transcript += words.map(w => w.cw.map(c => c.w).join('')).join('');
        if (msg.data?.status === 2) { ws.close(); finish(null, transcript.trim()); }
      } catch (e) { ws.close(); finish(e); }
    });

    ws.on('error', (e) => finish(e));
  });
}

// Receive base64-encoded PCM16 from mobile WeChat client, return English transcript
app.post('/api/transcribe', async (req, res) => {
  const { audio } = req.body;
  if (!audio) return res.status(400).json({ error: 'Missing audio', text: '' });

  const appid     = process.env.XFYUN_APPID;
  const apiKey    = process.env.XFYUN_API_KEY;
  const apiSecret = process.env.XFYUN_API_SECRET;
  if (!appid || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'iFlytek credentials not configured', text: '' });
  }

  try {
    const pcm16Buffer = Buffer.from(audio, 'base64');
    const signedUrl   = buildXfyunSignedUrl(apiKey, apiSecret);
    const text        = await xfyunTranscribe(pcm16Buffer, appid, signedUrl);
    res.json({ text });
  } catch (err) {
    console.error('Transcribe error:', err.message);
    res.status(500).json({ error: 'Transcription failed', text: '' });
  }
});

// Generate a time-limited signed WebSocket URL for iFlytek IAT
// The APISecret never leaves the server; only the signed URL is returned
app.get('/api/xfyun-url', (req, res) => {
  const appid     = process.env.XFYUN_APPID;
  const apiKey    = process.env.XFYUN_API_KEY;
  const apiSecret = process.env.XFYUN_API_SECRET;

  if (!appid || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'iFlytek credentials not configured in .env' });
  }

  res.json({ url: buildXfyunSignedUrl(apiKey, apiSecret), appid });
});

app.get('/health', (_, res) => res.json({ status: 'ok', model: MODEL }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`English Buddy server running: http://localhost:${PORT}`));
