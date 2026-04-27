// gasp
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Chargement de la page
var loadingPage = document.querySelector(".loading-page");
var content = document.querySelector(".content");

const cloudClasses = [
  "cloud-top-left",
  "cloud-top-right",
  "cloud-bottom-left",
  "cloud-bottom-right",
];

function moveCloudsToCorners(container) {
  cloudClasses.forEach((cloudClass) => {
    const cloud = container.querySelector(`.${cloudClass}`);
    if (!cloud) return;

    // Ajouter la classe leaving pour déclencher l'animation CSS
    cloud.classList.add("leaving");
  });
}

content.style.opacity = 0;
content.style.display = "none";

// Start loading animation immediately
gsap.to(loadingPage, { opacity: 1, duration: 4 });

// Set up promises for load and minimum timer
var loadPromise = new Promise((resolve) => {
  window.addEventListener("load", resolve);
  console.log("Page loaded");
});

var timerPromise = new Promise((resolve) => {
  setTimeout(resolve, 1000); // Timer de 5 secondes pour s'assurer que l'animation de chargement est visible
});

// When both load and timer are done, transition
Promise.all([loadPromise, timerPromise]).then(() => {
  // Change text to second title
  const firstTitle = loadingPage.querySelector(".first-title");
  const secondTitle = loadingPage.querySelector(".second-title");
  gsap.to(firstTitle, { opacity: 0, duration: 2 });
  gsap.to(secondTitle, { opacity: 1, duration: 1.5, delay: 2 }); // Affiche le second titre après la disparition du premier

  // Move clouds
  var timerCloudsPromise = new Promise((resolve) => {
    setTimeout(resolve, 1000); // Timer de 4 secondes pour laisser le temps au second titre de s'afficher avant de faire partir les nuages
  });
  Promise.all([timerCloudsPromise]).then(() => {
    moveCloudsToCorners(loadingPage);
  });

  gsap.to(content, {
    opacity: 1,
    duration: 1, // Affiche le contenu progressivement pendant que les nuages partent
  });
  var timer2Promise = new Promise((resolve) => {
    setTimeout(resolve, 500); // Timer de 7.5 secondes pour s'assurer que les nuages ont eu le temps de partir avant de faire disparaître la page de chargement et afficher le contenu
  });
  Promise.all([timer2Promise]).then(() => {
    loadingPage.style.display = "none";
    content.style.display = "block";
    gsap.to(content, { opacity: 1, duration: 2 });
    gsap.to(content, {
      opacity: 1,
      duration: 0.5, // Affiche le contenu progressivement pendant que les nuages partent
    });

    // Animation enveloppe au scroll + desk sticky
    setTimeout(() => {
      const enveloppeContainer = document.querySelector(".enveloppe-container");
      const deskImg = document.querySelector(".desk-2");
      const stampDelete = document.querySelector(".stamp");
      const topenveloppeOpen = document.querySelector(".open-enveloppe");

      if (enveloppeContainer && deskImg) {
        // Animation enveloppe centrée
        // gsap.to(enveloppeContainer, {
        //   position: "fixed",
        //   top: 0,
        //   zIndex: 1,
        //   scrollTrigger: {
        //     trigger: ".content",
        //     start: "top top",
        //     end: "bottom top",
        //     scrub: 0.5,
        //     markers: false,
        //   },
        // });

        gsap.to(enveloppeContainer, {
          position: "fixed",
          scale: 3,
          rotation: 6,
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          right: "auto",
          zIndex: 100,
          scrollTrigger: {
            trigger: ".scrollTriggerEnveloppe",
            start: "top top",
            end: "bottom center",
            scrub: 0.5,
            markers: false,
          },
        });

        gsap.to(stampDelete, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: ".scrollTriggerEnveloppe",
            start: "1000px top",
            end: "1500px top",
            scrub: 0.5,
            markers: false,
          },
        });

        gsap.to(topenveloppeOpen, {
          transform: "scaleY(-1)",

          duration: 0.5,
          scrollTrigger: {
            trigger: ".scrollTriggerEnveloppe",
            start: "1500px top",
            end: "2000px top",
            scrub: 0.5,
            markers: true,
          },
        });

        // Animation desk sticky
        gsap.to(deskImg, {
          position: "fixed",
          top: 0,
          zIndex: 1,
          scrollTrigger: {
            trigger: ".scrollTriggerEnveloppe",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            markers: false,
          },
        });
      }
    }, 500);
  });
});

// Loupe effect
const zoom = 1;
const loupe = document.getElementById("loupe");
const landscapeImg = document.querySelector(".image-container img:first-child");
const landscape2Img = document.getElementById("landscape-2");

let lastMouseX = 0;
let lastMouseY = 0;
let lastImageX = 0;
let lastImageY = 0;
let lastRect = null;
let isLoupeActive = false;

function updateLoupePosition() {
  if (!isLoupeActive || !lastRect) return;

  const loupeSize = loupe.offsetWidth;
  const loupeRadius = loupeSize / 2;

  loupe.style.left = lastMouseX - loupeRadius + "px";
  loupe.style.top = lastMouseY - loupeRadius + "px";

  // Update background position aussi
  loupe.style.backgroundSize = lastRect.width * zoom + "px auto";
  loupe.style.backgroundPosition =
    -lastImageX * zoom +
    loupeRadius +
    "px " +
    (-lastImageY * zoom + loupeRadius) +
    "px";
}

// Animation continue de la loupe pendant les transitions
let animationFrameId = null;
function startLoupeAnimation() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  const animate = () => {
    updateLoupePosition();
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
}

function stopLoupeAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// Toggle de la loupe au clic
landscapeImg.addEventListener("click", function () {
  console.log("Loupe clicked");
  startLoupeAnimation();

  gsap.to("#loupe", {
    width: "500px",
    height: "500px",
    duration: 1,
    ease: "easeInOut",
  });
  console.log("Loupe clicked");
  setTimeout(() => {
    gsap.to("#loupe", {
      width: "200px",
      height: "200px",
      duration: 1,
      ease: "easeInOut",
      onComplete: stopLoupeAnimation,
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

    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    lastImageX = x;
    lastImageY = y;
    lastRect = rect;
    isLoupeActive = true;

    loupe.style.display = "block";

    const loupeSize = loupe.offsetWidth;
    const loupeRadius = loupeSize / 2;

    loupe.style.left = event.pageX - loupeRadius + "px";
    loupe.style.top = event.pageY - loupeRadius + "px";
    loupe.style.backgroundSize = rect.width * zoom + "px auto";
    loupe.style.backgroundPosition =
      -x * zoom + loupeRadius + "px " + (-y * zoom + loupeRadius) + "px";
  });

  landscape2Img.addEventListener("mousemove", function (event) {
    const rect = landscape2Img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    lastImageX = x;
    lastImageY = y;
    lastRect = rect;
    isLoupeActive = true;

    loupe.style.display = "block";

    const loupeSize = loupe.offsetWidth;
    const loupeRadius = loupeSize / 2;

    loupe.style.left = event.pageX - loupeRadius + "px";
    loupe.style.top = event.pageY - loupeRadius + "px";
    loupe.style.backgroundSize = rect.width * zoom + "px auto";
    loupe.style.backgroundPosition =
      -x * zoom + loupeRadius + "px " + (-y * zoom + loupeRadius) + "px";
  });

  const hideLoupe = () => {
    loupe.style.display = "none";
    isLoupeActive = false;
    stopLoupeAnimation();
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
