import { dbConnection } from 'lib/db';
import CountryModel from 'models/Country.model';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);

  if (req.method === 'POST') {
    try {
      await dbConnection();
      await CountryModel.create({ name: req.body });

      res.status(200).json({ message: 'Country added' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
