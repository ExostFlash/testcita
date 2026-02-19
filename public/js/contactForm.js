/* global document */

let formBound = false;

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

    try {
      const response = await fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (statusValide) statusValide.style.display = "flex";
        form.reset();
      } else {
        const resJson = await response.json();
        if (
          resJson &&
          resJson.error &&
          resJson.error.includes("Trop de messages, réessaie plus tard.")
        ) {
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
