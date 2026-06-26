const STYLE_ACCENTS = {
  sunny_girl: '#ec4899',
  girl:       '#a78bfa',
  sunny_boy:  '#f97316',
  boy:        '#3b82f6',
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

  const voiceBtn   = document.getElementById('voice-btn');
  const voiceHint  = document.getElementById('voice-hint');
  const resetBtn   = document.getElementById('reset-btn');
  const messagesEl = document.getElementById('messages');

  await VoiceManager.init(
    (transcript, isFinal) => {
      if (isFinal && transcript.trim()) ChatManager.send(transcript.trim());
    },
    () => {
      voiceBtn.classList.remove('recording');
      if (voiceHint) voiceHint.textContent = isWeChat ? '点击录音' : '按住录音';
    }
  );

  applyVoiceStyle(VoiceManager.currentStyle);

  if (!VoiceManager.isSupported) {
    voiceBtn.disabled = true;

    if (isMobileWeChat) {
      // Android WeChat blocks getUserMedia — guide user to open in external browser
      voiceBtn.title = '请在浏览器中打开';
      if (voiceHint) voiceHint.textContent = '请在浏览器中打开';

      const banner = document.createElement('div');
      banner.className = 'wechat-tip';
      banner.innerHTML =
        '⚠️ 微信内置浏览器不支持麦克风<br>' +
        '点右上角 <b>···</b> → <b>在浏览器打开</b>，即可正常使用语音';
      messagesEl.parentNode.insertBefore(banner, messagesEl);
    } else {
      voiceBtn.title = '麦克风不可用';
      if (voiceHint) voiceHint.textContent = '麦克风不可用';
    }

  } else if (isWeChat) {
    // iOS WeChat — getUserMedia works; use tap-to-toggle instead of hold
    if (voiceHint) voiceHint.textContent = '点击录音';

    voiceBtn.addEventListener('click', () => {
      VoiceManager.unlockSpeech();
      if (VoiceManager.isListening) {
        VoiceManager.stop();
      } else {
        if (ChatManager.isBusy) return;
        voiceBtn.classList.add('recording');
        if (voiceHint) voiceHint.textContent = '录音中… 再次点击停止';
        VoiceManager.start();
      }
    });

  } else {
    // Desktop / native browser: hold-to-record
    if (voiceHint) voiceHint.textContent = '按住录音';

    voiceBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (ChatManager.isBusy) return;
      VoiceManager.unlockSpeech();
      voiceBtn.classList.add('recording');
      if (voiceHint) voiceHint.textContent = '录音中…';
      VoiceManager.start();
    });
    voiceBtn.addEventListener('mouseup',    () => VoiceManager.stop());
    voiceBtn.addEventListener('mouseleave', () => { if (VoiceManager.isListening) VoiceManager.stop(); });

    voiceBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (ChatManager.isBusy) return;
      VoiceManager.unlockSpeech();
      voiceBtn.classList.add('recording');
      if (voiceHint) voiceHint.textContent = '录音中…';
      VoiceManager.start();
    });
    voiceBtn.addEventListener('touchend', (e) => { e.preventDefault(); VoiceManager.stop(); });
  }

  document.querySelectorAll('.voice-opt').forEach(btn => {
    btn.addEventListener('click', () => applyVoiceStyle(btn.dataset.style));
  });

  resetBtn.addEventListener('click', () => {
    if (!confirm('重新开始对话？当前进度将清除。')) return;
    ChatManager.clear();
    InterestManager.clear();
    UIManager.clearBadges();
    messagesEl.innerHTML = '';
    setTimeout(() => ChatManager.send('[START]', true), 300);
  });

  ChatManager.load();
  if (ChatManager.history.length === 0) {
    setTimeout(() => ChatManager.send('[START]', true), 500);
  }
});
