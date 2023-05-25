import { dbConnection } from 'lib/db';

import SlideModel from 'models/Slide.model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const slideData = JSON.parse(req.body);
    await dbConnection();

    const newSlide = await SlideModel.create(slideData);

    res.status(200).json({ slide: newSlide });
  }
}
