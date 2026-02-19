/* global window, document */

let popups = window.popupData || {};

window.addEventListener("popupData:ready", (event) => {
  popups = event.detail || {};
});

function openPopup(id) {
  const popup = popups[id];
  if (!popup) {
    return;
  }
  const titleEl = document.getElementById("popup-title");
  titleEl.innerText = popup.title;

  // Retire les anciennes classes text-...
  [...titleEl.classList].forEach((cls) => {
    if (cls.startsWith("text-[")) titleEl.classList.remove(cls);
    if (cls.startsWith("text-pink-500")) titleEl.classList.remove(cls);
  });
  // Ajoute la nouvelle couleur si présente
  if (popup.color) {
    titleEl.classList.add(`text-${popup.color}`);
  }

  const content = popup.steps
    .slice()
    .reverse()
    .map((step) => {
      const changes = step.changes
        .map((change) => {
          const formatted = String(change)
            .replace(/\(([^)]+)\)/g, "<em>($1)</em>")
            .replace(/\{([^}]+)\}/g, '<span class="text-[var(--secondary-color)] font-semibold">$1</span>');
          return `<li class="pl-1 pr-2">${formatted}</li>`;
        })
        .join("");

      return `
          <div class="px-6 py-5 bg-white/50 border-2 border-gray-200 rounded-xl shadow-sm backdrop-blur-md">
            <h4 class="font-semibold text-[var(--primary-color)]">${
              step.version
            } <span class="text-gray-500 text-sm">(${step.date})</span></h4>
            <ul class="text-gray-700 mt-2 list-disc list-outside pl-6 text-sm space-y-1">
              ${changes}
            </ul>
          </div>
        `;
    })
    .join("");

  document.getElementById("popup-content").innerHTML = content;
  document.getElementById("popup-overlay").classList.remove("hidden");
  document.getElementById("popup-overlay").classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closePopup() {
  document.getElementById("popup-overlay").classList.add("hidden");
  document.getElementById("popup-overlay").classList.remove("flex");
  document.body.style.overflow = "";
}

function handlePopupClick(event) {
  const openButton = event.target.closest(".open-popup-btn");
  if (openButton) {
    const id = openButton.getAttribute("data-key");
    openPopup(id);
    return;
  }

  const closeButton = event.target.closest(".close-popup-btn");
  if (closeButton) {
    closePopup();
  }
}

function initPopup() {
  document.removeEventListener("click", handlePopupClick);
  document.addEventListener("click", handlePopupClick);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPopup);
} else {
  initPopup();
}

window.addEventListener("home:refresh", initPopup);
