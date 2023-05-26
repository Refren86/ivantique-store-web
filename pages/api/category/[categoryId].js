import { dbConnection } from 'lib/db';
import CategoryModel from 'models/Category.model';
import FurnitureModel from 'models/Furniture.model'; // this is needed!

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = req.query;

    await dbConnection();

    const category = await CategoryModel.findOne({
      _id: params.categoryId,
    }).populate('furniture');

    res.status(200).json({ category });
  }
}
