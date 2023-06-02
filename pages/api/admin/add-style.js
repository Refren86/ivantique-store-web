import { dbConnection } from 'lib/db';
import cors from 'middleware/cors';
import StyleModel from 'models/Style.model';

export default function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        await dbConnection();
        await StyleModel.create({ name: req.body });

        res.status(200).json({ message: 'Style created' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
}
