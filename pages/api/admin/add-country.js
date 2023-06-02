import { dbConnection } from 'lib/db';
import cors from 'middleware/cors';
import CountryModel from 'models/Country.model';

export default function handler(req, res) {
  cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        await dbConnection();
        await CountryModel.create({ name: req.body });

        res.status(200).json({ message: 'Country added' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
}
