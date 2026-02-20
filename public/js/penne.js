/* global window */
function generateCitaCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "CITA-" + code;
}

window.citadev = () => {
  console.clear();
  console.log(
    "%c🚀 Bienvenue dans le mode développeur CitaPote !",
    "color:#8b5cf6; font-size:16px; font-weight:bold;"
  );
  console.log(
    "%cVoici quelques infos utiles :",
    "color:#10b981; font-weight:bold;"
  );
  const appVersion = window.APP_VERSION ? `v${window.APP_VERSION}` : "v0.1";

  console.table({
    "Version du site": appVersion,
    Serveur: "MecDu.Dev",
    "En ligne depuis": (() => {
      const publicationDate = new Date("2025-12-04"); // Date définie par l'utilisateur
      const today = new Date();
      const diffTime = Math.abs(today - publicationDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${publicationDate.toLocaleDateString()} (il y a ${diffDays} jours)`;
    })(),
    "Créé par": "MecDu.Dev (alias ExostFlash / Maizy Amaury)",
  });

  const secretCode = generateCitaCode();
  console.log(
    "%c💡 Bravo d’avoir trouvé cet easter egg !",
    "color:#facc15; font-weight:bold;"
  );
  console.log(
    `%cTon code secret est : %c${secretCode}`,
    "color:#22c55e; font-weight:bold;",
    "color:#8b5cf6; font-weight:bold;"
  );
  console.log(
    "%c👉 Envoie ce code à @CitaBot en privé pour débloquer ton rôle secret !",
    "color:#60a5fa; font-style:italic;"
  );

  fetch("https://api-cita.apps.lehub.tf/v1.3/easter/one", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: secretCode, timestamp: Date.now() }),
  }).catch(() => {});
};

setTimeout(() => {
  console.log(
    "%c👋 Curieux, hein ? Tu crois qu’il y a quelque chose de caché ici ? 👀​",
    "color:#8b5cf6; font-size:14px;"
  );
}, 1000);
