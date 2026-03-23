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
  setTimeout(resolve, 6000);
});

// When both load and timer are done, transition
Promise.all([loadPromise, timerPromise]).then(() => {
  gsap.to(loadingPage, {
    opacity: 0,
    duration: 2,
    onComplete: () => {
      loadingPage.style.display = "none";
      content.style.display = "block";
      gsap.to(content, { opacity: 1, duration: 2 });
    },
  });
});
