/* global document */

let typewriterConfig = [
  'Bienvenue sur <span id="cita">Cita</span><span id="pote">Pote</span>💬',
  true,
];

function typewriter() {
  const typeWriter = document.getElementById("typewriter-text");
  if (!typeWriter) {
    return false;
  }
  const typewriterElements = document.getElementsByClassName("typewriter-effect");
  if (typewriterConfig[1] == true && typewriterElements.length > 0) {
    typewriterElements[typewriterElements.length - 1].style.setProperty(
      "justify-content",
      "center"
    );
  }
  typeWriter.innerHTML = typewriterConfig[0];
  typeWriter.style.setProperty("--characters", typewriterConfig[0].length);

  // Adjust typing animation duration based on text length
  const typingDuration = typewriterConfig[0].length * 0.2; // 0.2s per character
  typeWriter.style.setProperty("--typing-duration", `${typingDuration}s`);
  return true;
}

function initTypewriter() {
  if (typewriter()) {
    return;
  }
  requestAnimationFrame(() => typewriter());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTypewriter);
} else {
  initTypewriter();
}

window.addEventListener("typewriter:refresh", initTypewriter);
