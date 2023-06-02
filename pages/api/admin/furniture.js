import { dbConnection } from 'lib/db';
import CategoryModel from 'models/Category.model';
import FurnitureModel from 'models/Furniture.model';
import StyleModel from 'models/Style.model';
import CenturyModel from 'models/Century.model';
import CountryModel from 'models/Country.model';
import MaterialModel from 'models/Material.model';

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
      category,
      materials,
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
        category,
        materials,
      });

      await CategoryModel.findByIdAndUpdate(category, {
        $push: { furniture: newFurniture._id },
      });

      res.status(200).json({
        message: 'Furniture created successfully',
        data: newFurniture,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PATCH') {
    const { furnitureId, ...updatedFields } = req.body;

    try {
      const updatedFurniture = await FurnitureModel.findByIdAndUpdate(
        furnitureId,
        { ...updatedFields },
        { new: true }
      );

      res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL)
      res.status(201).json({
        message: 'Furniture updated successfully',
        furniture: updatedFurniture,
      });
    } catch (error) {
      res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL)
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const furnitureId = JSON.parse(req.body);

      await FurnitureModel.findByIdAndDelete(furnitureId);

      res.status(200).json({
        message: 'Furniture deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
