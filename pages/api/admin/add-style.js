import { dbConnection } from 'lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const db = await dbConnection();
      await db.models.style.create({ name: req.body });

      res.status(200).json({ message: 'Style created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
