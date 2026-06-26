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

  // Update avatar + subtitle
  document.getElementById('buddy-avatar').textContent = profile.avatar;
  document.getElementById('buddy-subtitle').textContent = STYLE_SUBTITLES[key] || '';

  // Update CSS accent variable
  document.documentElement.style.setProperty('--accent', STYLE_ACCENTS[key] || '#8b5cf6');

  // Update button active states
  document.querySelectorAll('.voice-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === key);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  UIManager.init();
  InterestManager._render(InterestManager.load());

  const voiceBtn   = document.getElementById('voice-btn');
  const sendBtn    = document.getElementById('send-btn');
  const textInput  = document.getElementById('text-input');
  const resetBtn   = document.getElementById('reset-btn');
  const messagesEl = document.getElementById('messages');

  // Init voice (async mic permission check)
  await VoiceManager.init(
    (transcript, isFinal) => {
      textInput.value = transcript;
      if (isFinal && transcript.trim()) {
        textInput.value = '';
        ChatManager.send(transcript.trim());
      }
    },
    () => {
      voiceBtn.classList.remove('recording');
      voiceBtn.title = '按住说英语';
    }
  );

  // Apply saved (or default) voice style on load
  applyVoiceStyle(VoiceManager.currentStyle);

  if (!VoiceManager.isSupported) {
    voiceBtn.disabled = true;
    voiceBtn.title = isWeChat ? '请使用文字输入 ✏️' : '麦克风不可用（检查浏览器权限）';
    if (isWeChat) voiceBtn.style.opacity = '0.35';
  }

  // Voice style buttons
  document.querySelectorAll('.voice-opt').forEach(btn => {
    btn.addEventListener('click', () => applyVoiceStyle(btn.dataset.style));
  });

  // Hold-to-record — mouse
  voiceBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (!VoiceManager.isSupported || ChatManager.isBusy) return;
    voiceBtn.classList.add('recording');
    textInput.value = '';
    VoiceManager.start();
  });
  voiceBtn.addEventListener('mouseup',   () => VoiceManager.stop());
  voiceBtn.addEventListener('mouseleave', () => { if (VoiceManager.isListening) VoiceManager.stop(); });

  // Hold-to-record — touch
  voiceBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!VoiceManager.isSupported || ChatManager.isBusy) return;
    voiceBtn.classList.add('recording');
    textInput.value = '';
    VoiceManager.start();
  });
  voiceBtn.addEventListener('touchend', (e) => { e.preventDefault(); VoiceManager.stop(); });

  // Send — unlock TTS synchronously (required for iOS Safari) before going async
  const doSend = () => {
    VoiceManager.unlockSpeech();
    const text = textInput.value.trim();
    if (text && !ChatManager.isBusy) { textInput.value = ''; ChatManager.send(text); }
  };
  sendBtn.addEventListener('click', doSend);
  textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
  });
  // On mobile (especially iOS WeChat), soft keyboard pushes layout up.
  // Scroll to bottom after keyboard appears so latest message stays visible.
  textInput.addEventListener('focus', () => {
    setTimeout(() => UIManager.scrollToBottom(), 300);
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
