import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Missing date" });

  try {
    const raw = await kv.get(`oi-${date}`);
    if (!raw) return res.status(404).json({ error: "No data for date" });

    res.status(200).json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
