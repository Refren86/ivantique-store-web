import { dbConnection } from 'lib/db';
import FurnitureModel from 'models/Furniture.model';

export default async function handler(req, res) {
  await dbConnection();

  if (req.method === 'GET') {
    try {
      const furniture = await FurnitureModel.find().populate([
        'style',
        'century',
        'country',
        'materials',
      ]);

      res.status(200).json(furniture);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === 'POST') {
    const furnitureData = req.body;

    const {
      title,
      description,
      oldPrice,
      newPrice,
      width,
      height,
      depth,
      style,
      century,
      country,
      materials,
      images,
    } = JSON.parse(furnitureData);

    try {
      const newFurniture = await FurnitureModel.create({
        images,
        title,
        description,
        oldPrice,
        newPrice,
        width,
        height,
        depth,
        style,
        century,
        country,
        materials,
      });

      res.json({
        message: 'Furniture created successfully',
        data: newFurniture,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
