import { dbConnection } from 'lib/db';

import SlideModel from 'models/Slide.model';

export default async function handler(req, res) {
  await dbConnection();
  if (req.method === 'GET') {
    const slides = await SlideModel.find();

    res.status(200).json({ slides });
  } else if (req.method === 'POST') {
    const slideData = JSON.parse(req.body);

    const newSlide = await SlideModel.create(slideData);

    res.status(200).json({ slide: newSlide });
  } else if (req.method === 'DELETE') {
    const slideId = JSON.parse(req.body);

    await SlideModel.findByIdAndDelete(slideId);
    res.status(200).json({ message: 'Slide deleted' });
  }
}
