let scrollObserver;

function initScrollAnimate() {
  const elements = document.querySelectorAll(".scroll-animate");
  if (!scrollObserver) {
    scrollObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Math.random() * 0.15;
            entry.target.style.animationDelay = `${delay}s`;
            entry.target.classList.add("visible");
            entry.target.dataset.animated = "true";
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  elements.forEach((el) => {
    if (el.dataset.animated !== "true") {
      scrollObserver.observe(el);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollAnimate);
} else {
  initScrollAnimate();
}

window.addEventListener("home:refresh", initScrollAnimate);
window.addEventListener("contact:refresh", initScrollAnimate);
window.addEventListener("don:refresh", initScrollAnimate);
window.addEventListener("notice:refresh", initScrollAnimate);
window.addEventListener("cookies:refresh", initScrollAnimate);
window.addEventListener("mentions:refresh", initScrollAnimate);
window.addEventListener("politique:refresh", initScrollAnimate);
