/* global window, document */

let discordData = window.widgetData || {};

async function loadDiscordData() {
  let data;
  try {
    data = discordData;

    const membersList = document.getElementById("members-list");
    const voiceChannelsList = document.getElementById("voice-channels-list");
    const statsList = document.getElementById("discord-stats");
    if (!membersList || !voiceChannelsList || !statsList) {
      return;
    }
    const isMobile = window.innerWidth < 768; // breakpoint Tailwind md

    // --- Membres (offline à la fin) ---
    membersList.innerHTML = "";
    const membersSorted = [...(data.members || [])].sort((a, b) => {
      if (a.status === "offline" && b.status !== "offline") return 1;
      if (a.status !== "offline" && b.status === "offline") return -1;
      return 0;
    });

    if (isMobile) {
      const container = document.createElement("div");
      container.className = "flex overflow-x-auto";
      container.style.gap = ".25rem";
      membersSorted.forEach((member) => {
        const borderColor =
          {
            online: "#22c55e",
            idle: "#facc15",
            dnd: "#ef4444",
            offline: "#6b7280",
          }[member.status] || "#9ca3af";

        const img = document.createElement("img");
        img.src = member.avatar_url;
        img.alt = member.username;
        img.title = member.username;
        img.className = "w-8 h-8 rounded-full object-cover";
        img.style.border = `2px solid ${borderColor}`;

        container.appendChild(img);
      });
      membersList.appendChild(container);
    } else {
      membersSorted.forEach((member) => {
        const borderColor =
          {
            online: "#22c55e",
            idle: "#facc15",
            dnd: "#ef4444",
            offline: "#6b7280",
          }[member.status] || "#9ca3af";

        const el = document.createElement("div");
        el.className = "flex items-center gap-2 mb-1";

        const img = document.createElement("img");
        img.src = member.avatar_url;
        img.alt = member.username;
        img.className = "w-8 h-8 rounded-full object-cover";
        img.style.border = `2px solid ${borderColor}`;

        const name = document.createElement("p");
        name.className = "text-sm truncate";
        name.textContent = member.username;

        el.appendChild(img);
        el.appendChild(name);
        membersList.appendChild(el);
      });
    }

    // --- Salons vocaux triés ---
    const channelOrder = [
      "🎤│conference room",
      "🔊│Voice #1",
      "🔊│Voice #2",
      "🔊│Voice #3",
      "🛌│AFK",
      "➕│Create Voice",
    ];
    const voiceChannels = (data.channels || [])
      .filter(
        (c) =>
          c.name.startsWith("🔊") ||
          c.name.startsWith("🛌") ||
          c.name.startsWith("🎤") ||
          c.name.startsWith("➕") ||
          c.name.startsWith("📱")
      )
      .sort((a, b) => {
        const indexA = channelOrder.indexOf(a.name);
        const indexB = channelOrder.indexOf(b.name);
        // Si les deux sont dans l'ordre, on trie selon l'ordre
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // Si a est dans l'ordre et b non, a avant b
        if (indexA !== -1) return -1;
        // Si b est dans l'ordre et a non, b avant a
        if (indexB !== -1) return 1;
        // Si aucun n'est dans l'ordre, on garde l'ordre d'origine
        return 0;
      });

    voiceChannelsList.innerHTML = "";
    voiceChannels.forEach((channel) => {
      // Les membres dans le channel (par id)
      const membersInChannel = Array.isArray(channel.members)
        ? channel.members
        : [];

      if (isMobile && membersInChannel.length === 0) return;

      const channelDiv = document.createElement("div");

      const channelName = document.createElement("h4");
      channelName.className = "text-sm font-semibold mb-2 truncate";
      channelName.textContent = channel.name;
      channelDiv.appendChild(channelName);

      const membersContainer = document.createElement("div");
      membersContainer.className = "flex flex-wrap items-center";
      membersContainer.style.gap = ".25rem";

      membersInChannel.forEach((member) => {
        const borderColor =
          {
            online: "#22c55e",
            idle: "#facc15",
            dnd: "#ef4444",
            offline: "#6b7280",
          }[member.status] || "#9ca3af";

        const img = document.createElement("img");
        img.src = member.avatar_url;
        img.alt = member.username;
        img.title = member.username;
        img.className = "w-6 h-6 rounded-full object-cover";
        img.style.border = `2px solid ${borderColor}`;

        membersContainer.appendChild(img);
      });

      channelDiv.appendChild(membersContainer);
      voiceChannelsList.appendChild(channelDiv);
    });

    // --- Statistiques ---
    statsList.innerHTML = "";
    const totalHumans = data.members_total_no_bot || (data.members || []).length;
    const onlineCount =
      data.members_connected_no_bot ||
      (data.members || []).filter((m) => m.status !== "offline").length;
    const boostCount = data.boost_count || 0;

    const statsDiv = document.createElement("div");
    statsDiv.className =
      "bg-white/5 p-2 rounded-lg shadow-sm flex flex-col gap-2";

    function createStatLine(text, icon) {
      const el = document.createElement("div");
      el.className = "flex items-center gap-3";

      const iconEl = document.createElement("span");
      iconEl.className = "text-lg";
      iconEl.textContent = icon;

      const p = document.createElement("p");
      p.className = "text-sm font-medium";
      p.textContent = text;

      el.appendChild(iconEl);
      el.appendChild(p);
      return el;
    }

    statsDiv.appendChild(createStatLine(totalHumans + " membres", "👥"));
    statsDiv.appendChild(createStatLine(onlineCount + " en ligne", "🟢"));
    statsDiv.appendChild(createStatLine(boostCount + " boosts", "✨"));

    statsList.appendChild(statsDiv);

    // --- Bouton Discord responsive ---
    const discordBtn = document.querySelector(".discord-button");
    if (discordBtn && isMobile) {
      discordBtn.classList.add("w-full", "py-4", "text-center");
      discordBtn.style.fontSize = "1.125rem";
    }
  } catch (err) {
    console.error("Erreur Discord API :", err);
    const membersList = document.getElementById("members-list");
    const voiceChannelsList = document.getElementById("voice-channels-list");
    const statsList = document.getElementById("discord-stats");
    if (membersList) membersList.textContent = "Impossible de charger les membres 😕";
    if (voiceChannelsList) voiceChannelsList.textContent = "Impossible de charger les salons 😕";
    if (statsList) statsList.textContent = "Impossible de charger les statistiques 😕";
  }
}
function initDiscordWidget() {
  loadDiscordData();
}

window.addEventListener("discordWidget:ready", (event) => {
  discordData = event.detail || {};
  initDiscordWidget();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDiscordWidget);
} else {
  initDiscordWidget();
}

window.addEventListener("contact:refresh", initDiscordWidget);
window.addEventListener("resize", loadDiscordData);
