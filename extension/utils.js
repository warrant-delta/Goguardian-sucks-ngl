const API_URL = "https://sudo-mu.vercel.app/api"; // Replace with your actual Vercel domain

export async function checkPageForKeywords(text) {
  try {
    const res = await fetch(`${API_URL}/rules`);
    const data = await res.json();
    const { blockedKeywords = [] } = data;

    for (let word of blockedKeywords) {
      if (text.includes(word.toLowerCase())) {
        return { blocked: true, reason: `Contains keyword: ${word}` };
      }
    }
    return { blocked: false };
  } catch (err) {
    console.error("Keyword check failed:", err);
    return { blocked: false };
  }
}

export async function checkShouldUninstall() {
  try {
    const res = await fetch(`${API_URL}/toggle`);
    const { allowUninstall } = await res.json();
    return allowUninstall;
  } catch (err) {
    console.error("Uninstall check failed:", err);
    return false;
  }
}
