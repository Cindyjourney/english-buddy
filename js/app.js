// Style accent colors for each voice profile
const STYLE_ACCENTS = {
  sunny_girl: '#ec4899',  // pink
  girl:       '#a78bfa',  // soft purple
  sunny_boy:  '#f97316',  // orange
  boy:        '#3b82f6',  // blue
};

const STYLE_SUBTITLES = {
  sunny_girl: 'Your Sunny English Friend! 🌟',
  girl:       'Your Gentle English Friend! 🌸',
  sunny_boy:  'Your Super English Friend! ⚡',
  boy:        'Your Calm English Friend! 🎯',
};

function applyVoiceStyle(key) {
  VoiceManager.setStyle(key);

  const profile = VoiceManager.getProfile();

  document.getElementById('buddy-avatar').textContent = profile.avatar;
  document.getElementById('buddy-subtitle').textContent = STYLE_SUBTITLES[key] || '';

  document.documentElement.style.setProperty('--accent', STYLE_ACCENTS[key] || '#8b5cf6');

  document.querySelectorAll('.voice-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === key);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  UIManager.init();
  InterestManager._render(InterestManager.load());

  const voiceBtn  = document.getElementById('voice-btn');
  const voiceHint = document.getElementById('voice-hint');
  const resetBtn  = document.getElementById('reset-btn');
  const messagesEl = document.getElementById('messages');

  // Init voice (async mic permission check)
  await VoiceManager.init(
    (transcript, isFinal) => {
      if (isFinal && transcript.trim()) {
        ChatManager.send(transcript.trim());
      }
    },
    () => {
      voiceBtn.classList.remove('recording');
      voiceBtn.title = '按住说英语';
      if (voiceHint) voiceHint.textContent = '按住录音';
    }
  );

  applyVoiceStyle(VoiceManager.currentStyle);

  if (VoiceManager.isWeChatMode) {
    // ── Mobile WeChat: tap → native audio recorder → iFlytek transcription ──
    voiceBtn.title = '点击录音';
    if (voiceHint) voiceHint.textContent = '点击录音';

    voiceBtn.addEventListener('click', async () => {
      if (ChatManager.isBusy || VoiceManager.isListening) return;
      VoiceManager.unlockSpeech();
      VoiceManager.isListening = true;
      voiceBtn.classList.add('recording');
      if (voiceHint) voiceHint.textContent = '录音中…';

      const transcript = await VoiceManager.startWeChat();

      voiceBtn.classList.remove('recording');
      if (voiceHint) voiceHint.textContent = transcript ? '识别中…' : '点击录音';
      VoiceManager.isListening = false;

      if (transcript?.trim()) {
        ChatManager.send(transcript.trim());
        if (voiceHint) voiceHint.textContent = '点击录音';
      } else {
        if (voiceHint) voiceHint.textContent = '未收到录音，请重试';
        setTimeout(() => { if (voiceHint) voiceHint.textContent = '点击录音'; }, 2000);
      }
    });

  } else if (!VoiceManager.isSupported) {
    voiceBtn.disabled = true;
    voiceBtn.title = '麦克风不可用';
    if (voiceHint) voiceHint.textContent = '麦克风不可用';

  } else {
    // ── Normal browsers: hold-to-record via iFlytek WebSocket ──
    voiceBtn.title = '按住说英语';
    if (voiceHint) voiceHint.textContent = '按住录音';

    voiceBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (ChatManager.isBusy) return;
      voiceBtn.classList.add('recording');
      if (voiceHint) voiceHint.textContent = '录音中…';
      VoiceManager.start();
    });
    voiceBtn.addEventListener('mouseup',    () => VoiceManager.stop());
    voiceBtn.addEventListener('mouseleave', () => { if (VoiceManager.isListening) VoiceManager.stop(); });

    voiceBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (ChatManager.isBusy) return;
      voiceBtn.classList.add('recording');
      if (voiceHint) voiceHint.textContent = '录音中…';
      VoiceManager.start();
    });
    voiceBtn.addEventListener('touchend', (e) => { e.preventDefault(); VoiceManager.stop(); });
  }

  document.querySelectorAll('.voice-opt').forEach(btn => {
    btn.addEventListener('click', () => applyVoiceStyle(btn.dataset.style));
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    if (!confirm('重新开始对话？当前进度将清除。')) return;
    ChatManager.clear();
    InterestManager.clear();
    UIManager.clearBadges();
    messagesEl.innerHTML = '';
    setTimeout(() => ChatManager.send('[START]', true), 300);
  });

  // Load or start
  ChatManager.load();
  if (ChatManager.history.length === 0) {
    setTimeout(() => ChatManager.send('[START]', true), 500);
  }
});
