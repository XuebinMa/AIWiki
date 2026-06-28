/**
 * Mermaid 图「点击放大」。两个主题通用。
 *
 * Mermaid 在客户端异步渲染（静态 HTML 里没有 SVG），所以不在渲染后逐个挂监听，
 * 而是在 document 上做**事件委托**——点到 .docusaurus-mermaid-container 就弹出
 * 全屏叠层放大（滚轮缩放、拖拽平移、Esc / 点背景 / 点关闭按钮收起）。这样无论图
 * 何时渲染、路由怎么切都生效，且只挂一个监听。
 *
 * 叠层背景用 --ifm-background-color，跟随明暗主题——因为 Mermaid 的配色也跟随主题，
 * 暗色模式下是浅字深底，叠层就得给深底，否则字看不清。
 */
const CONTAINER = 'docusaurus-mermaid-container';
const MIN_SCALE = 0.4;
const MAX_SCALE = 8;

let attached = false;
let overlay = null;
let stage = null;
let scale = 1;
let tx = 0;
let ty = 0;
let dragging = false;
let lastX = 0;
let lastY = 0;

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function apply() {
  if (stage) {
    stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.classList.remove('mermaid-zoom-open');
  if (stage) stage.innerHTML = '';
}

function ensureOverlay() {
  if (overlay) return;
  overlay = document.createElement('div');
  overlay.className = 'mermaid-zoom-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'mermaid-zoom-close';
  closeBtn.setAttribute('aria-label', '关闭 / Close');
  closeBtn.textContent = '×'; // ×
  closeBtn.addEventListener('click', close);

  stage = document.createElement('div');
  stage.className = 'mermaid-zoom-stage';

  overlay.appendChild(closeBtn);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);

  // 点叠层空白处（不是图）关闭
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  // 拖拽平移
  stage.addEventListener('mousedown', (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    stage.style.cursor = 'grabbing';
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    tx += e.clientX - lastX;
    ty += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    apply();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    if (stage) stage.style.cursor = 'grab';
  });
  // 滚轮缩放
  overlay.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * factor));
      apply();
    },
    { passive: false },
  );
}

function open(svg) {
  ensureOverlay();
  const clone = svg.cloneNode(true);
  clone.removeAttribute('id'); // 避免与页内 SVG 的 id 冲突
  stage.innerHTML = '';
  stage.appendChild(clone);
  scale = 1;
  tx = 0;
  ty = 0;
  apply();
  overlay.classList.add('is-open');
  document.body.classList.add('mermaid-zoom-open');
}

function onClick(e) {
  if (overlay && overlay.contains(e.target)) return; // 叠层内部点击不重入
  const container = e.target.closest && e.target.closest(`.${CONTAINER}`);
  if (!container) return;
  const svg = container.querySelector('svg');
  if (!svg) return;
  open(svg);
}

function onKey(e) {
  if (e.key === 'Escape') close();
}

if (isBrowser() && !attached) {
  attached = true;
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
}
