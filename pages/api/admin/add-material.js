import { dbConnection } from 'lib/db';
import cors from 'middleware/cors';
import MaterialModel from 'models/Material.model';

export default function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        await dbConnection();
        await MaterialModel.create({ name: req.body });

        res.status(200).json({ message: 'Material added' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
}
