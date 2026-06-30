const LEVELS = [
  { min: 0,   max: 4,   emoji: '🌱', name: '新手',    color: '#10b981' },
  { min: 5,   max: 14,  emoji: '🌟', name: '探险家',  color: '#f59e0b' },
  { min: 15,  max: 29,  emoji: '🔥', name: '勇士',    color: '#f97316' },
  { min: 30,  max: 49,  emoji: '🚀', name: '超级英雄', color: '#8b5cf6' },
  { min: 50,  max: 99,  emoji: '🏆', name: '冠军',    color: '#ec4899' },
  { min: 100, max: Infinity, emoji: '💎', name: '大师', color: '#3b82f6' },
];

const MILESTONES = [
  { sentences: 5,  emoji: '🎉', text: '5句话！你开口啦！' },
  { sentences: 10, emoji: '🌟', text: '10句！成为探险家！' },
  { sentences: 25, emoji: '🔥', text: '25句！你是勇士！' },
  { sentences: 50, emoji: '🚀', text: '50句！超级英雄！' },
  { sentences: 100,emoji: '💎', text: '100句！你是大师！' },
];
const WORD_MILESTONES = [50, 100, 200, 500];

const StatsManager = {
  sentences: 0,
  words: 0,
  _prevWordMilestone: 0,

  load() {
    this.sentences = parseInt(localStorage.getItem('eb_sentences') || '0', 10);
    this.words     = parseInt(localStorage.getItem('eb_words')     || '0', 10);
    this._prevWordMilestone = Math.floor(this.words / 50) * 50;
    this.updateUI(false);
  },

  addMessage(text) {
    if (!text || !text.trim()) return;
    const cleaned = text.trim();

    // Count sentences: split on . ! ? (keep at least 1)
    const sentenceCount = Math.max(1, (cleaned.match(/[.!?]+/g) || []).length);
    // Count words: split on whitespace
    const wordCount = cleaned.split(/\s+/).filter(Boolean).length;

    const prevSentences = this.sentences;
    this.sentences += sentenceCount;
    this.words     += wordCount;

    localStorage.setItem('eb_sentences', this.sentences);
    localStorage.setItem('eb_words',     this.words);

    this.updateUI(true);
    this._checkMilestones(prevSentences, sentenceCount);
  },

  getLevel() {
    return LEVELS.find(l => this.sentences >= l.min && this.sentences <= l.max) || LEVELS[LEVELS.length - 1];
  },

  getXpPercent() {
    const lvl = this.getLevel();
    if (lvl.max === Infinity) return 100;
    const range = lvl.max - lvl.min + 1;
    const progress = this.sentences - lvl.min;
    return Math.round((progress / range) * 100);
  },

  updateUI(animate) {
    const sentEl   = document.getElementById('stat-sentences');
    const wordEl   = document.getElementById('stat-words');
    const levelEl  = document.getElementById('stat-level-name');
    const xpFill   = document.getElementById('xp-fill');
    if (!sentEl) return;

    sentEl.textContent = this.sentences;
    wordEl.textContent = this.words;

    const lvl = this.getLevel();
    levelEl.textContent = `${lvl.emoji} ${lvl.name}`;
    xpFill.style.width  = `${this.getXpPercent()}%`;
    xpFill.style.background = `linear-gradient(90deg, ${lvl.color}, ${lvl.color}cc)`;

    if (animate) {
      [sentEl, wordEl].forEach(el => {
        el.classList.remove('bump');
        void el.offsetWidth; // reflow to restart animation
        el.classList.add('bump');
      });
    }
  },

  _checkMilestones(prevSentences, added) {
    // Sentence milestones
    for (const m of MILESTONES) {
      if (prevSentences < m.sentences && this.sentences >= m.sentences) {
        setTimeout(() => UIManager.showMilestone(m.emoji, m.text), 400);
        return; // only one milestone per message
      }
    }
    // Word milestones (every 50 words)
    const newWordMilestone = Math.floor(this.words / 50) * 50;
    if (newWordMilestone > this._prevWordMilestone && newWordMilestone > 0) {
      this._prevWordMilestone = newWordMilestone;
      setTimeout(() => UIManager.showMilestone('✨', `${newWordMilestone}个单词！厉害！`), 400);
    }
  },

  reset() {
    this.sentences = 0;
    this.words     = 0;
    this._prevWordMilestone = 0;
    localStorage.removeItem('eb_sentences');
    localStorage.removeItem('eb_words');
    this.updateUI(false);
  },
};
