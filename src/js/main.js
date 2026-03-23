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
