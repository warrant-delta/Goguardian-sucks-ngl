let blockedKeywords = ["porn", "proxy", "nsfw"];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ blockedKeywords });
  } else if (req.method === "POST") {
    const { keyword } = req.body;
    if (keyword && !blockedKeywords.includes(keyword)) {
      blockedKeywords.push(keyword);
    }
    res.status(200).json({ success: true });
  }
}
