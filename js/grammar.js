const GrammarManager = {
  STORAGE_KEY: 'eb_grammar_progress',
  progress: {},          // { topicId: { stars: 0-3, attempts: 0 } }
  currentTopicId: null,
  currentExerciseIndex: -1,  // -1 = showing explanation
  score: 0,
  answered: false,
  arrangeClicked: [],    // indices of words clicked so far (arrange type)

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
    for (const stage of GRAMMAR_STAGES) {
      const idx = stage.topics.indexOf(topicId);
      if (idx === -1) continue;
      // First topic of first stage is always unlocked
      if (stage.id === 'stage1' && idx === 0) return true;
      // Previous topic in same stage must have ≥1 star
      if (idx > 0) {
        const prevId = stage.topics[idx - 1];
        return (this.progress[prevId]?.stars || 0) >= 1;
      }
      // First topic of later stage: entire previous stage must be done
      const stageIdx = GRAMMAR_STAGES.findIndex(s => s.id === stage.id);
      if (stageIdx === 0) return true;
      const prevStage = GRAMMAR_STAGES[stageIdx - 1];
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

    for (const stage of GRAMMAR_STAGES) {
      const allDone = stage.topics.every(id => (this.progress[id]?.stars || 0) >= 1);
      const card = document.createElement('div');
      card.className = 'stage-card' + (allDone ? ' stage-done' : '');
      card.style.setProperty('--stage-color', stage.color);

      const topicsHTML = stage.topics.map(id => {
        const topic = GRAMMAR_TOPICS[id];
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

    // Attach click events
    container.querySelectorAll('.topic-btn.unlocked').forEach(btn => {
      btn.addEventListener('click', () => this.openTopic(btn.dataset.topic));
    });
  },

  updateOverallProgress() {
    const total = Object.keys(GRAMMAR_TOPICS).length;
    const done = Object.values(this.progress).filter(p => p.stars >= 1).length;
    const totalStars = Object.values(this.progress).reduce((s, p) => s + (p.stars || 0), 0);

    const pct = total > 0 ? (done / total) * 100 : 0;
    document.getElementById('overall-progress-fill').style.width = pct + '%';
    document.getElementById('topics-done').textContent = done;
    document.getElementById('total-stars').textContent = totalStars;
  },

  // ── Open topic ────────────────────────────────────────────────────────────
  openTopic(topicId) {
    const topic = GRAMMAR_TOPICS[topicId];
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
    const topic = GRAMMAR_TOPICS[this.currentTopicId];
    const content = document.getElementById('exercise-content');
    const footer = document.getElementById('exercise-footer');

    document.getElementById('ex-progress-text').textContent = 'Let\'s learn first!';
    document.getElementById('ex-progress-fill').style.width = '0%';

    content.innerHTML = `
      <div class="explanation-card">
        <div class="ex-icon">${topic.icon}</div>
        <h2 class="ex-title">${topic.title}</h2>
        <p class="ex-subtitle">${topic.subtitle}</p>
        <div class="ex-rule">📌 ${topic.explanation.rule}</div>
        <div class="ex-examples">
          ${topic.explanation.examples.map(e => `<span class="ex-example">${e}</span>`).join('')}
        </div>
        <div class="ex-tip">💡 ${topic.explanation.tip}</div>
      </div>
    `;

    footer.innerHTML = `<button class="next-btn primary" id="start-btn">Let's Go! 🚀</button>`;
    document.getElementById('start-btn').addEventListener('click', () => {
      this.currentExerciseIndex = 0;
      this.showExercise(0);
    });
  },

  // ── Exercise rendering ────────────────────────────────────────────────────
  showExercise(index) {
    const topic = GRAMMAR_TOPICS[this.currentTopicId];
    const ex = topic.exercises[index];
    const total = topic.exercises.length;

    this.answered = false;
    this.arrangeClicked = [];

    const pct = (index / total) * 100;
    document.getElementById('ex-progress-fill').style.width = pct + '%';
    document.getElementById('ex-progress-text').textContent = `Question ${index + 1} of ${total}`;

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
      const doCheck = () => {
        if (!this.answered) this.checkFill(input.value, ex);
      };
      checkBtn.addEventListener('click', doCheck);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') doCheck(); });
      input.focus();

    } else if (ex.type === 'arrange') {
      const shuffled = [...ex.words]; // already "scrambled" per content
      content.innerHTML = `
        <div class="ex-question">${ex.prompt}</div>
        <div class="sentence-area" id="sentence-area"><span class="sa-placeholder">Tap words to build the sentence</span></div>
        <div class="word-bank" id="word-bank">
          ${shuffled.map((w, i) => `<button class="word-tile" data-index="${i}">${w}</button>`).join('')}
        </div>
        <div class="feedback-area" id="feedback-area" hidden></div>
      `;
      footer.innerHTML = `<button class="next-btn primary" id="check-btn" disabled>Check ✓</button>`;
      this._bindArrangeEvents(ex);
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
            // Re-enable the word bank tile
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

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
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

  // ── Feedback + Next ───────────────────────────────────────────────────────
  showFeedback(correct, text) {
    const fb = document.getElementById('feedback-area');
    fb.hidden = false;
    fb.className = 'feedback-area ' + (correct ? 'feedback-correct' : 'feedback-wrong');
    fb.innerHTML = (correct ? '✅ ' : '❌ ') + text;

    const footer = document.getElementById('exercise-footer');
    const topic = GRAMMAR_TOPICS[this.currentTopicId];
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
    const topic = GRAMMAR_TOPICS[this.currentTopicId];
    const total = topic.exercises.length;
    const stars = this.score >= total ? 3 : this.score >= total - 1 ? 2 : this.score >= Math.ceil(total * 0.6) ? 1 : 0;

    // Save best stars
    const prev = this.progress[this.currentTopicId] || { stars: 0, attempts: 0 };
    this.progress[this.currentTopicId] = {
      stars: Math.max(prev.stars, stars),
      attempts: prev.attempts + 1,
    };
    this.saveProgress();

    const messages = [
      ['Keep trying! You can do it! 💪', 'Try again! You\'re almost there! 🌟'],
      ['Good job! ⭐ Try again to get more stars!', 'You got it! One star! Keep going! ⭐'],
      ['Great work! Almost perfect! ⭐⭐', 'Two stars! Excellent! ⭐⭐'],
      ['PERFECT! Amazing! 🎉⭐⭐⭐', 'You are a Grammar Star! ⭐⭐⭐'],
    ];
    const msgArr = messages[stars];
    const msg = msgArr[Math.floor(Math.random() * msgArr.length)];
    const starsHTML = '⭐'.repeat(stars) + (stars < 3 ? '<span style="opacity:0.3">⭐</span>'.repeat(3 - stars) : '');

    document.getElementById('ex-progress-fill').style.width = '100%';
    document.getElementById('ex-progress-text').textContent = `${this.score}/${total} correct`;

    const content = document.getElementById('exercise-content');
    content.innerHTML = `
      <div class="results-screen">
        <div class="results-icon">${stars === 3 ? '🏆' : stars >= 1 ? '🌟' : '😊'}</div>
        <div class="results-stars">${starsHTML}</div>
        <div class="results-score">${this.score} / ${total} correct</div>
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

document.addEventListener('DOMContentLoaded', () => GrammarManager.init());
