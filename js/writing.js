const WRITING_ENCOURAGEMENTS = [
  '没关系，再来一次！💪',
  '继续加油，你可以的！🌟',
  '差一点点！再试试！🌈',
  '好棒的尝试！Keep going! 🚀',
  '再接再厉，马上就会了！💫',
  "Almost there! Don't give up! 🦋",
  '每一次练习都让你更厉害！⚡',
  "Great try! You're learning! 🎯",
];

const WritingManager = {
  STORAGE_KEY: 'eb_writing_progress',
  progress: {},
  currentTopicId: null,
  currentExerciseIndex: -1,
  score: 0,
  answered: false,
  arrangeClicked: [],

  // ── Init ──────────────────────────────────────────────────────────────────
  init() {
    this.loadProgress();
    this.renderStages();
    this.updateOverallProgress();
    document.getElementById('ex-back-btn').addEventListener('click', () => this.closeTopic());
  },

  loadProgress() {
    try {
      this.progress = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch { this.progress = {}; }
  },

  saveProgress() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
  },

  // ── Unlock logic ──────────────────────────────────────────────────────────
  isUnlocked(topicId) {
    for (const stage of WRITING_STAGES) {
      const idx = stage.topics.indexOf(topicId);
      if (idx === -1) continue;
      if (stage.id === 'ws1' && idx === 0) return true;
      if (idx > 0) {
        const prevId = stage.topics[idx - 1];
        return (this.progress[prevId]?.stars || 0) >= 1;
      }
      const stageIdx = WRITING_STAGES.findIndex(s => s.id === stage.id);
      if (stageIdx === 0) return true;
      const prevStage = WRITING_STAGES[stageIdx - 1];
      return prevStage.topics.every(id => (this.progress[id]?.stars || 0) >= 1);
    }
    return false;
  },

  getStars(topicId) {
    return this.progress[topicId]?.stars || 0;
  },

  // ── Render stages overview ────────────────────────────────────────────────
  renderStages() {
    const container = document.getElementById('stages-container');
    container.innerHTML = '';

    for (const stage of WRITING_STAGES) {
      const allDone = stage.topics.every(id => (this.progress[id]?.stars || 0) >= 1);
      const card = document.createElement('div');
      card.className = 'stage-card' + (allDone ? ' stage-done' : '');
      card.style.setProperty('--stage-color', stage.color);

      const topicsHTML = stage.topics.map(id => {
        const topic = WRITING_TOPICS[id];
        const unlocked = this.isUnlocked(id);
        const stars = this.getStars(id);
        const starsHTML = stars > 0
          ? '⭐'.repeat(stars)
          : (unlocked ? '<span class="no-stars">○○○</span>' : '');
        return `<button class="topic-btn ${unlocked ? 'unlocked' : 'locked'} ${stars >= 1 ? 'done' : ''}"
                        data-topic="${id}" ${!unlocked ? 'disabled' : ''}>
          <span class="topic-icon">${topic.icon}</span>
          <span class="topic-title">${topic.title}</span>
          <span class="topic-stars">${unlocked ? starsHTML : '🔒'}</span>
        </button>`;
      }).join('');

      card.innerHTML = `
        <div class="stage-header" style="background:${stage.color}">
          <span class="stage-icon">${stage.icon}</span>
          <span class="stage-title">${stage.title}</span>
          ${allDone ? '<span class="stage-complete">✅</span>' : ''}
        </div>
        <div class="topics-grid">${topicsHTML}</div>
      `;
      container.appendChild(card);
    }

    container.querySelectorAll('.topic-btn.unlocked').forEach(btn => {
      btn.addEventListener('click', () => this.openTopic(btn.dataset.topic));
    });
  },

  updateOverallProgress() {
    const total = Object.keys(WRITING_TOPICS).length;
    const done = Object.values(this.progress).filter(p => p.stars >= 1).length;
    const totalStars = Object.values(this.progress).reduce((s, p) => s + (p.stars || 0), 0);
    const pct = total > 0 ? (done / total) * 100 : 0;
    document.getElementById('overall-progress-fill').style.width = pct + '%';
    document.getElementById('topics-done').textContent = done;
    document.getElementById('total-topics').textContent = total;
    document.getElementById('total-stars').textContent = totalStars;
  },

  // ── Open / close topic ────────────────────────────────────────────────────
  openTopic(topicId) {
    const topic = WRITING_TOPICS[topicId];
    if (!topic) return;

    this.currentTopicId = topicId;
    this.currentExerciseIndex = -1;
    this.score = 0;
    this.answered = false;

    const panel = document.getElementById('exercise-panel');
    panel.hidden = false;
    panel.classList.remove('slide-out');
    panel.classList.add('slide-in');

    document.getElementById('ex-topic-name').textContent = topic.icon + ' ' + topic.title;
    this.updateTopicStars();
    this.showExplanation();
  },

  updateTopicStars() {
    const stars = this.getStars(this.currentTopicId);
    document.getElementById('ex-stars').textContent = stars > 0 ? '⭐'.repeat(stars) : '';
  },

  closeTopic() {
    const panel = document.getElementById('exercise-panel');
    panel.classList.remove('slide-in');
    panel.classList.add('slide-out');
    setTimeout(() => { panel.hidden = true; panel.classList.remove('slide-out'); }, 300);
    this.renderStages();
    this.updateOverallProgress();
  },

  // ── Explanation card ──────────────────────────────────────────────────────
  showExplanation() {
    const topic = WRITING_TOPICS[this.currentTopicId];
    const content = document.getElementById('exercise-content');
    const footer = document.getElementById('exercise-footer');

    document.getElementById('ex-progress-text').textContent = 'Let\'s learn first!';
    document.getElementById('ex-progress-fill').style.width = '0%';

    content.innerHTML = `
      <div class="explanation-card">
        <div class="ex-icon">${topic.icon}</div>
        <h2 class="ex-title">${topic.title}</h2>
        <p class="ex-subtitle">${topic.subtitle}</p>
        <div class="ex-rule">📌 ${topic.explanation.rule.replace(/\n/g, '<br>')}</div>
        <div class="ex-examples">
          ${topic.explanation.examples.map(e => `<span class="ex-example">${e}</span>`).join('')}
        </div>
        <div class="ex-tip">💡 ${topic.explanation.tip}</div>
      </div>
    `;

    footer.innerHTML = `<button class="next-btn primary" id="start-btn">Let's Write! ✍️</button>`;
    document.getElementById('start-btn').addEventListener('click', () => {
      this.currentExerciseIndex = 0;
      this.showExercise(0);
    });
  },

  // ── Exercise rendering ────────────────────────────────────────────────────
  showExercise(index) {
    const topic = WRITING_TOPICS[this.currentTopicId];
    const ex = topic.exercises[index];
    const total = topic.exercises.length;

    this.answered = false;
    this.arrangeClicked = [];

    const pct = (index / total) * 100;
    document.getElementById('ex-progress-fill').style.width = pct + '%';
    document.getElementById('ex-progress-text').textContent = `Exercise ${index + 1} of ${total}`;

    const content = document.getElementById('exercise-content');
    const footer = document.getElementById('exercise-footer');
    footer.innerHTML = '';

    if (ex.type === 'choose') {
      content.innerHTML = `
        <div class="ex-question">${ex.question}</div>
        <div class="options-grid">
          ${ex.options.map((opt, i) => `<button class="option-btn" data-index="${i}">${opt}</button>`).join('')}
        </div>
        <div class="feedback-area" id="feedback-area" hidden></div>
      `;
      content.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => this.checkChoose(parseInt(btn.dataset.index), ex));
      });

    } else if (ex.type === 'fill') {
      const parts = ex.sentence.split('___');
      content.innerHTML = `
        <div class="ex-question fill-question">
          ${parts[0]}<input type="text" id="fill-input" class="fill-input" placeholder="type here" autocomplete="off" autocapitalize="off">${parts[1] || ''}
        </div>
        <div class="fill-hint">Hint: ${ex.hint}</div>
        <div class="feedback-area" id="feedback-area" hidden></div>
      `;
      footer.innerHTML = `<button class="next-btn primary" id="check-btn">Check ✓</button>`;
      const checkBtn = document.getElementById('check-btn');
      const input = document.getElementById('fill-input');
      const doCheck = () => { if (!this.answered) this.checkFill(input.value, ex); };
      checkBtn.addEventListener('click', doCheck);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') doCheck(); });
      input.focus();

    } else if (ex.type === 'arrange') {
      content.innerHTML = `
        <div class="ex-question">${ex.prompt}</div>
        <div class="sentence-area" id="sentence-area"><span class="sa-placeholder">Tap words to build the sentence</span></div>
        <div class="word-bank" id="word-bank">
          ${ex.words.map((w, i) => `<button class="word-tile" data-index="${i}">${w}</button>`).join('')}
        </div>
        <div class="feedback-area" id="feedback-area" hidden></div>
      `;
      footer.innerHTML = `<button class="next-btn primary" id="check-btn" disabled>Check ✓</button>`;
      this._bindArrangeEvents(ex);

    } else if (ex.type === 'write') {
      const guidesHTML = ex.guides.map(g => `<li>${g}</li>`).join('');
      content.innerHTML = `
        <div class="ex-question write-prompt">${ex.prompt.replace(/\n/g, '<br>')}</div>
        <div class="write-guides">
          <strong>✏️ Writing Guide:</strong>
          <ul>${guidesHTML}</ul>
        </div>
        <textarea id="write-input" class="write-input" placeholder="Start writing here... 📝" rows="6"></textarea>
        <div class="word-count-bar"><span id="word-count">0</span> words written
          <span class="word-target">(aim for ${ex.minWords}+ words)</span>
        </div>
        <div class="feedback-area" id="feedback-area" hidden></div>
      `;
      const textarea = document.getElementById('write-input');
      const wordCountEl = document.getElementById('word-count');
      textarea.addEventListener('input', () => {
        const count = textarea.value.trim().split(/\s+/).filter(w => w).length;
        wordCountEl.textContent = count;
        wordCountEl.style.color = count >= ex.minWords ? '#10b981' : '#f97316';
      });
      footer.innerHTML = `<button class="next-btn primary" id="check-btn">Submit & See Model ✍️</button>`;
      document.getElementById('check-btn').addEventListener('click', () => {
        if (!this.answered) this.checkWrite(textarea.value, ex);
      });
      textarea.focus();
    }
  },

  // ── Arrange interaction ───────────────────────────────────────────────────
  _bindArrangeEvents(ex) {
    const wordBank = document.getElementById('word-bank');
    const sentenceArea = document.getElementById('sentence-area');
    const checkBtn = document.getElementById('check-btn');

    const updateSentenceArea = () => {
      if (this.arrangeClicked.length === 0) {
        sentenceArea.innerHTML = '<span class="sa-placeholder">Tap words to build the sentence</span>';
      } else {
        sentenceArea.innerHTML = this.arrangeClicked.map((idx, pos) => {
          return `<button class="word-tile placed" data-pos="${pos}">${ex.words[idx]}</button>`;
        }).join('');
        sentenceArea.querySelectorAll('.word-tile.placed').forEach(btn => {
          btn.addEventListener('click', () => {
            if (this.answered) return;
            const pos = parseInt(btn.dataset.pos);
            const wordIdx = this.arrangeClicked[pos];
            this.arrangeClicked.splice(pos, 1);
            wordBank.querySelectorAll('.word-tile').forEach(t => {
              if (parseInt(t.dataset.index) === wordIdx) t.disabled = false;
            });
            updateSentenceArea();
            checkBtn.disabled = this.arrangeClicked.length !== ex.words.length;
          });
        });
      }
      checkBtn.disabled = this.arrangeClicked.length !== ex.words.length;
    };

    wordBank.querySelectorAll('.word-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        const idx = parseInt(btn.dataset.index);
        this.arrangeClicked.push(idx);
        btn.disabled = true;
        updateSentenceArea();
      });
    });

    checkBtn.addEventListener('click', () => {
      if (this.answered || this.arrangeClicked.length !== ex.words.length) return;
      this.checkArrange(ex);
    });
  },

  // ── Answer checking ───────────────────────────────────────────────────────
  checkChoose(selected, ex) {
    if (this.answered) return;
    this.answered = true;
    const correct = selected === ex.answer;
    if (correct) this.score++;

    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === ex.answer) btn.classList.add('correct');
      else if (i === selected && !correct) btn.classList.add('wrong');
    });
    this.showFeedback(correct, ex.feedback);
  },

  checkFill(value, ex) {
    if (this.answered) return;
    this.answered = true;
    const correct = value.trim().toLowerCase() === ex.answer.toLowerCase();
    if (correct) this.score++;

    const input = document.getElementById('fill-input');
    input.disabled = true;
    input.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) {
      const hint = document.createElement('span');
      hint.className = 'correct-answer';
      hint.textContent = ' → ' + ex.answer;
      input.after(hint);
    }
    this.showFeedback(correct, ex.feedback);
  },

  checkArrange(ex) {
    if (this.answered) return;
    this.answered = true;
    const correct = this.arrangeClicked.every((idx, pos) => idx === ex.correctOrder[pos]);
    if (correct) this.score++;

    document.querySelectorAll('.word-tile.placed').forEach(btn => {
      btn.classList.add(correct ? 'correct' : 'wrong');
      btn.disabled = true;
    });
    document.getElementById('check-btn').disabled = true;

    if (!correct) {
      const sentenceArea = document.getElementById('sentence-area');
      const correctSentence = document.createElement('div');
      correctSentence.className = 'correct-sentence';
      correctSentence.textContent = '✅ ' + ex.sentence;
      sentenceArea.after(correctSentence);
    }
    this.showFeedback(correct, ex.feedback);
  },

  checkWrite(value, ex) {
    if (this.answered) return;
    this.answered = true;
    this.score++; // writing always earns a point — participation-based

    const textarea = document.getElementById('write-input');
    textarea.disabled = true;

    const fb = document.getElementById('feedback-area');
    fb.hidden = false;
    fb.className = 'feedback-area feedback-write';
    fb.innerHTML = `
      <div class="write-score">✍️ ${ex.feedback}</div>
      <div class="model-answer">
        <div class="model-label">📖 Model Answer:</div>
        <div class="model-text">${ex.model.replace(/\n/g, '<br>')}</div>
      </div>
    `;
    this.playSound('correct');

    const footer = document.getElementById('exercise-footer');
    const topic = WRITING_TOPICS[this.currentTopicId];
    const isLast = this.currentExerciseIndex === topic.exercises.length - 1;
    const nextLabel = isLast ? 'See Results 🏆' : 'Next →';
    footer.innerHTML = `<button class="next-btn primary" id="next-btn">${nextLabel}</button>`;
    document.getElementById('next-btn').addEventListener('click', () => {
      if (isLast) this.finishTopic();
      else { this.currentExerciseIndex++; this.showExercise(this.currentExerciseIndex); }
    });
  },

  // ── Sound effects ─────────────────────────────────────────────────────────
  playSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (type === 'correct') {
        [523, 659, 784].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = freq;
          const t = ctx.currentTime + i * 0.14;
          gain.gain.setValueAtTime(0.28, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.start(t); osc.stop(t + 0.35);
        });
      } else {
        [330, 262].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine'; osc.frequency.value = freq;
          const t = ctx.currentTime + i * 0.18;
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
          osc.start(t); osc.stop(t + 0.38);
        });
      }
    } catch (e) {}
  },

  // ── Feedback display ──────────────────────────────────────────────────────
  showFeedback(correct, text) {
    this.playSound(correct ? 'correct' : 'wrong');

    const fb = document.getElementById('feedback-area');
    fb.hidden = false;
    fb.className = 'feedback-area ' + (correct ? 'feedback-correct' : 'feedback-wrong');
    const encourage = correct ? '' : `<div class="encouragement">${WRITING_ENCOURAGEMENTS[Math.floor(Math.random() * WRITING_ENCOURAGEMENTS.length)]}</div>`;
    fb.innerHTML = (correct ? '✅ ' : '❌ ') + text + encourage;

    const footer = document.getElementById('exercise-footer');
    const topic = WRITING_TOPICS[this.currentTopicId];
    const isLast = this.currentExerciseIndex === topic.exercises.length - 1;
    const nextLabel = isLast ? 'See Results 🏆' : 'Next →';
    footer.innerHTML = `<button class="next-btn primary" id="next-btn">${nextLabel}</button>`;
    document.getElementById('next-btn').addEventListener('click', () => {
      if (isLast) this.finishTopic();
      else { this.currentExerciseIndex++; this.showExercise(this.currentExerciseIndex); }
    });
  },

  // ── Results screen ────────────────────────────────────────────────────────
  finishTopic() {
    const topic = WRITING_TOPICS[this.currentTopicId];
    const total = topic.exercises.length;
    const stars = this.score >= total ? 3 : this.score >= total - 1 ? 2 : this.score >= Math.ceil(total * 0.6) ? 1 : 0;

    const prev = this.progress[this.currentTopicId] || { stars: 0, attempts: 0 };
    this.progress[this.currentTopicId] = {
      stars: Math.max(prev.stars, stars),
      attempts: prev.attempts + 1,
    };
    this.saveProgress();

    const messages = [
      ['Keep trying! You can do it! 💪', 'Try again! You\'re almost there! 🌟'],
      ['Good effort! ⭐ Try again to get more stars!', 'Great writing! One star! Keep going! ⭐'],
      ['Excellent writer! Almost perfect! ⭐⭐', 'Two stars! Your writing shines! ⭐⭐'],
      ['AMAZING WRITER! 🎉⭐⭐⭐', 'You are a Writing Star! ⭐⭐⭐'],
    ];
    const msgArr = messages[Math.max(0, stars)];
    const msg = msgArr[Math.floor(Math.random() * msgArr.length)];
    const starsHTML = '⭐'.repeat(stars) + (stars < 3 ? '<span style="opacity:0.3">⭐</span>'.repeat(3 - stars) : '');

    document.getElementById('ex-progress-fill').style.width = '100%';
    document.getElementById('ex-progress-text').textContent = `${this.score}/${total} complete`;

    const content = document.getElementById('exercise-content');
    content.innerHTML = `
      <div class="results-screen">
        <div class="results-icon">${stars === 3 ? '🏆' : stars >= 1 ? '🌟' : '😊'}</div>
        <div class="results-stars">${starsHTML}</div>
        <div class="results-score">${this.score} / ${total} exercises done</div>
        <div class="results-message">${msg}</div>
      </div>
    `;

    const footer = document.getElementById('exercise-footer');
    footer.innerHTML = `
      <button class="next-btn secondary" id="retry-btn">Try Again 🔄</button>
      <button class="next-btn primary" id="map-btn">Back to Map 🗺️</button>
    `;
    document.getElementById('map-btn').addEventListener('click', () => this.closeTopic());
    document.getElementById('retry-btn').addEventListener('click', () => {
      this.currentExerciseIndex = 0;
      this.score = 0;
      this.showExplanation();
    });
  },
};

document.addEventListener('DOMContentLoaded', () => WritingManager.init());
