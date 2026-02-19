/* global document, window */

function openMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) {
    return;
  }
  mobileMenu.classList.add("opacity-100", "pointer-events-auto");
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (!mobileMenu) {
    return;
  }
  mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
  mobileMenu.classList.add("opacity-0", "pointer-events-none");
  document.body.classList.remove("overflow-hidden");
}

function handleHeaderClick(event) {
  const openButton = event.target.closest("#mobile-menu-btn");
  if (openButton) {
    openMobileMenu();
    return;
  }

  const closeButton = event.target.closest(".close-mobile-menu");
  if (closeButton) {
    closeMobileMenu();
  }
}

function initHeader() {
  document.removeEventListener("click", handleHeaderClick);
  document.addEventListener("click", handleHeaderClick);
  window.closeMobileMenu = closeMobileMenu;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeader);
} else {
  initHeader();
}

window.addEventListener("header:refresh", initHeader);
