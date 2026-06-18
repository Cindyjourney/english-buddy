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
    // Re-render existing history
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
    localStorage.removeItem(this._key);
  },

  async send(userText, isSessionStart = false) {
    if (this.isBusy || !userText.trim()) return;
    this.isBusy = true;

    UIManager.addBubble('user', userText);
    UIManager.showTyping();

    const interests = InterestManager.load();
    const historySnapshot = [...this.history];

    try {
      const res = await fetch(`${CONFIG.API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: historySnapshot,
          interests,
          isSessionStart,
        }),
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
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const evt = JSON.parse(line.slice(6));

            if (evt.type === 'text') {
              accumulated += evt.content;
              UIManager.updateStream(streamBubble, accumulated);
            } else if (evt.type === 'metadata') {
              // Use fullText from server for definitive final content
              accumulated = evt.fullText;
              UIManager.updateStream(streamBubble, accumulated);

              // Process badges
              evt.badges.forEach(badge => UIManager.showBadgePopup(badge));

              // Process vocab words (show first one as popup)
              if (evt.words.length > 0) {
                setTimeout(() => UIManager.showWordPopup(evt.words[0]), 500);
              }

              // Save to history
              this.history.push({ role: 'user', content: userText });
              this.history.push({ role: 'assistant', content: evt.fullText });
              this.save();
              this.turnCount++;

              // TTS
              VoiceManager.speak(evt.fullText);

              // Periodic interest extraction
              if (this.turnCount % CONFIG.EXTRACT_EVERY === 0) {
                InterestManager.extractFromHistory(this.history);
              }
            } else if (evt.type === 'done') {
              UIManager.finalizeStream(streamBubble);
            } else if (evt.type === 'error') {
              streamBubble.textContent = evt.message;
              UIManager.finalizeStream(streamBubble);
            }
          } catch {
            // skip malformed SSE line
          }
        }
      }
    } catch (err) {
      UIManager.removeTyping();
      UIManager.addBubble('assistant', "Oops! Something went wrong. Please try again! 🌟");
      console.error('Send error:', err.message);
    } finally {
      this.isBusy = false;
    }
  },
};
