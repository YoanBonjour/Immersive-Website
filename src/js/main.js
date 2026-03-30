// gasp
import { gsap } from "gsap";

// Chargement de la page
var loadingPage = document.querySelector(".loading-page");
var content = document.querySelector(".content");

loadingPage.style.opacity = 0;
content.style.opacity = 0;
content.style.display = "none";

// Start loading animation immediately
gsap.to(loadingPage, { opacity: 1, duration: 2 });

// Set up promises for load and minimum timer
var loadPromise = new Promise((resolve) => {
  window.addEventListener("load", resolve);
  console.log("Page loaded");
});

var timerPromise = new Promise((resolve) => {
  setTimeout(resolve, 1000);
});

// When both load and timer are done, transition
Promise.all([loadPromise, timerPromise]).then(() => {
  gsap.to(loadingPage, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      loadingPage.style.display = "none";
      content.style.display = "block";
      gsap.to(content, { opacity: 1, duration: 0.5 });
    },
  });
});

// Loupe effect
const zoom = 1;
const loupe = document.getElementById("loupe");
const landscapeImg = document.querySelector(".image-container img:first-child");
const landscape2Img = document.getElementById("landscape-2");

// Toggle de la loupe au clic
landscapeImg.addEventListener("click", function () {
  console.log("Loupe clicked");

  gsap.to("#loupe", {
    width: "500px",
    height: "500px", // 200px * 10 = 2000px
    duration: 1,
    ease: "easeInOut",
    // translateX: "-150px",
    // translateY: "-150px",
  });
  console.log("Loupe clicked");
  setTimeout(() => {
    gsap.to("#loupe", {
      width: "150px",
      height: "150px", // Retour à la taille normale
      duration: 1,
      ease: "easeInOut",
      // translateX: "200px",
      // translateY: "200px",
    });
    console.log("Loupe unclicked");
  }, 2000);
});

// Effet de loupe au survol
if (landscapeImg && landscape2Img) {
  landscapeImg.addEventListener("mousemove", function (event) {
    const rect = landscapeImg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    loupe.style.display = "block";
    loupe.style.left = event.pageX - 106 + "px";
    loupe.style.top = event.pageY - 106 + "px";
    loupe.style.backgroundSize = rect.width * zoom + "px auto";
    loupe.style.backgroundPosition =
      -x * zoom + 100 + "px " + (-y * zoom + 100) + "px";
  });

  landscape2Img.addEventListener("mousemove", function (event) {
    const rect = landscape2Img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    loupe.style.display = "block";
    loupe.style.left = event.pageX - 100 + "px";
    loupe.style.top = event.pageY - 100 + "px";
    loupe.style.backgroundSize = rect.width * zoom + "px auto";
    loupe.style.backgroundPosition =
      -x * zoom + 100 + "px " + (-y * zoom + 100) + "px";
  });

  const hideLoupe = () => {
    loupe.style.display = "none";
  };

  landscapeImg.addEventListener("mouseleave", hideLoupe);
  landscape2Img.addEventListener("mouseleave", hideLoupe);
}

const card = document.getElementById("card");
const wrap = document.getElementById("wrap");
const btn = document.getElementById("flipbtn");
const hint = document.getElementById("hint");

let rotX = -6;
let rotY = 14;
let flipped = false;
let dragging = false;
let hasDragged = false;
let sx, sy, ox, oy;

gsap.set(card, { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" });

function flip() {
  flipped = !flipped;
  const targetY = flipped ? rotY + 180 : rotY - 180;

  gsap.to(card, {
    rotateY: targetY,
    rotateX: -6,
    duration: 0.85,
    ease: "power3.inOut",
    onComplete: () => {
      rotX = -6;
      rotY = targetY;
    },
  });

  btn.textContent = flipped ? "Voir le recto" : "Retourner la carte";
}

function onDown(cx, cy) {
  dragging = true;
  hasDragged = false;
  sx = cx;
  sy = cy;
  ox = rotX;
  oy = rotY;
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
    ease: "elastic.out(1, 0.6)",
    onUpdate: () => {
      rotX = gsap.getProperty(card, "rotateX");
    },
  });
}

btn.addEventListener("click", flip);

wrap.addEventListener("mousedown", (e) => {
  if (e.target !== btn) {
    onDown(e.clientX, e.clientY);
    e.preventDefault();
  }
});
window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
window.addEventListener("mouseup", onUp);

wrap.addEventListener(
  "touchstart",
  (e) => {
    if (e.target !== btn) {
      const t = e.touches[0];
      onDown(t.clientX, t.clientY);
      e.preventDefault();
    }
  },
  { passive: false },
);
window.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  },
  { passive: false },
);
window.addEventListener("touchend", onUp);

gsap.to(hint, { opacity: 0, delay: 3, duration: 1 });

(function () {
  "use strict";

  /* ---- CONFIG : ajustez les seuils de vitesse ---- */
  const SPEED_HAPPY = 6; // en dessous → content
  const SPEED_ANNOYED = 11; // en dessous → agacé
  const SPEED_ANGRY = 16; // au-dessus  → en colère

  const COLOR_SKIN_CALM = "#FAC775";
  const COLOR_BLUSH = "#F09595";
  const COLOR_SWEAT = "#85B7EB";
  const COLOR_ANGER_STAR = "#E24B4A";

  const wrap = document.getElementById("scroll-buddy");
  if (!wrap) return;

  wrap.innerHTML = `
    <div id="sb-label" class="idle">😴 En attente…</div>
    <svg id="sb-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse id="sb-body"    cx="40" cy="66" rx="16" ry="11" fill="${COLOR_SKIN_CALM}"/>
      <circle  id="sb-head"    cx="40" cy="36" r="20"  fill="${COLOR_SKIN_CALM}"/>
      <ellipse id="sb-eye-l"   cx="32" cy="32" rx="3.5" ry="3.5" fill="#2C2C2A"/>
      <ellipse id="sb-eye-r"   cx="48" cy="32" rx="3.5" ry="3.5" fill="#2C2C2A"/>
      <circle  id="sb-pupil-l" cx="33.2" cy="31.5" r="1.4" fill="white"/>
      <circle  id="sb-pupil-r" cx="49.2" cy="31.5" r="1.4" fill="white"/>
      <path    id="sb-brow-l"  d="M29 25 Q32 23 35 25" stroke="#2C2C2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path    id="sb-brow-r"  d="M45 25 Q48 23 51 25" stroke="#2C2C2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path    id="sb-mouth"   d="M33 42 Q40 48 47 42" stroke="#2C2C2A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse id="sb-cheek-l" cx="25" cy="38" rx="4.5" ry="2.8" fill="${COLOR_BLUSH}" opacity="0.5"/>
      <ellipse id="sb-cheek-r" cx="55" cy="38" rx="4.5" ry="2.8" fill="${COLOR_BLUSH}" opacity="0.5"/>
      <path    id="sb-arm-l"   d="M24 60 Q13 55 15 44" stroke="${COLOR_SKIN_CALM}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path    id="sb-arm-r"   d="M56 60 Q67 55 65 44" stroke="${COLOR_SKIN_CALM}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse id="sb-sweat"   cx="57" cy="23" rx="3" ry="4.5" fill="${COLOR_SWEAT}" opacity="0"/>
      <text    id="sb-star1"   x="10" y="22" font-size="11" fill="${COLOR_ANGER_STAR}" opacity="0">✦</text>
      <text    id="sb-star2"   x="60" y="18" font-size="9"  fill="${COLOR_ANGER_STAR}" opacity="0">✦</text>
    </svg>`;

  const svg = document.getElementById("sb-svg");
  const label = document.getElementById("sb-label");
  const head = document.getElementById("sb-head");
  const body_ = document.getElementById("sb-body");
  const eyeL = document.getElementById("sb-eye-l");
  const eyeR = document.getElementById("sb-eye-r");
  const pulL = document.getElementById("sb-pupil-l");
  const pulR = document.getElementById("sb-pupil-r");
  const browL = document.getElementById("sb-brow-l");
  const browR = document.getElementById("sb-brow-r");
  const mouth = document.getElementById("sb-mouth");
  const chkL = document.getElementById("sb-cheek-l");
  const chkR = document.getElementById("sb-cheek-r");
  const armL = document.getElementById("sb-arm-l");
  const armR = document.getElementById("sb-arm-r");
  const sweat = document.getElementById("sb-sweat");
  const star1 = document.getElementById("sb-star1");
  const star2 = document.getElementById("sb-star2");

  let lastScrollY = window.scrollY;
  let rawSpeed = 0;
  let smoothSpeed = 0;
  let angerLevel = 0;
  let bouncePhase = 0;
  let lastTime = performance.now();
  let currentMood = "";

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function clamp(v, lo, hi) {
    return Math.min(Math.max(v, lo), hi);
  }

  function lerpColor(t) {
    const h = lerp(40, 8, t);
    const s = lerp(90, 85, t);
    const l = lerp(63, 50, t);
    return `hsl(${h},${s}%,${l}%)`;
  }

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
    smoothSpeed = lerp(smoothSpeed, rawSpeed, 0.14);
    rawSpeed *= 0.8;

    let target;
    if (smoothSpeed < SPEED_HAPPY) target = smoothSpeed < 0.1 ? 0 : 1;
    else if (smoothSpeed < SPEED_ANNOYED) target = 1.8;
    else if (smoothSpeed < SPEED_ANGRY) target = 2.5;
    else target = 3;

    angerLevel = lerp(angerLevel, target, 0.09);

    const t1 = clamp(angerLevel / 1, 0, 1);
    const t2 = clamp((angerLevel - 1) / 1.5, 0, 1);
    const t3 = clamp((angerLevel - 2) / 1, 0, 1);

    const skinColor = lerpColor(t3 * 0.7 + t2 * 0.3);
    head.setAttribute("fill", skinColor);
    body_.setAttribute("fill", skinColor);
    armL.setAttribute("stroke", skinColor);
    armR.setAttribute("stroke", skinColor);

    bouncePhase += 0.1;
    const bounceAmt =
      angerLevel < 1.5
        ? Math.abs(Math.sin(bouncePhase)) * 3 * t1
        : Math.abs(Math.sin(bouncePhase * 1.4)) * 1.5;
    svg.style.transform = `translateY(${-bounceAmt}px)`;

    const shake = t3 > 0.1 ? Math.sin(ts * 0.03) * t3 * 5 : 0;

    const bLy0 = lerp(25, 22, t2);
    const bLy1 = lerp(23, 28, t2);
    const bLy2 = lerp(25, 22, t2);
    browL.setAttribute(
      "d",
      `M${29 + shake} ${bLy0} Q${32 + shake} ${bLy1} ${35 + shake} ${bLy2}`,
    );
    browR.setAttribute(
      "d",
      `M${45 + shake} ${bLy0} Q${48 + shake} ${bLy1} ${51 + shake} ${bLy2}`,
    );

    const ry = lerp(3.5, 1.5, t3);
    eyeL.setAttribute("ry", ry.toFixed(2));
    eyeR.setAttribute("ry", ry.toFixed(2));
    eyeL.setAttribute("cx", (32 + shake).toFixed(1));
    eyeR.setAttribute("cx", (48 + shake).toFixed(1));
    pulL.setAttribute("cx", (33.2 + shake).toFixed(1));
    pulR.setAttribute("cx", (49.2 + shake).toFixed(1));

    const my = lerp(42, 44, t3);
    const mcy = lerp(48, 36, t3);
    mouth.setAttribute(
      "d",
      `M${33 + shake} ${my} Q${40 + shake} ${mcy} ${47 + shake} ${my}`,
    );

    chkL.setAttribute("opacity", lerp(0.5, 0, t2).toFixed(2));
    chkR.setAttribute("opacity", lerp(0.5, 0, t2).toFixed(2));

    const laEndY = lerp(44, 30, t3);
    armL.setAttribute(
      "d",
      `M24 60 Q${lerp(13, 8, t3).toFixed(1)} ${lerp(55, 45, t3).toFixed(1)} ${lerp(15, 10, t3).toFixed(1)} ${laEndY.toFixed(1)}`,
    );
    armR.setAttribute(
      "d",
      `M56 60 Q${lerp(67, 72, t3).toFixed(1)} ${lerp(55, 45, t3).toFixed(1)} ${lerp(65, 70, t3).toFixed(1)} ${laEndY.toFixed(1)}`,
    );

    sweat.setAttribute("opacity", clamp(t2 * 0.9 - t3 * 0.5, 0, 1).toFixed(2));

    const starOp = clamp(t3 * (0.6 + 0.4 * Math.sin(ts * 0.07)), 0, 1).toFixed(
      2,
    );
    star1.setAttribute("opacity", starOp);
    star2.setAttribute("opacity", (starOp * 0.8).toFixed(2));

    if (t3 > 0.6) svg.classList.add("shaking");
    else svg.classList.remove("shaking");

    let mood, text;
    if (angerLevel < 0.3) {
      mood = "idle";
    } else if (angerLevel < 1.6) {
      mood = "happy";
    } else if (angerLevel < 2.4) {
      mood = "annoyed";
    } else {
      mood = "angry";
    }

    if (mood !== currentMood) {
      currentMood = mood;
      label.className = mood;
      label.textContent = text;
      if (mood !== "idle") label.classList.add("visible");
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
