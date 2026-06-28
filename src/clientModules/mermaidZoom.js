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
  // 不要删 id！Mermaid 把内部 <style> 按 #<svgId> 作用域（#mermaid-svg-x .node rect{fill}…）。
  // 删掉 id，这些规则全部失配 → 节点回退成 SVG 默认黑填充（叠层里一堆黑方块）。
  // 重复 id 在这里无害：#id 选择器对两个元素都生效、样式相同；箭头 marker 的 url(#…) 解析到
  // 文档内首个（即原图的）、形状一致。

  // Mermaid 的 SVG 只带 viewBox + 内联 style:max-width，没有 width/height 属性。
  // 在正常文档流里它能靠容器的确定宽度解析出尺寸；但克隆进「收缩到内容」的居中
  // 舞台后，宽度无处可解析 → 塌成 0×0（叠层全黑、看不到图，正是本来的 bug）。
  // 因此读原图真实渲染尺寸，按视口等比算出一个确定像素尺寸作为放大初始大小。
  const r = svg.getBoundingClientRect();
  const vb = svg.viewBox && svg.viewBox.baseVal;
  const w0 = r.width || (vb && vb.width) || 480;
  const h0 = r.height || (vb && vb.height) || 360;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // 放大到填满视口宽度（上限 3×）——这样在任何屏幕尺寸上点开都明显变大、文字更清楚，
  // 直接回应「图太小、想看大图」。若用「整图都塞进视口」的 contain，矮屏上反而会把竖排
  // 长图压得比正文里还小。比视口高的长图可滚轮缩放 / 拖拽浏览。
  const fit = Math.min(3, (vw * 0.92) / w0);
  const W = Math.round(w0 * fit);
  const H = Math.round(h0 * fit);
  clone.style.maxWidth = 'none';
  clone.style.maxHeight = 'none';
  clone.style.width = W + 'px';
  clone.style.height = H + 'px';

  stage.innerHTML = '';
  stage.appendChild(clone);
  scale = 1;
  tx = 0;
  // 图比视口高时，初始把顶部对齐到视口顶——否则 flex 居中会把超高流程图的中段摆在屏幕
  // 中央、切掉起点，读者看不到「从哪开始」。矮于视口则垂直居中。
  ty = H > vh ? Math.round((H - vh) / 2 + 36) : 0;
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
