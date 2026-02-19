(function () {
  async function loadDiscordWidgetData() {
    try {
      const response = await fetch(
        "https://botdumec.apps.lehub.tf/1416854682067796113/widget.json",
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Failed to load widget data: ${response.status}`);
      }
      const data = await response.json();
      window.widgetData = data || {};
      window.dispatchEvent(
        new CustomEvent("discordWidget:ready", { detail: window.widgetData })
      );
    } catch (error) {
      console.error("[discordWidgetData] Error loading data", error);
      window.widgetData = {};
    }
  }

  loadDiscordWidgetData();
})();
