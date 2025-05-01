// extension/utils.js
const API_URL = "https://sudo-mu.vercel.app/api";

window.checkPageForKeywords = async function(text) {
  try {
    const res = await fetch(`${API_URL}/rules`);
    const { blockedKeywords = [] } = await res.json();
    for (let word of blockedKeywords) {
      if (text.includes(word.toLowerCase())) {
        return { blocked: true, reason: `Contains keyword: ${word}` };
      }
    }
  } catch (e) {
    console.error("Keyword check failed:", e);
  }
  return { blocked: false };
};

window.checkShouldUninstall = async function() {
  try {
    const res = await fetch(`${API_URL}/toggle`);
    const { allowUninstall } = await res.json();
    return allowUninstall;
  } catch (e) {
    console.error("Uninstall check failed:", e);
    return false;
  }
};
