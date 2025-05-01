import { checkPageForKeywords, checkShouldUninstall } from "./utils.js";

(async () => {
  const pageText = document.body.innerText.toLowerCase();

  const { blocked, reason } = await checkPageForKeywords(pageText);
  if (blocked) {
    document.body.innerHTML = `<div style="text-align:center; padding-top:50px;">
      <h1>🚫 Blocked by EduFilter</h1>
      <p>Reason: ${reason}</p></div>`;
  }

  const shouldUninstall = await checkShouldUninstall();
  if (shouldUninstall) {
    alert("Admin has disabled EduFilter. Please uninstall the extension.");
  }
})();
