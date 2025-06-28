import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

  const { date, data } = req.body;
  if (!date || !Array.isArray(data)) return res.status(400).json({ error: "Invalid input" });

  try {
    await kv.set(`oi-${date}`, JSON.stringify(data));
    res.status(200).json({ status: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
