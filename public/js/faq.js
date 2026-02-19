/* global document */

function toggleFaq(button) {
  const content = button.nextElementSibling;
  if (!content) {
    return;
  }
  const isOpen = !content.classList.contains("hidden");
  document
    .querySelectorAll(".faq-item div")
    .forEach((div) => div.classList.add("hidden"));
  document
    .querySelectorAll(".faq-item button span:last-child")
    .forEach((span) => (span.textContent = "+"));
  if (!isOpen) {
    content.classList.remove("hidden");
    button.querySelector("span:last-child").textContent = "−";
  }
}

function handleFaqClick(event) {
  const button = event.target.closest(".open-faq-btn");
  if (!button) {
    return;
  }
  toggleFaq(button);
}

function initFaq() {
  document.removeEventListener("click", handleFaqClick);
  document.addEventListener("click", handleFaqClick);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFaq);
} else {
  initFaq();
}

window.addEventListener("home:refresh", initFaq);
