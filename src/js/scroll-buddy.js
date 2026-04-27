/* ================================================
   SCROLL BUDDY FLAME — scroll-buddy.js
   Placez avant </body> ou avec defer.
   Requiert : <div id="scroll-buddy"></div>
              + scroll-buddy.css dans le <head>
   ================================================ */

(function () {
  'use strict';

  /* -------- CONFIG -------- */
  const SPEED_HAPPY   = 0.4;
  const SPEED_ANNOYED = 3.5;
  const SPEED_ANGRY   = 9;
  /* ------------------------ */

  const wrap = document.getElementById('scroll-buddy');
  if (!wrap) return;

  wrap.innerHTML = `
<svg id="sb-svg" class="breathing" viewBox="0 0 182.02 224.29" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sb-grad-body" x1="90.81" y1="54.54" x2="90.81" y2="218.93" gradientUnits="userSpaceOnUse">
      <stop id="sb-stop0" offset="0"   stop-color="#f59e30"/>
      <stop id="sb-stop1" offset=".14" stop-color="#fdc832"/>
      <stop id="sb-stop2" offset=".35" stop-color="#f19034"/>
      <stop id="sb-stop3" offset=".55" stop-color="#e96032"/>
      <stop id="sb-stop4" offset=".72" stop-color="#e3322e"/>
    </linearGradient>
    <radialGradient id="sb-grad-eye" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
      <stop offset=".12" stop-color="#2b0c03"/>
      <stop offset=".89" stop-color="#3d0f00"/>
    </radialGradient>
  </defs>

  <!-- Contour / ombre -->
  <path id="sb-outline" fill="#89181a"
    d="M90.64,224.1c-4.32-.3-4.79-.56-8.52-1.27-19.33-3.69-39.66-6.54-53.35-20.67s-20.82-34.38-18.99-53.98c.91-9.76,3.92-19.32,3.79-29.12s-4.46-20.55-13.57-24.16c7.88,3.16,16,9.39,25.06,8.68,2.07-.16,4.37-.68,5.46-2.45,1.79-2.9-.93-6.35-2.78-9.21-3.93-6.08-4.12-13.98-2.18-20.94s5.79-13.23,9.59-19.38c-1.87,3.04-4.49,7.38-1.74,10.56s7.32,4.05,11.52,4.04c1.18,0,2.43-.07,3.42-.71,1.89-1.22,2.08-3.84,2.29-6.08,1-10.99,7.34-21.36,16.67-27.25,6.81-4.3,14.98-6.28,21.37-11.19s10.35-14.8,5.18-20.97c9.91,16.19,36.11,13.72,48.17,28.39,7.07,8.61,6.96,22.3-.26,30.78,4.31,1.46,9.41,1.95,13.12-.68s4.41-9.26.39-11.39c7.6,3.55,12.22,12.55,10.69,20.79-.9,4.87-3.65,9.19-5.14,13.92-1.49,4.73-1.35,10.63,2.5,13.75s11.39-.09,10.14-4.88c2.86,6.35,4.96,13.05,6.23,19.89,1.3,6.99,1.74,14.12,2.18,21.22.92,14.76-2.94,29.88-6.67,43.04-1.18,4.17-3.71,8.83-5.98,12.52-4.85,7.93-9.4,11.62-14.5,17.54-5.89,6.84-14.38,10.92-22.95,13.76-13.21,4.37-27.25,6.24-41.14,5.47"/>

  <!-- Corps avec dégradé -->
  <path id="sb-body" fill="url(#sb-grad-body)"
    d="M90.43,218.8c-3.04-.25-3.39-.4-6.24-.93-14.18-2.63-29.07-4.79-39.1-15.15-10.04-10.36-15.26-25.2-13.92-39.56.67-7.15,2.87-14.16,2.78-21.34s-3.27-15.06-9.94-17.71c6.68,2.65,11.72,6.89,18.37,6.36,1.51-.12,3.2-.5,4-1.8,1.31-2.13-.68-4.65-2.04-6.75-2.88-4.45-3.02-10.24-1.6-15.35s4.24-9.69,7.03-14.21c-1.85,3.03-3.29,5.41-1.28,7.74s5.37,2.97,8.45,2.96c.87,0,1.78-.05,2.51-.52,1.39-.89,1.53-2.82,1.68-4.46.73-8.05,5.38-15.66,12.22-19.97,4.99-3.15,10.98-4.61,15.66-8.2,4.68-3.6,7.59-10.84,3.79-15.37,7.27,11.86,26.47,10.06,35.3,20.8,5.18,6.31,5.1,16.34-.19,22.56,3.16,1.07,6.89,1.43,9.62-.5,2.72-1.92,3.23-6.79.29-8.35,5.57,2.6,8.96,9.2,7.83,15.24-.66,3.57-2.68,6.74-3.77,10.2-1.09,3.46-.99,7.79,1.83,10.08s8.34-.06,7.43-3.58c2.1,4.65,3.63,9.56,4.57,14.58.95,5.13,1.28,10.35,1.6,15.55.67,10.82.67,22.23-4.89,31.54-2,3.35-3.05,5.49-4.73,8.19-3.09,4.98-6.54,9.5-10.28,13.85-4.32,5.02-10.54,8.01-16.82,10.09-9.68,3.21-19.97,4.57-30.15,4.01"/>

  <!-- Yeux -->
  <g id="sb-eyes">
    <ellipse id="sb-eye-l-white" cx="43.85" cy="160.28" rx="15.77" ry="21.17" fill="white"/>
    <ellipse id="sb-eye-l-pupil" cx="43.85" cy="160.28" rx="4.79"  ry="6.43"  fill="url(#sb-grad-eye)"/>
    <ellipse id="sb-eye-r-white" cx="142.88" cy="160.28" rx="15.77" ry="21.17" fill="white"/>
    <ellipse id="sb-eye-r-pupil" cx="142.88" cy="160.28" rx="4.79"  ry="6.43"  fill="url(#sb-grad-eye)"/>
  </g>

  <!-- Bouche -->
  <path id="sb-mouth" fill="url(#sb-grad-eye)"/>

  <!-- Sourcils (cachés par défaut) -->
  <g id="sb-brows" opacity="0">
    <rect id="sb-brow-l-rect" x="26" y="142" width="36" height="9" rx="4.5"
          fill="#89181a" transform="rotate(25, 44, 146.5)"/>
    <rect id="sb-brow-r-rect" x="120" y="142" width="36" height="9" rx="4.5"
          fill="#89181a" transform="rotate(-25, 143, 146.5)"/>
  </g>

  <!-- Particules de flamme (petits éclats qui montent) -->
  <g id="sb-sparks" opacity="1">
    <circle id="sb-spark-a" r="3" fill="#fdc832" opacity="0"/>
    <circle id="sb-spark-b" r="2" fill="#f59e30" opacity="0"/>
    <circle id="sb-spark-c" r="2.5" fill="#fdc832" opacity="0"/>
  </g>
</svg>`;

  /* --- Refs --- */
  const svg    = document.getElementById('sb-svg');
  const stop1  = document.getElementById('sb-stop1');
  const stop2  = document.getElementById('sb-stop2');
  const stop3  = document.getElementById('sb-stop3');
  const eyeLW  = document.getElementById('sb-eye-l-white');
  const eyeLPu = document.getElementById('sb-eye-l-pupil');
  const eyeRW  = document.getElementById('sb-eye-r-white');
  const eyeRPu = document.getElementById('sb-eye-r-pupil');
  const mouth  = document.getElementById('sb-mouth');
  const brows  = document.getElementById('sb-brows');
  const browL  = document.getElementById('sb-brow-l-rect');
  const browR  = document.getElementById('sb-brow-r-rect');
  const sparkA = document.getElementById('sb-spark-a');
  const sparkB = document.getElementById('sb-spark-b');
  const sparkC = document.getElementById('sb-spark-c');

  /* --- State --- */
  let lastScrollY = window.scrollY;
  let rawSpeed    = 0;
  let smoothSpeed = 0;
  let anger       = 0;
  let lastTime    = performance.now();

  /* Sparks state */
  const sparks = [
    { el: sparkA, phase: 0,    speed: 0.022, x: 72,  amp: 12 },
    { el: sparkB, phase: 2.1,  speed: 0.031, x: 100, amp: 8  },
    { el: sparkC, phase: 4.4,  speed: 0.018, x: 55,  amp: 15 },
  ];

  /* Noise léger : simple sinusoïdes à fréquences irrationnelles */
  function noise(t, seed) {
    return Math.sin(t * 1.3 + seed) * 0.5
         + Math.sin(t * 2.7 + seed * 1.4) * 0.3
         + Math.sin(t * 0.7 + seed * 0.8) * 0.2;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }

  window.addEventListener('scroll', function () {
    const now = performance.now();
    const dt  = Math.max(now - lastTime, 16);
    rawSpeed    = Math.abs(window.scrollY - lastScrollY) / dt * 16;
    lastScrollY = window.scrollY;
    lastTime    = now;
  }, { passive: true });

  const MOUTH_HAPPY = `M68.77,185.25c4.57-.57,11.86.36,15.86,3.87,1.53,1.35,2.93,2.96,4.83,3.7,2.89,1.11,6.13-.11,8.9-1.49,4.11-2.05,8.03-4.49,12.32-6.14s9.08-2.47,13.47-1.14c1.57.48,3.07,1.23,4.27,2.34,2.2,2.03,3.2,5.15,3.09,8.14-.24,5.98-4.77,11.26-10.32,13.5-5.55,2.24-11.9,1.82-17.61.04-2.2-.69-4.35-1.57-6.6-2.03-3.8-.78-7.74-.34-11.54.41-4.44.87-8.81,2.15-13.02,3.82-3.97,1.57-5.54,2.78-11.14,1.01-2.38-.75-4.92-3.54-6.33-9.2-1.31-5.25,1.86-8.61,4.32-11.42s5.81-4.93,9.5-5.41`;
  const MOUTH_ANGRY = `M102.78,203.21c-8.66,1.87-17.78,1.59-26.31-.82-4.59-1.29-9.43-3.59-11.26-8-.57-1.36-.8-2.83-.97-4.29-.28-2.45-.26-5.27,1.57-6.92,1.35-1.21,3.31-1.42,5.12-1.28,4.91.37,9.39,2.8,14.11,4.22,7.32,2.2,15.35,1.92,22.5-.8,2.81-1.07,5.6-2.52,8.6-2.43,1.35.04,2.71.42,3.77,1.25,1.96,1.53,2.53,4.4,1.84,6.79s-2.28,4.56-4.38,5.9c-6.68,4.26-6.41,4.05-14.6,6.38`;

  function frame(ts) {
    const t = ts * 0.001; // secondes

    /* --- Vitesse & colère --- */
    smoothSpeed = lerp(smoothSpeed, rawSpeed, 0.14);
    rawSpeed   *= 0.8;

    let target;
    if      (smoothSpeed < 0.1)           target = 0;
    else if (smoothSpeed < SPEED_HAPPY)   target = 1;
    else if (smoothSpeed < SPEED_ANNOYED) target = 1.8;
    else if (smoothSpeed < SPEED_ANGRY)   target = 2.5;
    else                                  target = 3;

    anger = lerp(anger, target, 0.09);

    const t2 = clamp((anger - 1) / 1.5, 0, 1);
    const t3 = clamp((anger - 2) / 1,   0, 1);

    /* --- Animation CSS classe --- */
    if (t3 > 0.5) {
      svg.classList.remove('breathing');
      svg.classList.add('shaking');
    } else {
      svg.classList.remove('shaking');
      svg.classList.add('breathing');
    }

    /* --- Flamme : oscillation organique du corps via le filtre drop-shadow
           et une légère translation verticale sinusoïdale               --- */
    const flicker  = noise(t, 0);          // -1..1
    const flicker2 = noise(t, 3.7);
    // Légère translation Y qui simule la flamme qui respire
    const floatY = flicker * 2.5 * (1 - t3 * 0.8);
    // On combine avec un rebond doux en mode colère
    const rageY  = t3 > 0 ? Math.abs(Math.sin(t * 14)) * t3 * 2 : 0;
    svg.style.marginBottom = `${floatY - rageY}px`;

    /* Halo drop-shadow qui palpite */
    const glowBase   = lerp(18, 30, t3);
    const glowPulse  = glowBase + flicker * 6;
    const glowAlpha  = lerp(0.4, 0.75, t3) + flicker2 * 0.08;
    const glowColor  = t3 > 0.3 ? `rgba(220,40,0,${glowAlpha.toFixed(2)})` : `rgba(200,60,0,${glowAlpha.toFixed(2)})`;
    svg.style.filter = `drop-shadow(0 6px ${glowPulse.toFixed(1)}px ${glowColor})`;

    /* --- Stops du dégradé qui bougent → flamme plus vive quand en colère --- */
    const flickerOfs = flicker * 0.03;
    stop1.setAttribute('offset', (lerp(0.14, 0.08, t2) + flickerOfs).toFixed(3));
    stop2.setAttribute('offset', (lerp(0.35, 0.20, t2) + flickerOfs).toFixed(3));
    stop3.setAttribute('offset', (lerp(0.55, 0.38, t2) + flickerOfs * 0.5).toFixed(3));

    /* --- Yeux --- */
    const lcy = lerp(160.28, 157, t3);
    const lrx = lerp(15.77,  13,  t3);
    const lry = lerp(21.17,  16,  t3);

    eyeLW.setAttribute('rx', lrx.toFixed(2));
    eyeLW.setAttribute('ry', lry.toFixed(2));
    eyeLW.setAttribute('cy', lcy.toFixed(2));
    eyeLPu.setAttribute('rx', lerp(4.79, 4, t3).toFixed(2));
    eyeLPu.setAttribute('ry', lerp(6.43, 5, t3).toFixed(2));
    eyeLPu.setAttribute('cy', lcy.toFixed(2));

    eyeRW.setAttribute('rx', lrx.toFixed(2));
    eyeRW.setAttribute('ry', lry.toFixed(2));
    eyeRW.setAttribute('cy', lcy.toFixed(2));
    eyeRPu.setAttribute('rx', lerp(4.79, 4, t3).toFixed(2));
    eyeRPu.setAttribute('ry', lerp(6.43, 5, t3).toFixed(2));
    eyeRPu.setAttribute('cy', lcy.toFixed(2));

    const eyeRotL = lerp(0, -15, t3);
    const eyeRotR = lerp(0,  15, t3);
    eyeLW.setAttribute('transform',  `rotate(${eyeRotL.toFixed(1)}, 43.85, ${lcy.toFixed(1)})`);
    eyeLPu.setAttribute('transform', `rotate(${eyeRotL.toFixed(1)}, 43.85, ${lcy.toFixed(1)})`);
    eyeRW.setAttribute('transform',  `rotate(${eyeRotR.toFixed(1)}, 142.88, ${lcy.toFixed(1)})`);
    eyeRPu.setAttribute('transform', `rotate(${eyeRotR.toFixed(1)}, 142.88, ${lcy.toFixed(1)})`);

    /* --- Sourcils --- */
    brows.setAttribute('opacity', t2.toFixed(2));
    const angL =  25 + t3 * 10;
    const angR = -(25 + t3 * 10);
    browL.setAttribute('transform', `rotate(${angL.toFixed(1)}, 44, 146.5)`);
    browR.setAttribute('transform', `rotate(${angR.toFixed(1)}, 143, 146.5)`);

    /* --- Bouche --- */
    mouth.setAttribute('d', t3 > 0.5 ? MOUTH_ANGRY : MOUTH_HAPPY);

    /* --- Particules / étincelles qui montent --- */
    const sparkIntensity = lerp(0.5, 1.8, t3);
    sparks.forEach(sp => {
      sp.phase += sp.speed * sparkIntensity;
      // Position Y : part du haut de la flamme (~30) et monte
      const progress = (sp.phase % 1);
      const y = 30 - progress * 55;                    // monte de 30 à -25
      const x = sp.x + Math.sin(sp.phase * 4.3) * sp.amp;
      const op = progress < 0.15
        ? progress / 0.15                              // apparition
        : progress > 0.7
          ? (1 - progress) / 0.3                      // disparition
          : 1;
      const r = lerp(3, 1.2, progress);

      sp.el.setAttribute('cx', x.toFixed(1));
      sp.el.setAttribute('cy', y.toFixed(1));
      sp.el.setAttribute('r',  r.toFixed(2));
      sp.el.setAttribute('opacity', (op * lerp(0.55, 1, t3)).toFixed(2));
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
