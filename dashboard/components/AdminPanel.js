import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [allowUninstall, setAllowUninstall] = useState(false);

  useEffect(() => {
    fetch("/api/rules").then(res => res.json()).then(data => {
      setKeywords(data.blockedKeywords || []);
    });
    fetch("/api/toggle").then(res => res.json()).then(data => {
      setAllowUninstall(data.allowUninstall);
    });
  }, []);

  const addKeyword = async () => {
    if (!newKeyword.trim()) return;
    await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: newKeyword }),
    });
    setKeywords([...keywords, newKeyword]);
    setNewKeyword("");
  };

  const toggleUninstall = async () => {
    await fetch("/api/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allowUninstall: !allowUninstall }),
    });
    setAllowUninstall(!allowUninstall);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Blocked Keywords:</h3>
      <ul>
        {keywords.map((k, i) => <li key={i}>{k}</li>)}
      </ul>
      <input
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        placeholder="Add new keyword"
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={addKeyword}>Add</button>

      <hr style={{ margin: "2rem 0" }} />
      <h3>Allow Extension Uninstall</h3>
      <button onClick={toggleUninstall}>
        {allowUninstall ? "Disable Uninstall" : "Enable Uninstall"}
      </button>
    </div>
  );
}
