(function () {
  async function loadPopupData() {
    try {
      const response = await fetch('data/appsVersions.json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load popup data: ${response.status}`);
      }
      const data = await response.json();
      window.popupData = data || {};
      window.dispatchEvent(new CustomEvent('popupData:ready', { detail: window.popupData }));
    } catch (error) {
      console.error('[popupData] Error loading data', error);
      window.popupData = {};
    }
  }

  loadPopupData();
})();
