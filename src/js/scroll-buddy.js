/* ════════════════════════════════════════════════════
   SCROLL BUDDY FLAME — scroll-buddy.js
   ════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const SPEED_HAPPY = 0.4;
  const SPEED_ANNOYED = 6;
  const SPEED_ANGRY = 12;

  function init() {
    const wrap = document.getElementById("scroll-buddy");
    if (!wrap) {
      console.warn("scroll-buddy: #scroll-buddy div not found");
      return;
    }

    wrap.innerHTML = `
<svg id="sb-svg" class="breathing" viewBox="0 0 182.02 224.29" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sb-grad" x1="90.81" y1="54.54" x2="90.81" y2="218.93" gradientUnits="userSpaceOnUse">
      <stop id="sb-s0" offset="0"    stop-color="#f59e30"/>
      <stop id="sb-s1" offset=".24"  stop-color="#fdc832"/>
      <stop id="sb-s2" offset=".53"  stop-color="#f19034"/>
      <stop id="sb-s3" offset=".67"  stop-color="#e96032"/>
      <stop id="sb-s4" offset=".83"  stop-color="#e3322e"/>
    </linearGradient>
    <radialGradient id="sb-grad-eye">
      <stop offset=".12" stop-color="#2b0c03"/>
      <stop offset=".89" stop-color="#3d0f00"/>
    </radialGradient>
  </defs>
  
  <path fill="#89181a"
    d="M90.64,224.1c-4.32-.3-4.79-.56-8.52-1.27-19.33-3.69-39.66-6.54-53.35-20.67s-20.82-34.38-18.99-53.98c.91-9.76,3.92-19.32,3.79-29.12s-4.46-20.55-13.57-24.16c7.88,3.16,16,9.39,25.06,8.68,2.07-.16,4.37-.68,5.46-2.45,1.79-2.9-.93-6.35-2.78-9.21-3.93-6.08-4.12-13.98-2.18-20.94s5.79-13.23,9.59-19.38c-1.87,3.04-4.49,7.38-1.74,10.56s7.32,4.05,11.52,4.04c1.18,0,2.43-.07,3.42-.71,1.89-1.22,2.08-3.84,2.29-6.08,1-10.99,7.34-21.36,16.67-27.25,6.81-4.3,14.98-6.28,21.37-11.19s10.35-14.8,5.18-20.97c9.91,16.19,36.11,13.72,48.17,28.39,7.07,8.61,6.96,22.3-.26,30.78,4.31,1.46,9.41,1.95,13.12-.68s4.41-9.26.39-11.39c7.6,3.55,12.22,12.55,10.69,20.79-.9,4.87-3.65,9.19-5.14,13.92-1.49,4.73-1.35,10.63,2.5,13.75s11.39-.09,10.14-4.88c2.86,6.35,4.96,13.05,6.23,19.89,1.3,6.99,1.74,14.12,2.18,21.22.92,14.76-2.94,29.88-6.67,43.04-1.18,4.17-3.71,8.83-5.98,12.52-4.85,7.93-9.4,11.62-14.5,17.54-5.89,6.84-14.38,10.92-22.95,13.76-13.21,4.37-27.25,6.24-41.14,5.47"/>
  
  <path id="sb-body" fill="url(#sb-grad)"
    d="M90.42,218.8c-3.04-.25-3.39-.4-6.24-.93-14.18-2.63-29.07-4.79-39.1-15.15-10.04-10.36-15.26-25.2-13.92-39.56.67-7.15,2.87-14.16,2.78-21.34s-3.27-15.06-9.94-17.71c6.68,2.65,11.72,6.89,18.37,6.36,1.51-.12,3.2-.5,4-1.8,1.31-2.13-.68-4.65-2.04-6.75-2.88-4.45-3.02-10.24-1.6-15.35s4.24-9.69,7.03-14.21c-1.85,3.03-3.29,5.41-1.28,7.74s5.37,2.97,8.45,2.96c.87,0,1.78-.05,2.51-.52,1.39-.89,1.53-2.82,1.68-4.46.73-8.05,5.38-15.66,12.22-19.97,4.99-3.15,10.98-4.61,15.66-8.2,4.68-3.6,7.59-10.84,3.79-15.37,7.27,11.86,26.47,10.06,35.3,20.8,5.18,6.31,5.1,16.34-.19,22.56,3.16,1.07,6.89,1.43,9.62-.5,2.72-1.92,3.23-6.79.29-8.35,5.57,2.6,8.96,9.2,7.83,15.24-.66,3.57-2.68,6.74-3.77,10.2-1.09,3.46-.99,7.79,1.83,10.08s8.34-.06,7.43-3.58c2.1,4.65,3.63,9.56,4.57,14.58.95,5.13,1.28,10.35,1.6,15.55.67,10.82.67,22.23-4.89,31.54-2,3.35-3.05,5.49-4.73,8.19-3.09,4.98-6.54,9.5-10.28,13.85-4.32,5.02-10.54,8.01-16.82,10.09-9.68,3.21-19.97,4.57-30.15,4.01"/>
  
  <g id="sb-eye-l">
    <path id="sb-eye-l-w" fill="white" d=""/>
    <path id="sb-eye-l-p" fill="url(#sb-grad-eye)" d=""/>
  </g>
  
  <g id="sb-eye-r">
    <path id="sb-eye-r-w" fill="white" d=""/>
    <path id="sb-eye-r-p" fill="url(#sb-grad-eye)" d=""/>
  </g>
  
  <path id="sb-mouth" fill="url(#sb-grad-eye)" d=""/>
  
  <circle id="sb-spark-a" r="3"   fill="#fdc832" opacity="0"/>
  <circle id="sb-spark-b" r="2"   fill="#f59e30" opacity="0"/>
  <circle id="sb-spark-c" r="2.5" fill="#fdc832" opacity="0"/>
</svg>`;

    const svg = document.getElementById("sb-svg");
    const s1 = document.getElementById("sb-s1");
    const s2 = document.getElementById("sb-s2");
    const s3 = document.getElementById("sb-s3");
    const eyeLW = document.getElementById("sb-eye-l-w");
    const eyeLPu = document.getElementById("sb-eye-l-p");
    const eyeRW = document.getElementById("sb-eye-r-w");
    const eyeRPu = document.getElementById("sb-eye-r-p");
    const eyeL = document.getElementById("sb-eye-l");
    const eyeR = document.getElementById("sb-eye-r");
    const mouth = document.getElementById("sb-mouth");
    const spA = document.getElementById("sb-spark-a");
    const spB = document.getElementById("sb-spark-b");
    const spC = document.getElementById("sb-spark-c");

    const MOUTH_HAPPY =
      "M102.78,203.21c-8.66,1.87-17.78,1.59-26.31-.82-4.59-1.29-9.43-3.59-11.26-8-.57-1.36-.8-2.83-.97-4.29-.28-2.45-.26-5.27,1.57-6.92,1.35-1.21,3.31-1.42,5.12-1.28,4.91.37,9.39,2.8,14.11,4.22,7.32,2.2,15.35,1.92,22.5-.8,2.81-1.07,5.6-2.52,8.6-2.43,1.35.04,2.71.42,3.77,1.25,1.96,1.53,2.53,4.4,1.84,6.79s-2.28,4.56-4.38,5.9c-6.68,4.26-6.41,4.05-14.6,6.38";
    const MOUTH_ANGRY =
      "M68.77,185.25c4.57-.57,11.86.36,15.86,3.87,1.53,1.35,2.93,2.96,4.83,3.7,2.89,1.11,6.13-.11,8.9-1.49,4.11-2.05,8.03-4.49,12.32-6.14s9.08-2.47,13.47-1.14c1.57.48,3.07,1.23,4.27,2.34,2.2,2.03,3.2,5.15,3.09,8.14-.24,5.98-4.77,11.26-10.32,13.5-5.55,2.24-11.9,1.82-17.61.04-2.2-.69-4.35-1.57-6.6-2.03-3.8-.78-7.74-.34-11.54.41-4.44.87-8.81,2.15-13.02,3.82-3.97,1.57-5.54,2.78-11.14,1.01-2.38-.75-4.92-3.54-6.33-9.2-1.31-5.25,1.86-8.61,4.32-11.42s5.81-4.93,9.5-5.41";

    function ellipsePath(cx, cy, rx, ry) {
      const k = 0.5522848;
      const kx = rx * k,
        ky = ry * k;
      return `M${cx},${cy - ry}C${cx + kx},${cy - ry} ${cx + rx},${cy - ky} ${cx + rx},${cy}C${cx + rx},${cy + ky} ${cx + kx},${cy + ry} ${cx},${cy + ry}C${cx - kx},${cy + ry} ${cx - rx},${cy + ky} ${cx - rx},${cy}C${cx - rx},${cy - ky} ${cx - kx},${cy - ry} ${cx},${cy - ry}Z`;
    }

    function noise(t, s) {
      return (
        Math.sin(t * 1.31 + s) * 0.45 +
        Math.sin(t * 2.73 + s * 1.37) * 0.33 +
        Math.sin(t * 0.67 + s * 0.91) * 0.22
      );
    }

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    let lastScrollY = window.scrollY;
    let rawSpeed = 0;
    let smoothSpeed = 0;
    let anger = 0;
    let lastTime = performance.now();

    const sparks = [
      { el: spA, phase: 0, spd: 0.022, bx: 72, amp: 12 },
      { el: spB, phase: 2.1, spd: 0.031, bx: 100, amp: 8 },
      { el: spC, phase: 4.4, spd: 0.018, bx: 55, amp: 15 },
    ];

    window.addEventListener(
      "scroll",
      function () {
        const now = performance.now();
        const dt = Math.max(now - lastTime, 16);
        rawSpeed = (Math.abs(window.scrollY - lastScrollY) / dt) * 16;
        lastScrollY = window.scrollY;
        lastTime = now;
      },
      { passive: true },
    );

    function frame(ts) {
      const t = ts * 0.001;

      smoothSpeed = lerp(smoothSpeed, rawSpeed, 0.08);
      rawSpeed *= 0.75;

      let target;
      if (smoothSpeed < 0.1) target = 0;
      else if (smoothSpeed < SPEED_HAPPY) target = 1;
      else if (smoothSpeed < SPEED_ANNOYED) target = 1.8;
      else if (smoothSpeed < SPEED_ANGRY) target = 2.5;
      else target = 3;

      anger = lerp(anger, target, 0.04);

      const t2 = clamp((anger - 1) / 1.5, 0, 1);
      const t3 = clamp((anger - 2) / 1, 0, 1);

      if (t3 > 0.4) {
        svg.classList.remove("breathing");
        svg.classList.add("shaking");
      } else {
        svg.classList.remove("shaking");
        svg.classList.add("breathing");
      }

      const fl = noise(t, 0);
      const fl2 = noise(t, 3.71);
      const fl3 = noise(t, 7.13);

      const floatY = fl * 2.8 * (1 - t3 * 0.7);
      const rageY = t3 * Math.abs(Math.sin(t * 12)) * 1.5;
      svg.style.marginBottom = (floatY - rageY).toFixed(2) + "px";

      const glowSz = (lerp(16, 32, t3) + fl * 7).toFixed(1);
      const glowAl = (lerp(0.35, 0.8, t3) + fl2 * 0.1).toFixed(2);
      const glowR = Math.round(lerp(200, 230, t3));
      const glowG = Math.round(lerp(60, 30, t3));
      svg.style.filter = `drop-shadow(0 5px ${glowSz}px rgba(${glowR},${glowG},0,${glowAl}))`;

      const fo = fl * 0.025;
      s1.setAttribute("offset", (lerp(0.24, 0.12, t2) + fo).toFixed(3));
      s2.setAttribute("offset", (lerp(0.53, 0.32, t2) + fo).toFixed(3));
      s3.setAttribute("offset", (lerp(0.67, 0.46, t2) + fo * 0.5).toFixed(3));

      const rxHappy = 15.77,
        ryHappy = 21.17;
      const rxAngry = 14,
        ryAngry = 15;
      const prxHappy = 4.79,
        pryHappy = 6.43;
      const prxAngry = 3.5,
        pryAngry = 5;

      const rx = lerp(rxHappy, rxAngry, easeInOutQuad(t2));
      const ry = lerp(ryHappy, ryAngry, easeInOutQuad(t2));
      const prx = lerp(prxHappy, prxAngry, easeInOutQuad(t2));
      const pry = lerp(pryHappy, pryAngry, easeInOutQuad(t2));

      const lcy = lerp(160.28, 158, easeInOutQuad(t2)) + fl3 * 0.6;
      const rcy = lerp(160.28, 158, easeInOutQuad(t2)) + fl3 * 0.6;

      const rotL = lerp(0, -35, easeInOutQuad(t2)).toFixed(1);
      const rotR = lerp(0, 35, easeInOutQuad(t2)).toFixed(1);

      eyeLW.setAttribute("d", ellipsePath(43.85, lcy, rx, ry));
      eyeLPu.setAttribute("d", ellipsePath(43.85, lcy, prx, pry));
      eyeRW.setAttribute("d", ellipsePath(142.88, rcy, rx, ry));
      eyeRPu.setAttribute("d", ellipsePath(142.88, rcy, prx, pry));

      eyeL.setAttribute("transform", `rotate(${rotL},43.85,${lcy.toFixed(1)})`);
      eyeR.setAttribute(
        "transform",
        `rotate(${rotR},142.88,${rcy.toFixed(1)})`,
      );

      if (t3 < 0.6) {
        mouth.setAttribute("d", MOUTH_HAPPY);
        mouth.setAttribute("opacity", (1 - Math.pow(t3, 1.5) * 0.3).toFixed(2));
      } else {
        mouth.setAttribute("d", MOUTH_ANGRY);
        mouth.setAttribute(
          "opacity",
          (Math.pow(Math.max(0, t3 - 0.6), 1.2) * 1.5).toFixed(2),
        );
      }

      const si = lerp(0.4, 2, t3) + lerp(0, 0.3, t2);
      sparks.forEach((sp) => {
        sp.phase += sp.spd * si;
        const prog = sp.phase % 1;
        const y = 28 - prog * 60;
        const x = sp.bx + Math.sin(sp.phase * 4.1 + sp.bx) * sp.amp;
        const op =
          prog < 0.15 ? prog / 0.15 : prog > 0.75 ? (1 - prog) / 0.25 : 1;
        const r = lerp(3, 1, prog);
        sp.el.setAttribute("cx", x.toFixed(1));
        sp.el.setAttribute("cy", y.toFixed(1));
        sp.el.setAttribute("r", r.toFixed(2));
        sp.el.setAttribute("opacity", (op * lerp(0.4, 1, t3)).toFixed(2));
      });

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
