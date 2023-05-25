import { dbConnection } from 'lib/db';

import SlideModel from 'models/Slide.model';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await dbConnection();

    const slides = await SlideModel.find();

    res.status(200).json({ slides });
  }
}
