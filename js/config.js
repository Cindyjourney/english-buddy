// Local dev: frontend runs on :5500 (http-server), backend on :3001
// Production: same origin (Express serves both frontend and API)
const isLocalDev = ['5500', '5501', '8080', '8000'].includes(window.location.port);

// WeChat built-in browser detection — used to disable voice input and force JSON fallback
const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

const CONFIG = {
  API_BASE: isLocalDev ? 'http://localhost:3001' : window.location.origin,
  MAX_HISTORY: 20,
  EXTRACT_EVERY: 3,
  TOEFL_MODE: false,
};
