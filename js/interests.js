const INTEREST_EMOJIS = {
  dinosaurs: '🦕',
  space: '🚀',
  animals: '🐾',
  sports: '⚽',
  magic: '✨',
  ocean: '🌊',
  dragons: '🐉',
  robots: '🤖',
};

const InterestManager = {
  _key: 'eb_interests',

  load() {
    try {
      return JSON.parse(localStorage.getItem(this._key) || '{}');
    } catch {
      return {};
    }
  },

  save(interests) {
    localStorage.setItem(this._key, JSON.stringify(interests));
    this._render(interests);
  },

  clear() {
    localStorage.removeItem(this._key);
    this._render({});
  },

  has() {
    const d = this.load();
    return !!d.primary;
  },

  async extractFromHistory(history) {
    if (history.length < 2) return;
    try {
      const res = await fetch(`${CONFIG.API_BASE}/api/extract-interests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationHistory: history }),
      });
      const data = await res.json();
      if (data.interests && Object.keys(data.interests).length > 0) {
        const current = this.load();
        const merged = { ...current, ...data.interests };
        this.save(merged);
      }
    } catch (err) {
      console.warn('Interest extraction failed:', err.message);
    }
  },

  _render(interests) {
    const panel = document.getElementById('interests-panel');
    const tags = document.getElementById('interest-tags');
    if (!panel || !tags) return;

    tags.innerHTML = '';
    const topics = [];
    if (interests.primary) topics.push(interests.primary);
    if (Array.isArray(interests.secondary)) topics.push(...interests.secondary);

    if (topics.length === 0) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'block';
    topics.forEach(topic => {
      const emoji = INTEREST_EMOJIS[topic.toLowerCase()] || '⭐';
      const tag = document.createElement('span');
      tag.className = 'interest-tag';
      tag.textContent = `${emoji} ${topic}`;
      tags.appendChild(tag);
    });
  },
};
