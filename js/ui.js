const UIManager = {
  messagesEl: null,
  wordPopupEl: null,
  badgePopupEl: null,
  headerBadgesEl: null,
  _earnedBadges: [],

  init() {
    this.messagesEl     = document.getElementById('messages');
    this.wordPopupEl    = document.getElementById('word-popup');
    this.badgePopupEl   = document.getElementById('badge-popup');
    this.headerBadgesEl = document.getElementById('header-badges');

    try {
      this._earnedBadges = JSON.parse(localStorage.getItem('eb_badges') || '[]');
    } catch {
      this._earnedBadges = [];
    }
    this._renderHeaderBadges();
  },

  _processText(text) {
    return text
      .replace(/<<BADGE: \w+>>/g, '')
      .replace(/<<WORD: ([^>]+)>>/g, (_, word) =>
        `<span class="vocab-word" data-word="${word}">${word}</span>`
      )
      .replace(/\[INTERESTS:[^\]]*\]/g, '')
      .replace(/\[SESSION_START\]/g, '')
      .trim();
  },

  addBubble(role, text) {
    const div = document.createElement('div');
    div.className = `bubble bubble-${role}`;
    div.innerHTML = this._processText(text);
    this.messagesEl.appendChild(div);
    this._scrollBottom();
    this._bindVocabClicks(div);
    return div;
  },

  createStreamBubble() {
    const div = document.createElement('div');
    div.className = 'bubble bubble-assistant streaming';
    this.messagesEl.appendChild(div);
    this._scrollBottom();
    return div;
  },

  updateStream(el, rawText) {
    el.innerHTML = this._processText(rawText);
    this._scrollBottom();
  },

  finalizeStream(el) {
    el.classList.remove('streaming');
    this._bindVocabClicks(el);
  },

  showTyping() {
    const div = document.createElement('div');
    div.className = 'bubble bubble-assistant typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    this.messagesEl.appendChild(div);
    this._scrollBottom();
  },

  removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  },

  showWordPopup(word) {
    const el = this.wordPopupEl;
    el.querySelector('.word-text').textContent = word;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 3000);
  },

  showBadgePopup(type) {
    const BADGE_INFO = {
      first_word:    { emoji: '🌟', label: 'First Word!' },
      brave_speaker: { emoji: '🎤', label: 'Brave Speaker!' },
      dino_expert:   { emoji: '🦕', label: 'Dino Expert!' },
      space_captain: { emoji: '🚀', label: 'Space Captain!' },
      animal_friend: { emoji: '🐾', label: 'Animal Friend!' },
      word_collector:{ emoji: '📚', label: 'Word Collector!' },
      super_star:    { emoji: '⭐', label: 'Super Star!' },
    };
    const info = BADGE_INFO[type] || { emoji: '🏆', label: 'Badge!' };

    // Save to localStorage
    if (!this._earnedBadges.includes(type)) {
      this._earnedBadges.push(type);
      localStorage.setItem('eb_badges', JSON.stringify(this._earnedBadges));
      this._renderHeaderBadges();
    }

    const el = this.badgePopupEl;
    el.querySelector('.badge-emoji').textContent = info.emoji;
    el.querySelector('.badge-label').textContent = info.label;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 3500);
  },

  _renderHeaderBadges() {
    if (!this.headerBadgesEl) return;
    const BADGE_EMOJIS = {
      first_word: '🌟', brave_speaker: '🎤', dino_expert: '🦕',
      space_captain: '🚀', animal_friend: '🐾', word_collector: '📚', super_star: '⭐',
    };
    this.headerBadgesEl.innerHTML = this._earnedBadges
      .map(b => `<span class="header-badge" title="${b}">${BADGE_EMOJIS[b] || '🏆'}</span>`)
      .join('');
  },

  clearBadges() {
    this._earnedBadges = [];
    localStorage.removeItem('eb_badges');
    this._renderHeaderBadges();
  },

  _bindVocabClicks(container) {
    container.querySelectorAll('.vocab-word').forEach(el => {
      el.addEventListener('click', () => this.showWordPopup(el.dataset.word));
    });
  },

  _scrollBottom() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  },
};
