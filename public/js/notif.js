/* global document, window */
let notifications = [];
const bubbleSpacing = 30;
const bubbles = [];
let resizeBound = false;

function getNotifStack() {
  return document.getElementById("notif-stack");
}

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

function renderBubbles() {
    // Supprime toutes les bulles existantes
    bubbles.forEach((b) => b.remove());
    bubbles.length = 0;

    if (!notifications.length) {
      return;
    }

    const isMobile = window.innerWidth < 640;
    let normalNotifs = notifications.filter((notif) => {
      const type = notif.dataset.type;
      const isClosed = sessionStorage.getItem(`notifClosed-${type}`) === "true";
      return (
        notif.dataset.type !== "cookie" &&
        notif.style.display === "none" &&
        !isClosed
      );
    });

    let bubbleCount = 0;

    normalNotifs.forEach((notif) => {
      const type = notif.dataset.type;
      const icon = notif.querySelector("span.text-3xl").cloneNode(true);

      icon.classList.add(
        "notif-bubble",
        "fixed",
        "flex",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-[var(--secondary-color)]",
        "z-30"
      );

      // Positionnement : gauche sur PC, droite sur mobile
      if (isMobile) {
        icon.style.right = "0.5rem";
        icon.style.left = "auto";
      } else {
        icon.style.left = "1.5rem";
        icon.style.right = "auto";
      }
      icon.style.bottom = `${23 + bubbleCount * bubbleSpacing}px`;
      icon.style.width = "48px";
      icon.style.height = "48px";
      icon.style.fontSize = "1.5rem";
      icon.style.display = "flex";
      icon.style.alignItems = "center";
      icon.style.justifyContent = "center";
      icon.style.border = "2px solid var(--primary-color)";
      if (bubbleCount > 0) {
        icon.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
      }

      document.body.appendChild(icon);
      bubbles.push(icon);
      bubbleCount++;

      // Clique sur la bulle pour ouvrir la notif
      icon.onclick = () => {
        icon.classList.add("disappear");
        setTimeout(() => {
          notif.style.display = "flex";

          icon.style.display = "none";
          icon.classList.remove("disappear");

          renderBubbles();
        }, 100);
      };

      // Clique sur la croix pour fermer la notif
      const closeBtn = notif.querySelector(".notif-close");
      closeBtn.onclick = () => {
        notif.classList.add("disappear");

        setTimeout(() => {
          notif.style.display = "none";

          icon.style.display = "none"; // Cache la bulle définitivement
          notif.classList.remove("disappear");

          sessionStorage.setItem(`notifClosed-${type}`, "true");

          renderBubbles();
        }, 100);
      };
    });
}

function renderNotifications() {
  if (!notifications.length) {
    return;
  }

  let allNotifs = notifications.filter(() => true);

  notifications.forEach((notif) => {
    const type = notif.dataset.type;
    const closeBtn = notif.querySelector(".notif-close");

    if (type === "cookie") {
      const accepted = document.cookie.includes("cookieConsent=yes");
      const refused = sessionStorage.getItem("cookieConsent") === "no";
      if (!accepted && !refused) {
        notif.style.display = "flex";
      } else {
        notif.style.display = "none";
      }

      notif.querySelector("#accept-cookies").onclick = () => {
        setCookie("cookieConsent", "yes", 90);
        notif.style.display = "none";
      };
      notif.querySelector("#decline-cookies").onclick = () => {
        sessionStorage.setItem("cookieConsent", "no");
        notif.style.display = "none";
      };
      closeBtn.onclick = () => {
        sessionStorage.setItem("cookieConsent", "no");
        notif.style.display = "none";
      };
    } else {
      const isMobile = window.innerWidth < 640;
      const useBubbles = isMobile || (!isMobile && allNotifs.length > 3);

      if (!useBubbles) {
        if (!sessionStorage.getItem(`notifClosed-${type}`)) {
          notif.style.display = "flex";
        }
        closeBtn.onclick = () => {
          notif.style.display = "none";
          sessionStorage.setItem(`notifClosed-${type}`, "true");
        };
      } else {
        notif.style.display = "none";
      }
    }
  });

  renderBubbles();
}

function initNotifications() {
  const notifStack = getNotifStack();
  if (!notifStack) {
    return;
  }
  notifications = Array.from(notifStack.querySelectorAll(".notif-item"));
  renderNotifications();

  if (!resizeBound) {
    window.addEventListener("resize", renderNotifications);
    resizeBound = true;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNotifications);
} else {
  initNotifications();
}

window.addEventListener("header:refresh", initNotifications);
