import cors from 'middleware/cors';
import { dbConnection } from 'lib/db';
import CenturyModel from 'models/Century.model';

export default function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        await dbConnection();
        await CenturyModel.create({ name: req.body });

        res.status(200).json({ message: 'Century created' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
}
