const card    = document.getElementById('card');
const wrap    = document.getElementById('wrap');
const btn     = document.getElementById('flipbtn');
const hint    = document.getElementById('hint');

let rotX      = -6;
let rotY      = 14;
let flipped   = false;
let dragging  = false;
let hasDragged = false;
let sx, sy, ox, oy;

gsap.set(card, { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' });

function flip() {
  flipped = !flipped;
  const targetY = flipped ? rotY + 180 : rotY - 180;

  gsap.to(card, {
    rotateY: targetY,
    rotateX: -6,
    duration: 0.85,
    ease: 'power3.inOut',
    onComplete: () => {
      rotX = -6;
      rotY = targetY;
    }
  });

  btn.textContent = flipped ? 'Voir le recto' : 'Retourner la carte';
}

function onDown(cx, cy) {
  dragging   = true;
  hasDragged = false;
  sx = cx; sy = cy;
  ox = rotX; oy = rotY;
  gsap.killTweensOf(card);
}

function onMove(cx, cy) {
  if (!dragging) return;

  const dx = cx - sx;
  const dy = cy - sy;

  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged = true;

  rotX = Math.max(-30, Math.min(30, ox - dy * 0.25));
  rotY = oy + dx * 0.35;

  gsap.set(card, { rotateX: rotX, rotateY: rotY + (flipped ? 180 : 0) });
}

function onUp() {
  if (!dragging) return;
  dragging = false;

  if (!hasDragged) {
    flip();
    return;
  }

  gsap.to(card, {
    rotateX: -6,
    duration: 1.2,
    ease: 'elastic.out(1, 0.6)',
    onUpdate: () => { rotX = gsap.getProperty(card, 'rotateX'); }
  });
}

btn.addEventListener('click', flip);

wrap.addEventListener('mousedown', (e) => { if (e.target !== btn) { onDown(e.clientX, e.clientY); e.preventDefault(); } });
window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
window.addEventListener('mouseup', onUp);

wrap.addEventListener('touchstart', (e) => { if (e.target !== btn) { const t = e.touches[0]; onDown(t.clientX, t.clientY); e.preventDefault(); } }, { passive: false });
window.addEventListener('touchmove', (e) => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: false });
window.addEventListener('touchend', onUp);

gsap.to(hint, { opacity: 0, delay: 3, duration: 1 });
