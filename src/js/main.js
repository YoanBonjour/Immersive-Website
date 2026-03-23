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
    scale: 10, // 200px * 10 = 2000px
    duration: 1,
    ease: "easeInOut",
  });
  console.log("Loupe clicked");
  setTimeout(() => {
    gsap.to("#loupe", {
      scale: 1, // Retour à la taille normale
      duration: 1,
      ease: "easeInOut",
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
