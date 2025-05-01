(async () => {
  const pageText = document.body.innerText.toLowerCase();

  const { blocked, reason } = await window.checkPageForKeywords(pageText);
  if (blocked) {
    document.body.innerHTML = `
      <div style="text-align:center; padding-top:50px;">
        <h1>🚫 Blocked by EduFilter</h1>
        <p>Reason: ${reason}</p>
      </div>`;
    return;
  }

  if (await window.checkShouldUninstall()) {
    alert("Admin has disabled EduFilter. Please uninstall the extension.");
  }
})();