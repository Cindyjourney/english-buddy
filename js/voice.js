const VOICE_PROFILES = {
  sunny_girl: {
    label: '阳光女声', icon: '🌟', avatar: '👩‍🎤',
    rate: 0.92, pitch: 1.25,
    prefer: ['Samantha', 'Zoe', 'Ava', 'Allison', 'Karen', 'Victoria'],
    femaleNames: true,
  },
  girl: {
    label: '温柔女声', icon: '🌸', avatar: '🧚‍♀️',
    rate: 0.85, pitch: 1.1,
    prefer: ['Samantha', 'Karen', 'Moira', 'Victoria', 'Serena'],
    femaleNames: true,
  },
  sunny_boy: {
    label: '阳光男声', icon: '⚡', avatar: '🦸‍♂️',
    rate: 0.92, pitch: 0.95,
    prefer: ['Alex', 'Daniel', 'Oliver', 'Arthur'],
    femaleNames: false,
  },
  boy: {
    label: '温和男声', icon: '🎯', avatar: '🧙‍♂️',
    rate: 0.85, pitch: 0.82,
    prefer: ['Alex', 'Daniel', 'Fred', 'Tom', 'Lee'],
    femaleNames: false,
  },
};

const FEMALE_VOICE_NAMES = ['samantha', 'karen', 'moira', 'victoria', 'zoe', 'ava', 'allison', 'kate', 'serena', 'tessa', 'veena'];
const MALE_VOICE_NAMES   = ['alex', 'daniel', 'fred', 'tom', 'oliver', 'arthur', 'lee', 'rishi'];

const VoiceManager = {
  synthesis: window.speechSynthesis,
  voices: [],
  isSupported: false,
  isListening: false,
  currentStyle: 'sunny_girl',

  _speechUnlocked: false,
  _ws: null,
  _audioCtx: null,
  _processor: null,
  _micStream: null,
  _onResult: null,
  _onEnd: null,
  _accText: '',
  _frameCount: 0,

  async init(onResult, onEnd) {
    this._onResult = onResult;
    this._onEnd = onEnd;

    // Load saved style
    this.currentStyle = localStorage.getItem('eb_voice_style') || 'sunny_girl';

    // WeChat built-in browser blocks getUserMedia — skip mic entirely
    if (isWeChat) return;

    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true });
      s.getTracks().forEach(t => t.stop());
      this.isSupported = true;
    } catch (e) {
      console.warn('Mic permission denied:', e.message);
    }

    const loadVoices = () => {
      this.voices = this.synthesis.getVoices().filter(v => v.lang.startsWith('en'));
    };
    loadVoices();
    this.synthesis.addEventListener('voiceschanged', loadVoices);
  },

  setStyle(key) {
    if (!VOICE_PROFILES[key]) return;
    this.currentStyle = key;
    localStorage.setItem('eb_voice_style', key);
  },

  getProfile() {
    return VOICE_PROFILES[this.currentStyle] || VOICE_PROFILES.sunny_girl;
  },

  async start() {
    if (!this.isSupported || this.isListening) return;
    this.isListening = true;
    this._accText = '';
    this._frameCount = 0;

    try {
      const [urlData, micStream] = await Promise.all([
        fetch(`${CONFIG.API_BASE}/api/xfyun-url`).then(r => r.json()),
        navigator.mediaDevices.getUserMedia({ audio: true }),
      ]);

      this._micStream = micStream;
      this._audioCtx = new AudioContext({ sampleRate: 16000 });

      this._ws = new WebSocket(urlData.url);
      const appid = urlData.appid;

      this._ws.onopen = () => {
        const source = this._audioCtx.createMediaStreamSource(this._micStream);
        this._processor = this._audioCtx.createScriptProcessor(4096, 1, 1);

        this._processor.onaudioprocess = (e) => {
          if (!this._ws || this._ws.readyState !== WebSocket.OPEN) return;
          const pcm16 = this._toPCM16(e.inputBuffer.getChannelData(0));
          const audio = this._toBase64(pcm16);
          const frame = this._frameCount === 0
            ? {
                common: { app_id: appid },
                business: { language: 'en_us', domain: 'iat', accent: 'mandarin', vad_eos: 3000 },
                data: { status: 0, format: 'audio/L16;rate=16000', encoding: 'raw', audio },
              }
            : { data: { status: 1, format: 'audio/L16;rate=16000', encoding: 'raw', audio } };
          this._ws.send(JSON.stringify(frame));
          this._frameCount++;
        };

        source.connect(this._processor);
        this._processor.connect(this._audioCtx.destination);
      };

      this._ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.code !== 0) return;
          const words = msg.data?.result?.ws || [];
          const chunk = words.map(w => w.cw.map(c => c.w).join('')).join('');
          if (chunk) { this._accText += chunk; this._onResult(this._accText, false); }
          if (msg.data?.status === 2) {
            this._onResult(this._accText.trim(), true);
            this._cleanup();
            if (this._onEnd) this._onEnd();
          }
        } catch {}
      };

      this._ws.onerror = () => { this._cleanup(); if (this._onEnd) this._onEnd(); };
      this._ws.onclose = () => { if (this.isListening) { this._cleanup(); if (this._onEnd) this._onEnd(); } };

    } catch (err) {
      console.error('Voice start error:', err.message);
      this._cleanup();
      if (this._onEnd) this._onEnd();
    }
  },

  stop() {
    if (!this.isListening || !this._ws) return;
    if (this._ws.readyState === WebSocket.OPEN) {
      this._ws.send(JSON.stringify({ data: { status: 2, format: 'audio/L16;rate=16000', encoding: 'raw', audio: '' } }));
    }
    this._stopMic();
  },

  // Must be called synchronously inside a user gesture (tap/click) to unlock
  // iOS Safari's speech synthesis for subsequent async calls
  unlockSpeech() {
    if (!this.synthesis || this._speechUnlocked) return;
    const silent = new SpeechSynthesisUtterance('');
    silent.volume = 0;
    this.synthesis.speak(silent);
    this._speechUnlocked = true;
  },

  speak(text) {
    if (!this.synthesis) return;
    // Reload voices if empty (iOS loads them lazily)
    if (this.voices.length === 0) {
      this.voices = this.synthesis.getVoices().filter(v => v.lang.startsWith('en'));
    }
    this.synthesis.cancel();

    const profile = this.getProfile();

    const clean = text
      .replace(/<<WORD: ([^>]+)>>/g, '$1')
      .replace(/<<BADGE: \w+>>/g, '')
      .replace(/\[INTERESTS:[^\]]*\]/g, '')
      .replace(/\[SESSION_START\]/g, '')
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/\b([A-Z]{2,})\b/g, w => w[0] + w.slice(1).toLowerCase())
      .replace(/\.{2,}/g, ',')
      .replace(/([!?]){2,}/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) return;

    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'en-US';
    utt.rate = profile.rate;
    utt.pitch = profile.pitch;

    // Find preferred voice by name first
    let voice = null;
    for (const name of profile.prefer) {
      voice = this.voices.find(v => v.name.includes(name));
      if (voice) break;
    }
    // Fallback by gender
    if (!voice) {
      voice = this.voices.find(v => {
        const n = v.name.toLowerCase();
        return profile.femaleNames
          ? FEMALE_VOICE_NAMES.some(fn => n.includes(fn))
          : MALE_VOICE_NAMES.some(mn => n.includes(mn));
      }) || this.voices[0];
    }
    if (voice) utt.voice = voice;

    this.synthesis.speak(utt);
  },

  _stopMic() {
    if (this._processor) { this._processor.disconnect(); this._processor = null; }
    if (this._micStream) { this._micStream.getTracks().forEach(t => t.stop()); this._micStream = null; }
    if (this._audioCtx) { this._audioCtx.close().catch(() => {}); this._audioCtx = null; }
  },

  _cleanup() {
    this._stopMic();
    if (this._ws) { const ws = this._ws; this._ws = null; try { ws.close(); } catch {} }
    this.isListening = false;
  },

  _toPCM16(float32) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      const s = Math.max(-1, Math.min(1, float32[i]));
      out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return out;
  },

  _toBase64(int16) {
    const bytes = new Uint8Array(int16.buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  },
};
