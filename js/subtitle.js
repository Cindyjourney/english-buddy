// subtitle.js — standalone, no dependency on other English Buddy JS files

const API_BASE = (() => {
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  return isLocal ? 'http://localhost:3001' : window.location.origin;
})();

let selectedFile = null;
let srtContent = '';
let txtContent = '';

// ── DOM refs ──────────────────────────────────────────────────────────────────
const dropZone    = document.getElementById('drop-zone');
const fileInput   = document.getElementById('file-input');
const previewEl   = document.getElementById('video-preview');
const previewName = document.getElementById('preview-name');
const previewMeta = document.getElementById('preview-meta');
const previewChg  = document.getElementById('preview-change');
const startBtn    = document.getElementById('start-btn');
const progressWrap= document.getElementById('progress-wrap');
const uploadFill  = document.getElementById('upload-fill');
const uploadLabel = document.getElementById('upload-label');
const errorBox    = document.getElementById('error-box');
const errorMsg    = document.getElementById('error-msg');
const retryBtn    = document.getElementById('retry-btn');
const resultWrap  = document.getElementById('result-wrap');
const resultText  = document.getElementById('result-text');
const btnSRT      = document.getElementById('btn-srt');
const btnTXT      = document.getElementById('btn-txt');
const btnCopy     = document.getElementById('btn-copy');
const btnAgain    = document.getElementById('btn-again');
const copyToast   = document.getElementById('copy-toast');

// ── File selection ─────────────────────────────────────────────────────────────
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => { if (fileInput.files[0]) selectFile(fileInput.files[0]); });

dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('video/')) selectFile(f);
  else showError('请选择视频文件（MP4 / MOV / WebM）');
});

previewChg.addEventListener('click', () => fileInput.click());

function selectFile(file) {
  if (file.size > 500 * 1024 * 1024) {
    showError('文件超过 500MB，请先压缩或截短视频后再试。');
    return;
  }
  selectedFile = file;
  const sizeMB = (file.size / 1024 / 1024).toFixed(1);
  previewName.textContent = file.name;
  previewMeta.textContent = `${sizeMB} MB · ${file.type || 'video'}`;
  previewEl.classList.add('visible');
  startBtn.disabled = false;
  resetUI();
}

// ── Start ──────────────────────────────────────────────────────────────────────
startBtn.addEventListener('click', () => {
  if (!selectedFile) return;
  startExtraction(selectedFile);
});

retryBtn.addEventListener('click', () => {
  if (selectedFile) startExtraction(selectedFile);
});

btnAgain.addEventListener('click', () => {
  selectedFile = null;
  srtContent = '';
  txtContent = '';
  previewEl.classList.remove('visible');
  startBtn.disabled = true;
  fileInput.value = '';
  resetUI();
});

async function startExtraction(file) {
  resetUI();
  startBtn.disabled = true;
  progressWrap.classList.add('visible');
  setStep('upload');

  try {
    const response = await uploadWithProgress(file);
    await readSSEStream(response);
  } catch (err) {
    showError(err.message || '网络错误，请重试。');
  }
}

// ── Upload with XHR progress ───────────────────────────────────────────────────
function uploadWithProgress(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('video', file);

    xhr.open('POST', `${API_BASE}/api/subtitle`, true);
    xhr.responseType = 'text';

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round(e.loaded / e.total * 100);
      uploadFill.style.width = pct + '%';
      uploadLabel.textContent = `上传中 ${pct}%（${(e.loaded / 1024 / 1024).toFixed(1)} / ${(e.total / 1024 / 1024).toFixed(1)} MB）`;
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // XHR gives us the full SSE text — parse it
        resolve(xhr.responseText);
      } else {
        reject(new Error(`服务器错误 ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('网络连接失败，请检查网络后重试。'));
    xhr.ontimeout = () => reject(new Error('请求超时，视频可能太长，请截短后重试。'));
    xhr.timeout = 10 * 60 * 1000; // 10 minutes

    xhr.send(formData);
  });
}

// ── Parse SSE text (XHR gives us the full response body at once) ──────────────
function readSSEStream(responseText) {
  const lines = responseText.split('\n');
  let finalDone = false;

  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    let evt;
    try { evt = JSON.parse(line.slice(6)); } catch { continue; }

    if (evt.type === 'progress') {
      if (evt.step === 'extract')     setStep('extract', evt.message);
      if (evt.step === 'transcribe')  setStep('transcribe', evt.message);
    } else if (evt.type === 'done') {
      setStep('done');
      srtContent = evt.srt || '';
      txtContent = evt.text || '';
      showResult(txtContent);
      finalDone = true;
    } else if (evt.type === 'error') {
      showError(evt.message || '识别失败，请重试。');
      return;
    }
    // 'ping' events are silently ignored
  }

  if (!finalDone) {
    showError('服务器未返回识别结果，请重试。');
  }
}

// ── UI helpers ─────────────────────────────────────────────────────────────────
const STEPS = ['upload', 'extract', 'transcribe', 'done'];

function setStep(current, label) {
  STEPS.forEach(s => {
    const el = document.getElementById(`step-${s}`);
    if (!el) return;
    const idx = STEPS.indexOf(s);
    const cur = STEPS.indexOf(current);
    el.classList.remove('active', 'done');
    if (idx < cur) el.classList.add('done');
    else if (idx === cur) el.classList.add('active');
  });

  // Update upload progress to 100% once server-side steps begin
  if (current !== 'upload') {
    uploadFill.style.width = '100%';
    uploadLabel.textContent = '上传完成 ✓';
  }

  // Update the step label text if provided
  if (label && current !== 'upload') {
    const el = document.getElementById(`step-${current}`);
    if (el) el.querySelector('span').textContent = label;
  }

  startBtn.disabled = true;
}

function showError(msg) {
  errorBox.classList.add('visible');
  errorMsg.textContent = msg;
  startBtn.disabled = false;
}

function showResult(text) {
  resultText.value = text;
  resultWrap.classList.add('visible');
  startBtn.disabled = false;
}

function resetUI() {
  progressWrap.classList.remove('visible');
  errorBox.classList.remove('visible');
  resultWrap.classList.remove('visible');
  uploadFill.style.width = '0%';
  uploadLabel.textContent = '准备上传...';
  STEPS.forEach(s => {
    const el = document.getElementById(`step-${s}`);
    if (el) {
      el.classList.remove('active', 'done');
      // Restore default label
      const defaultLabels = { upload: '上传视频', extract: '提取音频', transcribe: '语音识别', done: '生成字幕' };
      el.querySelector('span').textContent = defaultLabels[s];
    }
  });
}

// ── Download & Copy ───────────────────────────────────────────────────────────
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

btnSRT.addEventListener('click', () => {
  const base = (selectedFile?.name || 'subtitle').replace(/\.[^.]+$/, '');
  downloadFile(srtContent || resultText.value, `${base}.srt`, 'text/srt;charset=utf-8');
});

btnTXT.addEventListener('click', () => {
  const base = (selectedFile?.name || 'subtitle').replace(/\.[^.]+$/, '');
  downloadFile(txtContent || resultText.value, `${base}.txt`, 'text/plain;charset=utf-8');
});

btnCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultText.value);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = resultText.value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  copyToast.classList.add('show');
  setTimeout(() => copyToast.classList.remove('show'), 2000);
});
