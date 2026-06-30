// Detect if browser supports fetch streaming (ReadableStream body)
// Safari < 14.5 and some mobile browsers don't support it
const canStream = (() => {
  try {
    return typeof ReadableStream !== 'undefined' &&
      typeof Response !== 'undefined' &&
      'body' in Response.prototype;
  } catch { return false; }
})();

const ChatManager = {
  _key: 'eb_history',
  history: [],
  turnCount: 0,
  isBusy: false,

  load() {
    try {
      this.history = JSON.parse(localStorage.getItem(this._key) || '[]');
      this.turnCount = Math.floor(this.history.length / 2);
    } catch {
      this.history = [];
      this.turnCount = 0;
    }
    this.history.forEach(m => UIManager.addBubble(m.role, m.content));
  },

  save() {
    const trimmed = this.history.slice(-CONFIG.MAX_HISTORY);
    this.history = trimmed;
    localStorage.setItem(this._key, JSON.stringify(trimmed));
  },

  clear() {
    this.history = [];
    this.turnCount = 0;
    StatsManager.reset();
    localStorage.removeItem(this._key);
  },

  async send(userText, isSessionStart = false) {
    if (this.isBusy || !userText.trim()) return;
    this.isBusy = true;

    UIManager.addBubble('user', userText);
    if (!isSessionStart) StatsManager.addMessage(userText);
    UIManager.showTyping();

    const interests = InterestManager.load();
    const historySnapshot = [...this.history];

    try {
      if (canStream && !isMobileWeChat) {
        await this._sendStreaming(userText, historySnapshot, interests, isSessionStart);
      } else {
        await this._sendJSON(userText, historySnapshot, interests, isSessionStart);
      }
    } catch (err) {
      UIManager.removeTyping();
      UIManager.addBubble('assistant', "Oops! Something went wrong. Please try again! 🌟");
      console.error('Send error:', err.message);
    } finally {
      this.isBusy = false;
    }
  },

  // --- Streaming path (Chrome, modern browsers) ---
  async _sendStreaming(userText, historySnapshot, interests, isSessionStart) {
    const res = await fetch(`${CONFIG.API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText, conversationHistory: historySnapshot, interests, isSessionStart }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    UIManager.removeTyping();
    const streamBubble = UIManager.createStreamBubble();
    let accumulated = '';

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        try {
          const evt = JSON.parse(line.slice(6));
          if (evt.type === 'text') {
            accumulated += evt.content;
            UIManager.updateStream(streamBubble, accumulated);
          } else if (evt.type === 'metadata') {
            accumulated = evt.fullText;
            UIManager.updateStream(streamBubble, accumulated);
            evt.badges.forEach(b => UIManager.showBadgePopup(b));
            if (evt.words.length > 0) setTimeout(() => UIManager.showWordPopup(evt.words[0]), 500);
            this._saveAndSpeak(userText, evt.fullText);
          } else if (evt.type === 'done') {
            UIManager.finalizeStream(streamBubble);
          } else if (evt.type === 'error') {
            streamBubble.textContent = evt.message;
            UIManager.finalizeStream(streamBubble);
          }
        } catch { /* skip malformed line */ }
      }
    }
  },

  // --- Non-streaming fallback (Safari, Firefox, WeChat browser, etc.) ---
  async _sendJSON(userText, historySnapshot, interests, isSessionStart) {
    const res = await fetch(`${CONFIG.API_BASE}/api/chat-json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText, conversationHistory: historySnapshot, interests, isSessionStart }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    UIManager.removeTyping();
    const bubble = UIManager.addBubble('assistant', data.fullText || '');

    if (data.badges) data.badges.forEach(b => UIManager.showBadgePopup(b));
    if (data.words?.length > 0) setTimeout(() => UIManager.showWordPopup(data.words[0]), 500);

    this._saveAndSpeak(userText, data.fullText || '');
  },

  // Shared: save history, trigger TTS, extract interests
  _saveAndSpeak(userText, fullText) {
    this.history.push({ role: 'user', content: userText });
    this.history.push({ role: 'assistant', content: fullText });
    this.save();
    this.turnCount++;
    VoiceManager.speak(fullText);
    if (this.turnCount % CONFIG.EXTRACT_EVERY === 0) {
      InterestManager.extractFromHistory(this.history);
    }
  },
};
