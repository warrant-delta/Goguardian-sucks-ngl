let allowUninstall = false;

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ allowUninstall });
  } else if (req.method === "POST") {
    const { allowUninstall: value } = req.body;
    allowUninstall = !!value;
    res.status(200).json({ allowUninstall });
  }
}
