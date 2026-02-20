/* global document */

let formBound = false;

function normalizeHexColor(value) {
  if (!value) return null;
  let hex = value.trim();
  if (hex.startsWith("var(")) {
    return null;
  }
  if (!hex.startsWith("#")) {
    return null;
  }
  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (hex.length !== 6) return null;
  return `#${hex}`;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;
  const value = normalized.slice(1);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return { r, g, b };
}

function randomBetweenColors(colorA, colorB) {
  if (!colorA || !colorB) {
    return 0x8b5cf6;
  }
  const t = Math.random();
  const r = Math.round(colorA.r + (colorB.r - colorA.r) * t);
  const g = Math.round(colorA.g + (colorB.g - colorA.g) * t);
  const b = Math.round(colorA.b + (colorB.b - colorA.b) * t);
  return (r << 16) + (g << 8) + b;
}

function getThemeEmbedColor() {
  const styles = getComputedStyle(document.documentElement);
  const primary = styles.getPropertyValue("--primary-color");
  const secondary = styles.getPropertyValue("--secondary-color");
  const primaryRgb = hexToRgb(primary);
  const secondaryRgb = hexToRgb(secondary);
  return randomBetweenColors(primaryRgb, secondaryRgb);
}

function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form || formBound) {
    return;
  }

  formBound = true;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const statusError = document.getElementById("notif-error-item");
    const statusMany = document.getElementById("notif-many-item");
    const statusValide = document.getElementById("notif-valide-item");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.website) {
      return;
    }

    try {
      const emailValue = data.email ? `[${data.email}](mailto:${data.email})` : "Non renseigné";
      const payload = {
        username: "CitaPote - Contact",
        content: "📩 Nouveau message depuis le formulaire de contact",
        embeds: [
          {
            color: getThemeEmbedColor(),
            fields: [
              { name: "Nom", value: data.name || "Non renseigné", inline: true },
              { name: "Email", value: emailValue, inline: true },
              { name: "Message", value: data.message || "Non renseigné" },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(
        "https://discord.com/api/webhooks/1474408047286685789/Oj87vSLDsibdbc-GK5RJ6lgyCjvYDiTRsEO09BrgSmdkRnsAnjQ8u1H7aSDRz8EeC7DG",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        if (statusValide) statusValide.style.display = "flex";
        form.reset();
      } else {
        let resJson;
        try {
          resJson = await response.json();
        } catch (parseErr) {
          resJson = null;
        }

        if (response.status === 429) {
          if (statusMany) statusMany.style.display = "flex";
        } else {
          if (statusError) statusError.style.display = "flex";
        }
      }
    } catch (err) {
      if (statusError) statusError.style.display = "flex";
      console.error("Erreur lors de l'envoi du message :", err);
    }

    setTimeout(() => {
      if (statusError) statusError.style.display = "none";
      if (statusValide) statusValide.style.display = "none";
      if (statusMany) statusMany.style.display = "none";
    }, 7000);
  });
}

function initContactForm() {
  formBound = false;
  bindContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactForm);
} else {
  initContactForm();
}

window.addEventListener("contact:refresh", initContactForm);
