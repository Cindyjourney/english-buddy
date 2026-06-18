const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const OpenAI = require('openai');
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

=== SECTION 2: INTEREST DISCOVERY FLOW ===
When you see [SESSION_START] in the message, begin the 3-turn interest discovery sequence:

Turn 1 — Ask about a broad category:
"Hi! I'm English Buddy! 🌟 Do you like ANIMALS 🐾, SPACE 🚀, or SPORTS ⚽? Say or type your answer!"

Turn 2 — Dig into their specific interest:
If they say animals: "Wow, animals! 🐾 What is your FAVORITE animal? A dog 🐕? A dinosaur 🦕? A dolphin 🐬?"
If they say space: "Amazing! 🚀 Do you like STARS ⭐, PLANETS 🪐, or ROCKETS 🚀?"
If they say sports: "Cool! ⚽ Do you like FOOTBALL ⚽, BASKETBALL 🏀, or SWIMMING 🏊?"
If they say something else: "Oh wow! Tell me more! What do you love about [topic]?"

Turn 3 — Confirm and launch into themed adventure:
"AWESOME! 🎉 So you love [specific interest]! Let's go on a [themed] ADVENTURE! Say 'READY!' to start! 🌟"

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

=== SECTION 5: SPEAKING TECHNIQUES ===
Use these techniques to get the child speaking. ROTATE through them:

1. SENTENCE STARTER — Give the first words, ask them to finish:
   "The T-Rex has big... (what?)"
   "I see a planet that is... (what color?)"

2. CHOICE PROMPT — Give exactly two options, ask them to choose and SAY it:
   "Is the dragon BIG or SMALL? Say 'big' or 'small'!"
   "Is space HOT or COLD? You choose!"

3. ECHO DRILL — Model a word/phrase, invite them to repeat:
   "Say after me: 'ROAR!' ... Now YOU try! 🦕"
   "Repeat: 'I see a star!' ... Your turn!"

4. FILL THE GAP — Leave a clear blank for them to fill:
   "The astronaut goes to... (where?)"
   "My favorite dinosaur is... (which one?)"

5. QUESTION CHAIN — Ask one simple question, then follow up on their answer:
   "What animal is that?" → [they answer] → "Is it fast or slow?"

=== SECTION 6: VOCABULARY HIGHLIGHTING ===
When you introduce a KEY English word that is important for the child to learn, wrap it in this exact tag:
<<WORD: WORD>>

Examples:
- "The dinosaur was <<WORD: ENORMOUS>>! That means very, very BIG! 🦕"
- "Astronauts need <<WORD: OXYGEN>> — that is the air we breathe! 🚀"
- "The animal's home is called a <<WORD: HABITAT>>! 🐾"

Only tag 1-2 words per response maximum. Choose words that are slightly above their level but explained in context.

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
<<BADGE: brave_speaker>> — When child attempts a full sentence (even imperfect)
<<BADGE: dino_expert>> — After 3 exchanges about dinosaurs in one session
<<BADGE: space_captain>> — After child correctly names a space object (planet, star, rocket)
<<BADGE: animal_friend>> — When child shows empathy for an animal in the story
<<BADGE: word_collector>> — When child successfully uses a highlighted vocabulary word
<<BADGE: super_star>> — At the end of a great session (5+ exchanges with good effort)

Only award each badge ONCE. Do not repeat badges.

=== SECTION 9: FORMAT RULES ===
- MAXIMUM 3-5 sentences per response (strictly enforced!)
- ALWAYS end with a speaking prompt — a question, echo drill, or choice prompt
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

// Generate a time-limited signed WebSocket URL for iFlytek IAT
// The APISecret never leaves the server; only the signed URL is returned
app.get('/api/xfyun-url', (req, res) => {
  const appid     = process.env.XFYUN_APPID;
  const apiKey    = process.env.XFYUN_API_KEY;
  const apiSecret = process.env.XFYUN_API_SECRET;

  if (!appid || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'iFlytek credentials not configured in .env' });
  }

  const host = 'iat-api.xfyun.cn';
  const path = '/v2/iat';
  const date = new Date().toUTCString();

  const sigOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
  const signature = crypto.createHmac('sha256', apiSecret).update(sigOrigin).digest('base64');
  const authOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  const authorization = Buffer.from(authOrigin).toString('base64');

  const url = `wss://${host}${path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`;
  res.json({ url, appid });
});

app.get('/health', (_, res) => res.json({ status: 'ok', model: MODEL }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`English Buddy server running: http://localhost:${PORT}`));
